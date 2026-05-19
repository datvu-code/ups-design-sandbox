import { Flex, Typography, theme } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

interface OrderSyncStatusProps {
  lastSyncTime: string
  onRefresh: () => void
}

export function OrderSyncStatus({ lastSyncTime, onRefresh }: OrderSyncStatusProps) {
  const { token } = theme.useToken()
  return (
    <Flex align="center" gap={token.marginXS}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: token.colorSuccess,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
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
