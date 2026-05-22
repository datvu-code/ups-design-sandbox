import { useState } from 'react'
import { message } from 'antd'
import { OrderPageTabs } from '../modules/Order/components/OrderList/OrderPageTabs'
import { OrderFilterBar } from '../modules/Order/components/OrderList/OrderFilterBar'
import { OrderListToolbar } from '../modules/Order/components/OrderList/OrderListToolbar'
import { OrderBulkActionBar } from '../modules/Order/components/OrderList/OrderBulkActionBar'
import { OrderStatusTabs } from '../modules/Order/components/OrderList/OrderStatusTabs'
import { OrderTable } from '../modules/Order/components/OrderList/OrderTable'
import { mockOrders, orderStatusTabs } from '../../mock-data/order'
import type { OrderFilterState, OrderPageTab, OrderStatus } from '../modules/Order/types'

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
