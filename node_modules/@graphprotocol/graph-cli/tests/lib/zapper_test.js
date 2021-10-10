const { runInit } = require('../../src/lib/init.js')

runInit({
    "subgraphName": "napolean0/static-subgraph",
    "directory": "/mnt/restful-apis/tmp/subgraphs/production/Zapper-Mainnet/napolean0/static-subgraph",
    "network": "mainnet",
    "etherscanApikey": "7TWA2JA7BJ7RI3CCNNZUYBB8SRMXD9G1NB",
    "fromContracts": [
      {
        "contractName": "Curve_to_Curve_Pipe",
        "contractAbi": "tests/lib/zapper/abis/Curve_to_Curve_Pipe.json",
        "contractAddress": "0x83c32BF929F80e404ff30Ede7333271460b13cd9",
        "templateContracts": []
      },
      {
        "contractName": "Uni_Curve_Pipe",
        "contractAbi": "tests/lib/zapper/abis/Uni_Curve_Pipe.json",
        "contractAddress": "0x66895417881B1d77Ca71bd9e5Ba1E729f3Aa44D3",
        "templateContracts": []
      },
      {
        "contractName": "ETH_ERC20_Curve_General_Zap_V1",
        "contractAbi": "tests/lib/zapper/abis/ETH_ERC20_Curve_General_Zap_V1.json",
        "contractAddress": "0x924Cc11Fd506fcE3dAB461AA71a6bb823669EcE3",
        "templateContracts": []
      },
      {
        "contractName": "MultiPoolZapV1_4",
        "contractAbi": "tests/lib/zapper/abis/MultiPoolZapV1_4.json",
        "contractAddress": "0x7f1cd65679d73EB98fcEBe8b61C13d3D68605717",
        "templateContracts": []
      },
      {
        "contractName": "ERC20toUniPoolZapV2_General",
        "contractAbi": "tests/lib/zapper/abis/ERC20toUniPoolZapV2_General.json",
        "contractAddress": "0x4f026054B9C934D92cD2db344ea1ae193A22067d",
        "templateContracts": []
      },
      {
        "contractName": "ERC20toUniPoolZapV1_General",
        "contractAbi": "tests/lib/zapper/abis/ERC20toUniPoolZapV1_General.json",
        "contractAddress": "0xF0cd9981F15695324763A06869d1c1DD90073C2A",
        "templateContracts": []
      },
      {
        "contractName": "UniSwapRemoveLiquityGeneral_v1",
        "contractAbi": "tests/lib/zapper/abis/UniSwapRemoveLiquityGeneral_v1.json",
        "contractAddress": "0x4316e3aD83ca2Cf0ea5e3b25e3DE2fA7F93cfE9c",
        "templateContracts": []
      },
      {
        "contractName": "UniSwapAddLiquityV2_General",
        "contractAbi": "tests/lib/zapper/abis/UniSwapAddLiquityV2_General.json",
        "contractAddress": "0x606563f8DC27F316b77F22d14D9Cd025B4F70469",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_Unzap_V1_1",
        "contractAbi": "tests/lib/zapper/abis/Balancer_Unzap_V1_1.json",
        "contractAddress": "0xF2a5d7D059A9ee3c7622218DB491495517fd619B",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapIn_General_V1",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapIn_General_V1.json",
        "contractAddress": "0x85560d8Ee2e714E60645f887Dd4133ee0479B362",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_Unzap_V1_1_1",
        "contractAbi": "tests/lib/zapper/abis/Balancer_Unzap_V1_1.json",
        "contractAddress": "0x35B9Ae15EEb12eA934942a36754192A9Bb219742",
        "templateContracts": []
      },
      {
        "contractName": "UniswapV2_ZapIn",
        "contractAbi": "tests/lib/zapper/abis/UniswapV2_ZapIn.json",
        "contractAddress": "0x026BdaC2F308C0109A864138CCa1a623F7828F4a",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapIn_General_V1_1",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapIn_General_V1.json",
        "contractAddress": "0x727412DB12fED07386235D1474257Dc15302CCE5",
        "templateContracts": []
      },
      {
        "contractName": "Uni_V1_V2_Pipe",
        "contractAbi": "tests/lib/zapper/abis/Uni_V1_V2_Pipe.json",
        "contractAddress": "0x6d313883C6db5EA58BDD5546F403f1fe27e92690",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapIn_General_V2",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapIn_General_V2.json",
        "contractAddress": "0x03E86D24C462fa6aD88568053361186E4A5aF68e",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapOut_General_V2",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapOut_General_V2.json",
        "contractAddress": "0x5CCb8c39bF68612C7997Cbc498ae55908D32d223",
        "templateContracts": []
      },
      {
        "contractName": "Curve_General_ZapOut_V2",
        "contractAbi": "tests/lib/zapper/abis/Curve_General_ZapOut_V2.json",
        "contractAddress": "0x4bF331Aa2BfB0869315fB81a350d109F4839f81b",
        "templateContracts": []
      },
      {
        "contractName": "UniswapV1_ZapOut_General_V2",
        "contractAbi": "tests/lib/zapper/abis/UniswapV1_ZapOut_General_V2.json",
        "contractAddress": "0x5e6531D99e9099CB3936C048dAF6BA0b3F79B9e2",
        "templateContracts": []
      },
      {
        "contractName": "yVault_ZapInOut_General_V1_1",
        "contractAbi": "tests/lib/zapper/abis/yVault_ZapInOut_General_V1_1.json",
        "contractAddress": "0x02e75fE4E8f8531421ee22f4560664685c3f07DE",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapOut_General_V2_2",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapOut_General_V2_2.json",
        "contractAddress": "0x00d0f137b51692D0AC708bdE7b367a373865cFfe",
        "templateContracts": []
      },
      {
        "contractName": "yVault_ZapInOut_General_V1_2",
        "contractAbi": "tests/lib/zapper/abis/yVault_ZapInOut_General_V1_2.json",
        "contractAddress": "0xcAde5569Bd2946db60F23624956d209ae903De4D",
        "templateContracts": []
      },
      {
        "contractName": "yVault_ZapInOut_General_V1_3",
        "contractAbi": "tests/lib/zapper/abis/yVault_ZapInOut_General_V1_3.json",
        "contractAddress": "0xf8C8D0C5547bD213b1DD281a4F61be9a9feED87B",
        "templateContracts": []
      },
      {
        "contractName": "yVault_ZapInOut_General_V1_4",
        "contractAbi": "tests/lib/zapper/abis/yVault_ZapInOut_General_V1_4.json",
        "contractAddress": "0x9c57618bfCDfaE4cE8e49226Ca22A7837DE64A2d",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_ZapIn_General_V2_6",
        "contractAbi": "tests/lib/zapper/abis/Balancer_ZapIn_General_V2_6.json",
        "contractAddress": "0xA3128cC400E2878571368ae0a83F588Eb838552b",
        "templateContracts": []
      },
      {
        "contractName": "Balancer_UniswapV2_Pipe_V1_4",
        "contractAbi": "tests/lib/zapper/abis/Balancer_UniswapV2_Pipe_V1_4.json",
        "contractAddress": "0xA3149708cb9D9BD31CB5c8F5c107D94395B7bA64",
        "templateContracts": []
      },
      {
        "contractName": "Zapper_Swap_General_V1_3",
        "contractAbi": "tests/lib/zapper/abis/Zapper_Swap_General_V1_3.json",
        "contractAddress": "0xacDF47C844Eff0Ecb218D8945e28A9A484aF8D07",
        "templateContracts": []
      },
      {
        "contractName": "UniswapV2_ZapOut_General_V2_1",
        "contractAbi": "tests/lib/zapper/abis/UniswapV2_ZapOut_General_V2_1.json",
        "contractAddress": "0x79B6C6F8634ea477ED725eC23b7b6Fcb41F00E58",
        "templateContracts": []
      },
      {
        "contractName": "UniswapV2_ZapIn_General_V2_4_1",
        "contractAbi": "tests/lib/zapper/abis/UniswapV2_ZapIn_General_V2_4_1.json",
        "contractAddress": "0x0286Ab4C526C0F28EC31dBb08755C999f441A58F",
        "templateContracts": []
      },
      {
        "contractName": "Curve_ZapIn_General_V1_9",
        "contractAbi": "tests/lib/zapper/abis/Curve_ZapIn_General_V1_9.json",
        "contractAddress": "0xcCdd1f20Fd50DD63849A87994bdD11806e4363De",
        "templateContracts": []
      },
      {
        "contractName": "Unipool_Bridge_Zap_V1",
        "contractAbi": "tests/lib/zapper/abis/Unipool_Bridge_Zap_V1.json",
        "contractAddress": "0xaecCd58001D52B4b931FD6FD5bF87D4F911100B7",
        "templateContracts": []
      },
      {
        "contractName": "AdminUpgradeabilityProxy",
        "contractAbi": "tests/lib/zapper/abis/AdminUpgradeabilityProxy.json",
        "contractAddress": "0x97402249515994Cc0D22092D3375033Ad0ea438A",
        "templateContracts": []
      }
    ],
    "indexEvents": true
  })