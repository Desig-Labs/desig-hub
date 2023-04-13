import { utils } from '@noble/ed25519'
import { Fragment, ReactNode, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { create } from 'zustand'

import { Profile, useProfile } from 'hooks/useProfile'

/**
 * Store
 */

export type DesigerStore = {
  profile: Profile
  desig?: IUID
  loading: boolean
  setProfile: (payload: Profile) => void
  setLoading: (loading: boolean) => void
  setDesig: (desig: IUID) => void
}

export const useDesigerStore = create<DesigerStore>()((set) => ({
  profile: { username: '', uid: '', public_key: '' },
  desig: undefined,
  loading: true,
  setProfile: (profile) => set({ profile }),
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
      try {
        let publicKey = await provider.connect()
        const profile = await fetchProfile(utils.bytesToHex(publicKey))
        setProfile(profile || { username: '', uid: '', public_key: '' })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
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
