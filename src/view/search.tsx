import { useState } from 'react'

import { Button, Form, Input, Tag } from 'antd'
import { supabase } from 'configs'
import { toast } from 'react-toastify'

export const Search = () => {
  const [form] = Form.useForm()
  const search = Form.useWatch('search', form)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<{ username: string }[]>([])

  const onSearch = async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .ilike('username', `%${search}%`)

      setUsers(data || [])
    } catch (error: any) {
      toast('Search error:' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      title="Search Handle"
      form={form}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onSearch}
    >
      <Form.Item
        label="Search"
        name="search"
        rules={[{ required: true, message: 'Please input your search!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Search
        </Button>
      </Form.Item>
      {users.map((user) => (
        <Tag color="purple" key={user.username}>
          {user.username}
        </Tag>
      ))}
    </Form>
  )
}
