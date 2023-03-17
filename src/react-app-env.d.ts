/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_URL: string;
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_GOOGLE_KEY: string;
  }
}
