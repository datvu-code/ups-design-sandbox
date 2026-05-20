import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppLayout } from './layouts/AppLayout'
import { OrderListPage } from './app/modules/Order/components/OrderListPage'
import { TokensPage } from './app/modules/Tokens/components/TokensPage'

const PAGES: Record<string, React.ReactNode> = {
  order: <OrderListPage />,
  tokens: <TokensPage />,
}

function App() {
  const [selected, setSelected] = useState('order')
  const page = PAGES[selected] ?? <OrderListPage />

  return (
    <ThemeProvider>
      <AppLayout selected={selected} onSelect={setSelected}>
        {page}
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
