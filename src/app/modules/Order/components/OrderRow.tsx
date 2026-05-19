import { theme } from 'antd'
import { OrderRowHeader } from './OrderRowHeader'
import { OrderRowBody } from './OrderRowBody'
import type { Order } from '../types'

interface OrderRowProps {
  order: Order
  selected: boolean
  onSelect: (id: string, checked: boolean) => void
  onAction: (key: string, orderId: string) => void
}

export function OrderRow({ order, selected, onSelect, onAction }: OrderRowProps) {
  const { token } = theme.useToken()
  return (
    <div
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        marginBottom: token.marginSM,
      }}
    >
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
