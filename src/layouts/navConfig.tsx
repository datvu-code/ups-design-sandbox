import type { MenuProps } from 'antd'

export type NavItem = NonNullable<MenuProps['items']>[number]

export const navItems: NavItem[] = [
  { key: 'order', label: 'Order' },
  { key: 'order-create', label: 'Order Create' },
  { key: 'products', label: 'Products' },
  { key: 'ads', label: 'Ads' },
  { key: 'report', label: 'Report' },
  { key: 'finance', label: 'Finance' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'customer-service', label: 'Customer Service' },
  { type: 'divider' },
  { key: 'tokens', label: '🎨 Design Tokens' },
]
