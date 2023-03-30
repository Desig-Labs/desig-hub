/// <reference types="react-scripts" />

declare module '*.md' {
  const value: string
  export default value
}

interface Window {
  ethereum: any
  desig: any
}

type Theme = 'light' | 'dark'
