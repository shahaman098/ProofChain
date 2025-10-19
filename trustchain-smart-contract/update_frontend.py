#!/usr/bin/env python3
"""
Update Frontend Configuration Script
Updates the frontend with the deployed smart contract App ID
"""

import json
import os
import sys

def load_deployment_info():
    """Load deployment information"""
    try:
        with open("deployment_info.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ deployment_info.json not found. Deploy the contract first.")
        return None

def update_env_file(file_path, app_id):
    """Update environment file with new App ID"""
    try:
        # Read current content
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                lines = f.readlines()
        else:
            lines = []
        
        # Update or add VITE_ALGORAND_APP_ID
        updated = False
        for i, line in enumerate(lines):
            if line.startswith("VITE_ALGORAND_APP_ID="):
                lines[i] = f"VITE_ALGORAND_APP_ID={app_id}\n"
                updated = True
                break
        
        if not updated:
            lines.append(f"VITE_ALGORAND_APP_ID={app_id}\n")
        
        # Write back to file
        with open(file_path, "w") as f:
            f.writelines(lines)
        
        print(f"✅ Updated {file_path}")
        
    except Exception as e:
        print(f"❌ Failed to update {file_path}: {e}")

def update_algorand_ts(file_path, app_id):
    """Update algorand.ts file with new App ID"""
    try:
        with open(file_path, "r") as f:
            content = f.read()
        
        # Replace the APP_ID line
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'export const APP_ID' in line and 'parseInt' in line:
                lines[i] = f"export const APP_ID = parseInt(import.meta.env.VITE_ALGORAND_APP_ID) || {app_id};"
                break
        
        with open(file_path, "w") as f:
            f.write('\n'.join(lines))
        
        print(f"✅ Updated {file_path}")
        
    except Exception as e:
        print(f"❌ Failed to update {file_path}: {e}")

def update_readme(app_id, tx_id, explorer_link):
    """Update README with deployment information"""
    readme_path = "../README_HACKATHON.md"
    
    try:
        with open(readme_path, "r") as f:
            content = f.read()
        
        # Update placeholders
        content = content.replace("[TO_BE_UPDATED_AFTER_DEPLOYMENT]", str(app_id))
        content = content.replace("[APP_ID]", str(app_id))
        content = content.replace("[SAMPLE_TX_ID]", tx_id)
        content = content.replace("[SAMPLE_STATS_TX_ID]", tx_id)
        
        with open(readme_path, "w") as f:
            f.write(content)
        
        print(f"✅ Updated README_HACKATHON.md with App ID {app_id}")
        
    except Exception as e:
        print(f"❌ Failed to update README: {e}")

def main():
    """Main update function"""
    print("🔄 Updating Frontend with Deployed Smart Contract")
    print("=" * 50)
    
    # Load deployment info
    deployment_info = load_deployment_info()
    if not deployment_info:
        return
    
    app_id = deployment_info['app_id']
    tx_id = deployment_info.get('tx_id', '')
    explorer_link = deployment_info.get('block_explorer_app', '')
    
    print(f"📱 App ID: {app_id}")
    print(f"🔗 Explorer: {explorer_link}")
    
    # Update frontend files
    frontend_paths = [
        "../trustchain-witness-main/.env",
        "../trustchain-witness-main/.env.example",
        "../proofchain-frontend/.env"  # Legacy frontend
    ]
    
    for env_path in frontend_paths:
        if os.path.exists(env_path):
            update_env_file(env_path, app_id)
        else:
            print(f"⚠️  {env_path} not found, skipping")
    
    # Update TypeScript files
    ts_paths = [
        "../trustchain-witness-main/src/lib/algorand.ts",
        "../proofchain-frontend/src/lib/algorand.js"
    ]
    
    for ts_path in ts_paths:
        if os.path.exists(ts_path):
            update_algorand_ts(ts_path, app_id)
        else:
            print(f"⚠️  {ts_path} not found, skipping")
    
    # Update README
    update_readme(app_id, tx_id, explorer_link)
    
    print("\n🎉 Frontend Update Complete!")
    print("=" * 50)
    print(f"✅ Smart Contract App ID: {app_id}")
    print(f"✅ Frontend configured to use new contract")
    print(f"✅ README updated with deployment links")
    print("\n📋 Next Steps:")
    print("1. Restart your frontend development server")
    print("2. Test report submission with new contract")
    print("3. Take UI screenshots for documentation")
    print("4. Create demo videos")
    
    # Display environment setup
    print(f"\n🔧 Environment Configuration:")
    print(f"   VITE_ALGORAND_APP_ID={app_id}")
    print(f"   VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud")
    print(f"   Network: TestNet")

if __name__ == "__main__":
    main()
