import {
    BorrowAllowanceDelegated as BorrowAllowanceDelegatedEvent,
} from "../generated/DebtToken1/DebtToken"
import { } from "../generated/DebtToken1/DebtToken"
import {
    BorrowAllowanceDelegated as BorrowAllowanceDelegatedEventSchema,
} from "../generated/schema"
import { } from "../generated/schema"
import { getOrInitUserReserve } from './helpers/initializers';

export function handleBorrowAllowanceDelegatedEvent(
    event: BorrowAllowanceDelegatedEvent
): void {
    let entity = new BorrowAllowanceDelegatedEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    let fromUser = event.params.fromUser;
    let asset = event.params.asset;
    let userReserve = getOrInitUserReserve(fromUser, asset, event);
    entity.txHash = event.transaction.hash
    entity.fromAddress = event.transaction.from
    entity.toAddress = event.transaction.to
    entity.valueTransferred = event.transaction.value
    entity.gasUsed = event.transaction.gasLimit
    entity.gasPrice = event.transaction.gasPrice
    entity.blockTimestamp = event.block.timestamp
    entity.fromUser = event.params.fromUser
    entity.toUser = event.params.toUser
    entity.asset = event.params.asset
    entity.amount = event.params.amount
    entity.save()
}
