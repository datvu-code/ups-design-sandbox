import { Layout, theme } from 'antd'
import type { ReactNode } from 'react'
import { AppSider } from './AppSider'

const CONTENT_MAX_WIDTH = 1440

export function AppLayout({ children }: { children: ReactNode }) {
  const { token } = theme.useToken()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider />
      <Layout style={{ backgroundColor: token.colorBgLayout }}>
        <Layout.Content style={{ padding: token.paddingLG, minHeight: '100vh' }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, width: '100%', margin: '0 auto' }}>
            {children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
