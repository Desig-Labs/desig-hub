import * as ed from '@noble/ed25519'

export type RequestBodyAuth = {
  data: string
  signature: number[]
  publicKey: number[]
  authentication: {
    data: string
    // {
    //   func_name: string
    //   time: string
    //   signature: number[]
    // }
    auth_signature: number[]
  }
}

function toUTF8Array(str: any): any {
  let utf8 = []
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i)
    // @ts-ignore
    if (charcode < 0x80) utf8.push(charcode)
    else if (charcode < 0x800) {
      // @ts-ignore
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        // @ts-ignore
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f),
      )
    }
    // surrogate pair
    else {
      i++
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      utf8.push(
        // @ts-ignore
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f),
      )
    }
  }
  return utf8
}

export function convertStringToU8Array(data: string) {
  return Uint8Array.from(toUTF8Array(data))
}

export const signMessage = async (data: Object, privateKey: string) => {
  const dataStr = JSON.stringify(data)
  const bufData = convertStringToU8Array(dataStr)
  const bufPriv = Buffer.from(privateKey, 'hex')
  const signature = await ed.sign(bufData, bufPriv)
  const publicKey = await ed.getPublicKey(Buffer.from(privateKey, 'hex'))
  return {
    data: dataStr,
    signature: Array.from(signature),
    publicKey: Array.from(publicKey),
  }
}

export const addSignedAuthority = async (
  func_name: string,
  signedData: Awaited<ReturnType<typeof signMessage>>,
  privateKey: string,
): Promise<RequestBodyAuth> => {
  const time = new Date().toISOString()
  const authData = {
    time,
    func_name,
    signature: signedData.signature,
  }
  const signedAuth = await signMessage(authData, privateKey)
  return {
    ...signedData,
    authentication: {
      data: signedAuth.data,
      auth_signature: signedAuth.signature,
    },
  }
}
