import { utils } from '@noble/ed25519'
import { Fragment, ReactNode, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { create } from 'zustand'

import { useProfile } from 'hooks/useProfile'

/**
 * Store
 */

export type DesigerStore = {
  pubKey?: string
  username?: string
  desig?: IUID
  loading: boolean
  setProfile: (payload: { pubKey?: string; username?: string }) => void
  setLoading: (loading: boolean) => void
  setDesig: (desig: IUID) => void
}

export const useDesigerStore = create<DesigerStore>()((set) => ({
  pubKey: undefined,
  username: undefined,
  desig: undefined,
  loading: true,
  setProfile: ({ pubKey, username }) => set({ pubKey, username }),
  setLoading: (loading) => set({ loading }),
  setDesig: (desig: IUID) => set({ desig }),
}))

/**
 * Hook
 */

export const useDesiger = () => {
  const desiger = useDesigerStore((desiger) => desiger, isEqual)

  const getDeviceKey = useCallback(async () => {
    // await DESIGER.signMessage('GET_DEVICE_SHARED')
    console.log('DEVICE_SHARED')
    return 'DEVICE_SHARED'
  }, [])

  const getSocialKey = useCallback(async () => {
    if (!desiger.desig) throw new Error('Login fist')
    const { cloudShare } = await desiger.desig.requestCloudShare()
    return utils.bytesToHex(cloudShare)
  }, [desiger.desig])

  return {
    ...desiger,
    getDeviceKey,
    getSocialKey,
  }
}

/**
 * Provider
 */

export default function DesigerProvider({ children }: { children: ReactNode }) {
  const { setDesig, setProfile, setLoading } = useDesigerStore()
  // const setProfile = useDesigerStore(({ setProfile }) => setProfile)
  // const setLoading = useDesigerStore(({ setLoading }) => setLoading)
  const { fetchProfile } = useProfile()

  const initDesiger = useCallback(
    async (provider: IUID) => {
      const desiger: Partial<DesigerStore> = {
        pubKey: undefined,
        username: undefined,
      }
      try {
        let publicKey = await provider.connect()
        desiger.pubKey = utils.bytesToHex(publicKey)
        const profile = await fetchProfile(desiger.pubKey)
        desiger.username = profile?.username
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        return setProfile(desiger)
      }
    },
    [fetchProfile, setLoading, setProfile],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.desig?.uid) return
      setDesig(window.desig.uid)
      clearInterval(interval)
      initDesiger(window.desig.uid)
    }, 500)
  }, [setDesig, initDesiger])

  // useEffect(() => {
  //   initDesiger()
  // }, [initDesiger])

  return <Fragment>{children}</Fragment>
}
