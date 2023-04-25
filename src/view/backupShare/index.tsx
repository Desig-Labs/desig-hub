import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Card, Col, Result, Row, Typography } from 'antd'
import Brand from 'components/brand'
import CardProcess from 'components/cardProcess'
import Socials from '../loginSocial'
import LinkWallet from './linkWallet'

import { useDesiger } from 'providers/desiger.provider'

const STEPS = [
  {
    title: 'Socials',
    description: 'Pair with your socials account',
    Component: Socials,
  },
  {
    title: 'Link Wallet',
    description: 'Link social with your desig wallet',
    Component: LinkWallet,
  },
]

const BackupShared = () => {
  const [step, setStep] = useState(1)
  const myRef = useRef(null)
  const profile = useDesiger().profile

  const stepProps = (idx: number, title: string) => {
    let type: any = 'waiting'
    if (step === idx) type = 'processing'
    if (step > idx) type = 'success'
    return {
      type,
      title: `${idx}. ${title}`,
    }
  }

  const handleSetStep = useCallback(
    (id: number) => {
      if (id < step) return
      setStep(id + 1)
    },
    [step],
  )

  useEffect(() => {
    if (!myRef) return
    // @ts-ignore
    myRef?.current?.scrollIntoView(false)
  }, [])

  if (!profile.username)
    return (
      <Row justify="center" gutter={[24, 24]} ref={myRef}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={1} type="secondary">
            BACKUP YOUR WALLET <span style={{ color: 'white' }}>🧑‍🚀</span>
          </Typography.Title>
        </Col>

        <Col>
          <Card>
            <Result
              icon={<Brand />}
              title="Your need to install desig wallet fist!"
              extra={
                <Button
                  type="primary"
                  onClick={() =>
                    window.open(
                      'https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca?hl=en',
                      '_blank',
                    )
                  }
                >
                  Install now
                </Button>
              }
            />
          </Card>
        </Col>
      </Row>
    )

  return (
    <Row justify="center" gutter={[24, 24]} ref={myRef}>
      <Col span={24} style={{ textAlign: 'center', marginBottom: 64 }}>
        <Typography.Title level={1} type="secondary">
          BACKUP YOUR WALLET <span style={{ color: 'white' }}>🧑‍🚀</span>
        </Typography.Title>

        <Typography.Text>
          Welcome{' '}
          <Typography.Text type="success" strong>
            {profile.username}
          </Typography.Text>{' '}
          to Desig 👋
        </Typography.Text>
      </Col>

      {STEPS.map(({ title, description, Component }, index) => {
        const id = index + 1
        return (
          <Col span={12} key={index}>
            <CardProcess {...stepProps(id, title)} description={description}>
              <Component onSuccess={() => handleSetStep(id)} />
            </CardProcess>
          </Col>
        )
      })}
    </Row>
  )
}

export default BackupShared
