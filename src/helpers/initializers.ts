import { Address, Bytes, ethereum, log } from '@graphprotocol/graph-ts';
import {
    Reserve,
    User,
    UserReserve,
    AToken,
    VToken,
    SToken
} from '../../generated/schema';
import {
    zeroBI,
} from '../utils/converters';
import { getAtokenId, getReserveId, getUserReserveId } from '../utils/id-generation';

export function getOrInitUser(address: Bytes): User {
    let user = User.load(address.toHexString());
    if (!user) {
        user = new User(address.toHexString());
        user.lastUpdatedTimestamp = 0;
        user.save();
    }
    return user as User;
}

export function getOrInitUserReserve(
    _user: Bytes,
    _underlyingAsset: Bytes,
    event: ethereum.Event
): UserReserve {
    let reserve = getOrInitReserve(_underlyingAsset, event);
    return initUserReserve(_underlyingAsset, _user,/* poolId,*/ reserve.id);
}

export function getOrInitReserve(underlyingAsset: Bytes, event: ethereum.Event): Reserve {
    let reserveId = getReserveId(underlyingAsset/*, poolId*/);
    let reserve = Reserve.load(reserveId);

    if (!reserve) {
        reserve = new Reserve(reserveId);
        reserve.underlyingAsset = underlyingAsset;
        reserve.symbol = '';
        reserve.name = '';
        reserve.reserveLiquidationThreshold = zeroBI();
        reserve.reserveLiquidationBonus = zeroBI();
        reserve.totalATokenSupply = zeroBI();
        reserve.liquidityRate = zeroBI();
        reserve.totalScaledVariableDebt = zeroBI();
        reserve.totalCurrentVariableDebt = zeroBI();
        reserve.totalPrincipalStableDebt = zeroBI();
        reserve.totalDeposits = zeroBI();
        reserve.lastUpdatedTimestamp = 0;
    }
    return reserve as Reserve;
}

function initUserReserve(
    underlyingAssetAddress: Bytes,
    userAddress: Bytes,
    //poolId: string,
    reserveId: string
): UserReserve {
    let userReserveId = getUserReserveId(userAddress, underlyingAssetAddress);
    let userReserve = UserReserve.load(userReserveId);
    if (!userReserve) {
        userReserve = new UserReserve(userReserveId);
        userReserve.scaledATokenBalance = zeroBI();
        userReserve.scaledVariableDebt = zeroBI();
        userReserve.principalStableDebt = zeroBI();
        userReserve.currentATokenBalance = zeroBI();
        userReserve.currentVariableDebt = zeroBI();
        userReserve.currentStableDebt = zeroBI();
        userReserve.currentTotalDebt = zeroBI();
        userReserve.liquidityRate = zeroBI();
        userReserve.usageAsCollateralEnabled = false;
        userReserve.lastUpdatedTimestamp = 0;
        let user = getOrInitUser(userAddress);
        userReserve.user = user.id;

        userReserve.reserve = reserveId;
    }
    return userReserve as UserReserve;
}

export function getOrInitAToken(aTokenAddress: Bytes): AToken {
    let aTokenId = getAtokenId(aTokenAddress);
    let aToken = AToken.load(aTokenId);
    if (!aToken) {
        aToken = new AToken(aTokenId);
        aToken.underlyingAssetAddress = new Bytes(1);
        aToken.underlyingAssetDecimals = 18;
    }
    return aToken as AToken;
}

export function getOrInitSToken(sTokenAddress: Bytes): SToken {
    let sTokenId = getAtokenId(sTokenAddress);
    let sToken = SToken.load(sTokenId);
    if (!sToken) {
        sToken = new SToken(sTokenId);
        sToken.underlyingAssetAddress = new Bytes(1);
        sToken.underlyingAssetDecimals = 18;
    }
    return sToken as SToken;
}

export function getOrInitVToken(vTokenAddress: Bytes): VToken {
    let vTokenId = getAtokenId(vTokenAddress);
    let vToken = VToken.load(vTokenId);
    if (!vToken) {
        vToken = new VToken(vTokenId);
        vToken.underlyingAssetAddress = new Bytes(1);
        vToken.underlyingAssetDecimals = 18;
    }
    return vToken as VToken;
}
