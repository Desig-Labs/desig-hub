import { useState } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Button, Col, Modal, Row } from 'antd'

import { supabase } from 'configs'

const LoginSocials = () => {
  const [open, setOpen] = useState(false)
  const { user } = Auth.useUser()

  return (
    <Row>
      <Col span={24}>
        {user ? (
          <Button
            onClick={() => supabase.auth.signOut()}
            size="large"
            type="primary"
            block
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => setOpen(true)}
            size="large"
            type="primary"
            block
          >
            Login social
          </Button>
        )}
        <Modal
          open={open}
          footer={null}
          title="Login with socials"
          onCancel={() => setOpen(false)}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'discord', 'facebook', 'twitter']}
            onlyThirdPartyProviders
          />
        </Modal>
      </Col>
    </Row>
  )
}

export default LoginSocials
