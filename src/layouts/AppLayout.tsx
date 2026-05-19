import { Layout, theme } from 'antd'
import type { ReactNode } from 'react'
import { AppSider } from './AppSider'

export function AppLayout({ children }: { children: ReactNode }) {
  const { token } = theme.useToken()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider />
      <Layout style={{ backgroundColor: token.colorBgLayout }}>
        <Layout.Content
          style={{
            padding: token.paddingLG,
            minHeight: '100vh',
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
