import { Button, Divider, Flex, theme } from 'antd'
import { OrderSyncStatus } from './OrderSyncStatus'
import { OrderExportActions } from './OrderExportActions'

interface OrderListToolbarProps {
  lastSyncTime: string
  onRefresh: () => void
  onViewHistory: () => void
  onBulkProcess: () => void
}

export function OrderListToolbar({
  lastSyncTime,
  onRefresh,
  onViewHistory,
  onBulkProcess,
}: OrderListToolbarProps) {
  const { token } = theme.useToken()
  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      gap={token.marginSM}
      style={{ padding: `${token.paddingSM}px ${token.paddingLG}px` }}
    >
      <OrderSyncStatus lastSyncTime={lastSyncTime} onRefresh={onRefresh} />
      <Flex align="center" gap={token.marginXS} wrap>
        <OrderExportActions onViewHistory={onViewHistory} />
        <Divider type="vertical" style={{ height: 24, margin: 0 }} />
        <Button type="primary" onClick={onBulkProcess}>
          Xử lý hàng loạt
        </Button>
      </Flex>
    </Flex>
  )
}
