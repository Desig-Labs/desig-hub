/// <reference types="react-scripts" />

declare module '*.md' {
  const value: string
  export default value
}

interface IUID {
  connect(): Promise<Uint8Array>
  authorize(
    message: Uint8Array,
  ): Promise<{ signature: Uint8Array; pubkey: Uint8Array }>
  recovery(share: Uint8Array): Promise<{ pubkey: Uint8Array }>
}

interface Window {
  ethereum: any
  desig: {
    uid: IUID
  }
}

type Theme = 'light' | 'dark'

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
    'model-viewer': any
  }
}
