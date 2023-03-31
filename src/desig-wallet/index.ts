import * as ed from '@noble/ed25519'
import { encodeMessage } from 'utils'

export type DesigerKeypair = { priKey: string; pubKey: string }

export class Desiger {
  setDesiger = async (priKey: string) => {
    const public_key = await ed.getPublicKey(ed.utils.hexToBytes(priKey))
    const pubKey = ed.utils.bytesToHex(public_key)
    localStorage.setItem(`DESIGER_KEYS:${pubKey}`, priKey)
    localStorage.setItem(`DESIGER_SESSION`, pubKey)
  }

  private getDesiger = async (): Promise<DesigerKeypair> => {
    const pubKey = await this.getDesigerAddress()
    if (!pubKey) throw new Error('Invalid session')

    const priKey = localStorage.getItem(`DESIGER_KEYS:${pubKey}`)
    if (!priKey) throw new Error('Invalid priKey')
    return { pubKey, priKey }
  }

  getDesigerAddress = async (): Promise<string | null> => {
    const desiger = localStorage.getItem(`DESIGER_SESSION`)
    return desiger
  }

  connect = async () => {
    // Check installed
    const address = await this.getDesigerAddress()
    if (!address) throw new Error('Invalid session')
    // Confirm
    const confirmed = window.confirm('DESIG::CONNECT_WALLET')
    if (!confirmed) throw new Error('User rejects!')
    return address
  }

  signMessage = async (message: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = await confirm('DESIG::SIGN_MSG: ' + message)
    if (!confirmed) throw new Error('User reject!')

    const desiger = await this.getDesiger()
    const buff = encodeMessage(message)
    const signature = await ed.sign(buff, desiger.priKey)
    return signature
  }
}

export const DESIGER = new Desiger()
