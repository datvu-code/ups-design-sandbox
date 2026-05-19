import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { navItems } from './navConfig'

export function AppSider() {
  const [selected, setSelected] = useState('order')

  return (
    <Layout.Sider width={220}>
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        items={navItems}
        onClick={({ key }) => setSelected(key)}
        style={{ height: '100%' }}
      />
    </Layout.Sider>
  )
}
