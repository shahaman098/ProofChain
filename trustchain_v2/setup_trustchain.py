#!/usr/bin/env python3
"""
TrustChain Deployment Helper
Deploys the smart contract and automatically updates the frontend configuration.
"""

import subprocess
import re
import os
import sys
from pathlib import Path

def deploy_contract():
    """Deploy the TrustChain smart contract and return the App ID."""
    try:
        print("🚀 Deploying TrustChain smart contract...")
        result = subprocess.run(
            [sys.executable, "deploy.py"], 
            capture_output=True, 
            text=True, 
            cwd=Path(__file__).parent
        )
        
        if result.returncode != 0:
            print(f"❌ Deployment failed: {result.stderr}")
            return None
        
        output = result.stdout
        print(output)
        
        # Extract App ID from output
        app_id_match = re.search(r"App ID:\s*(\d+)", output)
        if app_id_match:
            app_id = app_id_match.group(1)
            print(f"✅ Contract deployed successfully with App ID: {app_id}")
            return app_id
        else:
            print("❌ Could not extract App ID from deployment output")
            return None
            
    except Exception as e:
        print(f"❌ Deployment error: {e}")
        return None

def update_frontend_config(app_id):
    """Update the frontend configuration with the new App ID."""
    try:
        frontend_dir = Path(__file__).parent / "trustchain-witness-main"
        algorand_config = frontend_dir / "src" / "lib" / "algorand.ts"
        
        if not algorand_config.exists():
            print(f"❌ Frontend config file not found: {algorand_config}")
            return False
        
        # Read current config
        with open(algorand_config, 'r') as f:
            content = f.read()
        
        # Update App ID
        updated_content = re.sub(
            r"export const APP_ID = \d+;",
            f"export const APP_ID = {app_id};",
            content
        )
        
        # Write updated config
        with open(algorand_config, 'w') as f:
            f.write(updated_content)
        
        print(f"✅ Frontend configuration updated with App ID: {app_id}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to update frontend config: {e}")
        return False

def start_frontend():
    """Start the frontend development server."""
    try:
        frontend_dir = Path(__file__).parent / "trustchain-witness-main"
        
        print("📦 Installing frontend dependencies...")
        subprocess.run(["npm", "install"], cwd=frontend_dir, check=True)
        
        print("🌐 Starting frontend development server...")
        print("Frontend will be available at: http://localhost:8080")
        
        # Start dev server in background
        subprocess.Popen(["npm", "run", "dev"], cwd=frontend_dir)
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return False

def main():
    """Main deployment and setup flow."""
    print("🛡️  TrustChain Deployment & Setup")
    print("=" * 40)
    
    # Deploy smart contract
    app_id = deploy_contract()
    if not app_id:
        print("❌ Deployment failed. Please check your configuration and try again.")
        return
    
    # Update frontend configuration
    if not update_frontend_config(app_id):
        print("❌ Failed to update frontend configuration.")
        return
    
    # Start frontend
    if start_frontend():
        print("\n🎉 Setup complete!")
        print(f"📱 Smart Contract App ID: {app_id}")
        print("🌐 Frontend: http://localhost:8080")
        print("\n📋 Next steps:")
        print("1. Install Pera Wallet mobile app or browser extension")
        print("2. Add TestNet funds to your wallet")
        print("3. Visit http://localhost:8080 to use TrustChain")
        print("\n💡 To configure IPFS evidence uploads:")
        print("1. Sign up at https://pinata.cloud")
        print("2. Update API keys in trustchain-witness-main/src/lib/ipfs.ts")
    else:
        print("❌ Failed to start frontend.")

if __name__ == "__main__":
    main()
