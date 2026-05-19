# Color Tokens — UpS Design System

**Collection:** `1. Colors` | **Mode:** Light (single mode)  
**Source:** Figma file `HttbhVBjPw9HxgqcjBONuh`, Colors page

---

## Architecture: Three Layers

```
Layer 1 — Base Palette       Colors/Base/{Hue}/{1–10}
              ↓ aliased by
Layer 2 — Semantic Tokens    Colors/Neutral/…   Colors/Brand/…
              ↓ aliased by
Layer 3 — Component Tokens   Components/{Name}/Global/color…
```

**Rule: always use Layer 2 semantic tokens in UI design.** Base palette tokens are raw values only — they exist so semantic tokens can reference them. Using `Colors/Base/Orange/5` directly in a component is a design system violation. Use `Colors/Brand/Primary/colorPrimary` instead.

---

## Layer 1 — Base Palette (`Colors/Base/*`)

13 hue families, 10 shades each (1 = lightest tint, 10 = darkest shade). These are the raw color values the semantic tokens alias into.

### Orange (UpS Brand Base)
| Token | Hex | Notes |
|---|---|---|
| `Colors/Base/Orange/1` | `#fff0e9` | Primary background tint |
| `Colors/Base/Orange/2` | `#ffd8c8` | Hover background |
| `Colors/Base/Orange/3` | `#ffb294` | Border |
| `Colors/Base/Orange/4` | `#ff845c` | Border hover / hover state |
| `Colors/Base/Orange/5` | `#e65018` | **Brand primary** — `colorPrimary` |
| `Colors/Base/Orange/6` | `#b91800` | Active state |
| `Colors/Base/Orange/7` | `#910000` | Deep active |
| `Colors/Base/Orange/8` | `#640000` | — |
| `Colors/Base/Orange/9` | `#3d0000` | — |
| `Colors/Base/Orange/10` | `#1d0000` | Darkest |

### Red (Error Base)
| Token | Hex |
|---|---|
| `Colors/Base/Red/1` | `#ffefee` |
| `Colors/Base/Red/2` | `#ffd6d3` |
| `Colors/Base/Red/3` | `#ffaeaa` |
| `Colors/Base/Red/4` | `#ff7e7e` |
| `Colors/Base/Red/5` | `#e74850` | → `colorError` |
| `Colors/Base/Red/6` | `#ba0329` |
| `Colors/Base/Red/7` | `#920011` |
| `Colors/Base/Red/8` | `#650003` |
| `Colors/Base/Red/9` | `#3d0003` |
| `Colors/Base/Red/10` | `#1d0001` |

### Green (Success Base)
| Token | Hex |
|---|---|
| `Colors/Base/Green/1` | `#ebfaeb` |
| `Colors/Base/Green/2` | `#cdf0cd` |
| `Colors/Base/Green/3` | `#9be39d` |
| `Colors/Base/Green/4` | `#61c968` |
| `Colors/Base/Green/5` | `#0ca62f` |
| `Colors/Base/Green/6` | `#007d00` | → `colorSuccess` |
| `Colors/Base/Green/7` | `#005e00` |
| `Colors/Base/Green/8` | `#003e00` |
| `Colors/Base/Green/9` | `#002500` |
| `Colors/Base/Green/10` | `#000f00` |

### Gold (Warning Base)
| Token | Hex |
|---|---|
| `Colors/Base/Gold/1` | `#fff3e3` |
| `Colors/Base/Gold/2` | `#fedfb9` |
| `Colors/Base/Gold/3` | `#fec171` |
| `Colors/Base/Gold/4` | `#ed9900` |
| `Colors/Base/Gold/5` | `#ce6d00` |
| `Colors/Base/Gold/6` | `#a44300` | → `colorWarning` |
| `Colors/Base/Gold/7` | `#802700` |
| `Colors/Base/Gold/8` | `#581300` |
| `Colors/Base/Gold/9` | `#350c00` |
| `Colors/Base/Gold/10` | `#180300` |

### Blue (Info Base)
| Token | Hex |
|---|---|
| `Colors/Base/Blue/1` | `#edf5ff` |
| `Colors/Base/Blue/2` | `#d0e5ff` |
| `Colors/Base/Blue/3` | `#a6cdff` |
| `Colors/Base/Blue/4` | `#78aaff` |
| `Colors/Base/Blue/5` | `#4a80fd` |
| `Colors/Base/Blue/6` | `#2456d3` | → `colorInfo` |
| `Colors/Base/Blue/7` | `#0f38a9` |
| `Colors/Base/Blue/8` | `#042077` |
| `Colors/Base/Blue/9` | `#031448` |
| `Colors/Base/Blue/10` | `#010623` |

### Additional Hue Families (decorative/tag use)
| Family | Shade 5 (mid) | Shade 6 (main) | Common use |
|---|---|---|---|
| Cyan | `#00a9ad` | `#008186` | Teal accent tags |
| Geekblue | `#008bf8` | `#0061ce` | Deep blue tags |
| Lime | `#839500` | `#5e6e00` | Olive/lime tags |
| Magenta | `#c554c3` | `#9b259b` | Pink-purple tags |
| Pink | `#d14ead` | `#a61b86` | Hot pink tags |
| Purple | `#9a67ed` | `#743bc3` | Purple tags |
| Volcano | `#e74a43` | `#bb0916` | Red-orange tags |
| Yellow | `#be7a00` | `#965100` | Amber/yellow tags |

> Use these families for `Tag / Colorful` components only — never for semantic states (status = error/warning/success/info must use the dedicated Brand tokens).

---

## Layer 2 — Neutral Tokens (`Colors/Neutral/*`)

Neutral tokens cover all non-brand, non-semantic UI surfaces: text, icons, backgrounds, borders, and fills.

### Text (`Colors/Neutral/Text/*`)

Four levels of text hierarchy, all derived from a near-black base:

| Token | Hex | Use for |
|---|---|---|
| `Colors/Neutral/Text/colorText` | `#0f1215` | **Primary text** — headings, labels, all main content |
| `Colors/Neutral/Text/colorTextSecondary` | `#404246` | **Secondary text** — supporting labels, descriptions, form hints |
| `Colors/Neutral/Text/colorTextTertiary` | `#707274` | **Tertiary text** — captions, timestamps, metadata, placeholder-like info |
| `Colors/Neutral/Text/colorTextQuaternary` | `#9d9ea1` | **Quaternary text** — very subtle annotations |
| `Colors/Neutral/Text/colorTextDisabled` | `#9d9ea1` | Disabled state text (same value as quaternary) |
| `Colors/Neutral/Text/colorTextPlaceholder` | `#9d9ea1` | Input placeholder text |
| `Colors/Neutral/Text/colorTextLightSolid` | `#ffffff` | Text on dark/colored solid backgrounds |
| `Colors/Neutral/Text/solidTextColor` | `#ffffff` | Alias of colorTextLightSolid |
| `Colors/Neutral/Text/colorTextHeading` | `#0f1215` | Alias of colorText — use for headings |
| `Colors/Neutral/Text/colorTextLabel` | `#404246` | Alias of colorTextSecondary — use for form labels |
| `Colors/Neutral/Text/colorTextDescription` | `#707274` | Alias of colorTextTertiary — use for descriptions |

**Hierarchy rule:**
```
colorText           — main body, headings, most important info
colorTextSecondary  — supporting labels, form item titles
colorTextTertiary   — hints, captions, metadata (auto-set on icons)
colorTextDisabled   — any disabled/inactive element
colorTextLightSolid — all text on colored backgrounds (buttons, badges)
```

### Icon (`Colors/Neutral/Icon/*`)

| Token | Hex | Use for |
|---|---|---|
| `Colors/Neutral/Icon/colorIcon` | `#707274` | Default icon fill (same as colorTextTertiary) |
| `Colors/Neutral/Icon/colorIconHover` | `#0f1215` | Icon on hover (same as colorText) |

### Background (`Colors/Neutral/Bg/*`)

| Token | Hex | Use for |
|---|---|---|
| `Colors/Neutral/Bg/colorBgContainer` | `#ffffff` | **Card, panel, form, modal backgrounds** — the "white surface" |
| `Colors/Neutral/Bg/colorBgElevated` | `#ffffff` | Floating surfaces (dropdowns, popovers, tooltips) |
| `Colors/Neutral/Bg/colorBgLayout` | `#f3f5f8` | **Page/canvas background** — the grey behind all cards |
| `Colors/Neutral/Bg/colorBgSpotlight` | `#191b1d` | Dark sidebar / dark tooltip background |
| `Colors/Neutral/Bg/colorBgMask` | `#7f8083` | Modal/drawer overlay mask |
| `Colors/Neutral/Bg/colorBgContainerDisabled` | `#f0f2f4` | Disabled input/select background |
| `Colors/Neutral/Bg/colorBgTextHover` | `#e9ebee` | Background of hovered text-type button |
| `Colors/Neutral/Bg/colorBgTextActive` | `#d2d4d7` | Background of active/pressed text button |
| `Colors/Neutral/Bg/colorBgSolid` | `#0c0f11` | Very dark solid surface (rarely used) |
| `Colors/Neutral/Bg/colorBgSolidHover` | `#1f2224` | Hover of dark solid surface |
| `Colors/Neutral/Bg/colorBgSolidActive` | `#090c0e` | Active state of dark solid surface |
| `Colors/Neutral/Bg/defaultBg` | `#f5f5f5` | Generic default background |
| `Colors/Neutral/Bg/colorBorderBg` | `#ffffff` | Background of a border (inside rounded border trick) |

**Background hierarchy:**
```
colorBgLayout       — page canvas (outermost)
colorBgContainer    — cards, panels, forms (standard surface)
colorBgElevated     — popovers, dropdowns (floating above container)
colorBgSpotlight    — dark overlays, dark nav
colorBgMask         — modal overlay
```

### Border (`Colors/Neutral/Border/*`)

| Token | Hex | Use for |
|---|---|---|
| `Colors/Neutral/Border/colorBorder` | `#d5d7db` | **Default borders** — inputs, cards, tables, dividers |
| `Colors/Neutral/Border/colorBorderSecondary` | `#edeef0` | **Subtle borders** — internal table cell lines, very light dividers |
| `Colors/Neutral/Border/colorSplit` | `#e5e6e8` | Divider lines, separator rules |

### Fill (`Colors/Neutral/Fill/*`)

| Token | Hex | Use for |
|---|---|---|
| `Colors/Neutral/Fill/colorFill` | `#d2d4d7` | Strong fill — active/pressed state background |
| `Colors/Neutral/Fill/colorFillSecondary` | `#e9ebee` | Medium fill — hover state background |
| `Colors/Neutral/Fill/colorFillTertiary` | `#f0f2f4` | Subtle fill — alt row, skeleton base |
| `Colors/Neutral/Fill/colorFillQuaternary` | `#f8f8fa` | Very subtle fill — zebra row alternate |
| `Colors/Neutral/Fill/colorFillContent` | `#e9ebee` | Content area fill (same as Secondary) |
| `Colors/Neutral/Fill/colorFillContentHover` | `#d2d4d7` | Hover of content fill (same as Strong) |
| `Colors/Neutral/Fill/colorFillAlter` | `#f8f8fa` | Alternate fill (table striping, form sections) |
| `Colors/Neutral/Fill/colorFillAlterSolid` | `#fafafa` | Solid alternate fill |

**Fill hierarchy (darkest → lightest):**
```
colorFill           → active/pressed backgrounds   #d2d4d7
colorFillSecondary  → hover backgrounds             #e9ebee
colorFillTertiary   → subtle/inactive fill          #f0f2f4
colorFillQuaternary → barely-there tint             #f8f8fa
```

### Base Primitives
| Token | Hex | Notes |
|---|---|---|
| `Colors/Neutral/colorWhite` | `#ffffff` | Pure white constant |
| `Colors/Neutral/colorBgBase` | `#ffffff` | Base for background generation |
| `Colors/Neutral/colorTextBase` | `#000000` | Base for text generation |
| `Colors/Neutral/transparent` | `#ffffff` | Transparent alias (use sparingly) |

---

## Layer 2 — Brand Semantic Tokens (`Colors/Brand/*`)

### Primary — Orange (`Colors/Brand/Primary/*`)

The UpS brand color. `#e65018` is the brand orange.

| Token | Hex | When to apply |
|---|---|---|
| `colorPrimaryBg` | `#fff0e9` | Background of selected/active items in lists/menus |
| `colorPrimaryBgHover` | `#ffd8c8` | Hover state of a selected-item background |
| `colorPrimaryBorder` | `#ffb294` | Border color on primary-tinted elements |
| `colorPrimaryBorderHover` | `#ff845c` | Border hover color |
| `colorPrimaryHover` | `#ff845c` | Button hover state, link hover |
| `colorPrimary` | `#e65018` | **Primary CTA buttons, active nav item, active state, links** |
| `colorPrimaryActive` | `#910000` | Button active/pressed state |
| `colorPrimaryTextHover` | `#ff845c` | Text with primary color on hover |
| `colorPrimaryText` | `#e65018` | Text using primary brand color |
| `colorPrimaryTextActive` | `#910000` | Text on pressed/active state |

### Success — Green (`Colors/Brand/Success/*`)

| Token | Hex | When to apply |
|---|---|---|
| `colorSuccessBg` | `#ebfaeb` | Success alert/tag background |
| `colorSuccessBgHover` | `#cdf0cd` | Hover on success background |
| `colorSuccessBorder` | `#9be39d` | Success state border |
| `colorSuccessBorderHover` | `#61c968` | Hover border |
| `colorSuccessHover` | `#61c968` | Hover on success element |
| `colorSuccess` | `#007d00` | **Success icons, success text, success border**  |
| `colorSuccessActive` | `#005e00` | Active/pressed success |
| `colorSuccessTextHover` | `#0ca62f` | Success text on hover |
| `colorSuccessText` | `#007d00` | Success text |
| `colorSuccessTextActive` | `#005e00` | Success text pressed |

### Warning — Amber/Gold (`Colors/Brand/Warning/*`)

| Token | Hex | When to apply |
|---|---|---|
| `colorWarningBg` | `#fff3e3` | Warning alert/tag background |
| `colorWarningBgHover` | `#fedfb9` | Warning hover background |
| `colorWarningBorder` | `#fec171` | Warning border |
| `colorWarningBorderHover` | `#ed9900` | Warning hover border |
| `colorWarningHover` | `#ed9900` | Hover on warning element |
| `colorWarning` | `#a44300` | **Warning icons, warning text, warning border** |
| `colorWarningActive` | `#802700` | Warning active/pressed |
| `colorWarningTextHover` | `#ce6d00` | Warning text on hover |
| `colorWarningText` | `#a44300` | Warning text |
| `colorWarningTextActive` | `#802700` | Warning text pressed |
| `colorWarningOutline` | `#fff3e3` | Warning outline (focus ring color) |

### Error — Red (`Colors/Brand/Error/*`)

| Token | Hex | When to apply |
|---|---|---|
| `colorErrorBg` | `#ffefee` | Error alert background, error input background tint |
| `colorErrorBgHover` | `#ffd6d3` | Error background on hover |
| `colorErrorBorder` | `#ffaeaa` | Error state border on inputs |
| `colorErrorBorderHover` | `#ff7e7e` | Error border on hover |
| `colorErrorHover` | `#ff7e7e` | Hover on error element |
| `colorError` | `#e74850` | **Error icons, error text, error indicators** |
| `colorErrorActive` | `#ba0329` | Error active/pressed |
| `colorErrorTextHover` | `#ff7e7e` | Error text on hover |
| `colorErrorText` | `#e74850` | Error text |
| `colorErrorTextActive` | `#ba0329` | Error text pressed |
| `colorErrorOutline` | `#ffefee` | Error outline (focus ring color) |

### Info — Blue (`Colors/Brand/Info/*`)

| Token | Hex | When to apply |
|---|---|---|
| `colorInfoBg` | `#edf5ff` | Info alert background |
| `colorInfoBgHover` | `#d0e5ff` | Info background hover |
| `colorInfoBorder` | `#a6cdff` | Info border |
| `colorInfoBorderHover` | `#78aaff` | Info border hover |
| `colorInfoHover` | `#4a80fd` | Info hover state |
| `colorInfo` | `#2456d3` | **Info icons, info text, info indicators** |
| `colorInfoActive` | `#0f38a9` | Info active |
| `colorInfoTextHover` | `#4a80fd` | Info text hover |
| `colorInfoText` | `#2456d3` | Info text |
| `colorInfoTextActive` | `#0f38a9` | Info text active |

### Link (`Colors/Brand/Link/*`)

| Token | Hex | When to apply |
|---|---|---|
| `colorLink` | `#707274` | Default link color (de-emphasized — matches tertiary text) |
| `colorLinkHover` | `#404246` | Link hover |
| `colorLinkActive` | `#0f1215` | Link pressed |

> UpS uses near-neutral link colors by design — links are contextual, not disruptive.

### Control Interaction (`Colors/Brand/Control/*`)

| Token | Hex | When to apply |
|---|---|---|
| `controlItemBgHover` | `#f0f2f4` | Background of a list/select item on hover |
| `controlItemBgActive` | `#e9ebee` | Background of a list/select item when active/selected (non-primary) |
| `controlItemBgActiveHover` | `#d2d4d7` | Background of active item on hover |
| `controlItemBgActiveDisabled` | `#d2d4d7` | Background of active item when disabled |
| `controlOutline` | `#fff0e9` | Primary focus ring color (orange tint) |
| `controlTmpOutline` | `#f8f8fa` | Temporary focus ring (non-primary) |

---

## State Color Pattern

Every brand color family follows the same 10-slot state pattern. Use the correct slot for every interactive state:

```
{color}Bg           — background of the component in this state (banner, alert bg)
{color}BgHover      — that background on hover
{color}Border       — border color for this state
{color}BorderHover  — that border on hover
{color}Hover        — the icon/element color on hover
{color}             — the primary color value for this state (icons, text, borders)
{color}Active       — the pressed/active color
{color}TextHover    — inline text in this state on hover
{color}Text         — inline text in this state
{color}TextActive   — inline text in this state pressed
```

Example for a warning input field:
- Border: `colorWarningBorder` (#fec171)
- Border hover: `colorWarningBorderHover` (#ed9900)
- Icon: `colorWarning` (#a44300)
- Background: `colorWarningBg` (#fff3e3)
- Focus ring: `colorWarningOutline` (#fff3e3)

---

## Color Usage Decision Tree

```
Is this text?
├── Main content / heading              → colorText
├── Supporting label / description      → colorTextSecondary  
├── Caption / timestamp / hint          → colorTextTertiary
├── Disabled / placeholder              → colorTextDisabled
└── On a colored background             → colorTextLightSolid

Is this a background?
├── Page / canvas                       → colorBgLayout
├── Card / panel / form                 → colorBgContainer
├── Dropdown / popover                  → colorBgElevated
├── Dark sidebar / spotlight            → colorBgSpotlight
├── Modal mask                          → colorBgMask
└── Disabled control                    → colorBgContainerDisabled

Is this a border?
├── Default (inputs, cards)             → colorBorder
└── Subtle (internal cells, dividers)   → colorBorderSecondary

Is this a semantic state?
├── Brand / primary action              → colorPrimary (and its family)
├── Success                             → colorSuccess (and its family)
├── Warning                             → colorWarning (and its family)
├── Error / danger                      → colorError (and its family)
└── Informational                       → colorInfo (and its family)

Is this a tag / label accent?
└── Pick a Base hue family (Cyan, Geekblue, Magenta, Purple, etc.)
    and use shade 5–6 for text, shade 1–2 for background
```
