import { getPublicKey, sign, utils } from '@noble/ed25519'

import { supabase } from 'configs'

export enum Action {
  CreateProfile = 'create-profile',
  UpdateProfile = 'update-profile',
  BackupShareKey = 'backup-shared-key',
  RestoreShareKey = 'restore-shared-key',
}

export interface InvokeData {
  action: Action
  data: Record<string, string>
  time: string
}

export interface InvokeBodyAuth extends InvokeData {
  publicKey: string
  signature: string
}

function normalize(invokeData: InvokeData): InvokeData {
  const { action, data, time } = invokeData
  if (!action) throw new Error('Action must be required!')
  if (!data) throw new Error('Data must be required!')
  if (!time) throw new Error('Time must be required!')
  return { action, data, time }
}

function encodeData(invokeData: InvokeData): Uint8Array {
  const encoder = new TextEncoder()
  const content = JSON.stringify(normalize(invokeData))
  const utf8Data = encoder.encode(content)
  return utf8Data
}

interface InvokeParams {
  action: Action
  data: Record<string, string>
  privkey: Uint8Array
}

type Profile = {
  uid: string
  username: string
  public_key: string
}

export class UidAuth {
  static async getProfile(pubkey: Uint8Array) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('public_key', utils.bytesToHex(pubkey))
    return data?.[0] as Profile | undefined
  }

  static async getProfileFromUsername(username: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
    return data?.[0] as Profile | undefined
  }

  static async invoke({ action, data, privkey }: InvokeParams) {
    const invokeData: InvokeData = {
      action,
      data,
      time: new Date().toISOString(),
    }
    const signature = await sign(encodeData(invokeData), privkey)
    const pubkey = await getPublicKey(privkey)

    const reqBody: InvokeBodyAuth = {
      ...invokeData,
      publicKey: utils.bytesToHex(pubkey),
      signature: utils.bytesToHex(signature),
    }
    const res = await supabase.functions.invoke(action, {
      body: reqBody,
    })

    if (!!res.error) {
      const { error } = await res.error.context.json()
      throw new Error(error)
    }
    if (!res.data) throw new Error('The returned data must not be empty')

    return res.data
  }

  static createProfile(
    privkey: Uint8Array,
    data: { username: string; shared_key: string },
  ) {
    return this.invoke({
      action: Action.CreateProfile,
      data,
      privkey,
    })
  }
}
