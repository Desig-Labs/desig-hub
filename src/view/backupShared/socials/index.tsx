import { useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'
import { useProfile } from 'hooks/useProfile'

import LoginSocials from './loginSocials'

const BackupSocials = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user } = Auth.useUser()
  const profile = useProfile()
  const [sharedKey, setSharedKey] = useState()

  useEffect(() => {
    if (profile) onSuccess()
  }, [onSuccess, profile])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="User ID:" value={user?.id} />
          <RowInfo title="Public Key:" value={profile?.public_key} />
          <RowInfo title="Shared Key:" value={sharedKey} />
        </Space>
      </Col>
      <Col span={24}>
        <LoginSocials />
      </Col>
    </Row>
  )
}

export default BackupSocials
