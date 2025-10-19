import { PeraWalletConnect } from '@perawallet/connect'
export const pera = new PeraWalletConnect()

export async function connectWallet(setAccounts) {
  try {
    const newAccounts = await pera.connect()
    setAccounts(newAccounts)
    pera.connector?.on('disconnect', () => setAccounts([]))
  } catch (e) {
    if (e?.data?.type !== 'CONNECT_MODAL_CLOSED') throw e
  }
}

export function reconnectWallet(setAccounts) {
  pera.reconnectSession().then((accounts) => {
    if (accounts.length) {
      setAccounts(accounts)
      pera.connector?.on('disconnect', () => setAccounts([]))
    }
  })
}

export async function signAndSend(txn) {
  // Demo mode - simulate signing and sending
  if (txn.type === 'demo') {
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate signing delay
    return `DEMO_TX_${Math.random().toString(36).substr(2, 9)}`
  }
  
  const txGroup = [{ txn }]
  const signed = await pera.signTransaction([txGroup])
  const blob = signed[0]
  const txId = txn.txID().toString()
  await fetch('https://testnet-api.algonode.cloud/v2/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-binary' },
    body: blob,
  })
  return txId
}
