import * as ed from '@noble/ed25519'
import { encodeMessage } from 'utils'

export class DesigWallet {
  private getPrivateKey = async () => {
    const sessionPubkey = localStorage.getItem(`DESIG_SESSION`)
    // Load private key from storage
    if (sessionPubkey) {
      const priv = localStorage.getItem(`WALLET:${sessionPubkey}`)
      console.log('priv', priv)
      if (!!priv) return { priKey: priv, pubKey: sessionPubkey }
    }
    // New private key
    const priKey = ed.utils.randomPrivateKey()
    const public_key = await ed.getPublicKey(priKey)
    const pubKey = ed.utils.bytesToHex(public_key)
    localStorage.setItem(`WALLET:${pubKey}`, ed.utils.bytesToHex(priKey))
    return { priKey: ed.utils.bytesToHex(priKey), pubKey }
  }

  connect = async () => {
    const { pubKey } = await this.getPrivateKey()
    const confirmed = window.confirm('DESIG::CONNECT_WALLET')
    if (!confirmed) throw new Error('User rejects!')

    localStorage.setItem(`DESIG_SESSION`, pubKey)
    return pubKey
  }

  signMessage = async (message: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = await confirm('DESIG::SIGN_MSG: ' + message)
    if (!confirmed) throw new Error('User reject!')

    const buff = encodeMessage(message)
    const { priKey } = await this.getPrivateKey()
    const signature = await ed.sign(buff, priKey)
    return signature
  }
}

export const DESIG_WALLET = new DesigWallet()
