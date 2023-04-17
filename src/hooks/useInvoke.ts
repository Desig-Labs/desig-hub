import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { encodeMessage, normalizeSignedData, RequestBodyAuth } from './../utils'

import { supabase } from 'configs'
import { useDesiger } from 'providers/desiger.provider'
import { utils } from '@noble/ed25519'

export const useInvoke = () => {
  const [loading, setLoading] = useState(false)
  const { desig, profile } = useDesiger()

  const call = useCallback(
    async (action: any, bodyData: Record<string, any>) => {
      try {
        setLoading(true)
        if (!desig) throw new Error('Install desig fist')

        // build request body
        const reqData = normalizeSignedData({
          action,
          data: bodyData,
          time: new Date().toISOString(),
        })

        const { signature, pubkey } = await desig.authorize(
          encodeMessage(JSON.stringify(reqData)),
        )

        console.log('pubkey', utils.bytesToHex(pubkey))
        const reqBody: RequestBodyAuth = {
          ...reqData,
          publicKey: utils.bytesToHex(pubkey),
          signature: utils.bytesToHex(signature),
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
        console.log('error', error)
        toast(`${action} error: ${error?.message || error}`, { type: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [desig, profile.public_key],
  )

  return { call, loading }
}
