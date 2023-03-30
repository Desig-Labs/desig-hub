import { useEffect } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'
import LoginSocials from './loginSocials'

const BackupSocials = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user } = Auth.useUser()

  useEffect(() => {
    if (user?.id) onSuccess()
  }, [onSuccess, user?.id])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="User ID:" value={user?.id} />
        </Space>
      </Col>
      <Col span={24}>
        <LoginSocials />
      </Col>
    </Row>
  )
}

export default BackupSocials
