import { useCallback, useEffect, useRef, useState } from 'react'

import { Col, Row, Typography } from 'antd'
import Socials from '../loginSocial'
import CardProcess from 'components/cardProcess'
import LinkWallet from './linkWallet'

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
    myRef.current.scrollIntoView(false)
  }, [])

  return (
    <Row justify="center" gutter={[24, 24]} ref={myRef}>
      <Col span={24} style={{ textAlign: 'center', marginBottom: 64 }}>
        <Typography.Title level={1} type="secondary">
          BACKUP YOUR WALLET <span style={{ color: 'white' }}>🧑‍🚀</span>
        </Typography.Title>
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
