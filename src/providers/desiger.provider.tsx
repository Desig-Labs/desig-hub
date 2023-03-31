import { Fragment, ReactNode, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { create } from 'zustand'
import { DESIGER } from 'desig-wallet'

import { useProfile } from 'hooks/useProfile'

/**
 * Store
 */

export type DesigerStore = {
  pubKey?: string
  username?: string
  loading: boolean
  setDesiger: (payload: { pubKey?: string; username?: string }) => void
  setLoading: (loading: boolean) => void
}

export const useDesigerStore = create<DesigerStore>()((set) => ({
  pubKey: undefined,
  username: undefined,
  loading: true,
  setDesiger: ({ pubKey, username }) => set({ pubKey, username }),
  setLoading: (loading) => set({ loading }),
}))

/**
 * Hook
 */

export const useDesiger = () => {
  const desiger = useDesigerStore((desiger) => desiger, isEqual)

  const signMessage = useCallback(async (msg: string) => {
    const signature = await DESIGER.signMessage(msg)
    return signature
  }, [])

  const getUserSharedKey = useCallback(async (id: string) => {
    return id
  }, [])

  const getDeviceKey = useCallback(async () => {
    await signMessage('GET_DEVICE_SHARED')
    return 'DEVICE_SHARED'
  }, [signMessage])

  const getSocialKey = useCallback(async () => {
    await signMessage('GET_SOCIAL_SHARED')
    return 'SOCIAL_SHARED'
  }, [signMessage])

  return {
    ...desiger,
    signMessage,
    getUserSharedKey,
    getDeviceKey,
    getSocialKey,
  }
}

/**
 * Provider
 */

export default function DesigerProvider({ children }: { children: ReactNode }) {
  const setDesiger = useDesigerStore(({ setDesiger }) => setDesiger)
  const setLoading = useDesigerStore(({ setLoading }) => setLoading)
  const { fetchProfile } = useProfile()

  const initDesiger = useCallback(async () => {
    try {
      setLoading(true)
      const desiger = await DESIGER.getDesigerAddress()
      if (!desiger) throw new Error('Login fist')

      const profile = await fetchProfile(desiger)
      return setDesiger({
        pubKey: profile?.public_key,
        username: profile?.username,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [fetchProfile, setDesiger, setLoading])

  useEffect(() => {
    const timeout = setTimeout(() => {
      initDesiger()
    }, 500)
    return () => clearTimeout(timeout)
  }, [initDesiger])

  return <Fragment>{children}</Fragment>
}
