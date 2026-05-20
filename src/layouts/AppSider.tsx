import { Layout, Menu } from 'antd'
import { navItems } from './navConfig'

interface AppSiderProps {
  selected: string
  onSelect: (key: string) => void
}

export function AppSider({ selected, onSelect }: AppSiderProps) {
  return (
    <Layout.Sider width={220}>
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        items={navItems}
        onClick={({ key }) => onSelect(key)}
        style={{ height: '100%' }}
      />
    </Layout.Sider>
  )
}
