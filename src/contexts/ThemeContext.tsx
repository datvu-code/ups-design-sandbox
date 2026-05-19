import { ConfigProvider, theme } from 'antd'
import type { ReactNode } from 'react'

const upsTheme = {
  token: {
    colorPrimary: '#e65018',
    colorBgLayout: '#f3f5f8',
    colorBgContainer: '#ffffff',
    colorText: '#0f1215',
    colorTextSecondary: '#404246',
    colorTextTertiary: '#707274',
    colorBorder: '#d5d7db',
    colorBorderSecondary: '#edeef0',
    colorError: '#e74850',
    colorSuccess: '#007d00',
    colorWarning: '#a44300',
    fontFamily: "'Roboto', sans-serif",
    borderRadius: 6,
    borderRadiusLG: 8,
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    margin: 16,
    marginLG: 24,
    marginSM: 12,
    marginXS: 8,
  },
  algorithm: theme.defaultAlgorithm,
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={upsTheme}>{children}</ConfigProvider>
}
