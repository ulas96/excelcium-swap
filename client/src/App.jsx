import { useState, useEffect } from 'react';
import { ethers } from "ethers";


import contract from "./contract/ExcelciumSwap.json";
import './App.css';


function App() {
    const { abi: ABI } = contract;
    const [account, setAccount] = useState("None");
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
        account: null
    });
    const [_account] = account;
    const [claimAmount, setClaimAmount] = useState(0);
    const [claimedRewards, setClaimedRewards] = useState(0)

    useEffect(() => {
        const connectWallet = async () => {
            const contractAddress = "0x3853B8fc287C90970ca5fa9d6A7599422C4BAF48"; // previous: "0xAa84c17C94E8242122200f2532725bC45b572694"
            const contractABI = ABI;
            try{
                const { ethereum } = window;
                console.log(ethereum);
                if (ethereum) {
                    const _account = await ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();

                    const contract = new ethers.Contract(contractAddress, contractABI ,signer);
                    setAccount(_account);
                    setState({provider: provider, signer: signer, contract: contract});
                }

            } catch(e) {
                console.log(e);
            }

        };
        connectWallet();
    }, []);








    useEffect(() => {
        getClaimedRewards();
        console.log(claimedRewards);
    })

    const handleChange = (e) => {
        setClaimAmount(e.target.value);
    }

    const getAllowClaim = async () => {
        const value = await state.contract.getClaimableRewards(_account);

        setClaimAmount(value)
    }

    const claimRewards = async () => {
        await state.contract.claimRewards(claimAmount);
    }

    const getClaimedRewards = async () => {
        const value = await state.contract.getClaimedRewards(_account);
        console.log(value);
        setClaimedRewards(parseInt(value._hex));
    }


    return (
        <div className="swap-container">
            <div className="swap">

                <p className="swap-text">Enter amount:</p>

                <div className="swap-value">
                    <input value={claimAmount} onChange={handleChange}/>
                    <p  className="currency">sETH</p>
                    <p className="max" onClick={getAllowClaim}>MAX</p>
                </div>

                <button className="swap-button" onClick={claimRewards}>Claim</button>
            </div>
        </div>
    );

}

export default App;
