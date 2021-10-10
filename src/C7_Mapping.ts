import {
  Approval as ApprovalEvent,
  BorrowAllowanceDelegated as BorrowAllowanceDelegatedEvent,
  Transfer as TransferEvent
} from "../generated/C7_/C7_"
import {} from "../generated/C7_/C7_"
import {
  C7_ApprovalEvent as C7_ApprovalEventSchema,
  C7_BorrowAllowanceDelegatedEvent as C7_BorrowAllowanceDelegatedEventSchema,
  C7_TransferEvent as C7_TransferEventSchema
} from "../generated/schema"
import {} from "../generated/schema"

export function handleApprovalEvent(event: ApprovalEvent): void {
  let entity = new C7_ApprovalEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleBorrowAllowanceDelegatedEvent(
  event: BorrowAllowanceDelegatedEvent
): void {
  let entity = new C7_BorrowAllowanceDelegatedEventSchema(
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

export function handleTransferEvent(event: TransferEvent): void {
  let entity = new C7_TransferEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
