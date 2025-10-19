/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALGORAND_APP_ID: string
  readonly VITE_ALGORAND_NETWORK: string
  readonly VITE_ALGOD_SERVER: string
  readonly VITE_PINATA_API_KEY: string
  readonly VITE_PINATA_SECRET_KEY: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_ENDPOINTS_REPORTS: string
  readonly VITE_API_ENDPOINTS_ANALYTICS: string
  readonly VITE_API_ENDPOINTS_SEARCH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
