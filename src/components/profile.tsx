import { Auth } from '@supabase/auth-ui-react'
import { Button, Descriptions, PageHeader } from 'antd'
import * as ed from '@noble/ed25519'

import useUserKey from 'hooks/useUserKey'
import useProfile from 'hooks/useProfile'
import { supabase } from 'configs'

const Profile = () => {
  const { user } = Auth.useUser()
  const { profile, updateProfile } = useProfile()
  const { priKey, pubKey, backupPrivateKey } = useUserKey()

  const generateNewKey = async () => {
    const privateKey = ed.utils.randomPrivateKey()
    const newUserKey = await backupPrivateKey(privateKey)
    const prevPriKey = priKey || newUserKey.priKey
    await updateProfile({ public_key: newUserKey.pubKey }, prevPriKey)
  }

  if (!profile) return null
  return (
    <PageHeader
      ghost={false}
      title="Profile"
      subTitle={profile?.username || '--'}
      extra={[
        <Button key="2" onClick={() => generateNewKey()} type="primary">
          New Key
        </Button>,
        <Button key="1" onClick={() => supabase.auth.signOut()}>
          Logout
        </Button>,
      ]}
      avatar={{ src: user?.user_metadata.picture }}
    >
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="PublicKey Key">
          {pubKey || '--'}
        </Descriptions.Item>
        <Descriptions.Item label="Private Key">
          {priKey || '--'}
        </Descriptions.Item>
        <Descriptions.Item label="Social Share Key">
          {profile.share_key || '--'}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}

export default Profile
