import { ConfigProvider, theme } from 'antd'
import type { ReactNode } from 'react'
import { seedTokens, aliasTokens, dimensionTokens, typographyTokens } from '../tokens/semantic'
import { componentTokens } from '../tokens/components'

/**
 * UpS design system theme — single source of truth.
 *
 * Token hierarchy (mirrors Figma variable collections):
 *   palette.ts     — primitive color values (internal, not passed to antd)
 *   semantic.ts    — seed + alias tokens  → theme.token
 *   components.ts  — component overrides  → theme.components
 *
 * Antd derives Map Tokens (colorPrimaryBg, colorPrimaryHover, etc.) automatically
 * from Seed Tokens via its color algorithm — do not set those manually.
 */
const upsTheme = {
  token: {
    ...seedTokens,
    ...aliasTokens,
    ...dimensionTokens,
    ...typographyTokens,
  },
  components: componentTokens,
  algorithm: theme.defaultAlgorithm,
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={{ ...upsTheme, cssVar: { prefix: 'ant' } }}>
      {children}
    </ConfigProvider>
  )
}
