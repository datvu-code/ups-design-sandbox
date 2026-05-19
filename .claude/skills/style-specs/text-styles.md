# Text Styles — UpS Design System

Source: **UpS Components** Figma library, Typography page  
Variable collection: `3. Typography` (modes: `Default`, `Compact`)  
Font preload required in `use_figma`: `Roboto Regular`, `Roboto Medium`

---

## Font Families

| Token | Variable | Default value | Compact value |
|---|---|---|---|
| Body | `Typography/Font Family/fontFamily` | `Roboto` | `Roboto` |
| Code | `Typography/Font Family/fontFamilyCode` | `Courier Prime` | `Courier Prime` |

**Rules:**
- All UI text uses **Roboto**. Never substitute with Inter, SF Pro, or system fonts.
- Use `Courier Prime` only for code snippets, monospace values (order IDs, tracking codes, tokens).

---

## Type Ramp — Named Figma Text Styles

Each Figma text style is defined with a fixed font family, size, weight, and line height. Apply them by name when assigning text styles in Figma.

### Headings

| Style name | Size | Weight | Line height | Figma style token |
|---|---|---|---|---|
| `Heading/1` | 38px | Medium (500) | 46px | `fontSizeHeading1` / `lineHeightHeading1` |
| `Heading/2` | 30px | Medium (500) | 38px | `fontSizeHeading2` / `lineHeightHeading2` |
| `Heading/3` | 24px | Medium (500) | 32px | `fontSizeHeading3` / `lineHeightHeading3` |
| `Heading/4` | 20px | Medium (500) | 28px | `fontSizeHeading4` / `lineHeightHeading4` |
| `Heading/5` | 16px | Medium (500) | 24px | `fontSizeHeading5` / `lineHeightHeading5` |

All headings: Roboto Medium, letter-spacing 0, no decoration, ORIGINAL case.

### Body Text — Three Size Tiers

Each tier has five decoration variants. All use Roboto, letter-spacing 0.

#### Text LG (Large)
Font size: **16px** | Line height: **24px** | Base token: `fontSizeLG` / `lineHeightLG`

| Variant | Style name | Weight | Decoration |
|---|---|---|---|
| Normal | `Text LG/Normal` | Regular (400) | none |
| Strong | `Text LG/Strong` | Medium (500) | none |
| Underline | `Text LG/Underline` | Regular (400) | underline |
| Delete | `Text LG/Delete` | Regular (400) | strikethrough |
| Italic | `Text LG/Italic` | Regular (400) | none (italic class) |

#### Text Base (Default body)
Font size: **14px** | Line height: **22px** | Base token: `fontSize` / `lineHeight`

| Variant | Style name | Weight | Decoration |
|---|---|---|---|
| Normal | `Text Base/Normal` | Regular (400) | none |
| Strong | `Text Base/Strong` | Medium (500) | none |
| Underline | `Text Base/Underline` | Regular (400) | underline |
| Delete | `Text Base/Delete` | Regular (400) | strikethrough |
| Italic | `Text Base/Italic` | Regular (400) | none |

#### Text SM (Small)
Font size: **12px** | Line height: **20px** | Base token: `fontSizeSM` / `lineHeightSM`

| Variant | Style name | Weight | Decoration |
|---|---|---|---|
| Normal | `Text SM/Normal` | Regular (400) | none |
| Strong | `Text SM/Strong` | Medium (500) | none |
| Underline | `Text SM/Underline` | Regular (400) | underline |
| Delete | `Text SM/Delete` | Regular (400) | strikethrough |
| Italic | `Text SM/Italic` | Regular (400) | none |

---

## Typography Variables — Default vs Compact

The `3. Typography` collection has two modes: **Default** (desktop standard) and **Compact** (dense/mobile).

### Font Size Variables

| Variable name | Default | Compact | Use for |
|---|---|---|---|
| `Typography/Font Size/fontSizeSM` | 12px | 10px | Small captions, timestamps, metadata |
| `Typography/Font Size/fontSize` | 14px | 12px | Body text, labels, form inputs |
| `Typography/Font Size/fontSizeLG` | 16px | 14px | Large body, section intros |
| `Typography/Font Size/fontSizeXL` | 20px | 16px | Sub-heading or oversized labels |
| `Typography/Font Size/fontSizeIcon` | 12px | 12px | Icon size reference (both modes) |
| `Typography/Font Size/fontSizeHeading5` | 16px | 14px | H5 headings |
| `Typography/Font Size/fontSizeHeading4` | 20px | 16px | H4 headings |
| `Typography/Font Size/fontSizeHeading3` | 24px | 20px | H3 headings |
| `Typography/Font Size/fontSizeHeading2` | 30px | 26px | H2 headings |
| `Typography/Font Size/fontSizeHeading1` | 38px | 32px | H1 headings |

### Line Height Variables

| Variable name | Default | Compact | Paired font size |
|---|---|---|---|
| `Typography/Line Height/lineHeightSM` | 20px | 18px | 12px / 10px |
| `Typography/Line Height/lineHeight` | 22px | 20px | 14px / 12px |
| `Typography/Line Height/lineHeightLG` | 24px | 22px | 16px / 14px |
| `Typography/Line Height/lineHeightHeading5` | 24px | 22px | 16px / 14px |
| `Typography/Line Height/lineHeightHeading4` | 28px | 24px | 20px / 16px |
| `Typography/Line Height/lineHeightHeading3` | 32px | 28px | 24px / 20px |
| `Typography/Line Height/lineHeightHeading2` | 38px | 34px | 30px / 26px |
| `Typography/Line Height/lineHeightHeading1` | 46px | 40px | 38px / 32px |

### Font Weight Variables

| Variable name | Value (both modes) | Maps to |
|---|---|---|
| `Typography/Font Weight/fontWeightNormal` | 400 | Roboto Regular |
| `Typography/Font Weight/fontWeightStrong` | 600 | Roboto Medium/SemiBold |

> Note: In Figma, "Medium (500)" maps to `fontWeightStrong` for visual emphasis — Roboto Medium at 500 renders as the "Strong" variant across all text styles.

---

## When to Use Each Style

### Headings

| Style | Use when |
|---|---|
| `Heading/1` | Page hero title — one per page at most. Dashboard main title |
| `Heading/2` | Major section title within a page |
| `Heading/3` | Card headers, panel titles, subsection headings |
| `Heading/4` | Group labels, category titles inside cards |
| `Heading/5` | Small section dividers, accordion headers, inline group labels |

### Body Text

| Style | Use when |
|---|---|
| `Text LG/Normal` | Introductory paragraph, first body paragraph after a heading |
| `Text LG/Strong` | Highlighted body copy, lead sentence in a card description |
| `Text Base/Normal` | All standard body text, table cell content, form field values |
| `Text Base/Strong` | Labels with visual emphasis, important inline terms |
| `Text Base/Underline` | Inline hyperlinks inside body copy |
| `Text Base/Delete` | Crossed-out original values (pricing, old quantity) |
| `Text Base/Italic` | Quotes, editorial notes, placeholder copy instructions |
| `Text SM/Normal` | Captions, helper text, form hints, timestamps, metadata |
| `Text SM/Strong` | Small-scale labels that need extra weight (status badges, counts) |
| `Text SM/Underline` | Small inline links (terms of service, footnotes) |
| `Text SM/Delete` | Small crossed-out values (discount original price) |

### Do NOT mix heading and body styles outside their tier:
- Don't use `Heading/5` as body text — use `Text LG/Strong` instead
- Don't use `Text Base/Strong` as a heading — use `Heading/4` or `Heading/5`
- Don't use `Text SM` for primary content — it is for supporting/secondary information only

---

## Applying Text Styles in `use_figma`

```js
// Preload fonts — always required
await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });

// Get all text styles for lookup
const textStyles = await figma.getLocalTextStylesAsync();
const findStyle = name => textStyles.find(s => s.name === name);

// Apply a named text style to a text node
const node = figma.createText();
node.characters = 'Section Title';
const style = findStyle('Heading/3');
if (style) node.textStyleId = style.id;

// Manual fallback (when style binding not possible)
node.fontName = { family: 'Roboto', style: 'Medium' };
node.fontSize = 24;
node.lineHeight = { unit: 'PIXELS', value: 32 };
```

---

## Compact Density in Figma

To apply Compact mode to a frame, set the variable mode on the `3. Typography` collection:

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const typoColl = collections.find(c => c.name === '3. Typography');
const compactMode = typoColl.modes.find(m => m.name === 'Compact');
frame.setExplicitVariableModeForCollection(typoColl, compactMode.modeId);
```

This will reduce all font sizes and line heights to the Compact values automatically for the frame and its descendants.
