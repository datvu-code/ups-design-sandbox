import { ConfigProvider } from 'antd'
import type { ReactNode } from 'react'

const upsTheme = {
  token: {
    // Brand
    colorPrimary:         '#e65018',
    colorPrimaryHover:    '#cc4010',
    colorPrimaryActive:   '#b91800',
    colorPrimaryBg:       '#fff5f3',
    colorLink:            '#e65018',
    colorLinkHover:       '#cc4010',
    colorLinkActive:      '#b91800',

    // Text hierarchy
    colorText:            '#0f1215',
    colorTextSecondary:   '#404246',
    colorTextTertiary:    '#707274',
    colorTextQuaternary:  '#9d9ea1',

    // Surfaces
    colorBgLayout:        '#f3f5f8',
    colorBgContainer:     '#ffffff',
    colorBgElevated:      '#ffffff',

    // Borders
    colorBorder:          '#d5d7db',
    colorBorderSecondary: '#edeef0',

    // Semantic
    colorSuccess:         '#007d00',
    colorWarning:         '#a44300',
    colorError:           '#e74850',
    colorInfo:            '#2456d3',

    // Typography
    fontFamily:           'Roboto, Helvetica, sans-serif',
    fontSize:             14,
    fontSizeSM:           12,
    fontSizeLG:           16,
    lineHeight:           1.57,

    // Radius
    borderRadiusSM:       4,
    borderRadius:         6,
    borderRadiusLG:       8,
  },
  components: {
    Button: {
      controlHeight:          36,
      fontWeight:             500,
      defaultBg:              '#e5e5e5',
      defaultColor:           '#0f1215',
      defaultBorderColor:     'transparent',
      defaultHoverBg:         '#d0d2d6',
      defaultHoverColor:      '#0f1215',
      defaultHoverBorderColor:'transparent',
      defaultActiveBg:        '#c6c9ce',
      defaultActiveColor:     '#0f1215',
      defaultActiveBorderColor:'transparent',
      borderColorDisabled:    'transparent',
      defaultShadow:          'none',
      primaryShadow:          'none',
    },
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={{ ...upsTheme, cssVar: { prefix: 'ant' } }}>
      {children}
    </ConfigProvider>
  )
}
