import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Auth } from '@supabase/auth-ui-react'

import { Button, Col, Row, Space } from 'antd'
import RowInfo from 'components/rowInfo'

import { useProfile } from 'hooks/useProfile'
import { useDesigerStore } from 'providers/desiger.provider'

const Wallet = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false)
  const { user } = Auth.useUser()
  const {
    profile: { uid },
  } = useDesigerStore()
  const { linkSocial } = useProfile()

  const handleLinkWithSocial = async () => {
    try {
      setLoading(true)
      // Create new profile
      const data = await linkSocial()
      if (!!data) onSuccess()
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const linked = user?.id === uid

  useEffect(() => {
    if (linked) onSuccess()
  }, [linked, onSuccess])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Linked UID" value={uid} />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          onClick={handleLinkWithSocial}
          type="primary"
          block
          loading={loading}
          disabled={linked}
        >
          {linked ? 'Linked' : 'Link to social'}
        </Button>
      </Col>
    </Row>
  )
}

export default Wallet
