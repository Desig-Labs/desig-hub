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
  return desiger
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
        console.log('profile', profile)
        if (!profile)
          return setProfile({ username: '', uid: '', public_key: '' })
        setProfile({ ...profile, public_key: utils.bytesToHex(publicKey) })
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
