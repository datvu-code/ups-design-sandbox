import { Button, Flex, Typography } from 'antd'
import { IconPlus } from '@tabler/icons-react'

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ant-color-bg-container)',
  borderRadius: 'var(--ant-border-radius-lg)',
  padding: 'var(--ant-padding-lg)',
  marginBottom: 'var(--ant-margin)',
}

export function ShippingInfo() {
  return (
    <div style={sectionStyle}>
      <Flex justify="space-between" align="center">
        <Typography.Text strong style={{ fontSize: 'var(--ant-font-size-lg)' }}>Thông tin vận chuyển</Typography.Text>
        <Button type="primary" icon={<IconPlus size={14} />}>
          Thêm vận chuyển
        </Button>
      </Flex>
    </div>
  )
}
