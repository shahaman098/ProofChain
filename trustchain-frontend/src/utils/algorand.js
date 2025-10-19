import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

// Configure Algorand client (TestNet)
const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");

// Pera Wallet instance
export const peraWallet = new PeraWalletConnect();

// Your deployed smart contract App ID
export const APP_ID = 748001402;

// Create a helper function to call the smart contract
export async function submitReport(sender, reportText) {
  const suggestedParams = await algodClient.getTransactionParams().do();

  // Encode strings to Uint8Array for application args
  const encoder = new TextEncoder();
  const appArgs = [
    encoder.encode("submit_report"),
    encoder.encode(reportText),
    encoder.encode(sender) // Add reporter address as argument
  ];

  // Add box references for storage
  const boxes = [
    { appIndex: APP_ID, name: encoder.encode(reportText) }
  ];

  const txn = algosdk.makeApplicationNoOpTxn(
    sender, 
    suggestedParams, 
    APP_ID, 
    appArgs,
    undefined, // accounts
    undefined, // foreign apps
    undefined, // foreign assets
    undefined, // note
    undefined, // lease
    undefined, // rekey to
    boxes // box references
  );

  return txn;
}
