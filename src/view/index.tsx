import { Navigate, Route, Routes } from 'react-router-dom'

import { Col, Row } from 'antd'
import PageHeader from 'components/system/header'
import Footer from 'components/footer'
import Home from './home'

function View() {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <PageHeader />
      </Col>
      <Col span={24} style={{ marginTop: 64 }}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Col>
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  )
}

export default View
