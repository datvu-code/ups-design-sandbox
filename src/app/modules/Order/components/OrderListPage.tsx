import { useState } from 'react'
import { theme } from 'antd'
import { OrderListToolbar } from './OrderListToolbar'
import { OrderBulkActionBar } from './OrderBulkActionBar'
import { OrderStatusTabs } from './OrderStatusTabs'
import { OrderTable } from './OrderTable'
import { mockOrders, orderStatusTabs } from '../../../../mock-data/order'
import type { OrderStatus } from '../types'

export function OrderListPage() {
  const { token } = theme.useToken()
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all')
  const [sortBy, setSortBy] = useState('placed_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredOrders =
    activeStatus === 'all'
      ? mockOrders
      : mockOrders.filter((o) => o.tabStatus === activeStatus)

  const headerCard = {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
    marginBottom: token.marginSM,
  }

  return (
    <div>
      <div style={headerCard}>
        <OrderListToolbar
          lastSyncTime="10:00 19/05/2026"
          onRefresh={() => {}}
          onViewHistory={() => {}}
          onBulkProcess={() => {}}
        />
        <OrderBulkActionBar
          selectedCount={selectedIds.length}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={setSortBy}
          onDirectionChange={setSortDirection}
        />
        <div style={{ padding: `0 ${token.paddingLG}px` }}>
          <OrderStatusTabs
            tabs={orderStatusTabs}
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
          />
        </div>
      </div>
      <OrderTable
        orders={filteredOrders}
        onAction={() => {}}
        onSelectionChange={setSelectedIds}
      />
    </div>
  )
}
