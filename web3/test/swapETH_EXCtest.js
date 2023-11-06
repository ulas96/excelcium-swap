const hre = require("hardhat");

const swapAddr = "0x9A4AceefF7A3A1FF506dAdd5Bfed2D33a19c93d8"; // previous: "0x811DAfdc01C05277e70f887Eb499AB2f4Ba9501a"
const swapName = "ExcelciumSwap";

const tokenAddr = "0x9e6969254D73Eda498375B079D8bE540FB42fea7"; // previous: "0x696653050c71C252254696D154E0318D06376AB3"
const tokenName = "Excelcium";

const personalAddress = "0x002C65Be429d430DF090f2DC847df3b468676029";
async function main() {

    const swap = await hre.ethers.getContractAt(swapName, swapAddr);

    const token = await hre.ethers.getContractAt(tokenName, tokenAddr);


    const startBalanceETH = await hre.ethers.provider.getBalance(personalAddress);
    const startBalanceEXC = await token.balanceOf(personalAddress);


    console.log(`ETH Balance: ${startBalanceETH}`);
    console.log(`EXC Balance: ${startBalanceEXC}`);

    const swapTransaction = await swap.swapETHtoEXC(1, {value: 1});
    await swapTransaction.wait();

    console.log("Swapped");

    const endBalanceETH = await hre.ethers.provider.getBalance(personalAddress);
    const endBalanceEXC = await token.balanceOf(personalAddress);


    console.log(`ETH Balance: ${endBalanceETH}`);
    console.log(`EXC Balance: ${endBalanceEXC}`);

    const ethBalanceChange = startBalanceETH - endBalanceETH;
    const excBalanceChange = endBalanceEXC - startBalanceEXC;

    console.log(ethBalanceChange);
    console.log(excBalanceChange);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });