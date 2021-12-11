import {
  BalanceTransfer as ATokenTransfer,
  Mint as ATokenMint,
  Burn as ATokenBurn,
} from '../generated/AToken/AToken';
import {
  Mint as VTokenMint,
  Burn as VTokenBurn,
  BorrowAllowanceDelegated as VBorrowAllowanceDelegated,
} from '../generated/VariableDebtToken1/VariableDebtToken';
import {
  Mint as STokenMint,
  Burn as STokenBurn,
  BorrowAllowanceDelegated as SBorrowAllowanceDelegated,
} from '../generated/StableDebtToken1/StableDebtToken';
import {
  Reserve,
  VariableTokenDelegatedAllowance,
  StableTokenDelegatedAllowance
} from '../generated/schema';
import {
  getOrInitAToken,
  getOrInitReserve,
  getOrInitUserReserve,
  getOrInitSToken,
  getOrInitVToken,
  getOrInitUser,
} from './helpers/initializers';
import { zeroBI } from './utils/converters';
import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { rayDiv, rayMul } from './helpers/math';

function saveReserve(reserve: Reserve, event: ethereum.Event): void {
  reserve.save();
}

function tokenBurn(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
  let aToken = getOrInitAToken(event.address);
  let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress as Address, event);
  let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress as Address, event);

  let calculatedAmount = rayDiv(value, index);

  userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.minus(calculatedAmount);
  userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);
  userReserve.liquidityRate = poolReserve.liquidityRate;
  poolReserve.totalDeposits = poolReserve.totalDeposits.minus(value);
  poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.minus(value);
  saveReserve(poolReserve, event);

  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();
}

function tokenMint(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
  let aToken = getOrInitAToken(event.address);
  let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress as Address, event);
  poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(value);

  let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress as Address, event);
  let calculatedAmount = rayDiv(value, index);

  userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.plus(calculatedAmount);
  log.warning('value of scaledATokenBalance: {} and index: {}  is Zero', [userReserve.currentATokenBalance.toString(), index.toString()]);
  userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);

  userReserve.liquidityRate = poolReserve.liquidityRate;
  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();

  userReserve.save();

  poolReserve.totalDeposits = poolReserve.totalDeposits.plus(value);

  saveReserve(poolReserve, event);
}

export function handleATokenBurn(event: ATokenBurn): void {
  tokenBurn(event, event.params.from, event.params.value, event.params.index);
}

export function handleATokenMint(event: ATokenMint): void {
  tokenMint(event, event.params.from, event.params.value, event.params.index);
}

export function handleATokenTransfer(event: ATokenTransfer): void {
  tokenBurn(event, event.params.from, event.params.value, event.params.index);
  tokenMint(event, event.params.to, event.params.value, event.params.index);

  let aToken = getOrInitAToken(event.address);
  let userFromReserve = getOrInitUserReserve(
    event.params.from,
    aToken.underlyingAssetAddress as Address,
    event
  );
  let userToReserve = getOrInitUserReserve(
    event.params.to,
    aToken.underlyingAssetAddress as Address,
    event
  );

  let reserve = getOrInitReserve(aToken.underlyingAssetAddress as Address, event);
  if (
    userFromReserve.usageAsCollateralEnabled &&
    !userToReserve.usageAsCollateralEnabled
  ) {
    saveReserve(reserve, event);
  } else if (
    !userFromReserve.usageAsCollateralEnabled &&
    userToReserve.usageAsCollateralEnabled
  ) {
    saveReserve(reserve, event);
  }
}

export function handleVariableTokenBurn(event: VTokenBurn): void {
  let vToken = getOrInitVToken(event.address);
  let from = event.params.user;
  let value = event.params.amount;
  let index = event.params.index;
  let userReserve = getOrInitUserReserve(from, vToken.underlyingAssetAddress as Address, event);
  let poolReserve = getOrInitReserve(vToken.underlyingAssetAddress as Address, event);

  let calculatedAmount = rayDiv(value, index);
  userReserve.scaledVariableDebt = userReserve.scaledVariableDebt.minus(calculatedAmount);
  userReserve.currentVariableDebt = rayMul(userReserve.scaledVariableDebt, index);
  userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
    userReserve.currentVariableDebt
  );

  poolReserve.totalScaledVariableDebt = poolReserve.totalScaledVariableDebt.minus(calculatedAmount);
  poolReserve.totalCurrentVariableDebt = rayMul(poolReserve.totalScaledVariableDebt, index);

  userReserve.liquidityRate = poolReserve.liquidityRate;
  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();

  saveReserve(poolReserve, event);

  let user = getOrInitUser(from);
  if (
    userReserve.scaledVariableDebt.equals(zeroBI()) &&
    userReserve.principalStableDebt.equals(zeroBI())
  ) {
    user.save();
  }

}

export function handleVariableTokenMint(event: VTokenMint): void {
  let vToken = getOrInitVToken(event.address);
  let poolReserve = getOrInitReserve(vToken.underlyingAssetAddress as Address, event);

  let from = event.params.from;
  if (from.toHexString() != event.params.onBehalfOf.toHexString()) {
    from = event.params.onBehalfOf;
  }

  let value = event.params.value;
  let index = event.params.index;

  let userReserve = getOrInitUserReserve(from, vToken.underlyingAssetAddress as Address, event);

  let user = getOrInitUser(event.params.from);
  if (
    userReserve.scaledVariableDebt.equals(zeroBI()) &&
    userReserve.principalStableDebt.equals(zeroBI())
  ) {
    user.save();
  }

  let calculatedAmount = rayDiv(value, index);
  userReserve.scaledVariableDebt = userReserve.scaledVariableDebt.plus(calculatedAmount);
  userReserve.currentVariableDebt = rayMul(userReserve.scaledVariableDebt, index);

  userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
    userReserve.currentVariableDebt
  );

  userReserve.liquidityRate = poolReserve.liquidityRate;
  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();

  poolReserve.totalScaledVariableDebt = poolReserve.totalScaledVariableDebt.plus(calculatedAmount);
  poolReserve.totalCurrentVariableDebt = rayMul(poolReserve.totalScaledVariableDebt, index);
  saveReserve(poolReserve, event);
}

export function handleStableTokenMint(event: STokenMint): void {
  let sToken = getOrInitSToken(event.address);
  let from = event.params.user;
  if (from.toHexString() != event.params.onBehalfOf.toHexString()) {
    from = event.params.onBehalfOf;
  }
  let userReserve = getOrInitUserReserve(from, sToken.underlyingAssetAddress as Address, event);

  let poolReserve = getOrInitReserve(sToken.underlyingAssetAddress as Address, event);

  let user = getOrInitUser(from);
  if (
    userReserve.scaledVariableDebt.equals(zeroBI()) &&
    userReserve.principalStableDebt.equals(zeroBI())
  ) {
    user.save();
  }

  let calculatedAmount = event.params.amount.plus(event.params.balanceIncrease);
  poolReserve.totalPrincipalStableDebt = event.params.newTotalSupply;

  saveReserve(poolReserve, event);

  userReserve.principalStableDebt = userReserve.principalStableDebt.plus(calculatedAmount);
  userReserve.currentStableDebt = userReserve.principalStableDebt;
  userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
    userReserve.currentVariableDebt
  );

  userReserve.liquidityRate = poolReserve.liquidityRate;
  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();
}

export function handleStableTokenBurn(event: STokenBurn): void {
  let sTokenAddress = event.address;
  let sToken = getOrInitSToken(sTokenAddress);
  let userReserve = getOrInitUserReserve(
    event.params.user,
    sToken.underlyingAssetAddress as Address,
    event
  );
  let poolReserve = getOrInitReserve(sToken.underlyingAssetAddress as Address, event);
  let balanceIncrease = event.params.balanceIncrease;
  let amount = event.params.amount;

  poolReserve.totalPrincipalStableDebt = event.params.newTotalSupply;


  poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(balanceIncrease);

  saveReserve(poolReserve, event);

  userReserve.principalStableDebt = userReserve.principalStableDebt
    // .minus(event.params.balanceIncrease)
    .minus(amount);
  userReserve.currentStableDebt = userReserve.principalStableDebt;
  userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
    userReserve.currentVariableDebt
  );

  userReserve.liquidityRate = poolReserve.liquidityRate;

  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();

  let user = getOrInitUser(event.params.user);
  if (
    userReserve.scaledVariableDebt.equals(zeroBI()) &&
    userReserve.principalStableDebt.equals(zeroBI())
  ) {
    user.save();
  }
}

export function handleStableTokenBorrowAllowanceDelegated(event: SBorrowAllowanceDelegated): void {
  let fromUser = event.params.fromUser;
  let toUser = event.params.toUser;
  let asset = event.params.asset;
  let amount = event.params.amount;

  let userReserve = getOrInitUserReserve(fromUser, asset, event);

  let delegatedAllowanceId =
    'stable' + fromUser.toHexString() + toUser.toHexString() + asset.toHexString();
  let delegatedAllowance = StableTokenDelegatedAllowance.load(delegatedAllowanceId);
  if (delegatedAllowance == null) {
    delegatedAllowance = new StableTokenDelegatedAllowance(delegatedAllowanceId);
    delegatedAllowance.fromUser = fromUser.toHexString();
    delegatedAllowance.toUser = toUser.toHexString();
    delegatedAllowance.userReserve = userReserve.id;
  }
  delegatedAllowance.amountAllowed = amount;
  delegatedAllowance.save();
}

export function handleVariableTokenBorrowAllowanceDelegated(
  event: VBorrowAllowanceDelegated
): void {
  let fromUser = event.params.fromUser;
  let toUser = event.params.toUser;
  let asset = event.params.asset;
  let amount = event.params.amount;

  let userReserve = getOrInitUserReserve(fromUser, asset, event);

  let delegatedAllowanceId =
    'variable' + fromUser.toHexString() + toUser.toHexString() + asset.toHexString();
  let delegatedAllowance = VariableTokenDelegatedAllowance.load(delegatedAllowanceId);
  if (delegatedAllowance == null) {
    delegatedAllowance = new VariableTokenDelegatedAllowance(delegatedAllowanceId);
    delegatedAllowance.fromUser = fromUser.toHexString();
    delegatedAllowance.toUser = toUser.toHexString();
    delegatedAllowance.userReserve = userReserve.id;
  }
  delegatedAllowance.amountAllowed = amount;
  delegatedAllowance.save();
}
