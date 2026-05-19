# UpS Style Specifications

This skill documents every **design style** available in the **UpS Components** Figma library — text styles, effect styles, and layout/grid guide styles — and provides authoritative rules for applying them when building or generating designs.

Load this skill whenever the task involves:
- Setting typography on any element (font size, weight, line height)
- Applying shadows or visual effects to surfaces
- Defining spacing, sizing, or layout grids
- Creating new screens or components that must match the UpS design system visually

---

## Figma Library Reference

**Library:** UpS Components  
**File key:** `HttbhVBjPw9HxgqcjBONuh`  
**Variable collections:**
- `1. Colors` — all brand, semantic, and neutral color tokens
- `2. Dimensions` — size, height, spacing, border radius, screen breakpoints
- `3. Typography` — font family, size, line height, weight tokens
- `4. Components` — per-component token overrides (reference only)

---

## Style Categories

| Category | Deep-dive reference | What it covers |
|---|---|---|
| **Text Styles** | [text-styles.md](text-styles.md) | Type ramp (Heading 1–5, Text LG/Base/SM), font family, variants (Normal/Strong/Underline/Delete/Italic), typography variables for Default and Compact density |
| **Effect Styles** | [effect-styles.md](effect-styles.md) | All named drop shadows (boxShadow, boxShadowSecondary, boxShadowTertiary) and component-specific shadows (Button, Input, Switch); when to use each elevation level |
| **Layout Guide Styles** | [layout-guide-styles.md](layout-guide-styles.md) | Grid systems (12-col and 24-col at 1440px), size scale, spacing scale (margin/padding), control heights, border radius, screen breakpoints, and density modes (Default vs Compact) |

---

## Quick Reference

### Font
- **Body font:** Roboto (Regular 400, Medium 600)
- **Code font:** Courier Prime

### Text style names (Figma)
```
Heading/1  Heading/2  Heading/3  Heading/4  Heading/5
Text LG/Normal    Text LG/Strong    Text LG/Underline    Text LG/Delete    Text LG/Italic
Text Base/Normal  Text Base/Strong  Text Base/Underline  Text Base/Delete  Text Base/Italic
Text SM/Normal    Text SM/Strong    Text SM/Underline    Text SM/Delete    Text SM/Italic
```

### Shadow names (Figma)
```
boxShadow                      — cards, dropdowns, general elevation
boxShadowSecondary             — alternate general elevation  
boxShadowTertiary              — subtle elevation (Action Panels, Form sections)
Component/Button/primaryShadow — primary Button bottom edge
Component/Button/defaultShadow — default Button bottom edge
Component/Button/dangerShadow  — danger Button bottom edge
Component/Input/activeShadow   — active/focused Input ring
Component/Input/errorActiveShadow   — error state Input ring
Component/Input/warningActiveShadow — warning state Input ring
Component/Switch/handleShadow  — Switch thumb
```

### Spacing scale (Default density, px)
```
marginXXS / paddingXXXS = 2     paddingXXS = 4
marginXS  / paddingXS   = 8     marginSM / paddingSM = 12
margin    / padding     = 16    marginMD / paddingMD = 20
marginLG  / paddingLG   = 24    marginXL / paddingXL = 32
marginXXL / paddingXXL  = 48
```

### Border radius scale (px)
```
borderRadiusXS=2  borderRadiusSM=4  borderRadius=6  borderRadiusLG=8  borderRadiusXL=10
```

### Control heights (Default / Compact)
```
controlHeightXS  16 / 14    controlHeightSM  24 / 21
controlHeight    32 / 28    controlHeightLG  40 / 35
```

---

## Density Modes

The design system has two density modes applied via Figma variable modes on the `2. Dimensions` and `3. Typography` collections:

| Mode | `2. Dimensions` mode | `3. Typography` mode | Use for |
|---|---|---|---|
| **Default** | `Default` | `Default` | Standard desktop layouts |
| **Compact** | `Compact` | `Compact` | Dense data tables, mobile-adapted views |

Compact mode reduces font sizes by 2px and collapses most spacing/height values. See [layout-guide-styles.md](layout-guide-styles.md) for the full comparison table.

---

## Rules for Using Styles

1. **Always use named styles** — never hardcode font sizes, weights, or shadow CSS values directly. Apply the Figma style (or corresponding variable) by name.
2. **Match text style to context** — headings for page/section titles, Text Base for body content, Text SM for metadata, captions, timestamps.
3. **One elevation level per surface type** — use `boxShadow` for popovers and dropdowns, `boxShadowSecondary` for modals and panels, `boxShadowTertiary` for cards and form sections.
4. **Respect density mode** — if the product context is Compact, apply the Compact variable mode across all dimension and typography variables.
5. **Preload Roboto before any text operation in `use_figma`:**
   ```js
   await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
   await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });
   ```
