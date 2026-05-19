export const ORDER_TABLE_COLUMNS = [
  { key: 'product', label: 'Thông tin sản phẩm', flex: 3, minWidth: 260 },
  { key: 'total', label: 'Tổng tiền', flex: 1, minWidth: 110 },
  { key: 'warehouse', label: 'Kho xử lý', flex: 1.2, minWidth: 130 },
  { key: 'processing', label: 'Xử lý', flex: 1.5, minWidth: 150 },
  { key: 'shipping', label: 'Vận chuyển', flex: 2, minWidth: 180 },
  { key: 'recipient', label: 'Người nhận', flex: 1.2, minWidth: 120 },
  { key: 'action', label: 'Thao tác', flex: 1, minWidth: 100 },
] as const

// Sum of minWidths — the scroll container uses this as its minimum inner width
export const TABLE_MIN_WIDTH = ORDER_TABLE_COLUMNS.reduce((sum, col) => sum + col.minWidth, 0)
