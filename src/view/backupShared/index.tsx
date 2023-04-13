import { useCallback, useState } from 'react'

import { Col, Row } from 'antd'
import Socials from './socials'
import CardProcess from 'components/cardProcess'
import Wallet from './wallet'

const STEPS = [
  {
    title: 'Socials',
    description: 'Pair with your socials account',
    Component: Socials,
  },
  {
    title: 'Wallet',
    description: 'Link social with your desig wallet',
    Component: Wallet,
  },
]

const BackupShared = () => {
  const [step, setStep] = useState(1)

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

  return (
    <Row justify="center" gutter={[24, 24]}>
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
