from beaker.client import ApplicationClient
from algosdk.atomic_transaction_composer import AccountTransactionSigner
from pyteal import *
from app import app
from algosdk.v2client import algod
from algosdk import account, mnemonic

ALGOD_URL = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""  # not needed for algonode
MNEMONIC = "invite obscure decide soft dumb wild evoke moment lock stock helmet mixture local this range forest female enforce valley belt current upper matrix abstract veteran"

def main():
    client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)
    private_key = mnemonic.to_private_key(MNEMONIC)
    sender = account.address_from_private_key(private_key)

    app_client = ApplicationClient(
    client=client,
    app=app,
    sender=sender,
    signer=AccountTransactionSigner(private_key)
)
    app_id, app_addr, _ = app_client.create()
    print("✅ Contract deployed successfully!")
    print("App ID:", app_id)
    print("App Address:", app_addr)

if __name__ == "__main__":
    main()