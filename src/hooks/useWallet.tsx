import { useCallback } from 'react'
import * as ed from '@noble/ed25519'
import { create } from 'zustand'

import { DESIG_WALLET } from 'desig-wallet'
import { toast } from 'react-toastify'

type WalletStorage = {
  pubKey: string | null
  setWallet: (state: Partial<WalletStorage>) => void
}
const useWalletStorage = create<WalletStorage>((set) => ({
  pubKey: null,
  setWallet: (payload) => set((state) => Object.assign(state, payload)),
}))

export const useWallet = () => {
  const { pubKey, setWallet } = useWalletStorage()

  const login = useCallback(async () => {
    try {
      const pubKey = await DESIG_WALLET.connect()
      return setWallet({ pubKey })
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    }
  }, [setWallet])

  const signMessage = useCallback(
    async (data: Uint8Array) => {
      if (!pubKey) await login()
      const signature = await DESIG_WALLET.signMessage(
        ed.utils.bytesToHex(data),
      )
      return signature
    },
    [login, pubKey],
  )

  return { pubKey, login, signMessage }
}
