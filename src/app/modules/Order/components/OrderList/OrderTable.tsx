import { useState } from 'react'
import { Alert, Empty, Flex, Skeleton } from 'antd'
import { OrderRow } from './OrderRow'
import { OrderTableHeader } from './OrderTableHeader'
import { useOrderListStyles } from './OrderList.style'
import { TABLE_MIN_WIDTH } from '../../utils/tableColumns'
import type { Order } from '../../types'

interface OrderTableProps {
  orders: Order[]
  loading?: boolean
  error?: string | null
  onAction: (key: string, orderId: string) => void
  onSelectionChange: (selectedIds: string[]) => void
}

export function OrderTable({
  orders,
  loading = false,
  error = null,
  onAction,
  onSelectionChange,
}: OrderTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      checked ? next.add(id) : next.delete(id)
      onSelectionChange(Array.from(next))
      return next
    })
  }

  const handleSelectAll = (checked: boolean) => {
    const next = checked ? new Set(orders.map((o) => o.id)) : new Set<string>()
    setSelectedIds(next)
    onSelectionChange(Array.from(next))
  }

  const { styles } = useOrderListStyles()

  if (loading) {
    return (
      <Flex vertical gap={16}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
        ))}
      </Flex>
    )
  }

  if (error) {
    return (
      <Alert
        type="error"
        message="Không thể tải danh sách đơn hàng"
        description={error}
        showIcon
      />
    )
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <Empty description="Không có đơn hàng nào" />
      </div>
    )
  }

  const allSelected = selectedIds.size === orders.length
  const indeterminate = selectedIds.size > 0 && selectedIds.size < orders.length

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className={styles.scrollInner} style={{ minWidth: TABLE_MIN_WIDTH }}>
        <OrderTableHeader
          allSelected={allSelected}
          indeterminate={indeterminate}
          onSelectAll={handleSelectAll}
        />
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            selected={selectedIds.has(order.id)}
            onSelect={handleSelect}
            onAction={onAction}
          />
        ))}
      </div>
    </div>
  )
}
