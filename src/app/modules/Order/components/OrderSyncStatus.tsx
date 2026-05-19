import { Badge, Flex, Typography, theme } from 'antd'
import { IconRefresh } from '@tabler/icons-react'

interface OrderSyncStatusProps {
  lastSyncTime: string
  onRefresh: () => void
}

export function OrderSyncStatus({ lastSyncTime, onRefresh }: OrderSyncStatusProps) {
  const { token } = theme.useToken()
  return (
    <Flex align="center" gap={token.marginXS}>
      <Badge status="success" />
      <Typography.Text type="secondary">
        Tất cả đơn hàng đã được cập nhật
      </Typography.Text>
      <Typography.Text type="secondary">•</Typography.Text>
      <Typography.Text type="secondary">{lastSyncTime}</Typography.Text>
      <IconRefresh
        size={14}
        color={token.colorTextTertiary}
        style={{ cursor: 'pointer' }}
        onClick={onRefresh}
      />
    </Flex>
  )
}
