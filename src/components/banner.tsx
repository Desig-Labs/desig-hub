import { Col, Row, Space, Typography, Image } from 'antd'

import banner from 'static/images/banner.png'

const Banner = () => {
  return (
    <Row justify="center" style={{ padding: '24px 24px 100px 24px' }}>
      <Col span={12}>
        <Space direction="vertical" align="center">
          <Typography.Text style={{ fontSize: 68 }}>
            A Blockchain-agnostic <b style={{ color: '#7767F6' }}>Multisig</b>{' '}
            solution
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Image src={banner} style={{ height: 300 }} preview={false} />
      </Col>
    </Row>
  )
}

export default Banner
