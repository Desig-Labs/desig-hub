import { Col, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import Logo from './logo'
import SignInSocials from './signInSocials'

const PageHeader = () => {
  return (
    <Header className="header">
      <Row>
        <Col flex={'auto'}>
          <Logo />
        </Col>
        <Col>
          <SignInSocials />
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader
