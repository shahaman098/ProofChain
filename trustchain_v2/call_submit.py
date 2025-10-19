from beaker.client import ApplicationClient
from algosdk.atomic_transaction_composer import AccountTransactionSigner
from algosdk import account, mnemonic
from algosdk.v2client import algod
from app import app, submit_report

ALGOD_URL = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""

MNEMONIC = "invite obscure decide soft dumb wild evoke moment lock stock helmet mixture local this range forest female enforce valley belt current upper matrix abstract veteran"
APP_ID = 748001402  # Your deployed App ID

def main():
    client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)
    private_key = mnemonic.to_private_key(MNEMONIC)
    sender = account.address_from_private_key(private_key)

    app_client = ApplicationClient(
        client=client,
        app=app,
        app_id=APP_ID,
        sender=sender,
        signer=AccountTransactionSigner(private_key)
    )

    # Get app address and fund it for box storage
    from algosdk.logic import get_application_address
    app_address = get_application_address(APP_ID)
    print(f"App address: {app_address}")
    
    # Fund the app account (needed for box storage)
    from algosdk.transaction import PaymentTxn
    funding_amount = 200000  # 0.2 ALGO for box storage
    fund_txn = PaymentTxn(
        sender=sender,
        sp=client.suggested_params(),
        receiver=app_address,
        amt=funding_amount
    )
    signed_fund_txn = fund_txn.sign(private_key)
    fund_result = client.send_transaction(signed_fund_txn)
    print(f"✅ App funded with {funding_amount/1000000} ALGO")
    
    # Wait for funding transaction to confirm
    from algosdk import transaction
    transaction.wait_for_confirmation(client, fund_result)

    # Call the smart contract's function
    report_text = "Example report: vandalism near the mosque."
    result = app_client.call(
        submit_report, 
        reporter=sender,
        report_hash=report_text,
        boxes=[(APP_ID, report_text.encode())]  # Declare box reference
    )
    print("✅ Report submitted successfully!")
    print("Result:", result.return_value)

if __name__ == "__main__":
    main()
