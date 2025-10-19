import algosdk from 'algosdk'
import { Buffer } from 'buffer'

export const ALGOD_URL = 'https://testnet-api.algonode.cloud'
export const APP_ID = 748001402  // Demo App ID - replace after deployment

// Demo mode for development
export const DEMO_MODE = !APP_ID || APP_ID === 748001402

export function getAlgod() {
  return new algosdk.Algodv2('', ALGOD_URL, '')
}

export async function buildSubmitReportTxn({ sender, message }) {
  if (DEMO_MODE) {
    // Demo mode - simulate transaction building
    return {
      type: 'demo',
      sender,
      message,
      appId: 'DEMO_MODE'
    }
  }
  
  const algod = getAlgod()
  const sp = await algod.getTransactionParams().do()
  const appArgs = [
    new Uint8Array(Buffer.from('submit_report')),
    new Uint8Array(Buffer.from(message)),
  ]
  return algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: APP_ID,
    appArgs,
    suggestedParams: sp,
  })
}

export async function waitForTx(txId) {
  if (DEMO_MODE || txId.startsWith('DEMO_')) {
    // Demo mode - simulate confirmation
    await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay
    return {
      'confirmed-round': Math.floor(Math.random() * 1000000),
      'application-index': 'DEMO_APP_ID'
    }
  }
  
  const algod = getAlgod()
  return await algosdk.waitForConfirmation(algod, txId, 4)
}
