export type OrderStatus =
  | 'all'
  | 'pending_approval'
  | 'packing'
  | 'waiting_pickup'
  | 'error'
  | 'shipping'
  | 'completed'
  | 'cancelled'
  | 'no_warehouse'
  | 'waybill_info'

export type OrderBadgeStatus =
  | 'waiting_pack'
  | 'packing'
  | 'waiting_pickup'
  | 'shipping'
  | 'completed'
  | 'cancelled'
  | 'error'
  | 'pending_approval'
  | 'no_warehouse'

export interface OrderStatusTab {
  label: string
  status: OrderStatus
  count: number | null
  warning?: boolean
}

export interface OrderItem {
  thumbnail: string
  name: string
  variant: string
  quantity: number
  totalAmount: number
}

export interface OrderProcessing {
  deadline: string | null
  isOverdue: boolean
  dsProcessingId?: string
  deliverBefore?: string
  cbhBefore?: string | null
}

export interface OrderShipping {
  carrier: string
  trackingNumber: string
  waybillNumber?: string
  pickupMethod: string
}

export interface OrderRecipient {
  name: string
  province: string
}

export interface Order {
  id: string
  shopName: string
  placedAt: string
  badgeStatus: OrderBadgeStatus
  tabStatus: OrderStatus
  items: OrderItem[]
  warehouse: string
  processing: OrderProcessing
  shipping: OrderShipping
  recipient: OrderRecipient
}
