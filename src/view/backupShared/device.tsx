import { useEffect, useState } from 'react'
import { Button, Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'
import { useWallet } from 'hooks/useWallet'

const BackupDevice = ({ onSuccess }: { onSuccess: () => void }) => {
  const [sharedKey, setSharedKey] = useState<string>()
  const { pubKey, signMessage } = useWallet()

  const onBackupDevice = async () => {
    const data = await signMessage(Buffer.from('GET:DEVICE'))
    setSharedKey(Buffer.from(data).toString('hex'))
  }

  useEffect(() => {
    if (sharedKey) onSuccess()
  }, [onSuccess, sharedKey])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Public Key:" value={pubKey} />
          <RowInfo title="Shared Key:" value={sharedKey} />
        </Space>
      </Col>
      <Col span={24}>
        <Button onClick={onBackupDevice} size="large" type="primary" block>
          Save Device
        </Button>
      </Col>
    </Row>
  )
}

export default BackupDevice
