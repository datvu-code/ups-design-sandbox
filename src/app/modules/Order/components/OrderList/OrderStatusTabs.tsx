
import { Tabs } from 'antd'
import { IconAlertTriangle } from '@tabler/icons-react'
import type { OrderStatus, OrderStatusTab } from '../../types'

interface OrderStatusTabsProps {
  tabs: OrderStatusTab[]
  activeStatus: OrderStatus
  onStatusChange: (status: OrderStatus) => void
}

function tabLabel(tab: OrderStatusTab): React.ReactNode {
  const countText = tab.count !== null ? ` (${tab.count})` : ''
  if (tab.warning) {
    return (
      <span>
        <IconAlertTriangle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        {tab.label}
        {countText}
      </span>
    )
  }
  return `${tab.label}${countText}`
}

export function OrderStatusTabs({ tabs, activeStatus, onStatusChange }: OrderStatusTabsProps) {
  const items = tabs.map((tab) => ({
    key: tab.status,
    label: tabLabel(tab),
  }))

  return (
    <div style={{ overflowX: 'auto' }}>
      <Tabs
        activeKey={activeStatus}
        items={items}
        onChange={(key) => onStatusChange(key as OrderStatus)}
        style={{ marginBottom: 0, minWidth: 'max-content' }}
      />
    </div>
  )
}
