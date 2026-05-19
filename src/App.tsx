import { ThemeProvider } from './contexts/ThemeContext'
import { AppLayout } from './layouts/AppLayout'
import { OrderListPage } from './app/modules/Order/components/OrderListPage'

function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <OrderListPage />
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
