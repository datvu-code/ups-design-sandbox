import { palette } from './palette'

/**
 * Semantic tokens — mirrors Figma Collections:
 *   "1. Colors / Brand + Neutral"
 *   "2. Dimensions"
 *   "3. Typography"
 *
 * Three categories:
 *   SEED    — input to antd's algorithm; algorithm derives state colors (Bg, Hover, Active…) automatically
 *   ALIAS   — explicit overrides not derived by algorithm (all neutral colors, typography, spacing)
 *
 * Do NOT set Map Tokens (colorPrimaryBg, colorPrimaryHover, etc.) — let the algorithm derive them.
 * Source: HttbhVBjPw9HxgqcjBONuh (UpS Components)
 */

// ─── Seed Tokens (brand) ──────────────────────────────────────────────────────

export const seedTokens = {
  colorPrimary: palette.orange[5],   // #e65018 — Orange/5
  colorSuccess: palette.green[6],    // #007d00 — Green/6
  colorWarning: palette.gold[6],     // #a44300 — Gold/6
  colorError:   palette.red[5],      // #e74850 — Red/5
  colorInfo:    palette.blue[6],     // #2456d3 — Blue/6 (independent of primary)
  colorLink:    '#707274',           // colorTextTertiary (not derived from colorInfo)
} as const

// ─── Alias Tokens (neutral — not derived by algorithm) ────────────────────────

export const aliasTokens = {
  // Text
  colorText:             '#0f1215',
  colorTextSecondary:    '#404246',
  colorTextTertiary:     '#707274',
  colorTextQuaternary:   '#9d9ea1',
  colorTextDisabled:     '#9d9ea1',
  colorTextPlaceholder:  '#9d9ea1',
  colorTextHeading:      '#0f1215',

  // Background
  colorBgContainer:           '#ffffff',
  colorBgLayout:              '#f3f5f8',
  colorBgElevated:            '#ffffff',
  colorBgMask:                '#7f8083',
  colorBgContainerDisabled:   '#f0f2f4',

  // Border
  colorBorder:          '#d5d7db',
  colorBorderSecondary: '#edeef0',
  colorSplit:           '#e5e6e8',

  // Fill
  colorFill:           '#d2d4d7',
  colorFillSecondary:  '#e9ebee',
  colorFillTertiary:   '#f0f2f4',
  colorFillQuaternary: '#f8f8fa',

  // Icon
  colorIcon:      '#707274',
  colorIconHover: '#0f1215',
} as const

// ─── Dimension Tokens (spacing, sizing, radius) ───────────────────────────────

export const dimensionTokens = {
  // Padding — Figma "2. Dimensions / Space/Padding"
  padding:    16,
  paddingXXS: 4,
  paddingXS:  8,
  paddingSM:  12,
  paddingMD:  20,
  paddingLG:  24,
  paddingXL:  32,
  paddingXXL: 48,

  // Margin — Figma "2. Dimensions / Space/Margin"
  margin:    16,
  marginXXS: 2,
  marginXS:  8,
  marginSM:  12,
  marginMD:  20,
  marginLG:  24,
  marginXL:  32,
  marginXXL: 48,

  // Control heights — Figma "2. Dimensions / Size/Height"
  controlHeight:   32,
  controlHeightSM: 24,
  controlHeightLG: 40,
  controlHeightXS: 16,

  // Border radius — Figma "2. Dimensions / Border Radius"
  borderRadius:   6,
  borderRadiusXS: 2,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  borderRadiusXL: 10,

  // Line
  lineWidth:      1,
  lineWidthBold:  2,
  lineWidthFocus: 4,
} as const

// ─── Typography Tokens ────────────────────────────────────────────────────────

export const typographyTokens = {
  // Font family — Figma "3. Typography / Font Family"
  fontFamily:     "'Roboto', sans-serif",
  fontFamilyCode: "'Courier Prime', monospace",

  // Font size — Figma "3. Typography / Font Size"
  fontSize:          14,
  fontSizeSM:        12,
  fontSizeLG:        16,
  fontSizeXL:        20,
  fontSizeHeading1:  38,
  fontSizeHeading2:  30,
  fontSizeHeading3:  24,
  fontSizeHeading4:  20,
  fontSizeHeading5:  16,

  // Line height — Figma "3. Typography / Line Height"
  lineHeight:          1.5714,  // 22/14
  lineHeightSM:        1.6667,  // 20/12
  lineHeightLG:        1.5,     // 24/16
  lineHeightHeading1:  1.2105,  // 46/38
  lineHeightHeading2:  1.2667,  // 38/30
  lineHeightHeading3:  1.3333,  // 32/24
  lineHeightHeading4:  1.4,     // 28/20
  lineHeightHeading5:  1.5,     // 24/16

  // Font weight — Figma "3. Typography / Font Weight"
  fontWeightStrong: 600,
} as const
