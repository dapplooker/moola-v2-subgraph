import {
  Approval as ApprovalEvent,
  BorrowAllowanceDelegated as BorrowAllowanceDelegatedEvent,
  Transfer as TransferEvent
} from "../generated/DebtToken1/DebtToken"
import {} from "../generated/DebtToken1/DebtToken"
import {
  BorrowAllowanceDelegatedEvent as BorrowAllowanceDelegatedEventSchema,
} from "../generated/schema"
import {} from "../generated/schema"

export function handleBorrowAllowanceDelegatedEvent(
  event: BorrowAllowanceDelegatedEvent
): void {
  let entity = new BorrowAllowanceDelegatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.fromUser = event.params.fromUser
  entity.toUser = event.params.toUser
  entity.asset = event.params.asset
  entity.amount = event.params.amount
  entity.save()
}
