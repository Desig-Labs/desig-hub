import { Button, Col, Form, Input, PageHeader, Row } from 'antd'
import { useSharedKey } from 'hooks/useSharedKey'

export const SharedKey = () => {
  const [form] = Form.useForm()

  const { backupSharedKey, restoreSharedKey, loading } = useSharedKey()

  const onRestoreSharedKey = async () => {
    const { shared_key } = await restoreSharedKey()
    form.setFieldValue('shared_key', shared_key)
  }

  return (
    <PageHeader ghost={false} title="Shared Key">
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={(values) => backupSharedKey(values.shared_key)}
      >
        <Form.Item
          label="Shared Key"
          name="shared_key"
          rules={[{ required: true, message: 'Please input your search!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Backup
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="ghost"
                block
                loading={loading}
                onClick={onRestoreSharedKey}
              >
                Restore
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PageHeader>
  )
}
