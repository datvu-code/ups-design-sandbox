import { Tabs } from 'antd'
import type { OrderPageTab } from '../../types'

const PAGE_TABS: { key: OrderPageTab; label: string }[] = [
  { key: 'marketplace', label: 'Đơn từ sàn' },
  { key: 'manual', label: 'Đơn thủ công' },
  { key: 'pos', label: 'Đơn POS' },
  { key: 'mine', label: 'Đơn của tôi' },
  { key: 'history', label: 'Lịch sử' },
]

interface OrderPageTabsProps {
  activeTab: OrderPageTab
  onTabChange: (tab: OrderPageTab) => void
}

export function OrderPageTabs({ activeTab, onTabChange }: OrderPageTabsProps) {
  return (
    <Tabs
      activeKey={activeTab}
      items={PAGE_TABS.map((t) => ({ key: t.key, label: t.label }))}
      onChange={(key) => onTabChange(key as OrderPageTab)}
      style={{ marginBottom: 0 }}
    />
  )
}
