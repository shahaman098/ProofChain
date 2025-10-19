import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';
import { Buffer } from 'buffer';

// Algorand configuration from environment variables
export const APP_ID = parseInt(import.meta.env.VITE_ALGORAND_APP_ID) || 748001402;
export const ALGOD_TOKEN = '';
export const ALGOD_SERVER = import.meta.env.VITE_ALGOD_SERVER || 'https://testnet-api.algonode.cloud';
export const ALGOD_PORT = '';

// Initialize Pera Wallet
export const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
});

// Initialize Algorand client for TestNet
export const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

// Submit a report to the smart contract with backend integration
export async function submitReport(
  message: string,
  accountAddress: string,
  isAnonymous: boolean = false,
  policeRef?: string,
  ipfsCid?: string,
  incidentDate?: Date
): Promise<{ txId: string; reportData: any }> {
  try {
    // Get suggested transaction parameters
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Build metadata string to include additional information
    let metadata = message;
    if (incidentDate) {
      metadata += `\n[DATE:${incidentDate.toISOString()}]`;
    }
    if (policeRef) {
      metadata += `\n[POLICE_REF:${policeRef}]`;
    }
    if (ipfsCid) {
      metadata += `\n[EVIDENCE:${ipfsCid}]`;
    }
    if (isAnonymous) {
      metadata += `\n[ANONYMOUS:true]`;
    }
    
    // Encode the arguments
    const appArgs = [
      new Uint8Array(Buffer.from("submit_report")),
      new Uint8Array(Buffer.from(metadata))
    ];

    // Create an application NoOp transaction
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: accountAddress,
      suggestedParams: suggestedParams,
      appIndex: APP_ID,
      appArgs: appArgs,
    });

    // Sign the transaction using Pera Wallet
    const singleTxnGroups = [{ txn, signers: [accountAddress] }];
    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);

    // Send the transaction
    const response = await algodClient.sendRawTransaction(signedTxn).do();
    const txId = response.txid;
    
    // Wait for confirmation
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    
    // Prepare data for backend submission
    const reportData = {
      message,
      txId,
      timestamp: Date.now(),
      isAnonymous,
      policeRef,
      ipfsCid,
      incidentDate,
      accountAddress: isAnonymous ? undefined : accountAddress,
    };
    
    return { txId, reportData };
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
}

// Disconnect wallet
export async function disconnectWallet() {
  await peraWallet.disconnect();
}
