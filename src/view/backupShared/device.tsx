import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'
import { useDesiger } from 'providers/desiger.provider'

const BackupDevice = ({ onSuccess }: { onSuccess: () => void }) => {
  const { getDeviceKey } = useDesiger()
  const [sharedKey, setSharedKey] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onBackupDevice = async () => {
    try {
      await setLoading(true)
      const sharedKey = await getDeviceKey()
      setSharedKey(sharedKey)
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
          onClick={onBackupDevice}
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

export default BackupDevice
