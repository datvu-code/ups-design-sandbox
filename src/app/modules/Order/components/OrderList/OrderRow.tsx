import { OrderRowHeader } from './OrderRowHeader'
import { OrderRowBody } from './OrderRowBody'
import { useOrderListStyles } from './OrderList.style'
import type { Order } from '../../types'

interface OrderRowProps {
  order: Order
  selected: boolean
  onSelect: (id: string, checked: boolean) => void
  onAction: (key: string, orderId: string) => void
}

export function OrderRow({ order, selected, onSelect, onAction }: OrderRowProps) {
  const { styles } = useOrderListStyles()
  return (
    <div className={styles.rowCard}>
      <OrderRowHeader
        order={{
          id: order.id,
          shopName: order.shopName,
          placedAt: order.placedAt,
          badgeStatus: order.badgeStatus,
        }}
      />
      <OrderRowBody
        order={order}
        selected={selected}
        onSelect={onSelect}
        onAction={onAction}
      />
    </div>
  )
}
