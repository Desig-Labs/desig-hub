import { useCallback } from 'react'
import { Auth } from '@supabase/auth-ui-react'

import { supabase } from 'configs'
import { useInvoke } from './useInvoke'

export type Profile = {
  uid: string
  public_key: string
  username: string
}

export const useProfile = () => {
  const { user } = Auth.useUser()
  const invoke = useInvoke()

  const fetchProfile = useCallback(async () => {
    if (!user) return null
    // TODO: Implement permission select with id
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('uid', user.id)
    const profile = data?.[0]
    return profile as Profile
  }, [user])

  const createProfile = useCallback(
    async (public_key: string) => {
      return invoke.call('create-profile', {
        username: user?.id,
        public_key,
      })
    },
    [invoke, user],
  )

  const updateProfile = useCallback(
    async (params: { username: string }) => {
      return invoke.call('update-profile', {
        username: params.username,
      })
    },
    [invoke],
  )

  return { fetchProfile, createProfile, updateProfile }
}
