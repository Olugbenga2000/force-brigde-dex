import React,{useEffect, useState} from 'react'
import Dropdown from './Dropdown'
let balance

function Header({
    user,
    tokens,
    contracts,
    selectToken,
    gwoken
}){
    const[toggle, setToggle] = useState(true) 
    const[sudt_balance, setsudt] = useState(undefined) 

    async function updateBalance(){
         balance = await contracts.SUDT.methods.balanceOf(gwoken.address).call({
        from: user.accounts[0]
    })
    console.log(balance)
        setsudt(balance)
    }

    useEffect(()=>{
            updateBalance()
    },
    [])

return(
    <header className = "card">
    <div className="row">
        <div className="col-sm-1 flex">
            <Dropdown 
            items = {tokens.map(token =>({
                label : token.ticker,
                value : token
            }))}
            activeItem = {{
                label : user.selectedToken.ticker,
                value : user.selectedToken}}
            onSelect = {selectToken}/>
        </div>
        <div className = "col-sm-11">
            <h3 className = "header-title">
                Your <span className = "contract-address"> ETH address : <span className="address">
                    {user.accounts[0]}</span><br/>
                    Your Polyjuice address : <span className="address">
                    {gwoken.address}</span>
                    <br/>
                     Nervos layer2 balance : <span className="address">
                    {gwoken.balance} CKB</span><br/>
                     Deployed contract address : <span className="address">
                    {contracts.dex.options.address}</span>
                    <br/>
                     Deployed transaction hash : <span className="address">
                    0x159e3ab237ccf81fc619458deece528a985b6999b531133ef8e4ea6179fcd143</span>
                     </span> <br/> 
                     Layer2 SUDT balance : <span className="address">
                    {sudt_balance} ckETH</span> <button className= "btn btn-dark m-3" onClick ={() => updateBalance()}>Update balance</button><br/>
                     {toggle?<p><button className= "btn btn-dark btn-lg my-3"onClick ={() => setToggle(!toggle)} > Show deposit address</button></p>:
                      <p><button className= "btn btn-dark btn-lg my-3" onClick ={() => setToggle(!toggle)}> Hide deposit address</button>
                     <p>Layer 2 address : {gwoken.depositAddress.addressString}</p>
                     </p> }
                     <a className= "btn btn-dark btn-lg my-3" href = "https://force-bridge-test.ckbapp.dev/bridge/Ethereum/Nervos?xchain-asset=0x0000000000000000000000000000000000000000">use the Force Bridge website</a>
                    <small className = "text-secondary"> input your Layer 2 Deposit Address as the Receiver address in the force bridge website</small>
            </h3>
        </div>
    </div></header>
)}
export default Header