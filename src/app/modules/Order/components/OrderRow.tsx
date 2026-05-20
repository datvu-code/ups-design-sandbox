import { OrderRowHeader } from './OrderRowHeader'
import { OrderRowBody } from './OrderRowBody'
import type { Order } from '../types'
import styles from './OrderRow.module.css'

interface OrderRowProps {
  order: Order
  selected: boolean
  onSelect: (id: string, checked: boolean) => void
  onAction: (key: string, orderId: string) => void
}

export function OrderRow({ order, selected, onSelect, onAction }: OrderRowProps) {
  return (
    <div className={styles.card}>
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
