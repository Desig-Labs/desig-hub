import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Auth } from '@supabase/auth-ui-react'

import { Button, Col, Row, Space } from 'antd'
import RowInfo from 'components/rowInfo'

import { supabase } from 'configs'
import { useDesiger } from 'providers/desiger.provider'
import { utils } from '@noble/ed25519'

const RecoveryWallet = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(true)
  const { user } = Auth.useUser()
  const [share, setShare] = useState('')
  const { desig } = useDesiger()

  const handleLinkWithSocial = async () => {
    try {
      setLoading(true)
      if (!desig) return
      // Create new profile
      // const data = await linkSocial()
      // if (!!data) onSuccess()
      console.log('desig', desig)
      desig.recovery(utils.hexToBytes(share))
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    supabase
      .from('shared_keys')
      .select('*')
      .eq('uid', user?.id)
      .then(({ data }) => {
        console.log('data', data)
        setShare(data?.[0]?.shared_key)
        setLoading(false)
      })
  }, [user?.id])

  console.log('render')
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Share key" value={share} />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          onClick={handleLinkWithSocial}
          type="primary"
          block
          loading={loading}
          disabled={!share}
        >
          {!!share ? 'Recovery' : "Share's not exist"}
        </Button>
      </Col>
    </Row>
  )
}

export default RecoveryWallet
