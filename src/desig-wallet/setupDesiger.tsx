import { Modal, Form, Input, Button } from 'antd'
import { useProfile } from 'hooks/useProfile'
import { useDesigerStore } from 'providers/desiger.provider'

const SetupDesiger = () => {
  const [form] = Form.useForm()
  const {
    profile: { public_key },
  } = useDesigerStore()
  const { loading, createProfile } = useProfile()

  const handleCreateDesiger = async (values: Record<string, string>) => {
    // Set Wallet
    const data = await createProfile({
      public_key: values['public_key'],
      username: values['username'],
    })
    if (!!data) window.location.reload()
  }

  return (
    <Modal open footer={null} title="Setup Profile">
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleCreateDesiger}
      >
        <Form.Item label="Public Key">
          <Input disabled size="large" value={public_key} />
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
