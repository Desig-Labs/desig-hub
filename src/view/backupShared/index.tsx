import { useCallback, useState } from 'react'

import { Col, Row } from 'antd'
import BackupSocials from './socials'
import CardProcess from 'components/cardProcess'
import BackupDevice from './device'
import BackupWallet from './wallet'

const STEPS = [
  {
    title: 'Socials',
    description: 'Pair with your socials account',
    Component: BackupSocials,
  },
  {
    title: 'Wallet',
    description: 'Connect with your desig wallet',
    Component: BackupWallet,
  },
  {
    title: 'Device',
    description: 'Save in your device storage',
    Component: BackupDevice,
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
          <Col span={8} key={index}>
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
