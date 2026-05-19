import { Badge, Flex, Typography, theme } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

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
      <ReloadOutlined
        style={{ color: token.colorTextTertiary, cursor: 'pointer' }}
        onClick={onRefresh}
      />
    </Flex>
  )
}
