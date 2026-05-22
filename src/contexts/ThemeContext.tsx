import { ConfigProvider, theme } from 'antd'
import type { ReactNode } from 'react'

const upsTheme = {
  token: {
    // Brand
    colorPrimary: '#e65018',

    // Neutral — UpS gray scale (differs from antd defaults)
    colorText:             '#0f1215',
    colorTextSecondary:    '#404246',
    colorTextTertiary:     '#707274',
    colorTextQuaternary:   '#9d9ea1',
    colorBgLayout:         '#f3f5f8',
    colorBorder:           '#d5d7db',
    colorBorderSecondary:  '#edeef0',

    // Typography
    fontFamily: "'Roboto', sans-serif",
  },
  algorithm: theme.defaultAlgorithm,
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={{ ...upsTheme, cssVar: { prefix: 'ant' } }}>
      {children}
    </ConfigProvider>
  )
}
