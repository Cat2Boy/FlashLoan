# FlashLoan

本代码是[yueying007大佬 Mirror](https://mirror.xyz/yueying007.eth)闪电贷的hardhat测试版本


# 文档简要说明

- contracts
    - SimpleArbiV1.sol   利用KeepDao进行借贷 操作
    - SimpleArbiV2.sol   在Curve 和 UniswapV3 进行代币兑换操作
    - SimpleArbiV3.sol   令KeepDao借贷后 在Curve和UniswapV3 进行代币兑换并还款 操作



- test
    - flashloanV1.js   SimpleArbiV1.sol
    - flashloanV2.js   SimpleArbiV2.sol
    - flashloanV3.js   SimpleArbiV3.sol



