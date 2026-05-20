import { Badge, Flex, Typography } from 'antd'
import { IconRefresh } from '@tabler/icons-react'

interface OrderSyncStatusProps {
  lastSyncTime: string
  onRefresh: () => void
}

export function OrderSyncStatus({ lastSyncTime, onRefresh }: OrderSyncStatusProps) {
  return (
    <Flex align="center" gap={8}>
      <Badge status="success" />
      <Typography.Text type="secondary">
        Tất cả đơn hàng đã được cập nhật
      </Typography.Text>
      <Typography.Text type="secondary">•</Typography.Text>
      <Typography.Text type="secondary">{lastSyncTime}</Typography.Text>
      <IconRefresh
        size={14}
        style={{ color: 'var(--ant-color-text-tertiary)', cursor: 'pointer' }}
        onClick={onRefresh}
      />
    </Flex>
  )
}
