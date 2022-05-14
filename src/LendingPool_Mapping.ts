import {
    Borrow as BorrowEvent,
    Deposit as DepositEvent,
    FlashLoan as FlashLoanEvent,
    Repay as RepayEvent,
    Swap as SwapEvent,
    Withdraw as WithdrawEvent,
    ReserveDataUpdated as ReserveDataUpdated,
    ReserveUsedAsCollateralDisabled,
    ReserveUsedAsCollateralEnabled,
} from "../generated/LendingPool/LendingPool"
import { } from "../generated/LendingPool/LendingPool"
import {
    Borrow as BorrowEventSchema,
    Deposit as DepositEventSchema,
    FlashLoan as FlashLoanEventSchema,
    Repay as RepayEventSchema,
    Swap as SwapEventSchema,
    Withdraw as WithdrawEventSchema,
    UsageAsCollateral as UsageAsCollateralSchema
} from "../generated/schema"
import { } from "../generated/schema"
import {
    getOrInitReserve,
    getOrInitUser,
    getOrInitUserReserve,
} from './helpers/initializers';
import { EventTypeRef, getHistoryId } from './utils/id-generation';
import { calculateGrowth } from './helpers/math';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleBorrowEvent(event: BorrowEvent): void {
    let entity = new BorrowEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.reserve = event.params.reserve
    entity.user = event.params.user
    entity.onBehalfOf = event.params.onBehalfOf
    entity.amount = event.params.amount
    entity.borrowRateMode = event.params.borrowRateMode
    entity.borrowRate = event.params.borrowRate
    entity.referral = event.params.referral
    entity.save()
}

export function handleDepositEvent(event: DepositEvent): void {
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    let entity = new DepositEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.reserve = event.params.reserve
    entity.user = event.params.user
    entity.onBehalfOf = event.params.onBehalfOf
    entity.amount = event.params.amount
    entity.referral = event.params.referral
    entity.save()
}

export function handleFlashLoanEvent(event: FlashLoanEvent): void {
    let initiator = getOrInitUser(event.params.initiator);
    let poolReserve = getOrInitReserve(event.params.asset, event);
    let premium = event.params.premium;
    poolReserve.totalATokenSupply = poolReserve.totalATokenSupply.plus(premium);

    poolReserve.save();
    let entity = new FlashLoanEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.target = event.params.target
    entity.initiator = event.params.initiator
    entity.asset = event.params.asset
    entity.amount = event.params.amount
    entity.premium = event.params.premium
    entity.referralCode = event.params.referralCode
    entity.save()
}

export function handleRepayEvent(event: RepayEvent): void {
    let repayer = getOrInitUser(event.params.repayer);
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    poolReserve.save();
    let entity = new RepayEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.reserve = event.params.reserve
    entity.user = event.params.user
    entity.repayer = event.params.repayer
    entity.amount = event.params.amount
    entity.save()
}

export function handleSwapEvent(event: SwapEvent): void {
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    let entity = new SwapEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.reserve = event.params.reserve
    entity.user = event.params.user
    entity.rateMode = event.params.rateMode
    entity.save()
}

export function handleWithdrawEvent(event: WithdrawEvent): void {
    let toUser = getOrInitUser(event.params.to);
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let entity = new WithdrawEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.reserve = event.params.reserve
    entity.user = event.params.user
    entity.to = event.params.to
    entity.amount = event.params.amount
    entity.save()
}
export function handleReserveUsedAsCollateralEnabled(event: ReserveUsedAsCollateralEnabled): void {
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let timestamp = event.block.timestamp.toI32();

    let usageAsCollateral = new UsageAsCollateralSchema(
        getHistoryId(event, EventTypeRef.UsageAsCollateral)
    );
    usageAsCollateral.user = userReserve.user;
    usageAsCollateral.userReserve = userReserve.id;
    usageAsCollateral.reserve = poolReserve.id;
    usageAsCollateral.timestamp = timestamp;
    usageAsCollateral.save();

    userReserve.usageAsCollateralEnabled = true;
    userReserve.lastUpdatedTimestamp = timestamp;
    userReserve.save();
}

export function handleReserveUsedAsCollateralDisabled(
    event: ReserveUsedAsCollateralDisabled
): void {
    let poolReserve = getOrInitReserve(event.params.reserve, event);
    let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
    let timestamp = event.block.timestamp.toI32();

    let usageAsCollateral = new UsageAsCollateralSchema(
        getHistoryId(event, EventTypeRef.UsageAsCollateral)
    );
    usageAsCollateral.user = userReserve.user;
    usageAsCollateral.userReserve = userReserve.id;
    usageAsCollateral.reserve = poolReserve.id;
    usageAsCollateral.timestamp = timestamp;
    usageAsCollateral.save();

    userReserve.usageAsCollateralEnabled = false;
    userReserve.lastUpdatedTimestamp = timestamp;
    userReserve.save();
}

export function handleReserveDataUpdated(event: ReserveDataUpdated): void {
    let reserve = getOrInitReserve(event.params.reserve, event);
    let timestamp = event.block.timestamp;
    let prevTimestamp = BigInt.fromI32(reserve.lastUpdatedTimestamp);
    if (timestamp.gt(prevTimestamp)) {
        let growth = calculateGrowth(
            reserve.totalATokenSupply,
            reserve.liquidityRate,
            prevTimestamp,
            timestamp
        );
        reserve.totalATokenSupply = reserve.totalATokenSupply.plus(growth);
    }
    reserve.liquidityRate = event.params.liquidityRate;
    reserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
    reserve.save();
}