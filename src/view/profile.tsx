import { Button, Form, Input, PageHeader } from 'antd'

import { useProfile, useUpdateProfile } from 'hooks/useProfile'
import { useUserKey } from 'hooks/useUserKey'
import { useEffect } from 'react'

const Profile = () => {
  const profile = useProfile()
  const [form] = Form.useForm()
  const { updateProfile } = useUpdateProfile()
  const { priKey } = useUserKey()

  const handleUpdateProfile = (values: any) => {
    try {
      if (!priKey) throw new Error('Invalid priKey')
      updateProfile({ privateKey: priKey, ...values })
      console.log('values', values)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    if (!profile) return
    form.setFieldValue('uid', profile.uid)
    form.setFieldValue('public_key', profile.public_key)
    form.setFieldValue('username', profile.username)
  }, [form, profile])

  if (!profile) return null
  return (
    <PageHeader
      ghost={false}
      title="Profile management"
      subTitle={profile.username}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleUpdateProfile}
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
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PageHeader>
  )
}

export default Profile
