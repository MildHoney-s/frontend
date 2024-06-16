/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_VERSION: string
  // declare other env variables here as needed
  // e.g., readonly VITE_API_BASE_URL: string;
  // Add other environment variables you expect to use.
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
