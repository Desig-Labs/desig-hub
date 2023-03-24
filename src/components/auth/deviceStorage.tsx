import { Button, Col, Row, Space, Typography, Image } from 'antd'

import device from 'static/images/device.svg'

const DeviceStorage = () => {
  return (
    <Row>
      <Col span={6} style={{ textAlign: 'center' }}>
        <Image src={device} preview={false} style={{ height: 100 }} />
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Title level={2}>Allow device storage</Typography.Title>
          <Button size="large" type="primary">
            ALLOW DEVICE
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default DeviceStorage
