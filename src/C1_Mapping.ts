import {
  AddressSet as AddressSetEvent,
  ConfigurationAdminUpdated as ConfigurationAdminUpdatedEvent,
  EmergencyAdminUpdated as EmergencyAdminUpdatedEvent,
  LendingPoolCollateralManagerUpdated as LendingPoolCollateralManagerUpdatedEvent,
  LendingPoolConfiguratorUpdated as LendingPoolConfiguratorUpdatedEvent,
  LendingPoolUpdated as LendingPoolUpdatedEvent,
  LendingRateOracleUpdated as LendingRateOracleUpdatedEvent,
  MarketIdSet as MarketIdSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PriceOracleUpdated as PriceOracleUpdatedEvent,
  ProxyCreated as ProxyCreatedEvent
} from "../generated/C1_/C1_"
import {} from "../generated/C1_/C1_"
import {
  C1_AddressSetEvent as C1_AddressSetEventSchema,
  C1_ConfigurationAdminUpdatedEvent as C1_ConfigurationAdminUpdatedEventSchema,
  C1_EmergencyAdminUpdatedEvent as C1_EmergencyAdminUpdatedEventSchema,
  C1_LendingPoolCollateralManagerUpdatedEvent as C1_LendingPoolCollateralManagerUpdatedEventSchema,
  C1_LendingPoolConfiguratorUpdatedEvent as C1_LendingPoolConfiguratorUpdatedEventSchema,
  C1_LendingPoolUpdatedEvent as C1_LendingPoolUpdatedEventSchema,
  C1_LendingRateOracleUpdatedEvent as C1_LendingRateOracleUpdatedEventSchema,
  C1_MarketIdSetEvent as C1_MarketIdSetEventSchema,
  C1_OwnershipTransferredEvent as C1_OwnershipTransferredEventSchema,
  C1_PriceOracleUpdatedEvent as C1_PriceOracleUpdatedEventSchema,
  C1_ProxyCreatedEvent as C1_ProxyCreatedEventSchema
} from "../generated/schema"
import {} from "../generated/schema"

export function handleAddressSetEvent(event: AddressSetEvent): void {
  let entity = new C1_AddressSetEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.hasProxy = event.params.hasProxy
  entity.save()
}

export function handleConfigurationAdminUpdatedEvent(
  event: ConfigurationAdminUpdatedEvent
): void {
  let entity = new C1_ConfigurationAdminUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleEmergencyAdminUpdatedEvent(
  event: EmergencyAdminUpdatedEvent
): void {
  let entity = new C1_EmergencyAdminUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleLendingPoolCollateralManagerUpdatedEvent(
  event: LendingPoolCollateralManagerUpdatedEvent
): void {
  let entity = new C1_LendingPoolCollateralManagerUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleLendingPoolConfiguratorUpdatedEvent(
  event: LendingPoolConfiguratorUpdatedEvent
): void {
  let entity = new C1_LendingPoolConfiguratorUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleLendingPoolUpdatedEvent(
  event: LendingPoolUpdatedEvent
): void {
  let entity = new C1_LendingPoolUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleLendingRateOracleUpdatedEvent(
  event: LendingRateOracleUpdatedEvent
): void {
  let entity = new C1_LendingRateOracleUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleMarketIdSetEvent(event: MarketIdSetEvent): void {
  let entity = new C1_MarketIdSetEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newMarketId = event.params.newMarketId
  entity.save()
}

export function handleOwnershipTransferredEvent(
  event: OwnershipTransferredEvent
): void {
  let entity = new C1_OwnershipTransferredEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handlePriceOracleUpdatedEvent(
  event: PriceOracleUpdatedEvent
): void {
  let entity = new C1_PriceOracleUpdatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}

export function handleProxyCreatedEvent(event: ProxyCreatedEvent): void {
  let entity = new C1_ProxyCreatedEventSchema(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.transaction.hash
  entity.fromAddress = event.transaction.from
  entity.toAddress = event.transaction.to
  entity.valueTransferred = event.transaction.value
  entity.gasUsed = event.transaction.gasUsed
  entity.gasPrice = event.transaction.gasPrice
  entity.blockTimestamp = event.block.timestamp
  entity.newAddress = event.params.newAddress
  entity.save()
}
