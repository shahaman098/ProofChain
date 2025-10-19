# IPFS Evidence Storage Setup Guide

TrustChain uses IPFS (InterPlanetary File System) to store evidence files in a decentralized, tamper-proof manner.

## Option 1: Pinata (Recommended)

Pinata is the easiest way to upload files to IPFS with a generous free tier.

### Steps:

1. **Sign up for Pinata** (free):
   - Visit https://pinata.cloud
   - Create a free account

2. **Generate API Keys**:
   - Go to your Pinata dashboard
   - Click "API Keys" in the sidebar
   - Click "New Key"
   - Enable "pinFileToIPFS" permission
   - Give it a name (e.g., "TrustChain")
   - Copy the **API Key** and **API Secret**

3. **Add Keys to TrustChain**:
   - Open `src/lib/ipfs.ts`
   - Replace the placeholder values:
     ```typescript
     export const PINATA_API_KEY = 'your_actual_api_key_here';
     export const PINATA_SECRET_KEY = 'your_actual_secret_key_here';
     ```

4. **Test the Integration**:
   - Run the app: `npm run dev`
   - Connect your wallet
   - Submit a report with a file attached
   - You should see the file upload to IPFS and get a CID

### Free Tier Limits:
- 1 GB storage
- 100 GB bandwidth per month
- Unlimited pins

---

## Option 2: Web3.Storage

Web3.Storage offers completely free IPFS storage backed by Filecoin.

### Steps:

1. **Sign up for Web3.Storage**:
   - Visit https://web3.storage
   - Create a free account with your email

2. **Generate API Token**:
   - Go to your account page
   - Click "Create API Token"
   - Copy the token

3. **Install Web3.Storage SDK**:
   ```bash
   npm install web3.storage
   ```

4. **Update `src/lib/ipfs.ts`**:
   ```typescript
   import { Web3Storage } from 'web3.storage';

   const client = new Web3Storage({ 
     token: 'your_web3_storage_token_here' 
   });

   export async function uploadToIPFS(file: File): Promise<string> {
     const cid = await client.put([file], {
       name: `trustchain-evidence-${Date.now()}`,
       wrapWithDirectory: false,
     });
     return cid;
   }

   export function getIPFSUrl(cid: string): string {
     return `https://${cid}.ipfs.w3s.link/`;
   }
   ```

---

## Option 3: NFT.Storage

Another free option specifically designed for NFTs but works for any files.

### Steps:

1. Visit https://nft.storage
2. Create account and get API key
3. Similar integration to Web3.Storage

---

## Security Considerations

### ⚠️ API Keys in Frontend

**Important**: Storing API keys directly in frontend code exposes them to users.

**Current Setup (Simple)**: Keys are in `src/lib/ipfs.ts`
- ✅ Quick to set up for development
- ✅ Works for hackathons and demos
- ❌ Keys are visible in browser
- ❌ Anyone can use your upload quota

**Production Setup (Recommended)**:
1. **Enable Lovable Cloud** for backend functions
2. Move IPFS upload logic to an Edge Function
3. Store API keys as environment secrets
4. Frontend calls your Edge Function instead of Pinata directly

### Migration to Backend (Future):

```typescript
// Frontend: src/components/ReportForm.tsx
const uploadResponse = await fetch('/api/upload-evidence', {
  method: 'POST',
  body: formData,
});
const { cid } = await uploadResponse.json();

// Backend: supabase/functions/upload-evidence/index.ts
const PINATA_API_KEY = Deno.env.get('PINATA_API_KEY');
// Upload to IPFS server-side
```

---

## Testing Without IPFS

If you don't want to set up IPFS immediately, you can:

1. **Mock the upload**:
   ```typescript
   export async function uploadToIPFS(file: File): Promise<string> {
     console.log('Mock upload:', file.name);
     return `mock-cid-${Date.now()}`;
   }
   ```

2. **Skip evidence upload**: Just submit reports without files

---

## Viewing Uploaded Files

Once a file is uploaded, it can be accessed via:

- **Pinata Gateway**: `https://gateway.pinata.cloud/ipfs/[CID]`
- **Public IPFS Gateway**: `https://ipfs.io/ipfs/[CID]`
- **Cloudflare Gateway**: `https://cloudflare-ipfs.com/ipfs/[CID]`

Example:
```
https://gateway.pinata.cloud/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
```

---

## Troubleshooting

### "Failed to upload evidence to IPFS"
- Check your API keys are correct
- Verify file size is under 10MB
- Check Pinata dashboard for error logs
- Ensure you have quota remaining

### CORS Errors
- Pinata's API supports CORS for frontend uploads
- If using a different service, you may need a backend proxy

### File Not Found on Gateway
- IPFS propagation can take 1-2 minutes
- Try different gateways
- Check Pinata dashboard to verify pin was created

---

## Free Tier Recommendations

For a hackathon or small-scale deployment:

| Service | Storage | Bandwidth | Best For |
|---------|---------|-----------|----------|
| **Pinata** | 1 GB | 100 GB/mo | Quick setup, reliable |
| **Web3.Storage** | Unlimited | Unlimited | Long-term free storage |
| **NFT.Storage** | Unlimited | Unlimited | NFT-focused apps |

**Recommendation**: Start with **Pinata** for its simplicity and generous free tier.

---

## Next Steps

1. Choose an IPFS provider
2. Get your API keys
3. Update `src/lib/ipfs.ts` with your credentials
4. Test file upload in the app
5. (Optional) Move to backend for production

For production apps, consider enabling **Lovable Cloud** to securely store IPFS API keys and handle uploads server-side.
