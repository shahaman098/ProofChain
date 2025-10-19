/**
 * IPFS Integration for TrustChain
 * 
 * This module handles file uploads to IPFS using Pinata API.
 * Get your free API key at https://pinata.cloud
 */

// Pinata API Configuration
export const PINATA_API_KEY = 'YOUR_PINATA_API_KEY_HERE';
export const PINATA_SECRET_KEY = 'YOUR_PINATA_SECRET_KEY_HERE';

/**
 * Upload a file to IPFS via Pinata
 * @param file File to upload
 * @returns IPFS CID (Content Identifier)
 */
export async function uploadToIPFS(file: File): Promise<string> {
  try {
    console.log('Uploading file to IPFS via Pinata:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const metadata = JSON.stringify({
      name: `trustchain-evidence-${Date.now()}-${file.name}`,
    });
    formData.append('pinataMetadata', metadata);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    const cid = data.IpfsHash;
    
    console.log('File uploaded to IPFS with CID:', cid);
    return cid;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload evidence to IPFS');
  }
}

/**
 * Get IPFS gateway URL for a CID
 * @param cid IPFS Content Identifier
 * @param filename Optional filename to append
 * @returns Gateway URL
 */
export function getIPFSUrl(cid: string, filename?: string): string {
  // Using public IPFS gateways
  const baseUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
  return filename ? `${baseUrl}/${filename}` : baseUrl;
}

/**
 * Validate file before upload
 * @param file File to validate
 */
export function validateEvidenceFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Please upload PDF, image, or DOCX' };
  }

  return { valid: true };
}
