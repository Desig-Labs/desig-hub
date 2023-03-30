import { ReactNode, useEffect, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

import { Button, Space, Tooltip } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

type CopyTextProps = { children?: ReactNode; text: string; size?: number }
const CopyText = ({ children, text, size = 0 }: CopyTextProps) => {
  const [copied, setCopied] = useState(false)
  const [state, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    if (state.value) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [state])
  return (
    <Space size={size}>
      {children}
      <Tooltip title="Copied" open={copied}>
        <Button
          type="link"
          size="small"
          onClick={() => copyToClipboard(text)}
          icon={<IonIcon name="copy-outline" />}
        />
      </Tooltip>
    </Space>
  )
}

export default CopyText
