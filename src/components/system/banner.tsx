import { Col, Row, Space, Typography, Image } from 'antd'

import banner from 'static/images/banner.png'

const Banner = () => {
  return (
    <Row justify="center" style={{ padding: 0 }} wrap={false} gutter={[48, 48]}>
      <Col flex="auto">
        <Space direction="vertical" align="center">
          <Typography.Text style={{ fontSize: 74 }}>
            A Blockchain-agnostic <b style={{ color: '#7767F6' }}>Multisig</b>{' '}
            solution
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Image src={banner} preview={false} />
      </Col>
    </Row>
  )
}

export default Banner
