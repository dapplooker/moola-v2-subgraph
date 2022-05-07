import {
  getOrInitReserve,
  getOrInitAToken,
  getOrInitSToken,
  getOrInitVToken
} from './helpers/initializers';
import {
  CollateralConfigurationChanged,
  ReserveInitialized,
} from '../generated/LendingPoolConfigurator/LendingPoolConfigurator';
import {
  IERC20DetailedBytes,
} from '../generated/LendingPoolConfigurator/IERC20DetailedBytes';
import {
  IERC20Detailed,
} from '../generated/LendingPoolConfigurator/IERC20Detailed';

export function handleCollateralConfigurationChanged(event: CollateralConfigurationChanged): void {
  let reserve = getOrInitReserve(event.params.asset, event);
  reserve.reserveLiquidationThreshold = event.params.liquidationThreshold;
  reserve.reserveLiquidationBonus = event.params.liquidationBonus;
  reserve.save();
}

export function handleReserveInitialized(event: ReserveInitialized): void {
  let underlyingAssetAddress = event.params.asset; //_reserve;
  let reserve = getOrInitReserve(underlyingAssetAddress, event);

  let ERC20ATokenContract = IERC20Detailed.bind(event.params.aToken);
  let ERC20ReserveContract = IERC20Detailed.bind(underlyingAssetAddress);
  let ERC20DetailedBytesContract = IERC20DetailedBytes.bind(underlyingAssetAddress);

  let nameStringCall = ERC20ReserveContract.try_name();
  if (nameStringCall.reverted) {
    let bytesNameCall = ERC20DetailedBytesContract.try_name();
    if (bytesNameCall.reverted) {
      reserve.name = '';
    } else {
      reserve.name = bytesNameCall.value.toString();
    }
  } else {
    reserve.name = nameStringCall.value;
  }

  reserve.symbol = ERC20ATokenContract.symbol().slice(1);

  reserve.decimals = ERC20ReserveContract.decimals();

  // updateInterestRateStrategy(reserve, event.params.interestRateStrategyAddress, true);

  // ATokenContract.create(event.params.aToken);
  //createMapContractToPool(event.params.aToken, reserve.pool);
  let aToken = getOrInitAToken(event.params.aToken);
  aToken.underlyingAssetAddress = reserve.underlyingAsset;
  aToken.underlyingAssetDecimals = reserve.decimals;
  aToken.lastUpdatedTimestamp = event.block.timestamp.toI32();
  aToken.save();

  // STokenContract.create(event.params.stableDebtToken);
  // createMapContractToPool(event.params.stableDebtToken, reserve.pool);
  let sToken = getOrInitSToken(event.params.stableDebtToken);
  sToken.underlyingAssetAddress = reserve.underlyingAsset;
  sToken.underlyingAssetDecimals = reserve.decimals;
  sToken.lastUpdatedTimestamp = event.block.timestamp.toI32();
  sToken.save();

  // VTokenContract.create(event.params.variableDebtToken);
  // createMapContractToPool(event.params.variableDebtToken, reserve.pool);
  let vToken = getOrInitVToken(event.params.variableDebtToken);
  vToken.underlyingAssetAddress = reserve.underlyingAsset;
  vToken.underlyingAssetDecimals = reserve.decimals;
  reserve.lastUpdatedTimestamp = event.block.timestamp.toI32();
  vToken.lastUpdatedTimestamp = event.block.timestamp.toI32();
  vToken.save();
  reserve.save();
}