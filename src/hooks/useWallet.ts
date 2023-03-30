import { useCallback } from 'react'
import { create } from 'zustand'

import { DESIG_WALLET } from 'desig-wallet'
import { toast } from 'react-toastify'

type WalletStorage = {
  pubKey: string | null
  setWallet: (state: Partial<WalletStorage>) => void
}
const useWalletStorage = create<WalletStorage>((set) => ({
  pubKey: null,
  setWallet: (payload) => set({ pubKey: payload.pubKey }),
}))

export const useWallet = () => {
  const { pubKey, setWallet } = useWalletStorage()

  const login = useCallback(async () => {
    try {
      const pubKey = await DESIG_WALLET.connect()
      setWallet({ pubKey })
      return pubKey
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    }
  }, [setWallet])

  const logout = useCallback(async () => {
    setWallet({ pubKey: null })
  }, [setWallet])

  const signMessage = useCallback(
    async (msg: string) => {
      if (!pubKey) await login()

      const signature = await DESIG_WALLET.signMessage(msg)
      return signature
    },
    [login, pubKey],
  )

  const getDeviceKey = useCallback(async () => {
    await signMessage('GET_DEVICE_SHARED')
    return 'DEVICE_SHARED'
  }, [signMessage])

  const getSocialKey = useCallback(async () => {
    await signMessage('GET_SOCIAL_SHARED')
    return 'SOCIAL_SHARED'
  }, [signMessage])

  return { pubKey, login, logout, signMessage, getDeviceKey, getSocialKey }
}
