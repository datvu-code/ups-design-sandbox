# Component Tokens — UpS Design System

**Collection:** `4. Components` | **Mode:** Value (single mode)  
**Source:** Figma file `HttbhVBjPw9HxgqcjBONuh`  
**Total variables:** ~1,958 across 60+ components

---

## How Component Tokens Work

The `4. Components` collection stores **per-component token overrides**. Each variable is an alias — it points to a global token from `1. Colors`, `2. Dimensions`, or `3. Typography`, or to a component-specific fixed value.

### Two sections per component

Every component has up to two sections:

```
Components/{ComponentName}/Global/{globalTokenName}   ← alias to a global token
Components/{ComponentName}/Component/{specificToken}  ← component-specific value
```

**Global section** — maps the component's usage of global tokens. Exists so the component can locally "consume" a global token by name. Example:
```
Components/Button/Global/paddingContentHorizontal  → Space/Padding/paddingContentHorizontal (16px)
Components/Button/Global/colorPrimary              → Colors/Brand/Primary/colorPrimary (#e65018)
```

**Component section** — holds values specific to that component's internal geometry, sizing, or color logic. These have no direct global equivalent. Example:
```
Components/Button/Component/paddingInline     → 15px (specific internal padding)
Components/Button/Component/paddingInlineLG   → 15px
Components/Button/Component/paddingInlineSM   → 7px
Components/Button/Component/onlyIconSize      → 32px (icon-only button size)
```

### When to use component tokens

- **Reading:** When inspecting why a component looks a certain way, check its `Component/…` section first.
- **Writing (Figma):** Never bind arbitrary nodes to component tokens — they are consumed internally by the component's own structure. Apply global tokens (`Colors/*`, `Space/*`, etc.) to custom-built elements.
- **Code:** In React/Ant Design, component tokens map to `theme.components.Button.paddingInline` etc. — the same names, same hierarchy.

---

## Component Token Catalogue

Below are all 60+ components with their token count and the key tokens designers/developers need to know.

### Alert
`globalTokenCount: 29` | `componentTokenCount: 1`

**Key globals used:** `paddingMD`, `paddingContentVerticalSM`, `paddingContentHorizontalLG`, `marginXS`, `marginSM`, `lineWidth`, `colorError`, `colorWarning`, `colorSuccess`, `colorInfo`, plus their `Bg` and `Border` variants.

**Component-specific:**
- `withDescriptionIconSize` — icon size when Alert has a description (maps to `fontSizeHeading3` = 24px)

**Usage insight:** Alert uses `colorErrorBg`/`colorWarningBg`/`colorSuccessBg`/`colorInfoBg` for its background, not custom colors. When building custom alert-like banners, use the same semantic background tokens.

---

### Button
`globalTokenCount: 38` | `componentTokenCount: 36`

**Key globals:** `paddingContentHorizontal`, `paddingXS`, `marginXS`, `lineWidth`, `lineWidthFocus`, `colorPrimary`, `colorTextLightSolid`, `borderRadius`, `controlHeight`, `fontWeight`, `fontSize`.

**Key component tokens:**
- `paddingInline` → 15px (horizontal inner padding, default size)
- `paddingInlineLG` → 15px (large size)
- `paddingInlineSM` → 7px (small size)
- `onlyIconSize` → 32px (icon-only default)
- `onlyIconSizeLG` → 40px (icon-only large)
- `onlyIconSizeSM` → 24px (icon-only small)
- 30+ more covering every variant's color, border, and background in each state

**Usage insight:** The 36 component tokens cover all interactive states (default, hover, active, disabled, loading) for all button types (primary, default, dashed, text, link) and danger mode. When inspecting a button's color in Figma, the token path is: `Components/Button/Component/{stateName}Color`.

---

### Input
`globalTokenCount: 48` | `componentTokenCount: 14`

**Key globals:** `paddingXS`, `paddingXS`, `paddingSM`, `paddingLG`, `lineWidth`, `lineHeight`, `fontSize`, `colorText`, `colorTextPlaceholder`, `colorBgContainer`, `colorBorder`, `borderRadius`, `controlHeight`.

**Key component tokens:**
- `paddingInline` → input horizontal inner padding (default)
- `paddingInlineLG` / `paddingInlineSM` → size variants
- `paddingBlock` → vertical inner padding
- `paddingBlockLG` / `paddingBlockSM` → size variants
- `activeBorderColor` → `colorPrimary` (#e65018) — orange on focus
- `hoverBorderColor` → `colorPrimary` — orange on hover
- `activeShadow` → uses `controlOutline` + `controlOutlineWidth`
- `errorActiveShadow` → error focus ring
- `warningActiveShadow` → warning focus ring

**Usage insight:** The focus ring (active shadow) on input is always a 2px spread of the `controlOutline` color (orange tint `#fff0e9`). For error state, the ring is `colorErrorOutline` (`#ffefee`). For warning, `colorWarningOutline` (`#fff3e3`).

---

### Select
`globalTokenCount: 51` | `componentTokenCount: 22`

**Key component tokens:**
- `optionSelectedBg` → selected dropdown item background (maps to `colorFillSecondary`)
- `optionSelectedColor` → selected item text
- `optionActiveBg` → hovered dropdown item (maps to `controlItemBgHover`)
- `selectorBg` → the trigger background (maps to `colorBgContainer`)
- `singleItemHeightLG` → large Select height
- `optionHeight` → height of each option row
- `optionFontSize` → font size of options
- `optionLineHeight` → line height of options

**Usage insight:** Select inherits Input's border/focus behavior. When a Select is active (open), it applies the same `activeShadow` (orange ring) as Input.

---

### Menu
`globalTokenCount: 26` | `componentTokenCount: 51`

Menu has the largest component-specific token set because it supports both light and dark themes.

**Key component tokens (light mode):**
- `itemColor` → default item text (maps to `colorText`)
- `itemHoverColor` → hover item text
- `itemSelectedColor` → selected item text (`colorPrimary`)
- `itemSelectedBg` → selected item background (`colorPrimaryBg` = `#fff0e9`)
- `itemHoverBg` → hover background (`colorFillTertiary`)
- `subMenuItemBg` → submenu container background

**Key component tokens (dark mode):**
- `darkItemColor` → dark theme item text (light color)
- `darkItemSelectedColor` → selected item in dark theme
- `darkItemBg` / `darkSubMenuItemBg` — dark theme backgrounds

**Usage insight:** The UpS sidebar uses Menu in dark mode (`colorBgSpotlight` = `#191b1d`). The selected item uses `colorPrimaryBg` (#fff0e9) as background with `colorPrimary` (#e65018) text — the same orange-tinted selection state used across the app.

---

### Table
`globalTokenCount: 37` | `componentTokenCount: 30`

**Key component tokens:**
- `headerBg` → table header background (maps to `colorFillAlter` = `#f8f8fa`)
- `headerColor` → header text color
- `headerSplitColor` → column separator color
- `rowHoverBg` → row hover background
- `rowSelectedBg` → selected row background (maps to `colorPrimaryBg`)
- `rowSelectedHoverBg` → selected row on hover
- `footerBg` → table footer background
- `stickyScrollBarBorderRadius` → scrollbar corner radius
- `cellPaddingBlock` → vertical cell padding
- `cellPaddingBlockMD` / `cellPaddingBlockSM` — size variants

**Usage insight:** Table headers use `colorFillAlter` (near-white `#f8f8fa`), not white, to visually separate them from the data rows. Selected rows get `colorPrimaryBg` (#fff0e9), creating the consistent orange-tint selection pattern.

---

### Card
`globalTokenCount: 19` | `componentTokenCount: 17`

**Key component tokens:**
- `headerHeight` → card header height (default size)
- `headerHeightSM` → small card header height
- `headerBg` → header background (transparent by default)
- `headerFontSize` → font size in card header
- `actionsBg` → actions area background (maps to `colorFillAlter`)
- `actionsLiMargin` → spacing between action items
- `innerPadding` → padding inside an inner card

---

### DatePicker / TimePicker
`globalTokenCount: 65` (DatePicker) | `componentTokenCount: 36`

Among the most token-rich components. Key tokens:
- `cellHeight` → calendar cell height
- `cellHoverBg` → hovered calendar cell background
- `activeBorderColor` → border when picker is open
- `hoverBorderColor` → border on hover
- `paddingInline` → trigger horizontal padding

---

### Modal
`globalTokenCount: 30` | `componentTokenCount: 6`

**Key component tokens:**
- `contentBg` → modal body background (maps to `colorBgElevated`)
- `headerBg` → modal header background
- `footerBg` → modal footer background
- `titleColor` → modal title text color (maps to `colorText`)
- `titleFontSize` → modal title font size (maps to `fontSizeHeading5`)

---

### Layout
`globalTokenCount: 4` | `componentTokenCount: 14`

**Key component tokens:**
- `headerBg` → page header background
- `headerColor` → header text
- `footerBg` → footer background
- `bodyBg` → main content area background
- `siderBg` → sidebar background
- `lightSiderBg` → light-mode sidebar background
- `lightTriggerBg` → light-mode collapse trigger background

**Usage insight:** The UpS app uses the dark sidebar variant (`siderBg` = `colorBgSpotlight` = `#191b1d`). The main body uses `colorBgLayout` (`#f3f5f8`).

---

### Pagination
`globalTokenCount: 42` | `componentTokenCount: 12`

**Key component tokens:**
- `itemSize` → page number button size (maps to `controlHeight` = 32px)
- `itemSizeSM` → small variant
- `itemBg` → page button background
- `itemActiveBg` → active page background (`colorPrimary`)
- `itemLinkBg` → link variant background
- `itemInputBg` → jump-to-page input background

---

### Tag
`globalTokenCount: 31` | `componentTokenCount: 3`

**Key component tokens:**
- `defaultBg` → default tag background (maps to `colorFillQuaternary` = `#f8f8fa`)
- `defaultColor` → default tag text (maps to `colorText`)
- `solidTextColor` → text on solid-colored tags (maps to `colorTextLightSolid`)

**Usage insight:** When using `Tag / Colorful`, the background comes from `Colors/Base/{Hue}/1` and the text from `Colors/Base/{Hue}/7`. This is not tokenized per-hue — the colorful palette is applied via direct color props in code.

---

### Steps
`globalTokenCount: 47` | `componentTokenCount: 9`

**Key component tokens:**
- `iconSize` → step icon circle size (maps to `controlHeight`)
- `iconSizeSM` → small step icon size
- `dotSize` → dot-variant step size
- `dotCurrentSize` → current step dot size
- `titleLineHeight` → step title line height
- `descriptionMaxWidth` → max width of step description text

---

### Tabs
`globalTokenCount: 34` | `componentTokenCount: 14`

**Key component tokens:**
- `itemColor` → default tab text (maps to `colorText`)
- `itemHoverColor` → hovered tab text
- `itemSelectedColor` → selected tab text (maps to `colorPrimary`)
- `horizontalItemGutter` → gap between horizontal tab items
- `cardGutter` → gap between card-type tab items

---

## Token Lookup Pattern

When you need to find why a specific component property has a particular value, use this pattern:

```js
// In use_figma — find all tokens for a component
const allVars = await figma.variables.getLocalVariablesAsync();
const buttonTokens = allVars.filter(v => v.name.startsWith('Components/Button/'));
return buttonTokens.map(v => ({
  name: v.name,
  value: Object.values(v.valuesByMode)[0]
}));
```

When you need to override a component's appearance without detaching it, bind variable values at the instance level using `setBoundVariable`. Prefer global tokens over component-specific ones for custom overrides.

---

## Anti-patterns

- **Do not** use `Components/Button/Component/paddingInline` on a non-Button frame — it is semantically tied to Button's internal structure.
- **Do not** create new tokens in the `4. Components` collection — it is auto-generated from the Ant Design token system.
- **Do not** reference `Components/…/Global/…` tokens in custom components — use the original `Colors/*`, `Space/*`, `Size/*`, or `Typography/*` tokens directly.
- **Do not** expect component tokens to change between Compact/Default — the `4. Components` collection has only one mode (`Value`). Compact density is handled by the `2. Dimensions` and `3. Typography` collections.
