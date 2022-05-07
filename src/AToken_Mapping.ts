import {
    getOrInitAToken,
    getOrInitReserve,
    getOrInitUserReserve,
} from './helpers/initializers';
import {
    Mint,
    Burn,
    BalanceTransfer
} from '../generated/AToken/AToken';
import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { rayDiv, rayMul } from './helpers/math';


function tokenBurn(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
    let aToken = getOrInitAToken(event.address);
    let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress, event);
    let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress, event);

    let calculatedAmount = rayDiv(value, index);

    userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.minus(calculatedAmount);
    userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);

    userReserve.liquidityRate = poolReserve.liquidityRate;

    poolReserve.totalDeposits = poolReserve.totalDeposits.minus(value);
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.minus(value);


    poolReserve.save();
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    userReserve.save();
    //saveUserReserveAHistory(userReserve, event, index);
}

function tokenMint(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
    let aToken = getOrInitAToken(event.address);
    let poolReserve = getOrInitReserve(aToken.underlyingAssetAddress, event);
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(value);
    let userReserve = getOrInitUserReserve(from, aToken.underlyingAssetAddress, event);
    let calculatedAmount = rayDiv(value, index);

    userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.plus(calculatedAmount);
    userReserve.currentATokenBalance = rayMul(userReserve.scaledATokenBalance, index);
    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.lastUpdatedTimestamp = event.block.timestamp.toI32();

    userReserve.save();

    poolReserve.totalDeposits = poolReserve.totalDeposits.plus(value);
    poolReserve.save()
}

export function handleATokenBurn(event: Burn): void {
    tokenBurn(event, event.params.from, event.params.value, event.params.index);
}

export function handleATokenMint(event: Mint): void {
    tokenMint(event, event.params.from, event.params.value, event.params.index);
}

export function handleATokenTransfer(event: BalanceTransfer): void {
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
    reserve.save();

}