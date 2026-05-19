# Dimension Tokens — UpS Design System

**Collection:** `2. Dimensions` | **Modes:** Default, Compact  
**Source:** Figma file `HttbhVBjPw9HxgqcjBONuh`, Size / Space / Radius pages  
**Total variables:** 68

---

## Collection Structure

```
2. Dimensions
├── Size/
│   ├── Base/         sizeXXXS → sizeXXL     (raw size scale)
│   ├── Height/       controlHeight variants  (interactive control heights)
│   ├── Line Width/   lineWidth variants      (border/stroke widths)
│   └── Screen Size/  breakpoint values
└── Space/
│   ├── Margin/       marginXXS → marginXXL
│   └── Padding/      paddingXXXS → paddingXL + content variants
└── Border Radius/    borderRadiusXS → borderRadiusXL
```

**Key insight about Compact mode:** Control heights and raw `Size/Base/*` primitives shrink in Compact mode. But `Space/Margin/*` and `Space/Padding/*` token values are **fixed** — they do not change between Default and Compact. Spacing is contextual; density is expressed through height and font-size, not gap reduction.

---

## Size/Base — Primitive Scale

| Token | Default | Compact | Figma scope | Notes |
|---|---|---|---|---|
| `Size/Base/sizeXXXS` | 2px | 2px | WIDTH_HEIGHT | Hairline gap, micro spacing |
| `Size/Base/sizeXXS` | 4px | 4px | WIDTH_HEIGHT | Icon inner gap, badge padding |
| `Size/Base/sizeXS` | 8px | 4px | WIDTH_HEIGHT | Small internal gap |
| `Size/Base/sizeSM` | 12px | 8px | WIDTH_HEIGHT | Compact component padding |
| `Size/Base/size` | 16px | 8px | WIDTH_HEIGHT | **Base unit** — most common default |
| `Size/Base/sizeMS` | 16px | 12px | WIDTH_HEIGHT | Medium-small (content H padding) |
| `Size/Base/sizeMD` | 20px | 16px | WIDTH_HEIGHT | Medium spacing |
| `Size/Base/sizeLG` | 24px | 16px | WIDTH_HEIGHT | Large spacing |
| `Size/Base/sizeXL` | 32px | 32px | WIDTH_HEIGHT | XL gap, hero spacing |
| `Size/Base/sizeXXL` | 48px | 48px | WIDTH_HEIGHT | Section-level spacing |

> `Size/Base/*` tokens are **primitives** — they are referenced by Margin/Padding/Height tokens. Don't apply them directly in layouts; use Space/* tokens instead.

**Compact shrink pattern:** Everything from sizeXS and up shrinks, except sizeXL and sizeXXL which stay fixed. The base unit `size` halves from 16px → 8px in Compact.

---

## Size/Height — Control Heights

These define the explicit height of all interactive controls (inputs, buttons, selects, tags, etc.).

| Token | Default | Compact | `size` prop | When to use |
|---|---|---|---|---|
| `Size/Height/controlHeightXS` | 16px | 14px | — | Icon-only micro controls, indicators |
| `Size/Height/controlHeightSM` | 24px | 21px | `small` | Toolbar buttons, filter chips, compact table rows |
| `Size/Height/controlHeight` | 32px | 28px | `middle` (default) | Standard inputs, buttons, selects — all default forms |
| `Size/Height/controlHeightLG` | 40px | 35px | `large` | Hero search bars, primary form actions, page-level CTAs |

**Selection rule:**
- Use `controlHeightLG` (40px) for the most prominent action on a view — the primary search bar, the main submit button of an important form.
- Use `controlHeight` (32px) for everything else in standard forms and toolbars.
- Use `controlHeightSM` (24px) for actions inside table rows, dense filter bars, or when screen real estate is very limited.
- Never mix `large` and `small` controls on the same horizontal line.

---

## Size/Line Width — Border & Stroke Widths

| Token | Value | Figma scope | Use for |
|---|---|---|---|
| `Size/Line Width/lineWidth` | 1px | STROKE_FLOAT | **Default border** — all input borders, card outlines, dividers, table cell borders |
| `Size/Line Width/lineWidthBold` | 2px | STROKE_FLOAT | Active/selected state border (active Tab underline, active Menu item bar, active Slider rail), Progress bar fill |
| `Size/Line Width/controlOutlineWidth` | 2px | EFFECT_FLOAT | Focus ring spread (the orange shadow ring on focused inputs) |
| `Size/Line Width/lineWidthFocus` | 4px | EFFECT_FLOAT | Keyboard accessibility focus ring (broader outer ring for a11y) |

> Never use 0px borders to "remove" a border — use `colorBgContainer` as border color instead.

---

## Size/Screen Size — Responsive Breakpoints

These define the viewport breakpoints for responsive layouts. In Figma, frame widths match these values for breakpoint-specific screen designs.

| Breakpoint | Min width | Max width | Figma canvas width |
|---|---|---|---|
| XS | 480px | 575px | 480px |
| SM | 576px | 767px | 576px |
| MD | 768px | 991px | 768px |
| LG | 992px | 1199px | 992px |
| XL | 1200px | 1599px | 1200px |
| XXL | 1600px+ | — | 1440px (UpS standard) |

**UpS standard design canvas is 1440px** (falls in the XXL tier). Always design at 1440px for the primary desktop layout.

Token reference for breakpoints:
```
screenXS=480  screenXSMax=575
screenSM=576  screenSMMax=767
screenMD=768  screenMDMax=991
screenLG=992  screenLGMax=1199
screenXL=1200 screenXLMax=1599
screenXXL=1600 (no max)
```

---

## Space/Margin — Gap Between Elements

`Margin` tokens express **spacing between sibling elements** — the gap between a label and an input, between two cards in a grid, between a button group and a form section.

| Token | Value | Figma scope | Use for |
|---|---|---|---|
| `Space/Margin/marginXXS` | 2px | GAP | Hairline gap between tightly-coupled elements (icon + label, tag close button offset) |
| `Space/Margin/marginXS` | 8px | GAP | Small gap between adjacent elements (icon + text, form items in a row) |
| `Space/Margin/marginSM` | 12px | GAP | Standard gap between related items (list item padding, button groups) |
| `Space/Margin/margin` | 16px | GAP | **Default gap** — standard spacing between most sibling components |
| `Space/Margin/marginMD` | 20px | GAP | Medium gap between components of different visual weight |
| `Space/Margin/marginLG` | 24px | GAP | Large gap between sections within a card |
| `Space/Margin/marginXL` | 32px | GAP | XL section separation, gap between major content blocks |
| `Space/Margin/marginXXL` | 48px | GAP | Page-level section gaps, hero spacing |

**Spacing scale values (fixed, same in Default and Compact):**
```
2 → 8 → 12 → 16 → 20 → 24 → 32 → 48
XXS  XS   SM   base  MD   LG   XL  XXL
```

---

## Space/Padding — Inner Spacing of Containers

`Padding` tokens express **inner spacing of a container** — the space between the container edge and its content.

### Standard padding scale

| Token | Value | Figma scope | Use for |
|---|---|---|---|
| `Space/Padding/paddingXXXS` | 2px | GAP | Micro padding (checkbox tick offset, badge inner) |
| `Space/Padding/paddingXXS` | 4px | GAP | Very tight padding (tag, chip inner horizontal) |
| `Space/Padding/paddingXS` | 8px | GAP | Small padding (tooltip, compact form item inner) |
| `Space/Padding/paddingSM` | 12px | GAP | Standard small padding (dropdown item, list item) |
| `Space/Padding/padding` | 16px | GAP | **Default padding** — card body, form section |
| `Space/Padding/paddingMD` | 20px | GAP | Medium padding (dialog body, panel inner) |
| `Space/Padding/paddingLG` | 24px | GAP | Large padding (modal, generous card) |
| `Space/Padding/paddingXL` | 32px | GAP | Extra large padding (page-level containers) |

### Content padding (semantic context variants)

These are named for specific layout zones. They are opinionated aliases for card/panel content areas:

| Token | Value | Use for |
|---|---|---|
| `Space/Padding/paddingContentHorizontalSM` | 16px | Compact horizontal padding in content areas |
| `Space/Padding/paddingContentHorizontal` | 16px | Standard horizontal padding in cards and panels |
| `Space/Padding/paddingContentHorizontalLG` | 24px | Generous horizontal padding (modal body, large panel) |
| `Space/Padding/paddingContentVerticalSM` | 8px | Compact vertical padding (tight card rows) |
| `Space/Padding/paddingContentVertical` | 12px | Standard vertical padding (card rows, list items) |
| `Space/Padding/paddingContentVerticalLG` | 16px | Generous vertical padding (panel headers, prominent sections) |

### Control-specific padding

| Token | Value | Use for |
|---|---|---|
| `Space/Padding/controlPaddingHorizontal` | 12px | Horizontal inner padding for input/select controls (default size) |
| `Space/Padding/controlPaddingHorizontalSM` | 8px | Horizontal inner padding for small-size input/select |

---

## Border Radius

| Token | Value | Figma scope | Use for |
|---|---|---|---|
| `Border Radius/borderRadiusXS` | 2px | CORNER_RADIUS | Tags, badges, small status chips, tooltip arrows |
| `Border Radius/borderRadiusSM` | 4px | CORNER_RADIUS | Small buttons (size=small), secondary elements |
| `Border Radius/borderRadius` | 6px | CORNER_RADIUS | **Default** — all inputs, selects, standard buttons, dropdowns |
| `Border Radius/borderRadiusLG` | 8px | CORNER_RADIUS | Cards, modals, drawers, panels, large containers |
| `Border Radius/borderRadiusXL` | 10px | CORNER_RADIUS | Hero cards, large image containers, elevated large surfaces |

> UpS uses `borderRadius = 6px` as the base, which overrides Ant Design's default of 4px. **Never use 4px as the default** for inputs or buttons — it is SM-only in this system.

**Radius selection rule:**
```
Interactive control (input, button, select, tag input)  → borderRadius (6)
Content container (card, panel, collapse, alert)        → borderRadiusLG (8)
Small decorative element (tag, badge, chip)             → borderRadiusSM (4) or borderRadiusXS (2)
Very large surface (hero banner, image block)           → borderRadiusXL (10)
```

---

## Compact Mode — What Changes

| Category | Default | Compact |
|---|---|---|
| `controlHeight` | 32px | 28px (-4px) |
| `controlHeightLG` | 40px | 35px (-5px) |
| `controlHeightSM` | 24px | 21px (-3px) |
| `controlHeightXS` | 16px | 14px (-2px) |
| `sizeXS` | 8px | 4px (halved) |
| `sizeSM` | 12px | 8px |
| `size` | 16px | 8px (halved) |
| `sizeMD` | 20px | 16px |
| `sizeLG` | 24px | 16px |
| `sizeXL` | 32px | 32px (unchanged) |
| `sizeXXL` | 48px | 48px (unchanged) |
| All margin/* | same | same |
| All padding/* | same | same |
| All borderRadius | same | same |
| All lineWidth | same | same |

To apply Compact mode in Figma (`use_figma`):
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const dimColl = collections.find(c => c.name === '2. Dimensions');
const compact = dimColl.modes.find(m => m.name === 'Compact');
frame.setExplicitVariableModeForCollection(dimColl, compact.modeId);
```

---

## Common Layout Recipes

### Standard card
```
padding: paddingLG (24px) horizontal, padding (16px) vertical
cornerRadius: borderRadiusLG (8px)
border: lineWidth (1px) colorBorder
background: colorBgContainer
```

### Form section inside a card
```
padding: paddingContentHorizontal (16px) horizontal, paddingContentVertical (12px) vertical
gap between items: marginSM (12px) vertical
```

### Toolbar / action bar
```
height: controlHeight (32px)
inner padding: paddingXS (8px) vertical, paddingSM (12px) horizontal
gap between buttons: marginXS (8px)
```

### Page layout
```
page background: colorBgLayout (#f3f5f8)
page horizontal margin: paddingXL (32px) each side
gap between page sections: marginXL (32px) or marginXXL (48px)
```

### Table
```
header/cell padding: paddingXS (8px) vertical, paddingSM (12px) horizontal
header border: lineWidth (1px) colorBorderSecondary
row hover background: controlItemBgHover
```
