import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';
import { Buffer } from 'buffer';

// Algorand TestNet configuration
export const APP_ID = 748001402;
export const ALGOD_TOKEN = '';
export const ALGOD_SERVER = 'https://testnet-api.algonode.cloud';
export const ALGOD_PORT = '';

// Initialize Pera Wallet
export const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
});

// Initialize Algorand client for TestNet
export const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

// Helper: compute SHA-256 hex string of metadata to use as report key (64 bytes max for box name)
async function computeReportKey(metadata: string): Promise<string> {
  const enc = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(metadata));
  const bytes = new Uint8Array(digest);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(''); // 64 hex chars
}

// Submit a report to the smart contract using ABI (submit_report(address,string)) and Box reference
export async function submitReport(
  message: string,
  accountAddress: string,
  isAnonymous: boolean = false,
  policeRef?: string,
  ipfsCid?: string,
  incidentDate?: Date
): Promise<string> {
  try {
    // Build metadata for hashing (off-chain context only)
    let metadata = message.trim();
    if (incidentDate) metadata += `\n[DATE:${incidentDate.toISOString()}]`;
    if (policeRef) metadata += `\n[POLICE_REF:${policeRef}]`;
    if (ipfsCid) metadata += `\n[EVIDENCE:${ipfsCid}]`;
    if (isAnonymous) metadata += `\n[ANONYMOUS:true]`;

    const reportKey = await computeReportKey(metadata); // 64-char hex string

    // Suggested params
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Include return type in signature for correct selector
    const method = algosdk.ABIMethod.fromSignature('submit_report(address,string)uint64');
    const selector = method.getSelector(); // 4 bytes

    // Encode args according to ABI
    const encAddr = algosdk.ABIType.from('address').encode(accountAddress);
    const encStr = algosdk.ABIType.from('string').encode(reportKey);

    const appArgs = [selector, encAddr, encStr];

    // Box reference must be EXACTLY the box name bytes (not ABI-encoded string)
    const boxName = new Uint8Array(Buffer.from(reportKey));

    // Create the application call txn
    const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: accountAddress,
      suggestedParams,
      appIndex: APP_ID,
      appArgs,
      boxes: [{ appIndex: APP_ID, name: boxName }],
    });

    // Prepare for wallet signing with Transaction objects
    const toSign = [{ txn: appCallTxn, signers: [accountAddress] }];

    // Request signature from Pera Wallet
    const signedTxnGroups = await peraWallet.signTransaction([toSign]);
    const signedBlobs = signedTxnGroups.flat();

    // Send transaction(s)
    const response = await algodClient.sendRawTransaction(signedBlobs).do();
    const txId = response.txid;

    await algosdk.waitForConfirmation(algodClient, txId, 4);
    return txId;
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error instanceof Error ? error : new Error('Failed to submit report');
  }
}

// Disconnect wallet
export async function disconnectWallet() {
  await peraWallet.disconnect();
}
