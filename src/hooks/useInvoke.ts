import * as ed from '@noble/ed25519'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { encodeMessage, normalizeSignedData, RequestBodyAuth } from './../utils'

import { supabase } from 'configs'
import { useWallet } from './useWallet'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)

  const { pubKey, signMessage } = useWallet()

  const call = useCallback(
    async (action: any, bodyData: Record<string, any>) => {
      try {
        setLoading(true)
        if (!pubKey) throw new Error('Login fist!')

        // build request body
        const reqData = normalizeSignedData({
          action,
          data: bodyData,
          time: new Date().toISOString(),
        })
        const message = encodeMessage(reqData)
        const signature = await signMessage(message)
        const reqBody: RequestBodyAuth = {
          ...reqData,
          publicKey: pubKey,
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
    [pubKey, signMessage],
  )

  return { call, loading }
}
