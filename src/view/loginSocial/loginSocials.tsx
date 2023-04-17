import { useMemo, useState } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { darkThemes, ThemeSupa } from '@supabase/auth-ui-shared'
import { Button, Col, Modal, Row } from 'antd'

import { supabase } from 'configs'
import { useTheme } from 'providers/ui.provider'

const LoginSocials = () => {
  const [open, setOpen] = useState(false)
  const { user } = Auth.useUser()

  const { theme } = useTheme()

  const styles = useMemo(() => {
    const dark = theme === 'dark'
    const appearance: any = { theme: JSON.parse(JSON.stringify(ThemeSupa)) }
    if (dark) {
      appearance.variables = { default: darkThemes.supabase }
    }
    return { appearance, dark }
  }, [theme])

  return (
    <Row>
      <Col span={24}>
        {user ? (
          <Button
            onClick={() =>
              supabase.auth.signOut().then(() => window.location.reload())
            }
            block
          >
            Logout
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)} type="primary" block>
            Login social
          </Button>
        )}
        <Modal
          open={open}
          footer={null}
          title="Login with socials"
          onCancel={() => setOpen(false)}
          destroyOnClose
        >
          <Auth
            {...styles}
            supabaseClient={supabase}
            providers={['google', 'discord', 'facebook', 'twitter']}
            onlyThirdPartyProviders
          />
        </Modal>
      </Col>
    </Row>
  )
}

export default LoginSocials
