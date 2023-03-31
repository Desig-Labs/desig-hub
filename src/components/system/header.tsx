import { Col, Row } from 'antd'
import Desig from 'components/system/desig'
import Desiger from 'desig-wallet/desiger'

export default function Header() {
  const onHome = () => (window.location.href = window.location.origin)

  return (
    <Row gutter={[24, 24]} wrap={false} align="middle">
      <Col flex="auto">
        <Desig onClick={onHome} style={{ cursor: 'pointer' }} />
      </Col>
      <Col>
        <Desiger />
      </Col>
    </Row>
  )
}
