/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_MAPTILER_KEY?: string;
  readonly VITE_MAP_INTERACTION_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
