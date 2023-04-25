import { Navigate, Route, Routes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import PageHeader from 'components/header'
import Footer from 'components/footer'
import Home from './home'
import Banner from 'components/banner'
import Backup from './backupShare'
import Recovery from './recovery'

import { Content } from 'antd/es/layout/layout'

function View() {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <PageHeader />
      </Col>
      <Col span={24}>
        <Layout>
          <Banner />
          <Content style={{ marginTop: 48 }}>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="backup" element={<Backup />} />
              <Route path="recovery" element={<Recovery />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Content>
        </Layout>
      </Col>
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  )
}

export default View
