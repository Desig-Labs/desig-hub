import { Link } from 'react-router-dom'

import { Col, Row, Space, Typography, Button } from 'antd'
import IonIcon from 'components/ionicon'
import { Ripple } from 'components/splash'

import { twitter } from 'configs/socials.constant'

import styles from './index.module.scss'

const Banner = () => {
  return (
    <Row gutter={[24, 128]}>
      <Col xs={24} md={12}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Space>
              <Button size="large">Coming Soon 🚀</Button>
              <Button
                size="large"
                type="primary"
                icon={<IonIcon name="logo-twitter" />}
                href={twitter}
                target="_blank"
              >
                @DesigLabs
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Typography.Title style={{ fontSize: 112 }}>Desig</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title type="secondary" style={{ fontSize: 36 }}>
              The blockchain-agnostic multisig solution.
            </Typography.Title>
          </Col>
          <Col span={24} style={{ marginTop: 128 }}>
            <Space>
              <Ripple />
              <Link
                to="#desig-go"
                style={{ position: 'relative', left: -52, top: -6 }}
                // scroll={false}
              >
                <Typography.Title level={5}>
                  PREPARE FOR THE MOON 🌕
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
