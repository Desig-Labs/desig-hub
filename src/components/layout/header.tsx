import { Col, Row } from 'antd'
import ButtonLoginDesig from '../auth/connectDesig'
import Desig from 'components/desig'

const PageHeader = () => {
  const onHome = () => (window.location.href = window.location.origin)
  return (
    <Row gutter={[24, 24]} wrap={false} align="middle">
      <Col flex="auto">
        <Desig onClick={onHome} style={{ cursor: 'pointer' }} />
      </Col>
      <Col>
        <ButtonLoginDesig />
      </Col>
    </Row>
  )
}

export default PageHeader
