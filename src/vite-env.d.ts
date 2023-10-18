/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly UNSPLASH_CLIENT_ID_ACCESS_KEY: string;
  readonly VITE_UNSPLASH_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
