import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'
import DeviceStorage from 'components/auth/deviceStorage'
import RecoveryPassword from 'components/auth/recoveryPassword'
import SignInSocials from 'components/auth/signInSocials'
import Profile from 'components/profile'

const CreateKey = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Title>Generate Private Key</Typography.Title>
      </Col>
      <Col span={24}>
        <Profile />
      </Col>
      <Col span={24}>
        <Card>
          <SignInSocials />
        </Card>
      </Col>
      <Col span={24}>
        <Card style={{ width: 650 }}>
          <DeviceStorage />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <RecoveryPassword />
        </Card>
      </Col>
    </Row>
  )
}

export default CreateKey
