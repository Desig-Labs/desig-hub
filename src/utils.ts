export enum Action {
  CreateProfile = 'create-profile',
  UpdateProfile = 'update-profile',
  BackupShareKey = 'backup-shared-key',
  RestoreShareKey = 'restore-shared-key',
}

export type SignedData = {
  action: Action
  data: Record<string, any>
  time: string
}

export type RequestBodyAuth = SignedData & {
  publicKey: string
  signature: string
}

export function encodeMessage(msg: string) {
  const utf8Encode = new TextEncoder()
  return utf8Encode.encode(msg)
}

export function normalizeSignedData(signedData: SignedData): SignedData {
  const { action, data, time } = signedData
  if (!action) throw new Error('Action must be required!')
  if (!data) throw new Error('Data must be required!')
  if (!time) throw new Error('Time must be required!')
  return { action, data, time }
}

export const shortenString = (string: string, num = 4, delimiter = '...') => {
  return (
    string.substring(0, num) +
    delimiter +
    string.substring(string.length - num, string.length)
  )
}
