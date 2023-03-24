import { useCallback, useEffect } from 'react'
import * as ed from '@noble/ed25519'
import { create } from 'zustand'

import useProfile from './useProfile'

const STORAGE_ID = 'DESIG:USER_KEY'

type UserKeyState = {
  priKey: string | null
  pubKey: string | null
  setUserKey: (state: Partial<UserKeyState>) => void
}
const useUserKeyStore = create<UserKeyState>((set) => ({
  priKey: null,
  pubKey: null,
  setUserKey: (payload) => set((state) => ({ ...state, ...payload })),
}))

const useUserKey = () => {
  const { priKey, pubKey, setUserKey } = useUserKeyStore()
  const { profile } = useProfile()

  useEffect(() => {
    setUserKey({ pubKey: profile?.public_key })
  }, [profile?.public_key, setUserKey])

  const loadPriFromPub = useCallback(async () => {
    if (!pubKey) return setUserKey({ priKey: null })
    const priKeyData = localStorage.getItem(`${STORAGE_ID}:${pubKey}`)
    return setUserKey({ priKey: priKeyData })
  }, [pubKey, setUserKey])
  useEffect(() => {
    loadPriFromPub()
  }, [loadPriFromPub])

  const backupPrivateKey = useCallback(
    async (privateKey: Uint8Array) => {
      const publicKey = await ed.getPublicKey(privateKey)
      const pubKeyData = Buffer.from(publicKey).toString('hex')
      const priKeyData = Buffer.from(privateKey).toString('hex')
      localStorage.setItem(`${STORAGE_ID}:${pubKeyData}`, priKeyData)
      setUserKey({ priKey: priKeyData, pubKey: pubKeyData })
      return { priKey: priKeyData, pubKey: pubKeyData }
    },
    [setUserKey],
  )

  return { priKey, pubKey, loadPriFromPub, backupPrivateKey }
}

export default useUserKey
