const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    let Token, token, owner, addr1 , addr2;

    it("Deployment should assign the total supply of tokens to the owner", async function() {
        const signer = (await ethers.getSigners())[7];
        console.log("signer===", signer.address);

        const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';


        const flash = await ethers.getContractFactory("SimpleArbiV1",signer);

        const instance = await flash.deploy( {gasLimit: 3e7});
        
        // console.log("~~~~~~~~",instance);
        const contractAddr = await instance.address;
        console.log("contractAddr===",contractAddr);

        const tx = {
            to: contractAddr,
            value: ethers.utils.parseEther("10")
        }

        const receipt = await signer.sendTransaction(tx);
        await receipt.wait()
        console.log("转账交易完成~~~~~~~~~~~~~~~~");


        

        instance.ETHtoWETH(ethers.utils.parseEther("5"));

        wethbal = await instance.getTokenBalance(WETH,instance.address);

        wethBlance = ethers.utils.formatEther(wethbal);

        console.log(wethBlance);


        const result = await instance.flashLoan(WETH,ethers.utils.parseUnits("5", "gwei"));

        console.log(result)
        

        // const ownerBalance = await hardhatToken.balanceOf(owner.getAddress());
        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});
