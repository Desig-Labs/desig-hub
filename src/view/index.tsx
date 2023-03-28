import { Col, Layout, Row, Divider, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import PageHeader from 'components/pageHeader'
import Profile from 'view/profile'
import Banner from 'components/banner'
import { CreateProfile } from './createProfile'

export type ProcessConfig = {
  time: number
  startIndex: number
  amount: string
}

function View() {
  return (
    <Layout>
      <PageHeader />
      <Layout>
        <Banner />
        <Row align="middle" justify="center">
          <Col style={{ width: '50%' }}>
            <Divider />
          </Col>
        </Row>
        <Content>
          <Row align="middle" justify="center">
            <Col>
              <Space direction="vertical">
                <CreateProfile />
                <Profile />
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default View
