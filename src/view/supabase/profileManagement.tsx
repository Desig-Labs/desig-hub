import { Button, Form, Input } from 'antd'

import { useProfile, useUpdateProfile } from 'hooks/useProfile'
import { useEffect } from 'react'

const ProfileManagement = () => {
  const profile = useProfile()
  const [form] = Form.useForm()
  const { loading, updateProfile } = useUpdateProfile()

  useEffect(() => {
    if (!profile) return
    form.setFieldValue('uid', profile.uid)
    form.setFieldValue('public_key', profile.public_key)
    form.setFieldValue('username', profile.username)
  }, [form, profile])

  return (
    <Form
      title="Profile Management"
      form={form}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={updateProfile}
    >
      <Form.Item label="UserID" name="uid">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Public Key" name="public_key">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="User Name" name="username">
        <Input size="large" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProfileManagement
