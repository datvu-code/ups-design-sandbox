# UpS Design Token Specifications

This skill is the authoritative reference for every **design token (variable)** in the UpS Components Figma library. Load it whenever you need to know which token to apply when building or generating UI — colors, sizes, spacing, typography, or component overrides.

**Figma file:** `HttbhVBjPw9HxgqcjBONuh` (UpS Components)

---

## What Are Tokens?

Tokens are named variables stored in Figma variable collections. They are the single source of truth that connects design to code. Every color, spacing value, font size, or border radius in the design system has a token name — using that name (not a hardcoded value) is what makes a design system-compliant.

### Four collections in this library

| Collection | Variable count | Modes | Purpose |
|---|---|---|---|
| `1. Colors` | ~233 | Light | All color tokens — base palette, neutral surfaces, and brand semantic states |
| `2. Dimensions` | 68 | Default, Compact | Size, spacing, border radius, control heights, screen breakpoints |
| `3. Typography` | 22 | Default, Compact | Font family, font size, line height, font weight |
| `4. Components` | ~1,958 | Value | Per-component token overrides that reference global tokens |

---

## Reference Files

| File | What it covers |
|---|---|
| [colors.md](colors.md) | Full color token catalogue — base palette (13 families × 10 shades), neutral surfaces (text, icon, bg, border, fill), brand semantic states (primary, success, warning, error, info, link, control) |
| [dimensions.md](dimensions.md) | Size scale, spacing (margin/padding), control heights, border radius, line widths, screen breakpoints — with Default vs Compact values |
| [typography.md](typography.md) | Font family, font size, line height, font weight variables — with Default vs Compact values |
| [components.md](components.md) | How component tokens work, Global vs Component sections, when to override, examples for Button, Input, Menu, Table |

---

## Token Naming Convention

All tokens follow a `Category/Subcategory/tokenName` path:

```
Colors/Brand/Primary/colorPrimary          ← brand semantic color
Colors/Neutral/Text/colorTextSecondary     ← neutral text hierarchy
Colors/Base/Orange/6                       ← raw palette (rarely used directly)
Size/Base/sizeLG                           ← primitive size unit
Space/Padding/paddingLG                    ← spacing alias
Border Radius/borderRadiusLG              ← radius alias
Typography/Font Size/fontSizeLG            ← type size
Components/Button/Component/paddingInline  ← component override
```

**Three levels of abstraction:**

```
Base/Primitive  →  Semantic/Alias  →  Component override
(raw value)        (named role)        (component-specific)

Orange/6           colorPrimary         Button/primaryColor
#e65018            ↑ references         ↑ references
```

Always prefer **semantic tokens** over base/primitive tokens in UI design.

---

## Quick Token Cheat Sheet

### Most-used color tokens

| Token | Hex | Use for |
|---|---|---|
| `Colors/Brand/Primary/colorPrimary` | `#e65018` | Brand CTA buttons, active states, links |
| `Colors/Neutral/Text/colorText` | `#0f1215` | Primary body text, headings |
| `Colors/Neutral/Text/colorTextSecondary` | `#404246` | Secondary labels, descriptions |
| `Colors/Neutral/Text/colorTextTertiary` | `#707274` | Hints, captions, timestamps |
| `Colors/Neutral/Text/colorTextDisabled` | `#9d9ea1` | Disabled text and icons |
| `Colors/Neutral/Bg/colorBgContainer` | `#ffffff` | Card/panel backgrounds |
| `Colors/Neutral/Bg/colorBgLayout` | `#f3f5f8` | Page/canvas background |
| `Colors/Neutral/Border/colorBorder` | `#d5d7db` | Default borders on inputs, cards |
| `Colors/Neutral/Border/colorBorderSecondary` | `#edeef0` | Subtle dividers |
| `Colors/Brand/Error/colorError` | `#e74850` | Error states |
| `Colors/Brand/Success/colorSuccess` | `#007d00` | Success states |
| `Colors/Brand/Warning/colorWarning` | `#a44300` | Warning states |

### Most-used spacing tokens

| Token | Value | Use for |
|---|---|---|
| `Space/Padding/paddingXS` | 8px | Tight inner padding (chips, badges) |
| `Space/Padding/paddingSM` | 12px | Compact component padding |
| `Space/Padding/padding` | 16px | Standard padding |
| `Space/Padding/paddingLG` | 24px | Generous padding (cards, modals) |
| `Space/Margin/marginXS` | 8px | Small gaps between elements |
| `Space/Margin/marginSM` | 12px | Standard gaps |
| `Space/Margin/margin` | 16px | Default gap |
| `Space/Margin/marginLG` | 24px | Section gaps |

### Most-used size tokens

| Token | Default | Compact | Use for |
|---|---|---|---|
| `Size/Height/controlHeight` | 32px | 28px | Default control/input height |
| `Size/Height/controlHeightLG` | 40px | 35px | Large control height |
| `Size/Height/controlHeightSM` | 24px | 21px | Small control height |
| `Border Radius/borderRadius` | 6px | 6px | Default corner radius |
| `Border Radius/borderRadiusLG` | 8px | 8px | Card/panel radius |
| `Size/Line Width/lineWidth` | 1px | 1px | Default border width |

---

## Density Modes

The `2. Dimensions` and `3. Typography` collections each have two modes:

| Mode | When to apply |
|---|---|
| **Default** | Standard desktop layouts at 1440px |
| **Compact** | Dense data-heavy views, filter toolbars, mobile-adapted frames |

Compact mode shrinks **control heights**, **font sizes**, and some **size/* primitives** — but **spacing tokens (margin/padding) remain the same** between modes.

---

## Rules for Token Usage

1. **Never hardcode hex values or px numbers.** Always name the token explicitly.
2. **Use semantic tokens, not base palette.** `colorPrimary` instead of `Colors/Base/Orange/5`.
3. **Use component tokens for component-level overrides only.** Never apply `Components/Button/Component/paddingInline` to a non-Button element.
4. **Match the right semantic layer to context:**
   - Page background → `colorBgLayout`
   - Card/panel background → `colorBgContainer`
   - Floating overlay background → `colorBgElevated`
5. **Respect hierarchy for text:** Primary content uses `colorText`, supporting info uses `colorTextSecondary`, hints/metadata uses `colorTextTertiary`, inactive/disabled uses `colorTextDisabled`.
6. **Use the right state variant:** Every brand color has `Bg → BgHover → Border → BorderHover → Hover → Active → TextHover → Text → TextActive` — pick the exact state slot.
