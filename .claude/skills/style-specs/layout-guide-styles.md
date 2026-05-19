# Layout Guide Styles — UpS Design System

Source: **UpS Components** Figma library, Size/Space/Radius page  
Variable collection: `2. Dimensions` (modes: `Default`, `Compact`)  
Grid styles: `1440px - 12 col`, `1440px - 24 col`

---

## Grid Systems

Two named Figma grid styles are defined for layout scaffolding.

### `1440px - 12 col` — Simplified column grid
- **Viewport reference:** 1440px wide canvas
- **Columns:** 12
- **Use for:** Page-level layout regions, sidebar + main content splits, card grids with 2–4 columns. Best for compositions where you need a simple halves/thirds/quarters division.

### `1440px - 24 col` — Fine-grained column grid
- **Viewport reference:** 1440px wide canvas
- **Columns:** 24
- **Use for:** Dense data layouts, Ant Design's native 24-column grid system (which maps directly to `<Row>` / `<Col span={N}>`), mixed-width column layouts. The default Ant Design grid system uses 24 columns, so all `Col` span values (1–24) map directly to this grid.

**Standard column mappings (24-col base):**

| Col span | % of row | Common use |
|---|---|---|
| 24 | 100% | Full-width content |
| 12 | 50% | Two equal halves |
| 8 | 33.3% | Three equal thirds |
| 6 | 25% | Four equal quarters |
| 16+8 | 66%+33% | Main content + sidebar |
| 18+6 | 75%+25% | Wide content + narrow sidebar |

---

## Size Scale

Collection `2. Dimensions` > `Size/Base/*`  
Scope: `WIDTH_HEIGHT`

| Variable name | Default | Compact | Typical use |
|---|---|---|---|
| `Size/Base/sizeXXXS` | 2px | 2px | Micro gap, divider thickness |
| `Size/Base/sizeXXS` | 4px | 4px | Icon padding, tiny gap |
| `Size/Base/sizeXS` | 8px | 4px | Small internal gap, icon margin |
| `Size/Base/sizeSM` | 12px | 8px | Compact component inner padding |
| `Size/Base/size` | 16px | 8px | Base unit — default gap and padding |
| `Size/Base/sizeMS` | 16px | 12px | Medium-small (content horizontal padding) |
| `Size/Base/sizeMD` | 20px | 16px | Medium gap, list item spacing |
| `Size/Base/sizeLG` | 24px | 16px | Large component padding, section gap |
| `Size/Base/sizeXL` | 32px | 32px | XL layout gap, hero padding |
| `Size/Base/sizeXXL` | 48px | 48px | XXL section spacing, page margin |

> The `size` (16px Default / 8px Compact) variable is the foundational unit. All larger sizes are multiples or near-multiples of 8.

---

## Spacing — Margin & Padding

Margin and padding tokens are **aliases** that point to the Size/Base scale. They share the same pixel values.

### Margin tokens (Collection `2. Dimensions` > `Space/Margin/*`)

| Token | Resolves to | Default | Compact |
|---|---|---|---|
| `Space/Margin/marginXXS` | `sizeXXXS` | 2px | 2px |
| `Space/Margin/marginXS` | `sizeXS` | 8px | 4px |
| `Space/Margin/marginSM` | `sizeSM` | 12px | 8px |
| `Space/Margin/margin` | `size` | 16px | 8px |
| `Space/Margin/marginMD` | `sizeMD` | 20px | 16px |
| `Space/Margin/marginLG` | `sizeLG` | 24px | 16px |
| `Space/Margin/marginXL` | `sizeXL` | 32px | 32px |
| `Space/Margin/marginXXL` | `sizeXXL` | 48px | 48px |

### Padding tokens (Collection `2. Dimensions` > `Space/Padding/*`)

| Token | Resolves to | Default | Compact |
|---|---|---|---|
| `Space/Padding/paddingXXXS` | `sizeXXXS` | 2px | 2px |
| `Space/Padding/paddingXXS` | `sizeXXS` | 4px | 4px |
| `Space/Padding/paddingXS` | `sizeXS` | 8px | 4px |
| `Space/Padding/paddingSM` | `sizeSM` | 12px | 8px |
| `Space/Padding/padding` | `size` | 16px | 8px |
| `Space/Padding/paddingMD` | `sizeMD` | 20px | 16px |
| `Space/Padding/paddingLG` | `sizeLG` | 24px | 16px |
| `Space/Padding/paddingXL` | `sizeXL` | 32px | 32px |

### Content padding (semantic horizontal/vertical)

| Token | Resolves to | Default | Compact | Use for |
|---|---|---|---|---|
| `Space/Padding/paddingContentHorizontalSM` | `size` | 16px | 8px | Compact horizontal content padding |
| `Space/Padding/paddingContentHorizontal` | `sizeMS` | 16px | 12px | Standard horizontal content padding |
| `Space/Padding/paddingContentHorizontalLG` | `sizeLG` | 24px | 16px | Large horizontal content padding |
| `Space/Padding/paddingContentVerticalSM` | `sizeXS` | 8px | 4px | Compact vertical content padding |
| `Space/Padding/paddingContentVertical` | `sizeSM` | 12px | 8px | Standard vertical content padding |
| `Space/Padding/paddingContentVerticalLG` | `sizeMS` | 16px | 12px | Large vertical content padding |
| `Space/Padding/controlPaddingHorizontal` | fixed | 12px | 12px | Input/Select horizontal inner padding |
| `Space/Padding/controlPaddingHorizontalSM` | fixed | 8px | 8px | Small Input/Select horizontal inner padding |

---

## Control Heights

Collection `2. Dimensions` > `Size/Height/*`  
These define the height of interactive controls (inputs, buttons, selects, etc.).

| Variable name | Default | Compact | Ant Design size prop |
|---|---|---|---|
| `Size/Height/controlHeightXS` | 16px | 14px | — (icon/badge sizing) |
| `Size/Height/controlHeightSM` | 24px | 21px | `size="small"` |
| `Size/Height/controlHeight` | 32px | 28px | `size="middle"` (default) |
| `Size/Height/controlHeightLG` | 40px | 35px | `size="large"` |

**Rule:** Match control height to context:
- `LG` (40px) — hero search bars, primary actions on landing views
- `middle` (32px) — default for all form inputs in standard forms
- `SM` (24px) — dense table toolbars, filter chips, action bars inside panels

---

## Line Width (Border Thickness)

Collection `2. Dimensions` > `Size/Line Width/*`

| Variable name | Default | Compact | Use for |
|---|---|---|---|
| `Size/Line Width/lineWidth` | 1px | 1px | Default border on inputs, cards, dividers |
| `Size/Line Width/lineWidthBold` | 2px | 2px | Active/selected state borders, progress bars, slider rails |
| `Size/Line Width/controlOutlineWidth` | 2px | 2px | Focus outline spread width (see Input activeShadow) |
| `Size/Line Width/lineWidthFocus` | 4px | 4px | Keyboard focus ring (accessibility) |

---

## Border Radius

Collection `2. Dimensions` > `Border Radius/*`  
Scope: `CORNER_RADIUS`

| Variable name | Default | Compact | Use for |
|---|---|---|---|
| `Border Radius/borderRadiusXS` | 2px | 2px | Tags, badges, small chips |
| `Border Radius/borderRadiusSM` | 4px | 4px | Small buttons, small inputs, secondary elements |
| `Border Radius/borderRadius` | 6px | 6px | **Default** — standard inputs, buttons, selects |
| `Border Radius/borderRadiusLG` | 8px | 8px | Cards, panels, modals, drawers |
| `Border Radius/borderRadiusXL` | 10px | 10px | Large containers, hero cards |

**The UpS base token is 6px** — this overrides Ant Design's default of 4px. Always use 6px as the minimum for primary interactive controls.

---

## Screen Breakpoints

Collection `2. Dimensions` > `Size/Screen Size/*`  
Scope: `WIDTH_HEIGHT` — these define responsive breakpoints, not visible elements.

| Breakpoint | Min width | Max width | Ant Design token |
|---|---|---|---|
| XS | 0 | 479px | `screenXS` |
| SM | 480px | 575px | `screenSM` / `screenXSMax` |
| MD | 576px | 767px | `screenMD` / `screenSMMax` |
| LG | 768px | 991px | `screenLG` / `screenMDMax` |
| XL | 992px | 1199px | `screenXL` / `screenLGMax` |
| XXL | 1200px | 1599px | `screenXXL` / `screenXLMax` |
| — | 1600px+ | — | `screenXXL` / `screenXXLMin` |

> The reference canvas in UpS designs is **1440px** (falls in the XXL tier). Always design at 1440px wide for the desktop standard layout.

---

## Density Modes — Default vs Compact

The `2. Dimensions` collection switches between two density modes. In Compact mode, most spacing and sizing values decrease to fit more content into less space.

| Category | Default mode | Compact mode |
|---|---|---|
| Base control height | 32px | 28px |
| Large control height | 40px | 35px |
| Small control height | 24px | 21px |
| Base spacing (size) | 16px | 8px |
| SM spacing | 12px | 8px |
| LG spacing | 24px | 16px |
| XL spacing | 32px | 32px (unchanged) |
| XXL spacing | 48px | 48px (unchanged) |
| Border radius | unchanged | unchanged |
| Line width | unchanged | unchanged |

**When to use Compact:**
- Data-heavy tables where row density is critical
- Mobile-adapted viewport frames
- Filter sidebars and action bars where space is at a premium

---

## Applying Layout Variables in `use_figma`

### Set spacing on a frame using variable binding
```js
// Bind padding to a variable
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();

const dimColl = collections.find(c => c.name === '2. Dimensions');
const paddingLG = allVars.find(v => v.name === 'Space/Padding/paddingLG');

// Apply as paddingLeft (use setBoundVariable on the specific padding field)
frame.setBoundVariable('paddingLeft', paddingLG);
frame.setBoundVariable('paddingRight', paddingLG);
```

### Apply Compact mode to a frame
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const dimColl = collections.find(c => c.name === '2. Dimensions');
const compactMode = dimColl.modes.find(m => m.name === 'Compact');
frame.setExplicitVariableModeForCollection(dimColl, compactMode.modeId);
```

### Set border radius using variable
```js
const allVars = await figma.variables.getLocalVariablesAsync();
const radiusLG = allVars.find(v => v.name === 'Border Radius/borderRadiusLG');
frame.setBoundVariable('topLeftRadius', radiusLG);
frame.setBoundVariable('topRightRadius', radiusLG);
frame.setBoundVariable('bottomRightRadius', radiusLG);
frame.setBoundVariable('bottomLeftRadius', radiusLG);
```

### Manual fallback — standard card
```js
const card = figma.createFrame();
card.cornerRadius = 8;          // borderRadiusLG
card.paddingLeft = 24;          // paddingLG (Default)
card.paddingRight = 24;
card.paddingTop = 16;           // padding (Default)
card.paddingBottom = 16;
card.itemSpacing = 16;          // margin (Default)
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';
card.counterAxisSizingMode = 'FIXED';
```

---

## Layout Quick Reference

```
Gap / spacing within a component      → paddingXS (8) to paddingSM (12)
Gap between components in a section   → margin (16) to marginMD (20)
Section padding inside a card/panel   → paddingLG (24) horizontal, padding (16) vertical
Page-level outer margin               → marginXL (32) to marginXXL (48)

Default control: 32px height, 6px radius, 1px border
Large control:   40px height, 8px radius (borderRadiusLG)
Small control:   24px height, 4px radius (borderRadiusSM)
```
