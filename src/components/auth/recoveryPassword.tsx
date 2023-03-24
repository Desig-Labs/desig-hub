import { Button, Col, Row, Space, Typography, Image } from 'antd'

import device from 'static/images/device.svg'

const RecoveryPassword = () => {
  return (
    <Row>
      <Col span={6} style={{ textAlign: 'center' }}>
        <Image src={device} preview={false} style={{ height: 100 }} />
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Title level={2}>Enter recovery password</Typography.Title>
          <Button size="large" type="primary">
            ENTER
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default RecoveryPassword
