/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DB_URL: string;
    // Define other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  