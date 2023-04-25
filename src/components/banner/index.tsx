import { Link, useNavigate } from 'react-router-dom'

import { Col, Row, Space, Typography, Button } from 'antd'
import IonIcon from 'components/ionicon'
import { Ripple } from 'components/splash'

import { twitter } from 'configs/socials.constant'

import styles from './index.module.scss'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <Row gutter={[24, 128]}>
      <Col xs={24} md={12}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title style={{ fontSize: 112 }}>Desig</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title type="secondary" style={{ fontSize: 36 }}>
              The blockchain-agnostic multisig solution.
            </Typography.Title>
          </Col>
          <Col span={24} style={{ marginTop: 96 }}>
            <Space>
              <Button size="large" onClick={() => navigate('/backup')}>
                Backup Wallet 🚀
              </Button>

              <Button
                size="large"
                type="primary"
                icon={<IonIcon name="finger-print-outline" />}
                href={twitter}
                target="_blank"
                onClick={() => navigate('/recovery')}
              >
                Recovery
              </Button>
            </Space>
          </Col>
          <Col span={24} style={{ marginLeft: -32 }}>
            <Space>
              <Ripple />
              <Link
                to="#desig-go"
                style={{ position: 'relative', left: -52, top: -6 }}
                // scroll={false}
              >
                <Typography.Title level={5}>
                  DESIG WALLET MANAGEMENT 🌕
                </Typography.Title>
              </Link>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={12}>
        <div className={styles['gradient-container']}>
          <div className={styles.gradient} />
        </div>
        <model-viewer
          style={{ width: '100%', height: '75vh' }}
          alt="Apollo's Spacesuit"
          src="/Astronaut.glb"
          shadow-intensity="1"
          touch-action="pan-y"
          camera-orbit="0deg 85deg 105%"
          camera-controls
          disable-pan
          disable-zoom
          auto-rotate
          ar
        />
      </Col>
    </Row>
  )
}

export default Banner
