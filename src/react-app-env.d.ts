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
  requestCloudShare(): Promise<{ cloudShare: Uint8Array }>
}

interface Window {
  ethereum: any
  desig: {
    uid: IUID
  }
}

type Theme = 'light' | 'dark'
