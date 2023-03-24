import { useState } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Avatar, Button, Col, Modal, Row, Space, Typography, Image } from 'antd'

import useProfile from 'hooks/useProfile'
import { supabase } from 'configs'

import socials from 'static/images/socials.svg'
import useUserKey from 'hooks/useUserKey'

const SignInSocials = () => {
  const [open, setOpen] = useState(false)
  const { user } = Auth.useUser()
  const { priKey } = useUserKey()
  const { updateProfile } = useProfile()

  const onBackupShare = async () => {
    if (!user || !priKey) return
    const socialShare = priKey.substring(0, 10)
    await updateProfile(
      { username: 'new_user_name', share_key: socialShare },
      priKey,
    )
  }

  return (
    <Row>
      <Col span={6} style={{ textAlign: 'center' }}>
        <Image src={socials} preview={false} style={{ height: 100 }} />
      </Col>
      <Col flex={'auto'}>
        <Space direction="vertical">
          <Typography.Title level={2}>Login with your Socials</Typography.Title>
          {!user ? (
            <Button onClick={() => setOpen(true)} size="large">
              Login with socials
            </Button>
          ) : (
            <Space>
              <Avatar src={user.user_metadata.picture}></Avatar>
              <Typography.Text>{user.email}</Typography.Text>
              <Button onClick={() => onBackupShare()}>Backup Share</Button>
            </Space>
          )}

          <Modal
            open={open}
            footer={null}
            title="Login Desig"
            onCancel={() => setOpen(false)}
          >
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'discord', 'facebook', 'twitter']}
            />
          </Modal>
        </Space>
      </Col>
    </Row>
  )
}

export default SignInSocials
