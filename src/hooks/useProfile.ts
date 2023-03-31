import { useCallback } from 'react'

import { supabase } from 'configs'
import { useInvoke } from './useInvoke'

export type Profile = {
  uid: string
  public_key: string
  username: string
}

export const useProfile = () => {
  const invoke = useInvoke()

  const fetchProfile = useCallback(async (public_key?: string) => {
    if (!public_key) return
    // TODO: Implement permission select with id
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('public_key', public_key)
    const profile = data?.[0]
    return profile as Profile
  }, [])

  const createProfile = useCallback(
    async (data: { public_key: string; username: string }) => {
      return invoke.call('create-profile', {
        ...data,
      })
    },
    [invoke],
  )

  const linkSocial = useCallback(async () => {
    return invoke.call('link-social', {})
  }, [invoke])

  const updateProfile = useCallback(
    async (params: { username: string }) => {
      return invoke.call('update-profile', {
        username: params.username,
      })
    },
    [invoke],
  )

  return {
    fetchProfile,
    createProfile,
    updateProfile,
    linkSocial,
    loading: invoke.loading,
  }
}
