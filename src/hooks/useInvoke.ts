import * as ed from '@noble/ed25519'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { normalizeSignedData, RequestBodyAuth } from './../utils'

import { supabase } from 'configs'
import { useDesiger } from 'providers/desiger.provider'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)
  const { getDesigerAddress, signMessage } = useDesiger()

  const call = useCallback(
    async (action: any, bodyData: Record<string, any>) => {
      try {
        setLoading(true)
        const publicKey = await getDesigerAddress()
        if (!publicKey) throw new Error('Login fist!')

        // build request body
        const reqData = normalizeSignedData({
          action,
          data: bodyData,
          time: new Date().toISOString(),
        })
        const signature = await signMessage(JSON.stringify(reqData))
        const reqBody: RequestBodyAuth = {
          ...reqData,
          publicKey: publicKey,
          signature: ed.utils.bytesToHex(signature),
        }
        const { data } = await supabase.functions.invoke(action, {
          body: reqBody,
        })

        // Check error
        if (!data) throw new Error('Response is null!')
        if (!!data?.error?.message) throw new Error(data?.error?.message)
        if (!!data?.error) throw new Error(data?.error)
        // Successfully
        toast(`${action} successfully`, { type: 'success' })
        return data
      } catch (error: any) {
        toast(`${action} error: ${error.message}`, { type: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [getDesigerAddress, signMessage],
  )

  return { call, loading }
}
