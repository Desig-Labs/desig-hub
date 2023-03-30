import * as ed from '@noble/ed25519'

export class DesigWallet {
  private getPrivateKey = async () => {
    const sessionPubkey = localStorage.getItem(`DESIG_SESSION`)
    console.log('sessionPubkey', sessionPubkey)
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
    const confirmed = window.confirm('Please confirm to connect')
    if (!confirmed) throw new Error('User rejects!')

    console.log('2')
    localStorage.setItem(`DESIG_SESSION`, pubKey)
    console.log('3')
    return pubKey
  }

  signMessage = async (message: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = await confirm('Sign message: ' + message)
    if (!confirmed) throw new Error('User reject!')

    const { priKey } = await this.getPrivateKey()
    const signature = await ed.sign(message, priKey)
    return signature
  }
}

export const DESIG_WALLET = new DesigWallet()
