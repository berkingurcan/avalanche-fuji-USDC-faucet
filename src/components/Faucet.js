import usdc from '../USDC.json'
import { ethers, BigNumber } from "ethers"
import { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'

const contractAddress = usdc.contractAddress
const contractABI = usdc.abi

const Faucet = () => {
    const [mintAddress, setMintAddress] = useState()
    const [mintAmount, setMintAmount] = useState()
    const provider = useRef()
    const Contract = useRef()
    const signer = useRef() 
    const contractWithSigner = useRef()

    useEffect(() => {
        (async function (){
            if(window.ethereum) {
                provider.current = new ethers.providers.Web3Provider(window.ethereum)
                Contract.current = new ethers.Contract(contractAddress, contractABI, provider.current)
                await provider.current.send("eth_requestAccounts", []);
                signer.current = provider.current.getSigner()
                contractWithSigner.current = Contract.current.connect(signer.current)
            }
        })()
    }, [])

    const contractAddress = usdc.contractAddress
    const contractABI = usdc.abi

    async function connectToMetamask(){
        await provider.current.send("eth_requestAccounts", []);
        signer.current = provider.current.getSigner()
        contractWithSigner.current = Contract.current.connect(signer.current)
    }

    async function mintUSDC() {
        await contractWithSigner.current.mint(ethers.utils.getAddress(mintAddress), ethers.utils.parseUnits(mintAmount, "ether"))
        console.log(await Contract.current.symbol(), mintAmount*10**18)
    }

    return (
        <div>
            <Button onClick={connectToMetamask} variant='contained'>Connect</Button>
            <br />
            <br />

            <div><TextField onChange={ (e) => {setMintAddress((e.target.value))}} label="Mint address" color="secondary" focused /></div>
            <br />
            <div><TextField onChange={ (e) => {setMintAmount(e.target.value)}} label="Mint Amount" color="secondary" focused /></div>
            <br />
            <div><Button onClick={mintUSDC} variant='contained'>MINT</Button></div>
        </div>
    )
}

export default Faucet
