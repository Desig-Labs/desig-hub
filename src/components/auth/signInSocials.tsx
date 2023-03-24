import { useState } from 'react'
import * as ed from '@noble/ed25519'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Avatar, Button, Col, Modal, Row, Space, Typography, Image } from 'antd'

import useProfile from 'hooks/useProfile'
import { supabase } from 'configs'

import socials from 'static/images/socials.svg'

const SignInSocials = () => {
  const [open, setOpen] = useState(false)
  const { user } = Auth.useUser()
  const { profile, updateProfile } = useProfile()

  const onBackupKey = async () => {
    if (!user) return
    const privateKey = ed.utils.randomPrivateKey()
    await updateProfile(
      { username: 'ola' },
      Buffer.from(privateKey).toString('hex'),
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
              <Button onClick={() => onBackupKey()}>Backup Key</Button>
              <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
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
