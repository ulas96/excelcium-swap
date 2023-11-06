const hre = require("hardhat");

const swapAddr = "0x9A4AceefF7A3A1FF506dAdd5Bfed2D33a19c93d8";
const swapName = "ExcelciumSwap";

const tokenAddr = "0x9e6969254D73Eda498375B079D8bE540FB42fea7";
const tokenName = "Excelcium";

const personalAddress = "0x002C65Be429d430DF090f2DC847df3b468676029";
async function main() {

    const swap = await hre.ethers.getContractAt(swapName, swapAddr);

    const token = await hre.ethers.getContractAt(tokenName, tokenAddr);

    const startEXC = await token.balanceOf(swapAddr);

    console.log(startEXC);

    const approveTx = await token.approve(swapAddr, 100000);
    await approveTx.wait();

    console.log("Approved");

    const transferTx = await swap.receiveEXC(100000);
    await transferTx.wait();

    console.log("Transfered");

    const endEXC = await token.balanceOf(swapAddr);
    console.log(endEXC);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });