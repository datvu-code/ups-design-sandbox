# Proposal: Ant Design Tokens + Tailwind CSS as the Primary Styling Stack

**Version:** 2.1  
**Scope:** UpS Design Sandbox + Production Codebase  
**Goal:** Use Ant Design tokens as the canonical design token source and Tailwind CSS as the utility layer — with full semantic naming, zero raw values, and a clear boundary between what each tool owns.

---

## 1. Problem Statement

The current codebase mixes Tailwind utilities with raw inline CSS values (`style={{ color: '#ff6d49' }}`, `style={{ borderRadius: 20 }}`). There is no enforced token discipline — developers reach for raw values under deadline pressure, and AI tooling generates hardcoded hex values by default.

**Goals of this migration:**

- Establish a single source of truth for all visual values (color, spacing, typography, radius)
- Give developers and AI tooling a semantic vocabulary — names that describe *role*, not *value*
- Keep Tailwind for layout/structure (muscle memory stays intact)
- Sync Ant Design component styling and custom UI automatically through the same token layer

**Non-goals:**

- Renaming Ant tokens to match Tailwind conventions
- Creating custom Tailwind classes for every design system concept
- Introducing a new framework or replacing Tailwind

---

## 2. Core Principle

One value in `ThemeContext.tsx` propagates everywhere:

```
ThemeContext.tsx  →  CSS variables (:root)  →  Ant components + Tailwind aliases
```

- **Ant components** consume tokens automatically via `ConfigProvider`
- **Custom UI / layout wrappers** consume the same tokens via Tailwind aliases
- **No component** ever holds a hardcoded hex or pixel value

---

## 3. Architecture Overview

### 3.1 The Full Chain

Every value defined in `ThemeContext.tsx` flows through three hops before a dev writes it in JSX:

```
ThemeContext.tsx                   :root (runtime)                        Tailwind alias (JSX)
────────────────                   ───────────────                        ────────────────────

colorPrimary: '#e65018'      →     --ant-color-primary: #e65018      →   tw-bg-primary
                                                                          tw-text-primary
                                                                          tw-border-primary

colorBgContainer: '#ffffff'  →     --ant-color-bg-container: #fff    →   tw-bg-surface

colorText: '#0f1215'         →     --ant-color-text: #0f1215         →   tw-text-text

colorBgLayout: '#f3f5f8'     →     --ant-color-bg-layout: #f3f5f8    →   tw-bg-canvas

colorBorder: '#d5d7db'       →     --ant-color-border: #d5d7db       →   tw-border-border

colorSuccess: '#52c41a'      →     --ant-color-success: #52c41a      →   tw-text-success
                                   --ant-color-success-bg: #f6ffed   →   tw-bg-success-bg
                                   (--ant-color-success-bg auto-derived by Ant algorithm)
```

Tailwind aliases **never hold a hex value**. They point only to CSS variables. The variable resolves to the actual value at runtime from `:root`.

### 3.2 Token Layers

Ant Design's token system uses three layers. All three are active simultaneously when a component renders:

| Layer | What it is | Who defines it | Example |
|---|---|---|---|
| **Seed (Primitive)** | Raw brand values | `ThemeContext.tsx` — only file with hex values | `colorPrimary: '#e65018'` |
| **Map (Semantic)** | Role-based derivatives | Ant algorithm — auto-generated from seeds | `colorPrimaryHover`, `colorPrimaryBg`, `colorSuccessBg` |
| **Alias (Component)** | Component-scoped overrides | `theme.components` in `ThemeContext.tsx` | `Button.controlHeight`, `Table.headerBg` |

> Ant's algorithm auto-derives ~150+ map tokens from your seed overrides. You do not define `colorPrimaryHover` or `colorSuccessBg` manually — they are calculated and emitted as CSS variables automatically via `cssVar`.

### 3.3 How Ant Component Tokens Work at Render Time

When an Ant component renders, three token layers inject in sequence — most specific wins:

```
Render: <Button type="primary">

Step 1 — Global tokens (from your ThemeContext seeds):
  --ant-color-primary:        #e65018   ← your override
  --ant-border-radius:        6px       ← your override
  --ant-font-family:          'Roboto'  ← your override

Step 2 — Map tokens (auto-derived by Ant algorithm):
  --ant-color-primary-hover:  #ff7a52   ← Ant lightens colorPrimary
  --ant-color-primary-active: #c43d0f   ← Ant darkens colorPrimary
  --ant-color-primary-bg:     #fff2ed   ← Ant generates tint

Step 3 — Component tokens (most specific, scoped to Button):
  --ant-btn-color:            #ffffff
  --ant-btn-background:       var(--ant-color-primary)
  --ant-btn-border-color:     var(--ant-color-primary)
  --ant-btn-border-radius:    var(--ant-border-radius)
  --ant-btn-font-weight:      500
  --ant-btn-control-height:   36px   ← if overridden in theme.components
```

> **Component CSS variable prefix:** Ant v6 uses the component's internal short name as prefix, not the full component name.  
> Button → `--ant-btn-*`  
> Input → `--ant-input-*`  
> Select → `--ant-select-*`  
> Table → `--ant-table-*`  
> Modal → `--ant-modal-*`  
>
> These are internal implementation details — you never reference them directly in JSX. They are documented here for debugging and DevTools inspection only.

This means **you never write CSS for Ant components**. Every visual state — default, hover, active, focus, disabled, loading — is handled by the token cascade automatically.

### 3.4 When to Override Component Tokens

Only override in `theme.components` when UpS specs diverge from Ant defaults:

```ts
// ThemeContext.tsx
components: {
  Button: {
    controlHeight: 36, // scopes global controlHeight to Button only — other inputs stay 32px
    fontWeight: 500,   // Button-specific component token
  },
  Table: {
    headerBg: 'var(--ant-color-bg-layout)',
    rowHoverBg: 'var(--ant-color-fill-quaternary)',
  },
  Input: {
    activeBorderColor: 'var(--ant-color-primary)',
    hoverBorderColor: 'var(--ant-color-primary-hover)',
  },
  Select: {
    optionSelectedBg: 'var(--ant-color-primary-bg)',
  },
}
```

> **Rule:** Override only what diverges from Ant defaults. Never use inline styles or Tailwind arbitrary values to override Ant component appearance.

---

## 4. Division of Responsibility

```
Inside Ant component     →  ThemeContext (seed + map + component tokens, auto-cascaded)
Outside Ant component    →  Tailwind aliases (tw-bg-surface, tw-text-text-secondary)
Layout / structure       →  Pure Tailwind (tw-flex, tw-gap-4, tw-p-6, tw-grid)
```

| Concern | Tool | Example |
|---|---|---|
| Brand primitive values | `ThemeContext.tsx` only | `colorPrimary: '#e65018'` |
| Ant component styling | Ant theme engine | `<Button>` auto-themed — no className needed |
| Layout, flex, grid, position | Pure Tailwind | `tw-flex tw-gap-4 tw-items-center` |
| Color on custom / wrapper UI | Tailwind alias → CSS var | `tw-bg-surface tw-text-text` |
| Token-aligned spacing on wrappers | Tailwind alias → CSS var | `tw-p-lg tw-gap-md` |
| Component visual overrides | `theme.components` in ThemeContext | Never inline styles |

---

## 5. Setup Files

### 5.1 ThemeContext.tsx

```tsx
// src/contexts/ThemeContext.tsx
import { ConfigProvider, theme } from 'antd';

const upsTheme = {
  token: {
    // ── Seeds — the only hex values in the codebase ──────────
    colorPrimary:         '#e65018',
    colorText:            '#0f1215',
    colorTextSecondary:   '#404246',
    colorTextTertiary:    '#707274',
    colorTextQuaternary:  '#9d9ea1',
    colorBgLayout:        '#f3f5f8',
    colorBorder:          '#d5d7db',
    colorBorderSecondary: '#edeef0',
    fontFamily:           "'Roboto', sans-serif",
    borderRadius:         6,
    // colorSuccess, colorWarning, colorError intentionally omitted
    // → Ant default values are correct; algorithm derives all variants
  },
  components: {
    Button: {
      controlHeight: 36, // scopes global controlHeight to Button only — other inputs stay 32px
      fontWeight: 500,   // Button-specific component token
    },
    // Add component overrides here — only when UpS spec diverges from Ant default
  },
  algorithm: theme.defaultAlgorithm,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // v6 syntax: cssVar requires an object with prefix
    // cssVar: true is v5 syntax — do NOT use in v6
    <ConfigProvider theme={{ ...upsTheme, cssVar: { prefix: 'ant' } }}>
      {children}
    </ConfigProvider>
  );
}
```

### 5.2 index.css — Layer Ordering

```css
/* src/index.css */

/* Layer order declared first — prevents Tailwind preflight from
   overriding Ant base styles. Ant Design v6 with cssVar injects
   component styles into the 'antd' layer automatically.
   StyleProvider and hashPriority are NOT needed in v6. */
@layer tailwind-base, antd, custom;

@layer tailwind-base {
  @tailwind base;
}

@tailwind components;
@tailwind utilities;
```

### 5.3 tailwind.config.ts

> ⚠️ **Migration note — read before applying:**
>
> **`important` option:** The current production config uses `important: true`. This new config intentionally omits it. Removing `!important` changes specificity across all existing files — some component styles may stop overriding Ant's base styles as expected. **Audit existing usages before removing.** If needed, keep `important: true` temporarily and plan a phased removal.
>
> **Default palette removal:** Placing `colors:` at the top level of `theme` (not inside `extend:`) **disables Tailwind's entire default color palette**. Any existing usage of `tw-gray-*`, `tw-blue-*`, `tw-green-*` etc. in the current codebase **will break at build time**. Audit and replace all default color usages with semantic aliases before switching.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'tw-',
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    // ── colors at top level — REPLACES Tailwind default palette entirely ──
    // tw-blue-500, tw-green-400, tw-gray-100 etc. will NOT compile.
    // This is intentional. Every color must go through a token alias.
    colors: {
      // Escape hatches — values with no Ant token equivalent
      // Use sparingly and only for genuinely context-free values
      transparent: 'transparent',
      current:     'currentColor',
      white:       '#ffffff',
      black:       '#000000',
      inherit:     'inherit',

      // ── Surfaces ────────────────────────────────────────────
      // Role: what layer of the UI is this?
      canvas:   'var(--ant-color-bg-layout)',       // page background, behind all content
      surface:  'var(--ant-color-bg-container)',    // cards, panels, content containers
      elevated: 'var(--ant-color-bg-elevated)',     // modals, drawers, dropdowns
      sunken:   'var(--ant-color-fill-quaternary)', // recessed zones, code blocks

      // ── Text ────────────────────────────────────────────────
      // Role: hierarchy of content
      text: {
        DEFAULT:    'var(--ant-color-text)',
        secondary:  'var(--ant-color-text-secondary)',
        tertiary:   'var(--ant-color-text-tertiary)',
        quaternary: 'var(--ant-color-text-quaternary)',
        disabled:   'var(--ant-color-text-disabled)',
        inverse:    'var(--ant-color-text-light-solid)',
      },

      // ── Borders ─────────────────────────────────────────────
      border: {
        DEFAULT: 'var(--ant-color-border)',
        subtle:  'var(--ant-color-border-secondary)',
      },

      // ── Intent: Primary ─────────────────────────────────────
      primary: {
        DEFAULT:    'var(--ant-color-primary)',
        hover:      'var(--ant-color-primary-hover)',
        active:     'var(--ant-color-primary-active)',
        bg:         'var(--ant-color-primary-bg)',
        'bg-hover': 'var(--ant-color-primary-bg-hover)',
        border:     'var(--ant-color-primary-border)',
        text:       'var(--ant-color-primary-text)',
      },

      // ── Intent: Feedback ────────────────────────────────────
      success: {
        DEFAULT: 'var(--ant-color-success)',
        bg:      'var(--ant-color-success-bg)',
        border:  'var(--ant-color-success-border)',
        text:    'var(--ant-color-success-text)',
      },
      warning: {
        DEFAULT: 'var(--ant-color-warning)',
        bg:      'var(--ant-color-warning-bg)',
        border:  'var(--ant-color-warning-border)',
        text:    'var(--ant-color-warning-text)',
      },
      danger: {
        DEFAULT: 'var(--ant-color-error)',
        bg:      'var(--ant-color-error-bg)',
        border:  'var(--ant-color-error-border)',
        text:    'var(--ant-color-error-text)',
      },
      info: {
        DEFAULT: 'var(--ant-color-info)',
        bg:      'var(--ant-color-info-bg)',
        border:  'var(--ant-color-info-border)',
        text:    'var(--ant-color-info-text)',
      },

      // ── Fill / overlay ──────────────────────────────────────
      fill: {
        DEFAULT:    'var(--ant-color-fill)',
        secondary:  'var(--ant-color-fill-secondary)',
        tertiary:   'var(--ant-color-fill-tertiary)',
        quaternary: 'var(--ant-color-fill-quaternary)',
      },
    },

    extend: {
      // Spacing — token-aligned semantic scale for component-adjacent spacing.
      // Pure Tailwind numeric scale (tw-p-4, tw-gap-2) remains available for layout.
      spacing: {
        'xxs': 'var(--ant-padding-xxs)', // 4px
        'xs':  'var(--ant-padding-xs)',  // 8px
        'sm':  'var(--ant-padding-sm)',  // 12px
        'md':  'var(--ant-padding)',     // 16px
        'lg':  'var(--ant-padding-lg)', // 24px
        'xl':  'var(--ant-padding-xl)', // 32px
      },

      // Border radius — antd scale is XS → SM → DEFAULT → LG only.
      // There is no borderRadiusXL in antd. Do not add it.
      borderRadius: {
        xs:      'var(--ant-border-radius-xs)', // 2px
        sm:      'var(--ant-border-radius-sm)', // 4px
        DEFAULT: 'var(--ant-border-radius)',    // 6px (your seed override)
        lg:      'var(--ant-border-radius-lg)', // 8px
        // 'xl' intentionally omitted — antd has no borderRadiusXL token
        // Use tw-rounded-full for pill shapes (border-radius: 9999px)
      },

      // Typography
      fontSize: {
        sm:   ['var(--ant-font-size-sm)',  { lineHeight: 'var(--ant-line-height-sm)' }],
        base: ['var(--ant-font-size)',     { lineHeight: 'var(--ant-line-height)' }],
        lg:   ['var(--ant-font-size-lg)',  { lineHeight: 'var(--ant-line-height-lg)' }],
      },

      // Shadow
      boxShadow: {
        card:  'var(--ant-box-shadow-tertiary)',
        popup: 'var(--ant-box-shadow)',
        sm:    'var(--ant-box-shadow-secondary)',
      },

      // Motion
      transitionDuration: {
        fast: 'var(--ant-motion-duration-fast)', // 100ms
        mid:  'var(--ant-motion-duration-mid)',  // 200ms
        slow: 'var(--ant-motion-duration-slow)', // 300ms
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 6. Semantic Alias Reference

Full mapping: role → Tailwind class → CSS variable → Ant token.

### Surfaces

| Role | Tailwind class | CSS variable | Ant token |
|---|---|---|---|
| Page background | `tw-bg-canvas` | `--ant-color-bg-layout` | `colorBgLayout` |
| Card / panel | `tw-bg-surface` | `--ant-color-bg-container` | `colorBgContainer` |
| Modal / dropdown | `tw-bg-elevated` | `--ant-color-bg-elevated` | `colorBgElevated` |
| Recessed / inset | `tw-bg-sunken` | `--ant-color-fill-quaternary` | `colorFillQuaternary` |

> **Open naming decision:** `canvas`, `surface`, `sunken`, `elevated` are role-descriptive but abstract. An alternative system uses `bg-page`, `bg-card`, `bg-modal`, `bg-inset`. Confirm with the team before finalising — once in the codebase, renaming is a grep-and-replace across 200+ files.

### Text

| Role | Tailwind class | CSS variable | Ant token |
|---|---|---|---|
| Primary body | `tw-text-text` | `--ant-color-text` | `colorText` |
| Supporting | `tw-text-text-secondary` | `--ant-color-text-secondary` | `colorTextSecondary` |
| Hints / captions | `tw-text-text-tertiary` | `--ant-color-text-tertiary` | `colorTextTertiary` |
| Inactive / muted | `tw-text-text-quaternary` | `--ant-color-text-quaternary` | `colorTextQuaternary` |
| Disabled | `tw-text-text-disabled` | `--ant-color-text-disabled` | `colorTextDisabled` |

### Borders

| Role | Tailwind class | CSS variable | Ant token |
|---|---|---|---|
| Default divider | `tw-border-border` | `--ant-color-border` | `colorBorder` |
| Subtle separator | `tw-border-border-subtle` | `--ant-color-border-secondary` | `colorBorderSecondary` |

### Intent — Primary

| Role | Tailwind class | CSS variable | Ant token |
|---|---|---|---|
| Brand / CTA fill | `tw-bg-primary` | `--ant-color-primary` | `colorPrimary` |
| Hover state | `tw-bg-primary-hover` | `--ant-color-primary-hover` | `colorPrimaryHover` |
| Active state | `tw-bg-primary-active` | `--ant-color-primary-active` | `colorPrimaryActive` |
| Light tint bg | `tw-bg-primary-bg` | `--ant-color-primary-bg` | `colorPrimaryBg` |

### Intent — Feedback

| Role | Tailwind class | CSS variable | Ant token |
|---|---|---|---|
| Success fill | `tw-bg-success` / `tw-text-success-text` | `--ant-color-success` | `colorSuccess` |
| Success background | `tw-bg-success-bg` | `--ant-color-success-bg` | `colorSuccessBg` |
| Warning fill | `tw-bg-warning` / `tw-text-warning-text` | `--ant-color-warning` | `colorWarning` |
| Warning background | `tw-bg-warning-bg` | `--ant-color-warning-bg` | `colorWarningBg` |
| Danger fill | `tw-bg-danger` / `tw-text-danger-text` | `--ant-color-error` | `colorError` |
| Danger background | `tw-bg-danger-bg` | `--ant-color-error-bg` | `colorErrorBg` |

### Spacing

| Token alias | Tailwind class | CSS variable | Default value |
|---|---|---|---|
| xxs | `tw-p-xxs`, `tw-gap-xxs` | `--ant-padding-xxs` | 4px |
| xs | `tw-p-xs`, `tw-gap-xs` | `--ant-padding-xs` | 8px |
| sm | `tw-p-sm`, `tw-gap-sm` | `--ant-padding-sm` | 12px |
| md | `tw-p-md`, `tw-gap-md` | `--ant-padding` | 16px |
| lg | `tw-p-lg`, `tw-gap-lg` | `--ant-padding-lg` | 24px |
| xl | `tw-p-xl`, `tw-gap-xl` | `--ant-padding-xl` | 32px |

### Border Radius

| Token alias | Tailwind class | CSS variable | Default value |
|---|---|---|---|
| xs | `tw-rounded-xs` | `--ant-border-radius-xs` | 2px |
| sm | `tw-rounded-sm` | `--ant-border-radius-sm` | 4px |
| DEFAULT | `tw-rounded` | `--ant-border-radius` | 6px |
| lg | `tw-rounded-lg` | `--ant-border-radius-lg` | 8px |

> `borderRadiusXL` does not exist in antd. The scale ends at `LG`. Use `tw-rounded-full` (9999px) for pill/circle shapes.

---

## 7. Usage Model

### 7.1 Ant Components — write nothing for styling

```tsx
// Fully themed by the token cascade.
// No className, no style prop, no overrides needed.
<Button type="primary">Save Order</Button>
<Tag color="success">Active</Tag>
<Alert type="warning" message="Check your input" />
<Table dataSource={orders} columns={columns} />
```

### 7.2 Custom / Wrapper UI — Tailwind aliases for visual values

```tsx
// Layout → pure Tailwind  |  Visual values → Tailwind aliases
<div className="tw-flex tw-flex-col tw-gap-4 tw-p-lg tw-rounded-lg tw-bg-surface tw-border tw-border-border-subtle">
  <span className="tw-text-base tw-font-medium tw-text-text">
    Order #12345
  </span>
  <span className="tw-text-sm tw-text-text-secondary">
    2 hours ago
  </span>
  <span className="tw-inline-flex tw-items-center tw-gap-xs tw-px-xs tw-py-xxs tw-rounded-sm tw-bg-success-bg tw-text-success-text tw-text-sm">
    Delivered
  </span>
</div>
```

### 7.3 Page Shell / Layout — pure Tailwind only

```tsx
// No token aliases needed — structural layout has no semantic visual value
<div className="tw-flex tw-h-screen tw-overflow-hidden">
  <aside className="tw-w-64 tw-flex-shrink-0">
    <SideNav />
  </aside>
  <main className="tw-flex-1 tw-overflow-y-auto">
    {children}
  </main>
</div>
```

---

## 8. Enforcement Rules

| Rule | Mechanism | Status |
|---|---|---|
| No Tailwind default colors (`tw-green-400`, `tw-blue-500`) | Replaced entirely in `theme.colors` — they don't compile | Automatic at build |
| No hardcoded hex/rgba in JSX style props | ESLint rule — see Section 9 | Needs implementation |
| No Tailwind arbitrary color/spacing values | ESLint rule — `tw-bg-[#ff6d49]`, `tw-p-[17px]` flagged | Needs implementation |
| No CSS written for Ant components | Code review convention | Manual |
| No component token overrides via inline style | All overrides go through `theme.components` | Manual / code review |

---

## 9. ESLint Enforcement

> ⚠️ **Not yet implemented.** The rules below define the intended enforcement layer. An ESLint config implementing these rules needs to be built and added to `.eslintrc`.

The goal is to make raw value usage a build-time error, not a code-review catch.

```js
// .eslintrc — relevant rules (illustrative, not final syntax)
rules: {
  // Ban hardcoded color/spacing in JSX style props
  // Flags: style={{ color: '#...' }}, style={{ background: 'rgba(...)' }},
  //        style={{ padding: '16px' }}, style={{ borderRadius: 8 }}
  // Allows: style={{ display: 'flex' }} — layout-intent inline styles OK
  'no-restricted-syntax': [
    'error',
    {
      selector: "JSXAttribute[name.name='style'] ...",
      message: 'Use Tailwind token aliases instead of inline style values.'
    }
  ],

  // Ban Tailwind arbitrary color/spacing values
  // Flags class strings containing tw-bg-[, tw-text-[, tw-p-[, tw-m-[
  // Implement via eslint-plugin-tailwindcss or custom rule
}
```

Suggested plugin: `eslint-plugin-tailwindcss` supports enforcing class naming conventions and can be configured to reject arbitrary value patterns.

---

## 10. Dark Mode

Dark mode works automatically with this architecture. No changes to Tailwind config or aliases are needed:

```tsx
// ThemeContext.tsx — add toggle support when dark mode is required
// useThemeMode() is NOT YET IMPLEMENTED — placeholder for future work
const isDark = false; // replace with actual toggle state

<ConfigProvider theme={{
  ...upsTheme,
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  cssVar: { prefix: 'ant' },
}}>
```

When `darkAlgorithm` is active, Ant re-emits all `--ant-*` CSS variables with dark-mode values. Because Tailwind aliases point to CSS variables — not to hex values — `tw-bg-surface`, `tw-text-text`, `tw-border-border` etc. automatically reflect dark values. Zero Tailwind config changes required.

---

## 11. AI Tooling Rules (Claude Code / Copilot)

When generating or migrating UI in this codebase, follow these rules exactly:

- **Ant components** (`<Button>`, `<Table>`, `<Input>`, `<Select>`, etc.) — never add `className` for visual styling, never add `style` props. The theme cascade handles all states.
- **Wrapper / custom UI** — use Tailwind aliases (`tw-bg-surface`, `tw-text-text-secondary`, `tw-border-border-subtle`). Never use `bg-white`, `text-gray-500`, or any Tailwind default color name.
- **Layout** — pure Tailwind utilities (`tw-flex`, `tw-gap-4`, `tw-grid`, `tw-overflow-hidden`). These are always correct for structure.
- **Never hardcode** hex values, `px` values, `rgba`, or raw numbers in `className` or `style` props.
- **Component overrides** — only in `ThemeContext.tsx` under `components: {}`. If an Ant component looks wrong visually, the fix goes there, not in the JSX.
- **`cssVar: { prefix: 'ant' }`** must be present in ConfigProvider — `cssVar: true` is v5 syntax and does not work in v6.
- **Border radius** — antd scale is `xs / sm / DEFAULT / lg` only. Do not use `tw-rounded-xl` expecting a token value — it will fall back to Tailwind's own default (12px), not an antd token.

---

## 12. Expected Outcomes

- **Single source of truth** — `ThemeContext.tsx` is the only file with hex values. One change propagates to Ant components, Tailwind aliases, and all ~150 derived tokens.
- **Zero raw values in the codebase** — enforced at build time (disabled default palette) and at lint time (ESLint rules, once implemented).
- **Semantic vocabulary** — developers reference `tw-bg-surface`, `tw-text-text-secondary`, not `colorBgContainer` or `#404246`.
- **Ant component sync** — custom UI and Ant components always share the same token values. No drift is possible — they resolve from the same CSS variables.
- **Dark mode ready** — switching `darkAlgorithm` re-emits all CSS vars. No Tailwind changes needed.
- **AI-compatible** — the alias mapping table in Section 6 is the skill reference. Claude Code and Copilot can follow it without reaching for raw values.