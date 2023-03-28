import { Button, Form, Input, PageHeader } from 'antd'

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
    <PageHeader
      ghost={false}
      title="Profile Management"
      subTitle={profile?.username || '--'}
      style={{ height: '100%' }}
    >
      <Form
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
    </PageHeader>
  )
}

export default ProfileManagement
