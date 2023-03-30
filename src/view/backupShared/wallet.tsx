import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Col, Row, Space } from 'antd'
import { RowInfo } from 'components/rowInfo'

import { useProfile } from 'hooks/useProfile'
import { useSharedKey } from 'hooks/useSharedKey'
import { useWallet } from 'hooks/useWallet'
import { supabase } from 'configs'

const BackupWallet = ({ onSuccess }: { onSuccess: () => void }) => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const { fetchProfile, createProfile } = useProfile()
  const { backupSharedKey } = useSharedKey()

  const handleLinkWithSocial = async () => {
    try {
      setLoading(true)
      // Tracking created profile
      const profile = await fetchProfile()
      if (profile) {
        if (profile.public_key !== wallet.pubKey)
          throw new Error(`Social wallet ${profile.public_key} not match! `)
      }
      // Create new profile
      else {
        await createProfile(wallet.pubKey!)
      }
      const sharedKey = await wallet.getSocialKey()
      await backupSharedKey(sharedKey)

      onSuccess()
    } catch (error: any) {
      toast(error.message, { type: 'error' })
      supabase.auth.signOut()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <RowInfo title="Public Key:" value={wallet.pubKey} />
          {/* <RowInfo title="Shared Key:" value={sharedKey} /> */}
        </Space>
      </Col>
      {!wallet.pubKey ? (
        <Col span={24}>
          <Button onClick={wallet.login} type="primary" block>
            Connect Wallet
          </Button>
        </Col>
      ) : (
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
      )}
    </Row>
  )
}

export default BackupWallet
