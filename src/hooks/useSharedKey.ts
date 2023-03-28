import { useCallback } from 'react'
import { useInvoke } from './useInvoke'

export const useSharedKey = () => {
  const invoke = useInvoke()

  const backupSharedKey = useCallback(
    async (shared_key: string) => {
      return invoke.call('backup-shared-key', {
        shared_key: shared_key,
      })
    },
    [invoke],
  )

  const restoreSharedKey = useCallback(async () => {
    const { data } = await invoke.call('restore-shared-key', {
      message: 'RESTORE::SHARED_KEY',
    })
    return data[0]
  }, [invoke])

  return { backupSharedKey, restoreSharedKey, loading: invoke.loading }
}
