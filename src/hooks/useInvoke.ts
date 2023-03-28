import { addSignedAuthority } from './../utils'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserKey } from 'hooks/useUserKey'

import { supabase } from 'configs'
import { signMessage } from 'utils'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)
  const { priKey } = useUserKey()

  const call = useCallback(
    async (funcName: string, reqData: Object, privateKey = priKey) => {
      try {
        setLoading(true)
        if (!privateKey) throw new Error('Invalid private key!')
        // Sign message and invoke
        let body = await signMessage(reqData, privateKey)
        body = await addSignedAuthority(funcName, body, privateKey)
        const { data } = await supabase.functions.invoke(funcName, {
          body,
        })
        // Check error
        if (!data) throw new Error('Response is null!')
        if (!!data?.error?.message) throw new Error(data?.error?.message)
        if (!!data?.error) throw new Error(data?.error)
        // Successfully
        toast(`${funcName} successfully`, { type: 'success' })
        return data
      } catch (error: any) {
        toast(`${funcName} error: ${error.message}`, { type: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [priKey],
  )

  return { call, loading }
}
