import * as ed from '@noble/ed25519'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserKey } from 'hooks/useUserKey'
import { encodeMessage, normalizeSignedData, RequestBodyAuth } from './../utils'

import { supabase } from 'configs'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)
  const { priKey, pubKey } = useUserKey()

  const call = useCallback(
    async (action: any, bodyData: Record<string, any>, privateKey = priKey) => {
      try {
        setLoading(true)
        if (!privateKey || !pubKey) throw new Error('Invalid private key!')
        // build request body
        const reqData = normalizeSignedData({
          action,
          data: bodyData,
          time: new Date().toISOString(),
        })
        const message = encodeMessage(reqData)
        const signature = await ed.sign(message, privateKey)
        const reqBody: RequestBodyAuth = {
          ...reqData,
          publicKey: pubKey,
          signature: ed.utils.bytesToHex(signature),
        }
        const test = ed.utils.hexToBytes(pubKey)
        console.log('test', test)
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
    [priKey, pubKey],
  )

  return { call, loading }
}
