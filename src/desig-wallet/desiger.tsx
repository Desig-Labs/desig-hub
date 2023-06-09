import IonIcon from '@sentre/antd-ionicon'
import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import { useDesiger } from 'providers/desiger.provider'

const Desiger = () => {
  const {
    loading,
    profile: { username },
  } = useDesiger()

  if (!username || loading) {
    return (
      <Card bodyStyle={{ padding: '8px 12px' }}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Link
              href="https://twitter.com/DesigLabs"
              target="_blank"
            >
              <Space>
                <IonIcon name="logo-twitter" />
                @DesigLabs
              </Space>
            </Typography.Link>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Card bodyStyle={{ padding: '8px 12px' }} hoverable>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space>
            <Avatar
              style={{ backgroundColor: '#7767f6', verticalAlign: 'middle' }}
              size={24}
            >
              {username?.slice(0, 2).toUpperCase()}
            </Avatar>
            {username}
            <IonIcon name="wallet-outline" />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default Desiger
