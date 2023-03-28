import { useCallback, useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'

import { supabase } from 'configs'
import { useInvoke } from './useInvoke'
import { useUserKey } from './useUserKey'

export type Profile = {
  uid: string
  public_key: string
  username: string
}

export const useProfile = () => {
  const { user } = Auth.useUser()
  const [profile, setProfile] = useState<Profile | null>()

  const fetchProfile = useCallback(async () => {
    if (!user) return setProfile(null)
    // TODO: Implement permission select with id
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('uid', user.id)
    return setProfile((data?.[0] as any) || null)
  }, [user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return profile
}

export const useCreateProfile = () => {
  const { user } = Auth.useUser()
  const { pubKey } = useUserKey()
  const invoke = useInvoke()

  const createProfile = useCallback(async () => {
    return invoke.call('create-profile', {
      username: user?.id,
      public_key: pubKey,
    })
  }, [invoke, pubKey, user])

  return { createProfile, loading: invoke.loading }
}

export const useUpdateProfile = () => {
  const invoke = useInvoke()

  const updateProfile = useCallback(
    async (params: { username: string }) => {
      return invoke.call('update-profile', {
        username: params.username,
      })
    },
    [invoke],
  )
  return { updateProfile, loading: invoke.loading }
}
