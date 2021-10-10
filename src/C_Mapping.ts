import {
  Borrow as BorrowEvent,
  Deposit as DepositEvent,
  FlashLoan as FlashLoanEvent,
  LiquidationCall as LiquidationCallEvent,
  Paused as PausedEvent,
  RebalanceStableBorrowRate as RebalanceStableBorrowRateEvent,
  Repay as RepayEvent,
  ReserveDataUpdated as ReserveDataUpdatedEvent,
  ReserveUsedAsCollateralDisabled as ReserveUsedAsCollateralDisabledEvent,
  ReserveUsedAsCollateralEnabled as ReserveUsedAsCollateralEnabledEvent,
  Swap as SwapEvent,
  Unpaused as UnpausedEvent,
  Withdraw as WithdrawEvent
} from "../generated/C_/C_"
import {} from "../generated/C_/C_"
import {
  C_BorrowEvent as C_BorrowEventSchema,
  C_DepositEvent as C_DepositEventSchema,
  C_FlashLoanEvent as C_FlashLoanEventSchema,
  C_LiquidationCallEvent as C_LiquidationCallEventSchema,
  C_PausedEvent as C_PausedEventSchema,
  C_RebalanceStableBorrowRateEvent as C_RebalanceStableBorrowRateEventSchema,
  C_RepayEvent as C_RepayEventSchema,
  C_ReserveDataUpdatedEvent as C_ReserveDataUpdatedEventSchema,
  C_ReserveUsedAsCollateralDisabledEvent as C_ReserveUsedAsCollateralDisabledEventSchema,
  C_ReserveUsedAsCollateralEnabledEvent as C_ReserveUsedAsCollateralEnabledEventSchema,
  C_SwapEvent as C_SwapEventSchema,
  C_UnpausedEvent as C_UnpausedEventSchema,
  C_WithdrawEvent as C_WithdrawEventSchema
} from "../generated/schema"
import {} from "../generated/schema"

export function handleBorrowEvent(event: BorrowEvent): void {
  let entity = new C_BorrowEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
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
  let entity = new C_DepositEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
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
  let entity = new C_FlashLoanEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
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

export function handleLiquidationCallEvent(event: LiquidationCallEvent): void {
  let entity = new C_LiquidationCallEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.collateralAsset = event.params.collateralAsset
  entity.debtAsset = event.params.debtAsset
  entity.user = event.params.user
  entity.debtToCover = event.params.debtToCover
  entity.liquidatedCollateralAmount = event.params.liquidatedCollateralAmount
  entity.liquidator = event.params.liquidator
  entity.receiveAToken = event.params.receiveAToken
  entity.save()
}

export function handlePausedEvent(event: PausedEvent): void {
  let entity = new C_PausedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleRebalanceStableBorrowRateEvent(
  event: RebalanceStableBorrowRateEvent
): void {
  let entity = new C_RebalanceStableBorrowRateEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.save()
}

export function handleRepayEvent(event: RepayEvent): void {
  let entity = new C_RepayEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.repayer = event.params.repayer
  entity.amount = event.params.amount
  entity.save()
}

export function handleReserveDataUpdatedEvent(
  event: ReserveDataUpdatedEvent
): void {
  let entity = new C_ReserveDataUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.liquidityRate = event.params.liquidityRate
  entity.stableBorrowRate = event.params.stableBorrowRate
  entity.variableBorrowRate = event.params.variableBorrowRate
  entity.liquidityIndex = event.params.liquidityIndex
  entity.variableBorrowIndex = event.params.variableBorrowIndex
  entity.save()
}

export function handleReserveUsedAsCollateralDisabledEvent(
  event: ReserveUsedAsCollateralDisabledEvent
): void {
  let entity = new C_ReserveUsedAsCollateralDisabledEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.save()
}

export function handleReserveUsedAsCollateralEnabledEvent(
  event: ReserveUsedAsCollateralEnabledEvent
): void {
  let entity = new C_ReserveUsedAsCollateralEnabledEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.save()
}

export function handleSwapEvent(event: SwapEvent): void {
  let entity = new C_SwapEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.rateMode = event.params.rateMode
  entity.save()
}

export function handleUnpausedEvent(event: UnpausedEvent): void {
  let entity = new C_UnpausedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleWithdrawEvent(event: WithdrawEvent): void {
  let entity = new C_WithdrawEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save()
}
