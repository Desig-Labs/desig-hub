import { ReactNode } from 'react'

import { Card, Col, Row, Spin, Tag, Typography } from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'

type StatusType = 'processing' | 'success' | 'waiting'

const Status = ({ type }: { type: StatusType }) => {
  switch (type) {
    case 'success':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          success
        </Tag>
      )
    case 'waiting':
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          waiting
        </Tag>
      )
    default:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          processing
        </Tag>
      )
  }
}

const CardProcess = ({
  title,
  description,

  type,
  children,
}: {
  title: string
  description: string

  type: StatusType
  children: ReactNode
}) => {
  return (
    <Spin spinning={type === 'waiting'} indicator={<SyncOutlined spin />}>
      <Card hoverable>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Title level={3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
          </Col>
          <Col>
            <Status type={type} />
          </Col>
          <Col span={24}>
            <Typography.Paragraph type="secondary">
              {description}
            </Typography.Paragraph>
          </Col>
          <Col span={24}>{children}</Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default CardProcess
