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

export type OrderPageTab = 'marketplace' | 'manual' | 'pos' | 'mine' | 'history'

export type OrderDateFilterType = 'created_at' | 'updated_at' | 'delivered_at'

export type OrderSearchType = 'order_id' | 'product_name' | 'recipient_name' | 'tracking_number'

export interface OrderFilterState {
  dateFilterType: OrderDateFilterType
  dateRange: [string, string] | null
  platform: string | null
  shop: string | null
  searchType: OrderSearchType
  searchQuery: string
  warehouse: string | null
}

// ─── Order Create ─────────────────────────────────────────────────────────────

export type WarehouseMode = 'auto' | 'manual'
export type NoteType = 'internal' | 'customer'
export type OrderCodeMode = 'manual' | 'auto'

export interface OrderCreateForm {
  customerId: string | null
  channel: string | null
  shop: string | null
  warehouse: string | null
  warehouseMode: WarehouseMode
  noteType: NoteType
  note: string
  tags: string[]
  salesStaff: string | null
  marketingStaff: string | null
  orderDate: string
  expectedDeliveryDate: string | null
  utm: string
  orderCodeMode: OrderCodeMode
  isKocKol: boolean
}

export interface StaffOption {
  value: string
  label: string
}

export interface ChannelOption {
  value: string
  label: string
}

// ─── Order ───────────────────────────────────────────────────────────────────

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
