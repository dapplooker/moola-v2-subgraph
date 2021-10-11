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
} from "../generated/LendingPool/LendingPool"
import {} from "../generated/LendingPool/LendingPool"
import {
  BorrowEvent as BorrowEventSchema,
  DepositEvent as DepositEventSchema,
  FlashLoanEvent as FlashLoanEventSchema,
  RepayEvent as RepayEventSchema,
  SwapEvent as SwapEventSchema,
  WithdrawEvent as WithdrawEventSchema
} from "../generated/schema"
import {} from "../generated/schema"

export function handleBorrowEvent(event: BorrowEvent): void {
  let entity = new BorrowEventSchema(
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
  let entity = new DepositEventSchema(
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
  let entity = new FlashLoanEventSchema(
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

export function handleRepayEvent(event: RepayEvent): void {
  let entity = new RepayEventSchema(
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

export function handleSwapEvent(event: SwapEvent): void {
  let entity = new SwapEventSchema(
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

export function handleWithdrawEvent(event: WithdrawEvent): void {
  let entity = new WithdrawEventSchema(
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
