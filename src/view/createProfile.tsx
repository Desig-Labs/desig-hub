import { useCallback, useEffect } from 'react'
import * as ed from '@noble/ed25519'

import { Auth } from '@supabase/auth-ui-react'
import { Button, Col, Form, Input, PageHeader, Row } from 'antd'
import { useCreateProfile } from 'hooks/useProfile'
import { useUserKey } from 'hooks/useUserKey'

export const CreateProfile = () => {
  const { user } = Auth.useUser()
  const [form] = Form.useForm()
  const privKey = Form.useWatch('privKey', form)
  const pubKey = Form.useWatch('pubKey', form)
  const { set: setUserKey, get } = useUserKey()

  const { createProfile, loading } = useCreateProfile()

  const syncPublicKey = useCallback(async () => {
    let newPubKey = ''
    try {
      const priv = Buffer.from(privKey, 'hex')
      const public_key = await ed.getPublicKey(priv)
      newPubKey = Buffer.from(public_key).toString('hex')
    } catch (error) {
      console.log('load publicKey error:', error)
    } finally {
      form.setFieldValue('pubKey', newPubKey)
      setUserKey({
        pubKey: newPubKey,
        privKey,
      })
    }
  }, [form, privKey, setUserKey])
  useEffect(() => {
    syncPublicKey()
  }, [syncPublicKey])

  const onNewPrivKey = async () => {
    const private_key = await ed.utils.randomPrivateKey()
    const newPrivKey = Buffer.from(private_key).toString('hex')
    form.setFieldValue('privKey', newPrivKey)
  }

  const onLoadPrivKey = async () => {
    const privateKey = await get(pubKey)
    form.setFieldValue('privKey', privateKey)
  }

  return (
    <PageHeader
      ghost={false}
      title="Create Profile"
      subTitle={user?.email || '--'}
      style={{ height: '100%' }}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={createProfile}
      >
        <Form.Item
          label="Private Key"
          name="privKey"
          rules={[
            { required: true, message: 'Please input your private key!' },
          ]}
        >
          <Input
            suffix={
              <Button type="primary" onClick={onNewPrivKey}>
                New
              </Button>
            }
          />
        </Form.Item>

        <Form.Item label="Public Key" name="pubKey">
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Submit
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="ghost"
                block
                loading={loading}
                onClick={onLoadPrivKey}
              >
                Load from local storage
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PageHeader>
  )
}
