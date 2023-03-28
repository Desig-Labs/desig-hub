import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserKey } from 'hooks/useUserKey'
import { signMessage } from 'utils'
import { supabase } from 'configs'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)
  const { priKey } = useUserKey()

  const call = useCallback(
    async (name: string, reqData: Object, privateKey = priKey) => {
      try {
        setLoading(true)
        // Sign message and invoke
        if (!privateKey) throw new Error('Invalid private key!')
        const { data } = await supabase.functions.invoke(name, {
          body: await signMessage(reqData, privateKey),
        })
        // Check error
        if (!data) throw new Error('Response is null!')
        if (!!data?.error?.message) throw new Error(data?.error?.message)
        if (!!data?.error) throw new Error(data?.error)
        // Successfully
        toast(`${name} successfully`, { type: 'success' })
        return data
      } catch (error: any) {
        toast(`${name} error: ${error.message}`, { type: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [priKey],
  )

  return { call, loading }
}
