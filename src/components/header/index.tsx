import { Button, Col, Row, Switch } from 'antd'
import Brand from 'components/brand'
import IonIcon from 'components/ionicon'

import styles from './index.module.scss'
import { useTheme } from 'providers/ui.provider'
import { email } from 'configs/socials.constant'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <Row
      className={styles.header}
      gutter={[12, 12]}
      align="middle"
      wrap={false}
    >
      <Col flex="auto">
        <Brand
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          theme={theme}
        />
      </Col>
      <Col>
        <Button type="text" href={email} target="_blank">
          Say Hi to Us 👋
        </Button>
      </Col>
      <Col>
        <Switch
          checked={theme === 'dark'}
          onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          unCheckedChildren={<IonIcon name="sunny-outline" />}
          checkedChildren={<IonIcon name="moon-outline" />}
        />
      </Col>
    </Row>
  )
}
