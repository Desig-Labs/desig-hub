import { useCallback, useEffect, useState } from 'react'
import * as ed from '@noble/ed25519'

import { Auth } from '@supabase/auth-ui-react'
import { supabase } from 'configs'
import { convertStringToU8Array } from 'utils'

export type Profile = {
  id: string
  share_key: string
  public_key: string
  username: string
}

const useProfile = () => {
  const { user } = Auth.useUser()
  const [profile, setProfile] = useState<Profile | null>()

  const fetchProfile = useCallback(async () => {
    if (!user) return setProfile(null)
    // TODO: Implement permission select with id
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
    return setProfile((data?.[0] as any) || null)
  }, [user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = useCallback(
    async (profile: Partial<Profile>, privateKey: string) => {
      if (!user) throw new Error('Login fist')
      const publicKey = await ed.getPublicKey(privateKey)
      // Build message and signature
      const data = JSON.stringify({
        ...profile,
        id: user.id,
      })
      const message = convertStringToU8Array(data)
      const signature = await ed.sign(message, privateKey)
      // Invoke function update profile
      const res = await supabase.functions.invoke('update-profile', {
        body: {
          data,
          signature: Buffer.from(signature).toString('hex'),
          publicKey: Buffer.from(publicKey).toString('hex'),
        },
      })
      // Refetch profile
      await fetchProfile()
      return res
    },
    [fetchProfile, user],
  )

  return { profile, updateProfile }
}

export default useProfile
