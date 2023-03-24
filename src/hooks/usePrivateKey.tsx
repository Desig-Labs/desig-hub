import { useCallback, useEffect, useState } from 'react'
import * as ed from '@noble/ed25519'
import useProfile from './useProfile'

const STORAGE_ID = 'DESIG:PRIVATE_KEY'

const usePrivateKey = () => {
  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const { profile } = useProfile()

  const loadPrivateKey = useCallback((publicKey: string) => {
    const data = localStorage.getItem(`${STORAGE_ID}:${publicKey}`)
    return setPrivateKey(data)
  }, [])

  const backupPrivateKey = useCallback(async (privateKey: Uint8Array) => {
    const publicKey = await ed.getPublicKey(privateKey)
    const pubKey = Buffer.from(publicKey).toString('hex')
    const prvKey = Buffer.from(privateKey).toString('hex')
    return localStorage.setItem(`${STORAGE_ID}:${pubKey}`, prvKey)
  }, [])

  useEffect(() => {
    if (profile?.public_key) loadPrivateKey(profile?.public_key)
  }, [loadPrivateKey, profile?.public_key])

  return { privateKey, loadPrivateKey, backupPrivateKey }
}

export default usePrivateKey
