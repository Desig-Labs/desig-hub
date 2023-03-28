import { useCallback } from 'react'
import { create } from 'zustand'

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

export const useUserKey = () => {
  const { priKey, pubKey, setUserKey } = useUserKeyStore()

  const get = useCallback(
    async (pubKey: string) => {
      const priKeyData = localStorage.getItem(`${STORAGE_ID}:${pubKey}`)
      return setUserKey({ pubKey, priKey: priKeyData })
    },
    [setUserKey],
  )

  const set = useCallback(
    async ({ pubKey, privKey }: { pubKey: string; privKey: string }) => {
      localStorage.setItem(`${STORAGE_ID}:${pubKey}`, privKey)
      setUserKey({ pubKey: pubKey, priKey: privKey })
    },
    [setUserKey],
  )

  return { priKey, pubKey, set, get }
}
