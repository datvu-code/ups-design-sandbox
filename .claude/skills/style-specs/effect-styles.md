# Effect Styles — UpS Design System

Source: **UpS Components** Figma library, Effects / Shadows page  
All effects are **drop shadows** — no blur, no inner shadow (except component-level).  
Shadow colors are expressed as `rgba()` in CSS notation below.

---

## Global Elevation Shadows

Three named styles for general surface elevation. Use these on containers, panels, dropdowns, and overlays.

### `boxShadow` — Primary elevation
**CSS equivalent:**
```css
box-shadow:
  0px 9px 28px 8px rgba(0, 0, 0, 0.05),
  0px 3px 6px -4px rgba(0, 0, 0, 0.12),
  0px 6px 16px 0px rgba(0, 0, 0, 0.08);
```

| Layer | X | Y | Blur | Spread | Opacity |
|---|---|---|---|---|---|
| Far ambient | 0 | 9px | 28px | 8px | 5% |
| Near crisp | 0 | 3px | 6px | −4px | 12% |
| Mid diffuse | 0 | 6px | 16px | 0 | 8% |

**Use for:** Dropdown menus, Popovers, Select panels, DatePicker panels, Tooltip with heavy content, any floating overlay anchored to the viewport.

---

### `boxShadowSecondary` — General elevation
**CSS equivalent:** *(identical values to `boxShadow`)*
```css
box-shadow:
  0px 9px 28px 8px rgba(0, 0, 0, 0.05),
  0px 3px 6px -4px rgba(0, 0, 0, 0.12),
  0px 6px 16px 0px rgba(0, 0, 0, 0.08);
```

**Use for:** Cards with interactive hover lift, Drawers, Modals, general components that share the same visual elevation as primary. Use when the Ant Design token `boxShadowSecondary` is referenced by a component.

---

### `boxShadowTertiary` — Subtle elevation
**CSS equivalent:**
```css
box-shadow:
  0px 2px 4px 0px rgba(0, 0, 0, 0.02),
  0px 1px 6px -1px rgba(0, 0, 0, 0.02),
  0px 1px 2px 0px rgba(0, 0, 0, 0.03);
```

| Layer | X | Y | Blur | Spread | Opacity |
|---|---|---|---|---|---|
| Ambient | 0 | 2px | 4px | 0 | 2% |
| Near ambient | 0 | 1px | 6px | −1px | 2% |
| Base contact | 0 | 1px | 2px | 0 | 3% |

**Use for:** Form sections, Action Panels, Statistic cards, Table containers, filter sidebars — anything that is part of the page layout rather than floating above it. This is the "resting surface" shadow.

---

## Component Shadows

These are tightly scoped to specific interactive components. Never apply them to generic surfaces.

### Button Shadows

These create a subtle colored inset glow on the button's bottom edge — a 2px bottom drop shadow with no blur and no spread, using a tinted color that matches the button's theme.

#### `Component/Button/primaryShadow` — Primary button
```css
box-shadow: 0px 2px 0px 0px rgba(255, 240, 233, 1);
```
Color: Solid orange-white tint `#FFF0E9`  
Applied to: `Button` with `type=primary` (brand orange).

#### `Component/Button/defaultShadow` — Default button
```css
box-shadow: 0px 2px 0px 0px rgba(248, 248, 250, 1);
```
Color: Solid near-white `#F8F8FA`  
Applied to: `Button` with `type=default`.

#### `Component/Button/dangerShadow` — Danger button
```css
box-shadow: 0px 2px 0px 0px rgba(255, 239, 238, 1);
```
Color: Solid red-white tint `#FFEFEE`  
Applied to: `Button` with `danger=true`.

**Rule:** Button shadows are bottom-edge glows (Y=2, blur=0, spread=0). They are decorative depth cues on the button press surface, not elevation shadows. Do not use them on non-button elements.

---

### Input Shadows

These create a **focus ring** — a 2px spread with no blur, colored to the input's semantic state.

#### `Component/Input/activeShadow` — Default active/focused input
```css
box-shadow: 0px 0px 0px 2px rgba(255, 240, 233, 1);
```
Color: Orange tint `#FFF0E9`  
Applied to: Input, Select, DatePicker, etc. in focused/active state.

#### `Component/Input/errorActiveShadow` — Error state active input
```css
box-shadow: 0px 0px 0px 2px rgba(255, 239, 238, 1);
```
Color: Red tint `#FFEFEE`  
Applied to: Input fields with `status="error"` when focused.

#### `Component/Input/warningActiveShadow` — Warning state active input
```css
box-shadow: 0px 0px 0px 2px rgba(255, 242, 228, 1);
```
Color: Amber tint `#FFF2E4`  
Applied to: Input fields with `status="warning"` when focused.

**Rule:** All three input shadows use spread=2, blur=0, offset=(0,0) — they are pure focus rings. The ring color always matches the semantic color of the state: orange for default, red for error, amber for warning.

---

### Switch Shadow

#### `Component/Switch/handleShadow` — Switch thumb
```css
box-shadow: 0px 2px 4px 0px rgba(0, 35, 11, 0.20);
```
Color: Dark green-black `rgba(0, 35, 11, 0.2)` — matches the Switch's active green tone  
Applied to: The circular handle/thumb of a Switch component.

---

## Elevation Decision Guide

```
Floating above viewport content (dropdown, popover, tooltip)
└── boxShadow

Floating as a modal or overlay panel (drawer, modal, dialog)
└── boxShadowSecondary

Resting on the page surface (card, form section, table, panel)
└── boxShadowTertiary

Interactive component state
├── Button bottom edge      → Component/Button/*Shadow
├── Input focus ring        → Component/Input/*activeShadow
└── Switch handle           → Component/Switch/handleShadow
```

---

## Applying Effect Styles in `use_figma`

```js
// Get all effect styles
const effectStyles = await figma.getLocalEffectStylesAsync();
const findEffect = name => effectStyles.find(s => s.name === name);

// Apply a named effect style to a node
const card = figma.createFrame();
const shadow = findEffect('boxShadowTertiary');
if (shadow) card.effectStyleId = shadow.id;

// Manual fallback — boxShadowTertiary
card.effects = [
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.02 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0 },
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.02 }, offset: { x: 0, y: 1 }, radius: 6, spread: -1 },
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.03 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0 }
];

// Manual fallback — boxShadow (primary elevation)
node.effects = [
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 9 }, radius: 28, spread: 8 },
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 3 }, radius: 6, spread: -4 },
  { type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
    color: { r: 0, g: 0, b: 0, a: 0.08 }, offset: { x: 0, y: 6 }, radius: 16, spread: 0 }
];
```

> **Remember:** Figma effects arrays are read-only — always reassign a new array, never mutate in place.

---

## Anti-patterns

- **Do not** invent custom shadows outside these named styles. The elevation system is intentionally limited to three levels.
- **Do not** apply `boxShadow` or `boxShadowSecondary` to cards that sit on the page — use `boxShadowTertiary`.
- **Do not** use button shadows on any non-button element (icons, tags, badges).
- **Do not** use input focus rings on surfaces — they only apply to interactive form controls.
- **Do not** layer multiple global shadows on a single element.
