import { Col, Row, Typography } from 'antd'
import CopyText from './utils/copyText'

import { shortenString } from 'utils'

export const RowInfo = ({
  title,
  value,
}: {
  title: string
  value?: string | null
}) => {
  return (
    <Row>
      <Col flex="auto">
        <Typography.Title level={5}>{title}</Typography.Title>
      </Col>
      <Col>
        {value ? (
          <Typography.Text>
            {shortenString(value)} <CopyText text={value || ''} />
          </Typography.Text>
        ) : (
          <Typography.Text>--</Typography.Text>
        )}
      </Col>
    </Row>
  )
}
