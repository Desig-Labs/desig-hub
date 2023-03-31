import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'

import { useProfile } from 'hooks/useProfile'
import { useDesiger } from 'providers/desiger.provider'

const Wallet = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false)
  const { pubKey } = useDesiger()
  const { fetchProfile, linkSocial } = useProfile()

  const handleLinkWithSocial = async () => {
    try {
      setLoading(true)
      // Tracking created profile
      const profile = await fetchProfile()
      if (profile) {
        if (profile.public_key !== pubKey)
          throw new Error(`Social wallet ${profile.public_key} not match! `)
      }
      // Create new profile
      const data = await linkSocial()
      if (!!data) onSuccess()
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Public Key:" value={pubKey} />
          {/* <RowInfo title="Shared Key:" value={sharedKey} /> */}
        </Space>
      </Col>
      <Col span={24}>
        <Button
          onClick={handleLinkWithSocial}
          type="primary"
          block
          loading={loading}
        >
          Link to social
        </Button>
      </Col>
    </Row>
  )
}

export default Wallet
