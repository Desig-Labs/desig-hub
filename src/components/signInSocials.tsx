import { useState } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Button, Col, Modal, Row } from 'antd'

import { supabase } from 'configs'

const SignInSocials = () => {
  const [open, setOpen] = useState(false)
  const { user } = Auth.useUser()

  const HandleButton = () => {
    if (user) {
      return (
        <Button key="1" onClick={() => supabase.auth.signOut()}>
          Logout
        </Button>
      )
    }
    return (
      <Button onClick={() => setOpen(true)} size="large" type="primary">
        Login
      </Button>
    )
  }

  return (
    <Row>
      <Col span={24}>
        <HandleButton />
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
      </Col>
    </Row>
  )
}

export default SignInSocials
