import IonIcon from '@sentre/antd-ionicon'
import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import { useDesiger } from 'providers/desiger.provider'
import SetupDesiger from './setupDesiger'

const Desiger = () => {
  const desiger = useDesiger()

  if (!desiger.username) {
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
        {!desiger.loading && <SetupDesiger />}
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
              {desiger.username?.slice(0, 2).toUpperCase()}
            </Avatar>
            {desiger.username}
            <IonIcon name="wallet-outline" />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default Desiger
