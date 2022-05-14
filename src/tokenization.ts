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
    let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress, event);
    let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress, event);

    let calculatedAmount = rayDiv(value, index);

    userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.minus(calculatedAmount);
    let prevcurrentATokenBalance = userReserve.currentATokenBalance;
    userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);
    log.info('tokenization::tokenBurn::user: {} and prevcurrentATokenBalance: {} and amount to assign {} (value get from raymul of scaledATokenBalance :{} and index: {}), currentATokenBalance: {} ',
        [from.toHexString(),
        prevcurrentATokenBalance.toString(),
        rayMul(userReserve.scaledATokenBalance, index).toString(),
        userReserve.scaledATokenBalance.toString(),
        index.toString(),
        userReserve.currentATokenBalance.toString()
        ]
    );
    userReserve.liquidityRate = poolReserve.liquidityRate;
    poolReserve.totalDeposits = poolReserve.totalDeposits.minus(value);

    let prevtotalATokenSupply = poolReserve.totalATokenSupply;
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.minus(value);

    log.info('tokenization::tokenBurn::user: {} and prevtotalATokenSupply: {} and amount to subtract: {} , newtotalATokenSupply: {} ',
        [from.toHexString(),
        prevtotalATokenSupply.toString(),
        value.toString(),
        poolReserve.totalATokenSupply.toString()
        ]);
    saveReserve(poolReserve, event);

    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    userReserve.save();
}

function tokenMint(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
    let aToken = getOrInitAToken(event.address);
    let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress, event);
    let prevtotalATokenSupply = poolReserve.totalATokenSupply;
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(value);
    log.info('tokenization::tokenMint::user: {} and prevtotalATokenSupply: {} and amount to add: {} , newtotalATokenSupply: {} ',
        [from.toHexString(),
        prevtotalATokenSupply.toString(),
        value.toString(),
        poolReserve.totalATokenSupply.toString()
        ]
    );
    let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress, event);
    let calculatedAmount = rayDiv(value, index);

    userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.plus(calculatedAmount);
    let prevcurrentATokenBalance = userReserve.currentATokenBalance;
    userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);
    log.info('tokenization::tokenMint::user: {} and prevcurrentATokenBalance: {} and amount to assign: {}(found by raymul on scaledATokenBalance: {} ,index: {}) , currentATokenBalance: {} ',
        [from.toHexString(),
        prevcurrentATokenBalance.toString(),
        rayMul(userReserve.scaledATokenBalance, index).toString(),
        userReserve.scaledATokenBalance.toString(),
        value.toString(),
        userReserve.currentATokenBalance.toString()
        ]
    );
    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();

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
        aToken.underlyingAssetAddress,
        event
    );
    let userToReserve = getOrInitUserReserve(
        event.params.to,
        aToken.underlyingAssetAddress,
        event
    );

    let reserve = getOrInitReserve(aToken.underlyingAssetAddress, event);
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
    let userReserve = getOrInitUserReserve(from, vToken.underlyingAssetAddress, event);
    let poolReserve = getOrInitReserve(vToken.underlyingAssetAddress, event);

    let calculatedAmount = rayDiv(value, index);
    userReserve.scaledVariableDebt = userReserve.scaledVariableDebt.minus(calculatedAmount);
    userReserve.currentVariableDebt = rayMul(userReserve.scaledVariableDebt, index);
    let prevCurrentTotalDebt = userReserve.currentTotalDebt;
    userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
        userReserve.currentVariableDebt
    );
    log.info('tokenization::handleVariableTokenBurn::user: {} and prevCurrentTotalDebt: {} and amount to add: {} , newCurrentTotalDebt: {} ',
        [event.params.user.toHexString(),
        prevCurrentTotalDebt.toString(),
        userReserve.currentVariableDebt.toString(),
        userReserve.currentTotalDebt.toString()
        ]
    );

    poolReserve.totalScaledVariableDebt = poolReserve.totalScaledVariableDebt.minus(calculatedAmount);
    poolReserve.totalCurrentVariableDebt = rayMul(poolReserve.totalScaledVariableDebt, index);

    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    userReserve.save();

    saveReserve(poolReserve, event);

    let user = getOrInitUser(from);
    if (
        userReserve.scaledVariableDebt.equals(zeroBI()) &&
        userReserve.principalStableDebt.equals(zeroBI())
    ) {
        user.lastUpdatedTimestamp = event.block.timestamp.toI32()
        user.save();
    }

}

export function handleVariableTokenMint(event: VTokenMint): void {
    let vToken = getOrInitVToken(event.address);
    let poolReserve = getOrInitReserve(vToken.underlyingAssetAddress, event);

    let from = event.params.from;
    if (from.toHexString() != event.params.onBehalfOf.toHexString()) {
        from = event.params.onBehalfOf;
    }

    let value = event.params.value;
    let index = event.params.index;

    let userReserve = getOrInitUserReserve(from, vToken.underlyingAssetAddress, event);

    let user = getOrInitUser(event.params.from);
    if (
        userReserve.scaledVariableDebt.equals(zeroBI()) &&
        userReserve.principalStableDebt.equals(zeroBI())
    ) {
        user.lastUpdatedTimestamp = event.block.timestamp.toI32()
        user.save();
    }

    let calculatedAmount = rayDiv(value, index);
    userReserve.scaledVariableDebt = userReserve.scaledVariableDebt.plus(calculatedAmount);
    userReserve.currentVariableDebt = rayMul(userReserve.scaledVariableDebt, index);

    let prevCurrentTotalDebt = userReserve.currentTotalDebt;
    userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
        userReserve.currentVariableDebt
    );
    log.info('tokenization::handleVariableTokenMint::user: {} and prevCurrentTotalDebt: {} and amount to asign: {} , newCurrentTotalDebt: {} ',
        [event.params.from.toHexString(),
        prevCurrentTotalDebt.toString(),
        userReserve.currentStableDebt.plus(userReserve.currentVariableDebt).toString(),
        userReserve.currentTotalDebt.toString()
        ]
    );
    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
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
    let userReserve = getOrInitUserReserve(from, sToken.underlyingAssetAddress, event);

    let poolReserve = getOrInitReserve(sToken.underlyingAssetAddress, event);

    let user = getOrInitUser(from);
    if (
        userReserve.scaledVariableDebt.equals(zeroBI()) &&
        userReserve.principalStableDebt.equals(zeroBI())
    ) {
        user.lastUpdatedTimestamp = event.block.timestamp.toI32()
        user.save();
    }

    let calculatedAmount = event.params.amount.plus(event.params.balanceIncrease);
    poolReserve.totalPrincipalStableDebt = event.params.newTotalSupply;

    saveReserve(poolReserve, event);

    userReserve.principalStableDebt = userReserve.principalStableDebt.plus(calculatedAmount);
    userReserve.currentStableDebt = userReserve.principalStableDebt;
    let prevCurrentTotalDebt = userReserve.currentTotalDebt;
    userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
        userReserve.currentVariableDebt
    );
    log.info('tokenization::handleStableTokenMint::user: {} and prevCurrentTotalDebt: {} and amount to asign: {} , newCurrentTotalDebt: {} ',
        [event.params.user.toHexString(),
        prevCurrentTotalDebt.toString(),
        userReserve.currentStableDebt.plus(userReserve.currentVariableDebt).toString(),
        userReserve.currentTotalDebt.toString()
        ]);
    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    userReserve.save();
}

export function handleStableTokenBurn(event: STokenBurn): void {
    let sTokenAddress = event.address;
    let sToken = getOrInitSToken(sTokenAddress);
    let userReserve = getOrInitUserReserve(
        event.params.user,
        sToken.underlyingAssetAddress,
        event
    );
    let poolReserve = getOrInitReserve(sToken.underlyingAssetAddress, event);
    let balanceIncrease = event.params.balanceIncrease;
    let amount = event.params.amount;

    poolReserve.totalPrincipalStableDebt = event.params.newTotalSupply;

    let prevtotalATokenSupply = poolReserve.totalATokenSupply;
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(balanceIncrease);
    log.info('tokenization::handleStableTokenBurn::user: {} and prevtotalATokenSupply: {} and amount to add: {} , totalATokenSupply: {} ', [event.params.user.toHexString(),
    prevtotalATokenSupply.toString(),
    balanceIncrease.toString(),
    poolReserve.totalATokenSupply.toString()]);
    saveReserve(poolReserve, event);

    userReserve.principalStableDebt = userReserve.principalStableDebt
        // .minus(event.params.balanceIncrease)
        .minus(amount);
    userReserve.currentStableDebt = userReserve.principalStableDebt;
    let prevCurrentTotalDebt = userReserve.currentTotalDebt;
    userReserve.currentTotalDebt = userReserve.currentStableDebt.plus(
        userReserve.currentVariableDebt
    );
    log.info('tokenization::handleStableTokenBurn::user: {} and prevCurrentTotalDebt: {} and amount to add: {} , newCurrentTotalDebt: {} ',
        [event.params.user.toHexString(),
        prevCurrentTotalDebt.toString(),
        amount.toString(),
        userReserve.currentTotalDebt.toString()
        ]
    );
    userReserve.liquidityRate = poolReserve.liquidityRate;

    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    userReserve.save();

    let user = getOrInitUser(event.params.user);
    if (
        userReserve.scaledVariableDebt.equals(zeroBI()) &&
        userReserve.principalStableDebt.equals(zeroBI())
    ) {
        user.lastUpdatedTimestamp = event.block.timestamp.toI32()
        user.save();
    }
}

export function handleStableTokenBorrowAllowanceDelegated(event: SBorrowAllowanceDelegated): void {
    let fromUser = event.params.fromUser;
    let toUser = event.params.toUser;
    let toUserAllowance = getOrInitUser(toUser);
    let asset = event.params.asset;
    let amount = event.params.amount;

    let userReserve = getOrInitUserReserve(fromUser, asset, event);

    let delegatedAllowanceId = 'stable' + fromUser.toHexString() + toUser.toHexString() + asset.toHexString();
    let delegatedAllowance = StableTokenDelegatedAllowance.load(delegatedAllowanceId);
    if (delegatedAllowance == null) {
        log.info('tokenization::handleStableTokenBorrowAllowanceDelegated:: Creating new entry with user: {}', [toUser.toHexString()]);
        delegatedAllowance = new StableTokenDelegatedAllowance(delegatedAllowanceId);
        delegatedAllowance.fromUser = fromUser.toHexString();
        delegatedAllowance.toUser = toUserAllowance.id;
        delegatedAllowance.userReserve = userReserve.id;
    }
    delegatedAllowance.amountAllowed = amount;
    delegatedAllowance.lastUpdatedTimestamp = userReserve.lastUpdatedTimestamp
    delegatedAllowance.save();
}

export function handleVariableTokenBorrowAllowanceDelegated(
    event: VBorrowAllowanceDelegated
): void {
    let fromUser = event.params.fromUser;
    let toUser = event.params.toUser;
    let asset = event.params.asset;
    let amount = event.params.amount;
    let toUserAllowance = getOrInitUser(toUser);

    let userReserve = getOrInitUserReserve(fromUser, asset, event);

    let delegatedAllowanceId = 'variable' + fromUser.toHexString() + toUser.toHexString() + asset.toHexString();
    let delegatedAllowance = VariableTokenDelegatedAllowance.load(delegatedAllowanceId);
    if (delegatedAllowance == null) {
        delegatedAllowance = new VariableTokenDelegatedAllowance(delegatedAllowanceId);
        delegatedAllowance.fromUser = fromUser.toHexString();
        delegatedAllowance.toUser = toUserAllowance.id;
        delegatedAllowance.userReserve = userReserve.id;
    }
    delegatedAllowance.amountAllowed = amount;
    delegatedAllowance.lastUpdatedTimestamp = userReserve.lastUpdatedTimestamp
    delegatedAllowance.save();
}
