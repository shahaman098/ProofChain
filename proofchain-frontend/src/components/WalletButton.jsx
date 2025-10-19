import { useEffect } from 'react'
import { connectWallet, reconnectWallet } from '../lib/wallet.js'

export default function WalletButton({ accounts, setAccounts }) {
  useEffect(() => { reconnectWallet(setAccounts) }, [setAccounts])
  const short = a => `${a.slice(0,4)}…${a.slice(-4)}`

  return accounts?.length ? (
    <button className="btn">Connected: {short(accounts[0])}</button>
  ) : (
    <button className="btn primary" onClick={() => connectWallet(setAccounts)}>
      Connect Pera Wallet
    </button>
  )
}
