import { Button, Divider, Flex } from 'antd'
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
  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      gap={12}
      style={{ padding: 'var(--ant-padding-sm) var(--ant-padding-lg)' }}
    >
      <OrderSyncStatus lastSyncTime={lastSyncTime} onRefresh={onRefresh} />
      <Flex align="center" gap={8} wrap>
        <OrderExportActions onViewHistory={onViewHistory} />
        <Divider vertical style={{ height: 24, margin: 0 }} />
        <Button type="primary" onClick={onBulkProcess}>
          Xử lý hàng loạt
        </Button>
      </Flex>
    </Flex>
  )
}
