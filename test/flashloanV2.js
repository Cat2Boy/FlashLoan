const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    let Token, token, owner, addr1 , addr2;

    it("Deployment should assign the total supply of tokens to the owner", async function() {
        const signer = (await ethers.getSigners())[7];
        console.log("signer===", signer.address);


        const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
        const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
        const Curvepool = '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46';
        const Uniswappool = '0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36';

        // 1、部署合约
        const flash = await ethers.getContractFactory("SimpleArbiV2",signer);

        const instance = await flash.deploy( {gasLimit: 3e7});
 


        // 2、向合约中转入10eth
        const tx = {
            to: instance.address,
            value: ethers.utils.parseEther("10")
        }

        const receipt = await signer.sendTransaction(tx);
        await receipt.wait()
        console.log("转账交易完成~~~~~~~~~~~~~~~~");


        
        // 3、转5个成为WETH
        instance.ETHtoWETH(ethers.utils.parseEther("5"));

        let wethbal = await instance.getTokenBalance(WETH,instance.address);

        let wethBlance = ethers.utils.formatEther(wethbal);

        console.log("wethBlance====",wethBlance);

//      必须开锁才能交易
        instance.setLock(false);


    //  CURVE
        // 4、把合约锁打开,通过Curve把1个WETH兑换为USDT:

        instance.SwapBase(Curvepool, 2, ethers.utils.parseEther("1"), 2,0, WETH, USDT);

        // 5、检查一下合约中的USDT数量

        let usdtBal = await instance.getTokenBalance(USDT, instance.address);

        console.log("CURVE 交易后的usdtBal===========",usdtBal);
        wethbal = await instance.getTokenBalance(WETH,instance.address);

        wethBlance = ethers.utils.formatEther(wethbal);
        console.log("CURVE 交易后的wethBal===========",wethBlance);


        // 6、再把USDT全部换回WETH:

        instance.SwapBase(Curvepool,2,usdtBal, 0, 2,USDT,WETH);

        wethbal = await instance.getTokenBalance(WETH,instance.address);

        wethBlance = ethers.utils.formatEther(wethbal);

        console.log("再把USDT全部换回WETH后的余额====",wethBlance);



    // UniswapV3
        
        // 7、把合约锁打开,通过UniswapV3把1个WETH兑换为USDT
        instance.SwapBase(Uniswappool, 1, ethers.utils.parseEther("1"), 0,0, WETH, USDT);


        usdtBal = await instance.getTokenBalance(USDT, instance.address);

        console.log("UniswapV3 交易后的usdtBal===========",usdtBal);
        wethbal = await instance.getTokenBalance(WETH,instance.address);

        wethBlance = ethers.utils.formatEther(wethbal);
        console.log("UniswapV3 交易后的wethBal===========",wethBlance);

        // 8.再把USDT全部换回WETH:

        instance.SwapBase(Uniswappool,1,usdtBal, 0, 0,USDT,WETH);

        usdtBal = await instance.getTokenBalance(USDT, instance.address);

        console.log("UniswapV3 再次交易后的usdtBal===========",usdtBal);
        wethbal = await instance.getTokenBalance(WETH,instance.address);

        wethBlance = ethers.utils.formatEther(wethbal);
        console.log("UniswapV3 再次交易后的wethBal===========",wethBlance);        


        

        
        
        // const result = await instance.flashLoan(WETH,ethers.utils.parseUnits("5", "gwei"));

        // console.log(result)
        

        // const ownerBalance = await hardhatToken.balanceOf(owner.getAddress());
        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});
