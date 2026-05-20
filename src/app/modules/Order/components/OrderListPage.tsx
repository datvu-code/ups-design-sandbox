import { useState } from 'react'
import { message } from 'antd'
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

const card: React.CSSProperties = {
  backgroundColor: 'var(--ant-color-bg-container)',
  borderRadius: 'var(--ant-border-radius-lg)',
  boxShadow: 'var(--ant-box-shadow-tertiary)',
  marginBottom: 'var(--ant-margin)',
}

export function OrderListPage() {
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

  return (
    <div>
      <OrderPageTabs activeTab={pageTab} onTabChange={setPageTab} />

      <div style={{ ...card, padding: 'var(--ant-padding-lg)' }}>
        <OrderFilterBar
          filter={filter}
          onFilterChange={handleFilterChange}
          onAdvancedFilter={() => message.info('Tính năng đang phát triển')}
        />
      </div>

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
        <div style={{ padding: '0 var(--ant-padding-lg)' }}>
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
