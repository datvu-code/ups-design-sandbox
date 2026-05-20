# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It is the **source of truth for all generation decisions.** When generating code that deviates from any rule here: flag the deviation explicitly, ask whether to update the rule or follow it strictly, and never silently deviate — inconsistency compounds across sessions.

## Project skills

All skills (slash commands) created for this project live in `.claude/skills/`. Do not create project-specific skills in `~/.claude/commands/` — that is for global skills only. When writing a new skill file, always place it at `.claude/skills/<skill-name>.md`.

## Purpose

Design sandbox for the UpS product. This sandbox is the **foundation of the new production codebase** with a 70–80% code reuse target. Engineers review components, wire real data, and promote them directly — they do not rebuild from scratch.

## Stack

React 19 + TypeScript + Vite + Ant Design 6.x.

## Commands

```bash
npm run dev       # start dev server with HMR
npm run build     # tsc type-check then vite build
npm run lint      # eslint
npm run preview   # preview production build locally
```

## Folder structure

```
src/
├── app/modules/          ← all feature UI; mirrors sme-webapp src/app/modules/
│   ├── Order/
│   ├── Products/
│   ├── Ads/
│   ├── Report/
│   ├── Finance/
│   ├── Marketing/
│   └── CustomerService/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
├── components/           ← shared UI used by 2+ modules
├── hooks/                ← shared hooks only
├── layouts/              ← sandbox navigation (not extracted by engineers)
│   ├── AppLayout.tsx
│   ├── AppSider.tsx
│   └── navConfig.tsx     ← add new modules here, not src/pages/
├── contexts/
│   └── ThemeContext.tsx  ← Ant Design ConfigProvider with UpS theme tokens
├── mock-data/            ← mock API responses; shapes mirror real sme-webapp data
└── assets/
```

## Placement rules

| What | Where |
|---|---|
| Feature component | `src/app/modules/[Module]/components/` |
| Feature hook | `src/app/modules/[Module]/hooks/` |
| TypeScript types | `src/app/modules/[Module]/types/` |
| Shared across 2+ modules | `src/components/` or `src/hooks/` |
| Mock data | `src/mock-data/[module].ts` |

- Never create `src/pages/` — navigation is handled by `src/layouts/navConfig.tsx`
- No cross-module imports
- Never fetch data inside components — receive via props or `mock-data/`
- Never invent prop names — use types from the module's `types/index.ts`

## src/components/ — shared custom components

Only for custom components that:
- Wrap, extend, or combine antd components for UpS-specific needs
- Are used by 2+ modules (rule of two — do not promote speculatively)

Examples of what belongs here:
- `StatusBadge.tsx` — Tag with UpS-specific status color logic
- `CopyableId.tsx` — input + copy button for order/product IDs
- `EmptyState.tsx` — Empty with UpS illustration and messaging

Examples of what does NOT belong here:
- Raw antd components — import directly from `'antd'`
- Feature-specific components used only once
- Components promoted before a second module needs them

When promoting from a module:
1. Move file to `src/components/`
2. Update all imports
3. Add comment: `{/* Promoted from modules/[Module] — used by [A] + [B] */}`

## Code quality (non-negotiable)

All components must be production-grade, not prototype quality:

- **TypeScript**: no `any`, no missing prop types; all props must have explicit interfaces in the module's `types/index.ts`
- **States**: handle loading, empty, and error states — not just the happy path
- **Styles**: use CSS Modules (`.module.css`) with antd 6 CSS variables (`var(--ant-*)`) for all custom element styling — never use `theme.useToken()` with `style` props
- **antd usage**: follow patterns in `resources/ant-design-patterns.md`; never build from scratch what antd provides

## Icons

This project uses `@tabler/icons-react`. Do not import from `@ant-design/icons`.

- Use Tabler icons for all explicit icon usage
- antd components that embed icons internally (e.g. `Select` suffixIcon, `DatePicker` suffixIcon) must be overridden via the component's own prop — replacing the import is not enough
- Always pass `suffixIcon={<IconChevronDown size={14} />}` to every `Select` component

## Styling — CSS Modules + antd 6 CSS Variables

antd 6 injects all design tokens as CSS custom properties automatically. Use them in `.module.css` files — no extra library needed.

**Token → CSS variable naming** (camelCase → kebab-case with `--ant-` prefix):
```
colorPrimary        → var(--ant-color-primary)
colorBgContainer    → var(--ant-color-bg-container)
colorBorderSecondary→ var(--ant-color-border-secondary)
colorError          → var(--ant-color-error)
colorText           → var(--ant-color-text)
colorTextTertiary   → var(--ant-color-text-tertiary)
padding / paddingLG → var(--ant-padding) / var(--ant-padding-lg)
margin / marginXS   → var(--ant-margin) / var(--ant-margin-xs)
borderRadiusLG      → var(--ant-border-radius-lg)
boxShadowTertiary   → var(--ant-box-shadow-tertiary)
fontSizeSM          → var(--ant-font-size-sm)
```
Spacing tokens include `px` units (e.g. `--ant-padding-lg: 24px`). Colors are hex strings.

**Rules:**
- Static token values on custom elements → inline `style` with `'var(--ant-*)'` strings
- No raw values anywhere — borders use all three tokens: `'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)'`
- Structural sizing on antd components (`width`, `flex`, `borderRadius: 0`) → inline `style` is fine (not token values)
- Tabler icon `color` → `style={{ color: 'var(--ant-color-text-tertiary)' }}` (no `useToken`)
- `theme.useToken()` — do not use for styling; only if a token value is needed in JS logic
- Hover/focus/active states, transitions, conditional state classes → `.module.css` (CSS can't be inline)
- Create a `.module.css` file **only** when pseudo-classes or reusable state classes are needed — not for every component

## Ant Design

- Apply theme via `ConfigProvider` in `ThemeContext` — never hardcode colors
- Reference `resources/ant-design-patterns.md` for correct component usage

## Screen capture workflow

When given a screenshot of a screen:

1. Identify the module from context
2. Break the screen into distinct UI regions — one component per region
3. Create a top-level `[ScreenName]Page.tsx` that composes the regions
4. Place all files in `src/app/modules/[Module]/components/`
5. Never put everything in one file
6. Name components after what they represent, not where they appear — `OrderTable` not `OrderListTable`, `OrderFilter` not `OrderListFilter`
7. Each component must be independently extractable without dependencies on sibling components in the same screen

## Mock data

- All mock data lives in `src/mock-data/[module].ts`
- Data shapes must match real API response structures from `sme-webapp`
- Components receive mock data via props — they do not import it directly
- No hardcoded mock data inside components
