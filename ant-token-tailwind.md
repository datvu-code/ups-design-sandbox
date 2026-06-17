# Proposal: Ant Design Tokens + Styling Architecture

**Version:** 4.0
**Scope:** UpS Design Sandbox + Production Codebase
**Goal:** Use antd tokens as the single source of truth for all visual values, with two defined options for the CSS layer — one keeping Tailwind for layout, one replacing it with CSS Modules entirely.

---

## 1. Problem Statement

The current codebase mixes Tailwind utilities with raw inline CSS values (`style={{ color: '#ff6d49' }}`, `style={{ borderRadius: 20 }}`). There is no enforced token discipline.

A specific structural problem exists in the adapter layer (`src/ui/common/antd-adapters/`): adapters manage hover and active states using hardcoded hex values via JavaScript `onMouseEnter`/`onMouseLeave` handlers, bypassing antd's CSS variable token cascade.

**Goals of this migration:**
- Single source of truth for all visual values
- Semantic vocabulary that describes role, not value
- Solve the adapter hover/active state problem without hardcoded values
- Consistent CSS engine across the codebase

**Non-goals:**
- Retrofitting all 1,700+ existing files simultaneously — phased migration
- Introducing a new framework beyond what is described here

---

## 2. Core Principle

One value in `AntdProvider` propagates everywhere:

```
AntdProvider (ConfigProvider + cssVar)
  → CSS variables (:root)
    → antd components              (automatic via token cascade)
    → antd-style createStyles      (token.colorXxx — JS-dynamic)
    → CSS Modules var(--ant-*)     (static token references in CSS)
```

- **Antd components** — token cascade handles all visual states automatically
- **Custom UI** — `antd-style` createStyles for dynamic/hover/pseudo styles; CSS Modules for static layout + token references
- **No component** ever holds a hardcoded hex or pixel value

---

## 3. Antd Token Architecture

### 3.1 The Three Token Layers

| Layer | What it is | Who defines it | Example |
|---|---|---|---|
| **Seed (Primitive)** | Raw brand values | `AntdProvider` — only file with hex values | `colorPrimary: '#e65018'` |
| **Map (Semantic)** | Role-based derivatives | Ant algorithm — auto-generated from seeds | `colorPrimaryHover`, `colorPrimaryBg` |
| **Alias (Component)** | Component-scoped overrides | `theme.components` in `AntdProvider` | `Button.controlHeight` |

> Ant's algorithm auto-derives ~150+ map tokens. You never define `colorPrimaryHover` manually — it is calculated and emitted as a CSS variable automatically via `cssVar: { prefix: 'ant' }`.

### 3.2 How Tokens Emit as CSS Variables

```
ConfigProvider seeds             :root CSS variables (runtime)
────────────────                 ──────────────────────────────
colorPrimary: '#e65018'    →     --ant-color-primary:        #e65018
                                 --ant-color-primary-hover:  #ff7a52  (derived)
                                 --ant-color-primary-active: #c43d0f  (derived)
                                 --ant-color-primary-bg:     #fff2ed  (derived)

colorBgContainer: '#ffffff' →    --ant-color-bg-container:   #ffffff
colorText: '#0f1215'        →    --ant-color-text:            #0f1215
colorBgLayout: '#f3f5f8'    →    --ant-color-bg-layout:       #f3f5f8
colorBorder: '#d5d7db'      →    --ant-color-border:          #d5d7db
```

Both `antd-style` createStyles and CSS Modules consume these variables — they resolve from the same `:root` source.

### 3.3 Antd Component Token Cascade

```
Render: <Button type="primary">

Step 1 — Global tokens:    --ant-color-primary: #e65018
Step 2 — Map tokens:       --ant-color-primary-hover: #ff7a52 (auto-derived)
Step 3 — Component tokens: --ant-btn-background: var(--ant-color-primary)
```

> **Rule:** Never write CSS for antd components. Every visual state is handled automatically. If an antd component looks wrong, the fix goes in `theme.components`, not in JSX.

### 3.4 AntdProvider Setup (required for both options)

```jsx
// src/app/AntdProvider.js
import { App as AntdApp, ConfigProvider } from 'antd';

const antdTheme = {
  token: {
    colorPrimary:         '#e65018',
    colorText:            '#0f1215',
    colorTextSecondary:   '#404246',
    colorTextTertiary:    '#707274',
    colorTextQuaternary:  '#9d9ea1',
    colorBgLayout:        '#f3f5f8',
    colorBgContainer:     '#ffffff',
    colorBgElevated:      '#ffffff',
    colorBorder:          '#d5d7db',
    colorBorderSecondary: '#edeef0',
    colorSuccess:         '#007d00',
    colorWarning:         '#a44300',
    colorError:           '#e74850',
    colorInfo:            '#2456d3',
    fontFamily:           'Roboto, Helvetica, "sans-serif"',
    fontSize:             14,
    borderRadius:         6,
    zIndexPopupBase:      1050,
  },
  components: {
    Button: { controlHeight: 36, fontWeight: 500 },
  },
};

export function AntdProvider({ children }) {
  return (
    // cssVar: { prefix: 'ant' } emits all tokens as --ant-* CSS variables.
    // cssVar: true is v5 syntax — do NOT use in v6.
    <ConfigProvider theme={{ ...antdTheme, cssVar: { prefix: 'ant' } }}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
```

> ⚠️ `cssVar: { prefix: 'ant' }` is the critical prerequisite for both options. Without it, no `--ant-*` CSS variables are emitted and nothing downstream works.

### 3.5 Component Token Overrides

Only override in `theme.components` when UpS specs diverge from antd defaults:

```ts
components: {
  Table: {
    headerBg: 'var(--ant-color-bg-layout)',
    rowHoverBg: 'var(--ant-color-fill-quaternary)',
  },
  Input: {
    activeBorderColor: 'var(--ant-color-primary)',
    hoverBorderColor: 'var(--ant-color-primary-hover)',
  },
}
```

---

## 4. Architecture Options

Two options are available. The antd token layer (Section 3) is identical in both. The difference is entirely in how the CSS layer is managed.

| Concern | Option A — With Tailwind | Option B — CSS Modules only |
|---|---|---|
| Layout (flex, grid, overflow) | Tailwind utilities (`tw-flex`) | CSS Module class (`.root { display: flex }`) |
| Token-aware colors, spacing | `antd-style` createStyles | CSS Module `var(--ant-*)` references |
| Hover / active states | `antd-style` createStyles | CSS Module `:hover` / `:active` pseudo-classes |
| Pseudo-elements | `antd-style` createStyles | CSS Module `::after` / `::before` |
| Complex selectors, nth-child | CSS Modules | CSS Modules |
| Antd class overrides | CSS Modules `:global()` | CSS Modules `:global()` |
| JS-dynamic / prop-driven styles | `antd-style` createStyles | `antd-style` createStyles |
| Token-based `@media` breakpoints | `antd-style` createStyles | `antd-style` createStyles |
| Legacy global | Less | Less |
| Tailwind config needed | Yes (minimal, layout only) | No |
| Files per component | `.tsx` + `.style.ts` (when needed) | `.tsx` + `.module.css` |

---

## 5. Option A — With Tailwind (3-Layer Stack)

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 1 — Tailwind CSS                                             │
│  Layout, geometry, structure only                                   │
│  tw-flex, tw-grid, tw-gap-4, tw-overflow-hidden, tw-w-full         │
│  No colors. No token values. Shape only.                            │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 2 — antd-style (createStyles)                                │
│  All token-aware visual values on custom components                 │
│  Colors, hover, active, pseudo-elements, token breakpoints          │
│  token.colorXxx — live, TypeScript-autocompleted                    │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 3 — CSS Modules                                              │
│  nth-child, print, sticky — structural selectors only               │
│  Can reference var(--ant-*) for token values                        │
├─────────────────────────────────────────────────────────────────────┤
```
### Layer ownership

| Concern | Layer | Example |
|---|---|---|
| Flex, grid, position, overflow | Layer 1 — Tailwind | `tw-flex tw-gap-4 tw-overflow-hidden` |
| Colors, spacing tokens, radius | Layer 2 — antd-style | `background: token.colorBgContainer` |
| Hover / active / focus | Layer 2 — antd-style | `'&:hover': { color: token.colorPrimary }` |
| Pseudo-elements | Layer 2 — antd-style | `'&::after': { background: token.colorSplit }` |
| Token-based responsive | Layer 2 — antd-style | `@media (max-width: ${token.screenSM}px)` |
| Zebra rows, nth-child, print | Layer 3 — CSS Modules | `.row:nth-child(even) { ... }` |
| Antd component visual override | `theme.components` | Never in JSX or CSS |

### Setup: tailwind.config

Tailwind owns layout geometry only. No `colors:` block. No extensions.

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'tw-',
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  // No theme overrides. Tailwind numeric scale handles layout.
  // Token-aware spacing: token.paddingLG in createStyles — not tw-p-lg
  // Token-aware radius: token.borderRadius in createStyles — not tw-rounded-lg
  plugins: [],
};

export default config;
```

> Tailwind v3 required. Current codebase uses v2.2.19 — upgrade needed before applying.

### Setup: index.css layer ordering

```css
/* Prevents Tailwind preflight from overriding antd base styles */
@layer tailwind-base, antd, custom;

@layer tailwind-base {
  @tailwind base;
}

@tailwind components;
@tailwind utilities;
```

### Usage examples

**Antd components — no className needed:**
```tsx
<Button type="primary">Save</Button>
<Tag color="success">Active</Tag>
<Table dataSource={orders} columns={columns} />
```

**Custom UI — createStyles for visual, Tailwind for layout:**
```tsx
// OrderTableCard.style.ts
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  card: {
    background: token.colorBgContainer,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadius,
    '&:hover': { borderColor: token.colorPrimary },
  },
  title: {
    color: token.colorText,
    fontSize: token.fontSize,
    fontWeight: token.fontWeightStrong,
  },
  meta: {
    color: token.colorTextTertiary,
    fontSize: token.fontSizeSM,
  },
  badge: {
    background: token.colorSuccessBg,
    color: token.colorSuccessText,
    borderRadius: token.borderRadiusSM,
  },
}));

// OrderTableCard.tsx
const OrderTableCard = ({ order }) => {
  const { styles } = useStyles();
  return (
    <div className={`tw-flex tw-flex-col tw-gap-3 tw-p-4 ${styles.card}`}>
      <div className="tw-flex tw-items-center tw-justify-between">
        <span className={styles.title}>Order #{order.id}</span>
        <span className={styles.meta}>{order.time}</span>
      </div>
      <span className={styles.badge}>Delivered</span>
    </div>
  );
};
```

**CSS Modules — structural selectors only:**
```css
/* OrderTable.module.css */
.row:nth-child(even) {
  background-color: var(--ant-color-fill-quaternary);
}
.stickyCol {
  position: sticky;
  left: 0;
  z-index: 1;
}
@media print {
  .actionsCol { display: none; }
}
```

---

## 6. Option B — Without Tailwind (CSS Modules + antd-style)

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 1 — CSS Modules (.module.css)                                │
│  Layout geometry + static token-aware visual values                 │
│  display: flex, overflow: hidden                                    │
│  background: var(--ant-color-bg-container)                          │
│  :hover, :active, ::after — all static CSS states                  │
│  :global(.ant-*) — antd component class overrides                  │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 2 — antd-style (createStyles)                                │
│  JS-dynamic styles only — prop-driven, conditional, token @media   │
│  Required when CSS alone cannot express the rule                    │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 3 — Less                                                     │
│  Legacy global styles only. Shrinks toward zero.                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Layer ownership

| Concern | Layer | Example |
|---|---|---|
| Layout (flex, grid, overflow, position) | Layer 1 — CSS Modules | `.root { display: flex; gap: 16px }` |
| Static token colors, spacing, radius | Layer 1 — CSS Modules | `background: var(--ant-color-bg-container)` |
| Hover / active / focus (static) | Layer 1 — CSS Modules | `.card:hover { border-color: var(--ant-color-primary) }` |
| Pseudo-elements (static) | Layer 1 — CSS Modules | `.divider::after { background: var(--ant-color-split) }` |
| Antd class overrides | Layer 1 — CSS Modules | `.tabs :global(.ant-tabs-tab:hover) { ... }` |
| nth-child, print, sticky | Layer 1 — CSS Modules | `.row:nth-child(even) { ... }` |
| Prop-driven styles | Layer 2 — antd-style | `color: isActive ? token.colorPrimary : token.colorText` |
| Token-based `@media` breakpoints | Layer 2 — antd-style | `@media (max-width: ${token.screenSM}px)` |
| Antd component visual override | `theme.components` | Never in JSX or CSS |

> `antd-style` createStyles is the exception in Option B, not the rule. Most components need only a `.module.css` file.

### CSS Module file co-location

Every component and page gets a co-located `.module.css` file:

```
OrderTableCard.tsx
OrderTableCard.module.css      ← layout + visual styles

order-sales-person-list/
  index.js
  index.module.css             ← page-level layout + section styles
  OrderTableCard.js
  OrderTableCard.module.css
  Filter.js
  Filter.module.css
```

### CSS Module naming convention

**Always camelCase. Always semantic — name by role, not by visual style.**

```css
/* ✓ Correct — names describe role */
.root        { display: flex; flex-direction: column; }
.header      { display: flex; align-items: center; justify-content: space-between; }
.body        { display: flex; flex-direction: column; gap: 8px; }
.title       { color: var(--ant-color-text); font-weight: 600; }
.meta        { color: var(--ant-color-text-tertiary); font-size: var(--ant-font-size-sm); }
.badge       { background: var(--ant-color-success-bg); color: var(--ant-color-success-text); }

/* ✗ Wrong — names describe visual style */
.flexCol     { display: flex; flex-direction: column; }
.grayText    { color: var(--ant-color-text-tertiary); }
.greenBadge  { background: var(--ant-color-success-bg); }
```

**Standard vocabulary for common patterns:**

```
STRUCTURE              CONTENT               STATUS/FEEDBACK
.root                  .title                .badge
.header                .subtitle             .tag
.body / .content       .description          .statusBadge
.footer                .label                .divider
.actions               .value
.section               .meta
.item                  .link
.row
.col (sparingly)
```

**The one rule:** Name the element by what it IS in this component, not by what CSS it needs.

### Tailwind → CSS property mapping (migration reference)

Use this table when converting existing Tailwind classes to CSS Module rules.

**Layout**

| Tailwind class | CSS property |
|---|---|
| `tw-flex` | `display: flex` |
| `tw-inline-flex` | `display: inline-flex` |
| `tw-flex-col` | `flex-direction: column` |
| `tw-flex-1` | `flex: 1 1 0%` |
| `tw-flex-shrink-0` | `flex-shrink: 0` |
| `tw-flex-wrap` | `flex-wrap: wrap` |
| `tw-items-center` | `align-items: center` |
| `tw-items-start` | `align-items: flex-start` |
| `tw-justify-between` | `justify-content: space-between` |
| `tw-justify-center` | `justify-content: center` |
| `tw-justify-start` | `justify-content: flex-start` |
| `tw-gap-1` | `gap: 4px` |
| `tw-gap-2` | `gap: 8px` |
| `tw-gap-3` | `gap: 12px` |
| `tw-gap-4` | `gap: 16px` |
| `tw-w-full` | `width: 100%` |
| `tw-min-w-0` | `min-width: 0` |
| `tw-overflow-hidden` | `overflow: hidden` |
| `tw-overflow-auto` | `overflow: auto` |
| `tw-relative` | `position: relative` |
| `tw-absolute` | `position: absolute` |
| `tw-sticky` | `position: sticky` |
| `tw-cursor-pointer` | `cursor: pointer` |
| `tw-h-screen` | `height: 100vh` |
| `tw-whitespace-nowrap` | `white-space: nowrap` |
| `tw-truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |

**Spacing (use antd CSS vars — not fixed px)**

| Tailwind class | CSS property |
|---|---|
| `tw-p-4` / `tw-p-md` | `padding: var(--ant-padding)` (16px) |
| `tw-p-3` / `tw-p-sm` | `padding: var(--ant-padding-sm)` (12px) |
| `tw-p-2` / `tw-p-xs` | `padding: var(--ant-padding-xs)` (8px) |
| `tw-p-lg` | `padding: var(--ant-padding-lg)` (24px) |
| `tw-gap-2` (token-adjacent) | `gap: var(--ant-padding-xs)` (8px) |

**Token-aware visual (always `var(--ant-*)`)**

| Tailwind class | CSS property |
|---|---|
| `tw-text-sm` | `font-size: var(--ant-font-size-sm); line-height: var(--ant-line-height-sm)` |
| `tw-text-base` | `font-size: var(--ant-font-size); line-height: var(--ant-line-height)` |
| `tw-rounded` | `border-radius: var(--ant-border-radius)` |
| `tw-rounded-lg` | `border-radius: var(--ant-border-radius-lg)` |
| `tw-text-primary` | `color: var(--ant-color-primary)` |
| `tw-text-text` | `color: var(--ant-color-text)` |
| `tw-text-text-secondary` | `color: var(--ant-color-text-secondary)` |
| `tw-text-text-tertiary` | `color: var(--ant-color-text-tertiary)` |
| `tw-bg-surface` | `background: var(--ant-color-bg-container)` |
| `tw-bg-canvas` | `background: var(--ant-color-bg-layout)` |
| `tw-border-border` | `border-color: var(--ant-color-border)` |
| `tw-border-border-subtle` | `border-color: var(--ant-color-border-secondary)` |

### Usage example

**The same OrderTableCard in Option B:**

```css
/* OrderTableCard.module.css */
.root {
  display: flex;
  flex-direction: column;
  gap: var(--ant-padding-sm);
  padding: var(--ant-padding);
  background: var(--ant-color-bg-container);
  border: 1px solid var(--ant-color-border-secondary);
  border-radius: var(--ant-border-radius);
  transition: border-color 0.2s ease;
}

.root:hover {
  border-color: var(--ant-color-primary);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  color: var(--ant-color-text);
  font-size: var(--ant-font-size);
  font-weight: 600;
}

.meta {
  color: var(--ant-color-text-tertiary);
  font-size: var(--ant-font-size-sm);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--ant-padding-xs);
  background: var(--ant-color-success-bg);
  color: var(--ant-color-success-text);
  border-radius: var(--ant-border-radius-sm);
  font-size: var(--ant-font-size-sm);
}
```

```tsx
// OrderTableCard.tsx
import styles from './OrderTableCard.module.css';

const OrderTableCard = ({ order }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <span className={styles.title}>Order #{order.id}</span>
      <span className={styles.meta}>{order.time}</span>
    </div>
    <span className={styles.badge}>Delivered</span>
  </div>
);
```

**When createStyles IS needed in Option B (JS-dynamic only):**

```tsx
// StatusBadge.style.ts — prop-driven color, CSS can't express this statically
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }, { status }: { status: string }) => ({
  badge: {
    color: status === 'success' ? token.colorSuccess : token.colorWarning,
    background: status === 'success' ? token.colorSuccessBg : token.colorWarningBg,
  },
}));
```

---

## 7. Migration Strategy (applies to both options)

### Current state

```
~864  files with hardcoded hex in style={{ }}   ← migration target
~928  files with layout-only inline styles       ← low priority (no visual value)
2,355 Tailwind layout utility usages             ← Option B migration scope only
```

### Phases

**Phase 1 — Stop new violations (both options)**

Entry: `cssVar: { prefix: 'ant' }` added to AntdProvider, ESLint blocks new hardcoded hex.

- New components follow the chosen option's pattern immediately
- Existing files are not yet touched (except files already being modified)

Exit: Zero new hardcoded values entering the codebase.

---

**Phase 2 — Migrate existing inline styles**

Common to both options. Automate the most common hex → token replacements via codemod:

```
style={{ color: '#0f1215' }}      →  Option A: className={styles.title} (createStyles)
                                     Option B: className={styles.title}  (module.css var())

style={{ color: '#404246' }}      →  token equivalent: --ant-color-text-secondary
style={{ color: '#707274' }}      →  --ant-color-text-tertiary
style={{ color: '#e65018' }}      →  --ant-color-primary
style={{ background: '#f3f5f8' }} →  --ant-color-bg-layout
style={{ background: '#ffffff' }} →  --ant-color-bg-container
```

Exit: Zero hardcoded hex in `style={}` props (CI grep passes).

---

**Phase 3 — Migrate Tailwind layout (Option B only)**

Replace each Tailwind layout class with a CSS Module class using the mapping table in Section 6.

```tsx
// Before
<div className="tw-flex tw-items-center tw-justify-between tw-gap-4">

// After (Option B)
<div className={styles.header}>
// .header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
```

Boy scout rule: any file touched for any reason migrates its Tailwind classes in the same PR.

Exit: Zero `tw-` class usages in the codebase (CI grep passes). Tailwind removed from dependencies.

---

### Progress tracking

| Metric | Current | After Phase 1 | After Phase 2 | After Phase 3 (B only) |
|---|---|---|---|---|
| Files with hardcoded hex in `style={}` | ~864 | frozen | 0 | 0 |
| Tailwind layout usages | 2,355 | 2,355 | 2,355 | 0 |
| Files using CSS Modules | 6 | 6 | growing | all |
| Tailwind in dependencies | yes | yes | yes | removed |

---

## 8. Enforcement Rules

| Rule | Mechanism | Status |
|---|---|---|
| No hardcoded hex/rgba in `style={}` props | ESLint rule — see Section 9 | Needs implementation |
| No hardcoded hex in CSS Module files | ESLint / code review | Manual |
| No hardcoded hex in `createStyles` | ESLint / code review | Manual |
| No CSS written for antd components | Code review — use `theme.components` | Manual |
| No `stateStyles` + `onMouseEnter` pattern | Code review / antd-style migration | Manual |
| No Tailwind layout classes (Option B final state) | CI grep on `tw-` prefix | After Phase 3 |

---

## 9. ESLint Enforcement

> ⚠️ Not yet implemented.

```js
rules: {
  'no-restricted-syntax': [
    'error',
    {
      selector: "JSXAttribute[name.name='style'] ...",
      message: 'Use CSS Modules or antd-style createStyles instead of inline style values.'
    }
  ],
}
```

---

## 10. Dark Mode

Dark mode works automatically for both options:

```tsx
<ConfigProvider theme={{
  ...antdTheme,
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  cssVar: { prefix: 'ant' },
}}>
```

When `darkAlgorithm` is active, antd re-emits all `--ant-*` CSS variables with dark values:

- **Option A** — `createStyles` `token.*` references update automatically
- **Option B** — CSS Module `var(--ant-*)` references update automatically

Both options adapt with zero config changes.

---

## 11. AI Tooling Rules (Claude Code / Copilot)

**Antd components — always**
- Never add `className` for visual styling
- Never add `style` props
- Token cascade handles all states automatically

**Option A — custom component visual styles**
- Use `createStyles` in a co-located `.style.ts` file
- Reference tokens as `token.colorXxx` — never hardcode hex
- Hover/active → CSS pseudo-classes in createStyles, not `onMouseEnter`
- Layout → Tailwind utilities (`tw-flex`, `tw-gap-4`) — no color classes

**Option B — custom component styles**
- Create a co-located `.module.css` file
- Name classes semantically (role, not style): `.root`, `.header`, `.badge`
- Reference tokens via `var(--ant-*)` in CSS — never hardcode hex
- Hover/active → `:hover` / `:active` in the CSS Module file
- `createStyles` only when CSS cannot express it (prop-driven colors, token `@media`)
- No Tailwind classes at all

**Both options — component overrides**
- Only in `AntdProvider` under `components: {}`
- Never fix antd visual issues in JSX or CSS files

**Critical syntax**
- `cssVar: { prefix: 'ant' }` must be in ConfigProvider — `cssVar: true` is v5, does nothing in v6
- `antd-style` requires `AntdProvider` to be in the tree

---

## 12. Trade-off Comparison

### Option A vs Option B

| Concern | Option A — With Tailwind | Option B — CSS Modules only |
|---|---|---|
| Layout authoring | Inline in JSX (`tw-flex`) — composable | CSS Module class per element — requires file |
| Token-aware styles | `createStyles` (TypeScript autocomplete) | `var(--ant-*)` (manual lookup) |
| Hover / active states | `createStyles` `&:hover` (JS) | `.class:hover` (pure CSS) |
| Token `@media` breakpoints | `createStyles` (required) | `createStyles` (required) |
| Prop-driven styles | `createStyles` (required) | `createStyles` (required) |
| File count per component | 1–2 (`.tsx` + optional `.style.ts`) | 2 (`.tsx` + `.module.css`) |
| CSS duplication risk | Low (reuse Tailwind utilities) | Medium (same layout rules repeated per component) |
| Token name discovery | TypeScript IntelliSense ✓ | DevTools + docs |
| Tailwind dependency | Required | None |
| Tailwind v2 → v3 upgrade | Required | Not needed |
| Migration scope | ~864 inline style files | ~864 inline styles + 2,355 Tailwind layout usages |
| CSS engine consistency | Two systems (Tailwind + CSS) | One system (CSS only) |
| Learning curve | Tailwind + createStyles | CSS Modules + var(--ant-*) + createStyles |
| Alignment with Ant Design Pro | Full | Partial (Ant Pro uses Tailwind in Layer 1) |

### Severity of removing Tailwind (Option B trade-offs)

| Trade-off | Severity |
|---|---|
| 2,355 layout usages to migrate across 269 files | 🔴 High migration cost |
| One `.module.css` needed per component that had Tailwind | 🟠 File proliferation |
| Repetitive layout CSS (same rules in many files) | 🟠 Maintenance overhead |
| Loss of TypeScript autocomplete for token names in CSS | 🟡 DX regression vs Option A |
| Unified CSS engine (no Tailwind) | 🟢 Long-term benefit |
| No Tailwind v2 → v3 upgrade needed | 🟢 Removes a prerequisite |

---

## 13. Expected Outcomes

**Both options deliver:**
- Single source of truth — `AntdProvider` is the only file with hex values
- Interactive states solved — no more `stateStyles` + `onMouseEnter` in adapters
- Zero raw values — ESLint + CSS engine enforce token discipline
- Dark mode ready — `--ant-*` CSS variables adapt automatically

**Option A additionally delivers:**
- Inline layout composition stays in JSX — no new files for layout
- TypeScript autocomplete on all ~150 token names via `createStyles`
- Smaller migration scope — only inline styles, not Tailwind layout classes

**Option B additionally delivers:**
- Single CSS engine — no Tailwind dependency
- All styles in one file per component (`.module.css` handles layout + visual)
- Pure CSS hover/active states — no JavaScript involvement for static interactive styles
- No Tailwind v2 → v3 upgrade required
