import { useCallback, useEffect } from 'react'
import * as ed from '@noble/ed25519'

import { Modal, Form, Input, Button } from 'antd'
import { useProfile } from 'hooks/useProfile'
import { DESIGER } from 'desig-wallet'

const SetupDesiger = () => {
  const [form] = Form.useForm()
  const privKey = Form.useWatch('privKey', form)
  const { loading, createProfile } = useProfile()

  const syncPublicKey = useCallback(async () => {
    let newPubKey = ''
    try {
      const priv = Buffer.from(privKey, 'hex')
      const pubKey = await ed.getPublicKey(priv)
      newPubKey = Buffer.from(pubKey).toString('hex')
    } catch (error) {
      console.log('load publicKey error:', error)
    } finally {
      form.setFieldValue('public_key', newPubKey)
    }
  }, [form, privKey])

  useEffect(() => {
    syncPublicKey()
  }, [syncPublicKey])

  const onNewPrivKey = async () => {
    const private_key = await ed.utils.randomPrivateKey()
    const newPrivKey = Buffer.from(private_key).toString('hex')
    form.setFieldValue('privKey', newPrivKey)

    // Connect wallet
    await DESIGER.setDesiger(newPrivKey)
  }

  const handleCreateDesiger = async (values: Record<string, string>) => {
    // Set Wallet
    await DESIGER.setDesiger(privKey)
    const data = await createProfile({
      public_key: values['public_key'],
      username: values['username'],
    })
    if (!!data) window.location.reload()
  }
  return (
    <Modal open footer={null} title="Install Desig Wallet">
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleCreateDesiger}
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

        <Form.Item label="Public Key" name="public_key">
          <Input disabled size="large" />
        </Form.Item>

        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SetupDesiger
