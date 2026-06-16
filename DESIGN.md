---
version: "alpha"
name: "UpS Design System"
description: "Design token contract for sme-webapp and the UpS Design Sandbox. All keys use exact Ant Design v6 token names — set via ConfigProvider in src/contexts/ThemeContext.tsx. In createStyles use token.<key>; in CSS Modules use var(--ant-<kebab-key>). Coding rules, forbidden patterns, and CSS architecture: CLAUDE.md."
see-also: "CLAUDE.md"

# ─── Colors ───────────────────────────────────────────────────────────────────
# Keys are Ant Design seed/alias token names (colorPrimary, colorText, …).
# Hover/active/bg variants are derived by Ant — do not redefine in feature files.
colors:
  # Brand
  colorPrimary: "#e65018"
  colorPrimaryHover: "#cc4010"       # shade — darker than default, lighter than active
  colorPrimaryActive: "#b91800"      # derived
  colorPrimaryBg: "#fff5f3"          # derived
  # Link — intentionally mirrors brand so <a> and Button type="link" stay on-brand
  colorLink: "#e65018"
  colorLinkHover: "#cc4010"
  colorLinkActive: "#b91800"
  # Text hierarchy
  colorText: "#0f1215"
  colorTextSecondary: "#404246"
  colorTextTertiary: "#707274"
  colorTextQuaternary: "#9d9ea1"
  # Surfaces
  colorBgLayout: "#f3f5f8"
  colorBgContainer: "#ffffff"
  colorBgElevated: "#ffffff"
  # Borders
  colorBorder: "#d5d7db"
  colorBorderSecondary: "#edeef0"
  # Semantic status — use Tag color prop, not raw hex
  colorSuccess: "#007d00"
  colorWarning: "#a44300"
  colorError: "#e74850"
  colorInfo: "#2456d3"

# ─── Typography ───────────────────────────────────────────────────────────────
# Keys are Ant Design token names. fontWeightStrong (600) is the only weight token.
typography:
  fontFamily: "Roboto, Helvetica, sans-serif"   # token.fontFamily
  fontSize: 14        # token.fontSize — body default
  fontSizeSM: 12      # token.fontSizeSM — meta, captions, compact annotations
  fontSizeLG: 16      # token.fontSizeLG — section titles (pair with fontWeightStrong)
  fontWeightStrong: 600  # token.fontWeightStrong — headings, table headers
  lineHeight: 1.57    # token.lineHeight

# ─── Radius ───────────────────────────────────────────────────────────────────
# Ant v6 token names: borderRadiusSM / borderRadius (base) / borderRadiusLG.
# There is no borderRadiusMD in Ant v6.
radius:
  borderRadiusSM: 4   # token.borderRadiusSM — tags, badges, compact controls
  borderRadius: 6     # token.borderRadius   — buttons, inputs, selects (base)
  borderRadiusLG: 8   # token.borderRadiusLG — cards, modals, panels, table shells

# ─── Spacing ──────────────────────────────────────────────────────────────────
# Keys are Ant Design token names (token.paddingXXS … token.paddingXXL).
# The same scale applies to margin tokens (marginXXS … marginXXL).
# IMPORTANT: "padding" (16 px) = token.padding (base), NOT token.paddingMD (20 px in Ant v6).
spacing:
  paddingXXS: 4
  paddingXS: 8
  paddingSM: 12
  padding: 16         # token.padding — base; paddingMD = 20 is NOT used in UpS
  paddingLG: 24
  paddingXL: 32
  paddingXXL: 48

# ─── Components ───────────────────────────────────────────────────────────────
# Property keys use Ant component-token names where they exist.
# All overrides are applied in src/contexts/ThemeContext.tsx under theme.components.
components:
  page:
    colorBgLayout: "{colorBgLayout}"
    maxWidth: 1440px
    padding: "{paddingLG}"
  section-card:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    borderRadiusLG: "{borderRadiusLG}"
    padding: "{paddingLG}"
  button-primary:
    colorPrimary: "{colorPrimary}"
    colorTextLightSolid: "{colorBgContainer}"
    borderRadius: "{borderRadius}"
    controlHeight: 36
    paddingInline: 18
  button-primary-hover:
    colorPrimaryHover: "{colorPrimaryHover}"
  button-primary-active:
    colorPrimaryActive: "{colorPrimaryActive}"
  button-default:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    borderRadius: "{borderRadius}"
    controlHeight: 36
    paddingInline: 18
  input:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    borderRadius: "{borderRadius}"
    controlHeight: 36
  select:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    borderRadius: "{borderRadius}"
    controlHeight: 36
  table:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    borderRadiusLG: "{borderRadiusLG}"
  table-header:
    headerBg: "{colorBgLayout}"
    headerColor: "{colorTextSecondary}"
    fontWeightStrong: "{fontWeightStrong}"
    cellPaddingBlock: "{padding}"
    cellPaddingInline: "{padding}"
  table-cell:
    colorBgContainer: "{colorBgContainer}"
    colorText: "{colorText}"
    fontSize: "{fontSize}"
    cellPaddingBlock: "{padding}"
    cellPaddingInline: "{padding}"
  modal:
    colorBgElevated: "{colorBgElevated}"
    colorText: "{colorText}"
    borderRadiusLG: "{borderRadiusLG}"
    padding: "{paddingLG}"
  drawer:
    colorBgElevated: "{colorBgElevated}"
    colorText: "{colorText}"
    padding: "{paddingLG}"
  status-success:
    colorSuccess: "{colorSuccess}"
    colorTextLightSolid: "{colorBgContainer}"
    borderRadiusSM: "{borderRadiusSM}"
    paddingBlock: 4
    paddingInline: 8
  status-warning:
    colorWarning: "{colorWarning}"
    colorTextLightSolid: "{colorBgContainer}"
    borderRadiusSM: "{borderRadiusSM}"
    paddingBlock: 4
    paddingInline: 8
  status-error:
    colorError: "{colorError}"
    colorTextLightSolid: "{colorBgContainer}"
    borderRadiusSM: "{borderRadiusSM}"
    paddingBlock: 4
    paddingInline: 8
  status-info:
    colorInfo: "{colorInfo}"
    colorTextLightSolid: "{colorBgContainer}"
    borderRadiusSM: "{borderRadiusSM}"
    paddingBlock: 4
    paddingInline: 8
---

## Overview

UpS Design System is the target UI contract for the UpS product. This sandbox validates the design system migration and 3-layer CSS refactor before the same patterns are applied to `sme-webapp` (the production codebase). Components generated and reviewed here are promoted directly to production — they must be production-grade on arrival.

The product surface is an operational SaaS interface for ecommerce, order, inventory, marketing, finance, reporting, and workspace workflows. Interfaces must be dense, scan-friendly, and work-focused. Prefer predictable tables, filters, forms, status tags, drawers, modals, and sticky action bars over marketing-style layouts.

The design system is implemented on top of Ant Design. Ant Design is the default source for component behavior, interaction states, accessibility affordances, density, motion, and enterprise UI patterns. New and migrated UI customises Ant through `ConfigProvider.theme.token`, `theme.components`, `antd-style` `createStyles` for token-aware custom elements, CSS Modules for structural selectors, and Tailwind only for layout geometry with the `tw-` prefix.

Use Ant Design's product values as the evaluation lens:

- **Natural:** interactions should follow familiar component behavior instead of custom one-off mechanics.
- **Certain:** flows should make state, validation, loading, and next actions obvious.
- **Meaningful:** every visual emphasis should communicate priority, state, or hierarchy.
- **Growing:** patterns should be reusable across modules instead of solving one screen in isolation.

The production codebase still contains legacy Bootstrap, MUI, inline styles, global CSS, and hardcoded Tailwind color utilities. The sandbox's Tailwind config (`tailwind.config.js`) carries these legacy color values as well — treat them as migration context only. Do not use Tailwind color utilities (`tw-bg-primary`, `tw-text-*`, etc.) — use `createStyles` with token references instead.

## Colors

The palette is a restrained operational palette: a single orange brand action color, neutral text hierarchy, quiet layout backgrounds, and semantic status colors.

All color keys in the frontmatter are exact Ant Design v6 token names set in `src/contexts/ThemeContext.tsx`. Each token is available as `token.<key>` in `createStyles` and as `var(--ant-<kebab-key>)` in CSS Modules.

- **`colorPrimary` (`#e65018`):** Main CTA, active state, brand mark, and high-priority interactive emphasis only.
- **`colorPrimaryHover` / `colorPrimaryActive` / `colorPrimaryBg`:** Derived by Ant — do not redefine in feature files.
- **`colorLink` / `colorLinkHover` / `colorLinkActive`:** Mirrors brand color so `<a>` elements and `Button type="link"` stay on-brand automatically without extra styling.
- **`colorText` (`#0f1215`):** Primary readable content.
- **`colorTextSecondary` (`#404246`):** Labels, descriptions, table metadata, and secondary values.
- **`colorTextTertiary` (`#707274`):** Hints, timestamps, helper text, and low-emphasis icons.
- **`colorTextQuaternary` (`#9d9ea1`):** Placeholders and disabled or inactive text.
- **`colorBgLayout` (`#f3f5f8`):** Page canvas.
- **`colorBgContainer` (`#ffffff`):** Cards, panels, modals, table rows, popovers, and elevated content.
- **`colorBorder` (`#d5d7db`):** Prominent borders and hover borders.
- **`colorBorderSecondary` (`#edeef0`):** Subtle dividers, table row separators, and section breaks.
- **`colorSuccess` / `colorWarning` / `colorError` / `colorInfo`:** Semantic status only — use `Tag color` prop, not raw hex.

| Ant token (`token.<key>`) | CSS variable | Value | Role |
|---|---|---|---|
| `colorPrimary` | `--ant-color-primary` | `#e65018` | CTAs, active states, brand marks |
| `colorPrimaryHover` | `--ant-color-primary-hover` | `#ff845c` | derived |
| `colorPrimaryActive` | `--ant-color-primary-active` | `#b91800` | derived |
| `colorPrimaryBg` | `--ant-color-primary-bg` | `#fff5f3` | derived |
| `colorLink` | `--ant-color-link` | `#e65018` | links, Button type="link" |
| `colorText` | `--ant-color-text` | `#0f1215` | primary text |
| `colorTextSecondary` | `--ant-color-text-secondary` | `#404246` | labels, descriptions |
| `colorTextTertiary` | `--ant-color-text-tertiary` | `#707274` | meta, hints, icons |
| `colorTextQuaternary` | `--ant-color-text-quaternary` | `#9d9ea1` | placeholders, disabled |
| `colorBgLayout` | `--ant-color-bg-layout` | `#f3f5f8` | page canvas |
| `colorBgContainer` | `--ant-color-bg-container` | `#ffffff` | cards, panels, table rows |
| `colorBgElevated` | `--ant-color-bg-elevated` | `#ffffff` | modals, drawers, dropdowns |
| `colorBorder` | `--ant-color-border` | `#d5d7db` | prominent borders |
| `colorBorderSecondary` | `--ant-color-border-secondary` | `#edeef0` | subtle dividers |
| `colorSuccess` | `--ant-color-success` | `#007d00` | status: completed |
| `colorWarning` | `--ant-color-warning` | `#a44300` | status: pending |
| `colorError` | `--ant-color-error` | `#e74850` | status: failed/cancelled |
| `colorInfo` | `--ant-color-info` | `#2456d3` | status: in progress |

In `createStyles`, reference tokens as `token.colorPrimary`, `token.colorBgContainer`, etc. In CSS Modules, reference as `var(--ant-color-primary)`, `var(--ant-color-border-secondary)`, etc.

Do not hardcode hex, rgb, rgba, or named colors in feature components.

## Typography

Roboto is the product font. The base UI size is 14px (`token.fontSize`) with a compact operational rhythm (`token.lineHeight` 1.57).

| Use case | Token | Value |
|---|---|---|
| Body — table cells, form controls, labels | `token.fontSize` | 14px |
| Small body — meta, captions, annotations | `token.fontSizeSM` | 12px |
| Section titles | `token.fontSizeLG` + `token.fontWeightStrong` | 16px / 600 |
| Table column headers | `token.fontSize` + `token.fontWeightStrong` | 14px / 600 |

Ant Design has no `fontWeightNormal` token — normal weight is CSS default (400). The only weight token is `token.fontWeightStrong` (600).

For custom elements, put font size, color, and weight in `createStyles`, not Tailwind classes or inline `style`.

Do not scale font sizes with viewport width.

## Layout

Styling uses a strict three-layer architecture — each layer owns one category. Implementation rules, code examples, and anti-patterns for each layer are in `CLAUDE.md`.

| Layer | Tool | Owns |
|---|---|---|
| 1 | Tailwind `tw-*` | Layout and geometry only — `tw-flex`, `tw-grid`, `tw-gap-*`, `tw-w-full`, `tw-overflow-hidden` |
| 2 | `antd-style` `createStyles` (co-located `*.style.ts`) | All token-aware visual values — color, background, border, radius, shadow, typography, hover/active/focus, pseudo-elements, breakpoints |
| 3 | CSS Modules (co-located `*.module.css`) | Structural selectors — `:nth-child`, sticky, print, `:global(.ant-*)` overrides |

Layers must not mix concerns. Tailwind carries no color or token values. CSS Modules reference `var(--ant-*)` only; no hardcoded values.

### Page layout defaults

- Background: `token.colorBgLayout` (`#f3f5f8`), max-width 1440px, centered
- Two-column create/edit: main `flex: 1` + sidebar `flex: 0 0 280px`, gap `token.paddingLG` (24px)
- Sticky action bar: container bg · `border-top: 1px solid ${token.colorBorderSecondary}` · padding `12px 24px` · scroll container `paddingBottom ≥ 64px`

Use Ant layout primitives before custom code: `Row`/`Col` for responsive grids, `Flex` for alignment, `Space` for compact control groups, `Grid.useBreakpoint` only when render logic must respond to breakpoints.

## Elevation & Depth

Use depth sparingly. Operational screens should feel stable and quiet.

- Prefer borders and subtle dividers over heavy shadows.
- Use `token.boxShadowTertiary` for cards and floating content.
- Use elevated backgrounds (`colorBgElevated`) for modals, dropdowns, drawers.
- Do not create decorative gradient or marketing-style backgrounds.

When an antd component needs a visual adjustment, use `theme.components` in `src/contexts/ThemeContext.tsx`. Do not patch global `.ant-*` classes or add `!important` overrides in feature files.

## Shapes

Ant v6 exposes three radius tokens; there is no `borderRadiusMD`.

| Token | Value | Use |
|---|---|---|
| `token.borderRadiusSM` | 4px | compact controls, tags, badges, small chips |
| `token.borderRadius` | 6px | buttons, inputs, selects (base radius) |
| `token.borderRadiusLG` | 8px | cards, panels, table shells, modals |

## Components

Use Ant Design components for all standard UI controls. Use raw HTML controls only when no antd equivalent exists.

| User need | Ant component |
|---|---|
| Primary, default, text, link, or danger action | `Button` |
| Single-line text or search input | `Input`, `Input.Search` |
| Dropdown selection | `Select`, `TreeSelect` |
| Date range filtering | `DatePicker.RangePicker` |
| Boolean toggle | `Switch` |
| Multi-select | `Checkbox` |
| Exclusive option choice | `Radio.Group` |
| Small mode switch | `Segmented` |
| Data table | `Table` |
| Tabs | `Tabs` |
| Status | `Tag`, `Badge` |
| Context actions | `Dropdown` |
| Help / clipped content | `Tooltip` |
| Inline feedback | `Alert` |
| Framed surface | `Card` |
| Blocking form | `Modal` |
| Side panel workflow | `Drawer` |
| Loading | `Skeleton`, `Spin` |
| Empty state | `Empty` |

If an antd component already exposes a prop for behavior or visual intent, use that prop instead of recreating the pattern: `Button type`, `Button danger`, `Tag color`, `Table rowSelection`, `Select mode`, `Form.Item validateStatus`, `Input status`, etc.

### Buttons

One `type="primary"` per view. Hierarchy: `type="text"` → `type="default"` → `type="primary"`. Use `danger` for destructive actions. Never override button visuals with `style` or `className`.

### Status

```tsx
<Tag color="success">Completed</Tag>
<Tag color="warning">Pending</Tag>
<Tag color="error">Cancelled</Tag>
<Tag color="processing">In progress</Tag>
<Tag color="default">Draft</Tag>
```

### Tables

Use Ant Table capabilities before hand-rolling mechanics: `columns`, `dataSource`, `rowKey`, `loading`, `pagination`, `scroll`, `sticky`, `expandable`, `rowSelection`, `locale.emptyText`. For styling: Tailwind owns row/cell geometry only; `createStyles` owns header colors, badges, row highlights; CSS Modules own sticky headers, nth-child rules, and scoped antd selectors.

### Forms and filters

Use `Segmented` for small mode switches, `Radio.Group` for mutually exclusive filter values. Let Ant Form own validation: `Form.Item`, `rules`, `validateStatus`, `help`, `required`, component `status` props.

### Icons

`@tabler/icons-react` only — never `@ant-design/icons`. 14px in inputs/forms, 16px in toolbars. Color: `token.colorTextTertiary` unless semantic state applies. Every `Select` must have `suffixIcon={<IconChevronDown size={14} />}`.

## Implementation rules

Coding rules, forbidden patterns, anti-patterns with code examples, migration constraints, and the 3-layer CSS architecture are in `CLAUDE.md`.

### Sandbox anchors

| What | Path |
|---|---|
| App entry | `src/App.tsx` |
| Theme / ConfigProvider | `src/contexts/ThemeContext.tsx` |
| Navigation config | `src/layouts/navConfig.tsx` |
| App layout | `src/layouts/AppLayout.tsx` |
| Feature modules | `src/app/modules/[Module]/components/` |
| Shared components | `src/components/` |
| Mock data | `src/mock-data/[module].ts` |
| Order routes | `src/app/routes/OrderList.tsx`, `src/app/routes/OrderCreate.tsx` |

### sme-webapp production anchors (for reference when promoting components)

| What | Path |
|---|---|
| App shell | `src/app/App.js` |
| Theme / ConfigProvider | `src/app/AntdProvider.js` |
| Project adapters | `src/ui/common/antd-adapters/` — import from `@/ui/common/antd-adapters` |
| Tailwind prefix | `tw-` in `tailwind.config.js` |
