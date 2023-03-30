import { useCallback, useState } from 'react'

import { Col, Row } from 'antd'
import BackupSocials from './socials'
import CardProcess from 'components/cardProcess'
import BackupDevice from './device'

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
      <Col span={8}>
        <CardProcess
          {...stepProps(1, 'Socials')}
          description="Pair with your socials account"
        >
          <BackupSocials onSuccess={() => handleSetStep(1)} />
        </CardProcess>
      </Col>
      <Col span={8}>
        <CardProcess
          {...stepProps(2, 'Device')}
          description="Save in your device storage"
        >
          <BackupDevice onSuccess={() => handleSetStep(2)} />
        </CardProcess>
      </Col>
      <Col span={8}>
        <CardProcess
          type="waiting"
          title="3. Password"
          description="Set recovery password"
        >
          haha
        </CardProcess>
      </Col>
    </Row>
  )
}

export default BackupShared
