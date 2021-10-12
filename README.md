# moola V2 
> Democratizing access to borrowing and lending
#
# Entities and Attributes #

## Deposit 
> Query deposit entities and properties.
##
      id,
      txHash,
      fromAddress,
      toAddress,
      valueTransferred,
      gasUsed,
      gasPrice,
      blockTimestamp,
      reserve,
      user,
      onBehalfOf,
      amount,
      referral,
      
     
## Withdraw
> Query withdraw entities and properties 
##
      id,
      txHash,
      fromAddress,
      toAddress,
      valueTransferred,
      gasUsed,
      gasPrice,
      blockTimestamp,
      reserve,
      user,
      to,
      amount
     
     
## FlashLoan
> Query Flashloan entities and properties
##
     id,
     txHash,
     fromAddress,
     toAddress,
     valueTransferred,
     gasUsed,
     gasPrice,
     blockTimestamp,
     target,
     initiator,
     asset,
     amount,
     premium,
     referralCode
     
     
## Borrow
> Query borrow entities and properties 
##
     id,
     txHash,
     fromAddress,
     toAddress,
     valueTransferred,
     gasUsed,
     gasPrice,
     blockTimestamp,
     reserve,
     user,
     onBehalfOf,
     amount,
     borrowRateMode,
     borrowRate,
     referral
     
     
## Repay
> Query repay entities and properties
##
     id,
     txHash,
     fromAddress,
     toAddress,
     valueTransferred,
     gasUsed,
     gasPrice,
     blockTimestamp,
     reserve,
     user,
     repayer,
     amount
     

## BorrowAllowanceDelegated 
> information about delegate credit 
##
     id,
     txHash,
     fromAddress,
     toAddress,
     valueTransferred,
     gasUsed,
     gasPrice,
     blockTimestamp,
     fromUser,
     toUser,
     asset,
     amount


Subgraph URL: https://thegraph.com/hosted-service/subgraph/dapplooker/moola-market-v2
