import { Col, Layout, Row, Divider } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import PageHeader from 'components/pageHeader'
import ProfileManagement from 'view/profileManagement'
import Banner from 'components/banner'
import { CreateProfile } from './createProfile'
import { Search } from './search'
import { SharedKey } from './sharedKey'

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
          <Row justify="center" gutter={[24, 24]}>
            <Col span={24}>
              <Row justify="center" gutter={[24, 24]}>
                <Col span={8} style={{ height: 430 }}>
                  <CreateProfile />
                </Col>
                <Col span={8} style={{ height: 430 }}>
                  <ProfileManagement />
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row justify="center" gutter={[24, 24]}>
                <Col span={8} style={{ height: 430 }}>
                  <SharedKey />
                </Col>
                <Col span={8} style={{ height: 430 }}>
                  <Search />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default View
