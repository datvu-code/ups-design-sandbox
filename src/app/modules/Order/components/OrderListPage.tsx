import { useState } from 'react'
import { message, theme } from 'antd'
import { OrderPageTabs } from './OrderPageTabs'
import { OrderFilterBar } from './OrderFilterBar'
import { OrderListToolbar } from './OrderListToolbar'
import { OrderBulkActionBar } from './OrderBulkActionBar'
import { OrderStatusTabs } from './OrderStatusTabs'
import { OrderTable } from './OrderTable'
import { mockOrders, orderStatusTabs } from '../../../../mock-data/order'
import type { OrderFilterState, OrderPageTab, OrderStatus } from '../types'

const DEFAULT_FILTER: OrderFilterState = {
  dateFilterType: 'created_at',
  dateRange: null,
  platform: null,
  shop: null,
  searchType: 'order_id',
  searchQuery: '',
  warehouse: null,
}

export function OrderListPage() {
  const { token } = theme.useToken()
  const [pageTab, setPageTab] = useState<OrderPageTab>('marketplace')
  const [filter, setFilter] = useState<OrderFilterState>(DEFAULT_FILTER)
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all')
  const [sortBy, setSortBy] = useState('placed_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleFilterChange = (patch: Partial<OrderFilterState>) =>
    setFilter((prev) => ({ ...prev, ...patch }))

  const filteredOrders =
    activeStatus === 'all'
      ? mockOrders
      : mockOrders.filter((o) => o.tabStatus === activeStatus)

  const card = {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
    marginBottom: token.margin,
  }

  return (
    <div>
      {/* Page-level tabs */}
      <OrderPageTabs activeTab={pageTab} onTabChange={setPageTab} />

      {/* Filter bar */}
      <div style={{ ...card, padding: token.paddingLG }}>
        <OrderFilterBar
          filter={filter}
          onFilterChange={handleFilterChange}
          onAdvancedFilter={() => message.info('Tính năng đang phát triển')}
        />
      </div>

      {/* Toolbar + bulk actions + status tabs */}
      <div style={card}>
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
