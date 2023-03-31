import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'
import { useDesiger } from 'providers/desiger.provider'
import { useSharedKey } from 'hooks/useSharedKey'

const Backup = ({ onSuccess }: { onSuccess: () => void }) => {
  const [sharedKey, setSharedKey] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { getDeviceKey, getSocialKey } = useDesiger()
  const { backupSharedKey } = useSharedKey()

  const onBackupSocials = async () => {
    const sharedKey = await getSocialKey()
    await backupSharedKey(sharedKey)
  }
  const onBackupDevice = async () => {
    const sharedKey = await getDeviceKey()
    localStorage.setItem('DEVICE_SHARED_KEY', sharedKey)
  }

  const onBackup = async () => {
    try {
      await setLoading(true)
      await onBackupSocials()
      await onBackupDevice()
      setSharedKey('****')
      onSuccess()
      toast('Backup device successfully!', { type: 'success' })
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Shared Key:" value={sharedKey} />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          onClick={onBackup}
          type="primary"
          block
          loading={loading}
          disabled={!!sharedKey}
        >
          {!sharedKey ? 'Allow Device' : 'Allowed'}
        </Button>
      </Col>
    </Row>
  )
}

export default Backup
