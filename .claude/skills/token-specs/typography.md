# Typography Tokens — UpS Design System

**Collection:** `3. Typography` | **Modes:** Default, Compact  
**Source:** Figma file `HttbhVBjPw9HxgqcjBONuh`, Typography page  
**Total variables:** 22

---

## Collection Structure

```
3. Typography
├── Font Family/   fontFamily, fontFamilyCode
├── Font Size/     fontSizeSM → fontSizeHeading1
├── Line Height/   lineHeightSM → lineHeightHeading1
└── Font Weight/   fontWeightNormal, fontWeightStrong
```

---

## Font Family

| Token | Value (both modes) | Use for |
|---|---|---|
| `Typography/Font Family/fontFamily` | `Roboto` | **All UI text** — body, labels, headings, buttons, inputs |
| `Typography/Font Family/fontFamilyCode` | `Courier Prime` | Code snippets, monospace values (order IDs, tracking codes, API tokens, formula strings) |

**Rules:**
- Never substitute `Roboto` with system fonts, Inter, or SF Pro. Roboto is the declared brand typeface.
- `Courier Prime` is exclusively for monospace/code contexts. Do not use it for display or body copy.
- Always preload both fonts in `use_figma` before any text operations:
  ```js
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });
  ```

---

## Font Size

### Body sizes

| Token | Default | Compact | Paired style name | Use for |
|---|---|---|---|---|
| `Typography/Font Size/fontSizeSM` | 12px | 10px | `Text SM/*` | Captions, timestamps, metadata, secondary badge labels |
| `Typography/Font Size/fontSize` | 14px | 12px | `Text Base/*` | **Standard body text** — most content, form labels, table cells |
| `Typography/Font Size/fontSizeLG` | 16px | 14px | `Text LG/*` | Introductory paragraphs, lead copy, card descriptions |
| `Typography/Font Size/fontSizeXL` | 20px | 16px | — | Oversized labels, stat values that aren't headings |
| `Typography/Font Size/fontSizeIcon` | 12px | 12px | — | Icon-font size reference (both modes, unchanged) |

### Heading sizes

| Token | Default | Compact | Paired style name | Use for |
|---|---|---|---|---|
| `Typography/Font Size/fontSizeHeading5` | 16px | 14px | `Heading/5` | Small section headings, accordion headers, sidebar labels |
| `Typography/Font Size/fontSizeHeading4` | 20px | 16px | `Heading/4` | Card titles, group headings, sub-section titles |
| `Typography/Font Size/fontSizeHeading3` | 24px | 20px | `Heading/3` | Panel titles, drawer headers, major section titles |
| `Typography/Font Size/fontSizeHeading2` | 30px | 26px | `Heading/2` | Page-section headings |
| `Typography/Font Size/fontSizeHeading1` | 38px | 32px | `Heading/1` | Page title — one per page maximum |

**Compact shrink amounts:**
- Body: −2px per step (fontSizeSM: 12→10, fontSize: 14→12, fontSizeLG: 16→14, fontSizeXL: 20→16)
- Headings: H5 −2px, H4 −4px, H3 −4px, H2 −4px, H1 −6px
- fontSizeIcon: unchanged (12px both modes)

---

## Line Height

Line heights are always slightly tighter than a 1.5× ratio to feel compact and professional in enterprise UI.

### Body line heights

| Token | Default | Compact | Paired size | Ratio (Default) |
|---|---|---|---|---|
| `Typography/Line Height/lineHeightSM` | 20px | 18px | 12px | 1.67× |
| `Typography/Line Height/lineHeight` | 22px | 20px | 14px | 1.57× |
| `Typography/Line Height/lineHeightLG` | 24px | 22px | 16px | 1.50× |

### Heading line heights

| Token | Default | Compact | Paired size |
|---|---|---|---|
| `Typography/Line Height/lineHeightHeading5` | 24px | 22px | 16px |
| `Typography/Line Height/lineHeightHeading4` | 28px | 24px | 20px |
| `Typography/Line Height/lineHeightHeading3` | 32px | 28px | 24px |
| `Typography/Line Height/lineHeightHeading2` | 38px | 34px | 30px |
| `Typography/Line Height/lineHeightHeading1` | 46px | 40px | 38px |

**Always pair font size with its matching line height.** Never mix, e.g. using `fontSize` (14px) with `lineHeightLG` (24px).

**Correct pairings:**
```
fontSizeSM (12px)       ↔  lineHeightSM (20px)
fontSize (14px)         ↔  lineHeight (22px)
fontSizeLG (16px)       ↔  lineHeightLG (24px)
fontSizeHeading5 (16px) ↔  lineHeightHeading5 (24px)
fontSizeHeading4 (20px) ↔  lineHeightHeading4 (28px)
fontSizeHeading3 (24px) ↔  lineHeightHeading3 (32px)
fontSizeHeading2 (30px) ↔  lineHeightHeading2 (38px)
fontSizeHeading1 (38px) ↔  lineHeightHeading1 (46px)
```

> Note: `fontSizeLG` and `fontSizeHeading5` share the same 16px Default size but map to different Compact sizes (14px vs 14px — same here) and different line heights (lineHeightLG vs lineHeightHeading5). The named text styles in Figma (`Text LG/Normal` vs `Heading/5`) handle this distinction — always apply the named style rather than setting values manually.

---

## Font Weight

| Token | Value | Maps to | Use for |
|---|---|---|---|
| `Typography/Font Weight/fontWeightNormal` | 400 | Roboto Regular | Standard body text, labels, descriptions |
| `Typography/Font Weight/fontWeightStrong` | 600 | Roboto Medium | Headings, strong/bold text, active labels, numeric emphasis |

> In Figma's font picker, weight 600 corresponds to the `Medium` style in Roboto. There is no separate "SemiBold" style — use `style: 'Medium'` in `loadFontAsync`.

**When to use Strong:**
- All headings (Heading/1 → Heading/5) use `fontWeightStrong`
- Text `*/Strong` variants use `fontWeightStrong`
- Numeric KPI values in dashboards
- Tab labels when selected
- Active menu item labels

**When to use Normal:**
- All body text (`Text Base/Normal`, `Text LG/Normal`, `Text SM/Normal`)
- Form labels
- Table cell content
- Button labels (buttons use medium visually but map to `fontWeightStrong`)

---

## Full Type Scale — Combined Reference

| Name | Size (Default) | Line Height (Default) | Weight | Style |
|---|---|---|---|---|
| **Heading/1** | 38px | 46px | Strong (Medium) | — |
| **Heading/2** | 30px | 38px | Strong (Medium) | — |
| **Heading/3** | 24px | 32px | Strong (Medium) | — |
| **Heading/4** | 20px | 28px | Strong (Medium) | — |
| **Heading/5** | 16px | 24px | Strong (Medium) | — |
| Text LG/Normal | 16px | 24px | Normal (Regular) | — |
| Text LG/Strong | 16px | 24px | Strong (Medium) | — |
| Text LG/Underline | 16px | 24px | Normal | underline |
| Text LG/Delete | 16px | 24px | Normal | strikethrough |
| Text LG/Italic | 16px | 24px | Normal | italic |
| **Text Base/Normal** | 14px | 22px | Normal (Regular) | — |
| Text Base/Strong | 14px | 22px | Strong (Medium) | — |
| Text Base/Underline | 14px | 22px | Normal | underline |
| Text Base/Delete | 14px | 22px | Normal | strikethrough |
| Text Base/Italic | 14px | 22px | Normal | italic |
| Text SM/Normal | 12px | 20px | Normal (Regular) | — |
| Text SM/Strong | 12px | 20px | Strong (Medium) | — |
| Text SM/Underline | 12px | 20px | Normal | underline |
| Text SM/Delete | 12px | 20px | Normal | strikethrough |
| Text SM/Italic | 12px | 20px | Normal | italic |

---

## Compact Mode — Typography Changes

| Token | Default | Compact | Δ |
|---|---|---|---|
| `fontSizeSM` | 12px | 10px | −2 |
| `fontSize` | 14px | 12px | −2 |
| `fontSizeLG` | 16px | 14px | −2 |
| `fontSizeXL` | 20px | 16px | −4 |
| `fontSizeIcon` | 12px | 12px | 0 |
| `fontSizeHeading5` | 16px | 14px | −2 |
| `fontSizeHeading4` | 20px | 16px | −4 |
| `fontSizeHeading3` | 24px | 20px | −4 |
| `fontSizeHeading2` | 30px | 26px | −4 |
| `fontSizeHeading1` | 38px | 32px | −6 |
| `lineHeightSM` | 20px | 18px | −2 |
| `lineHeight` | 22px | 20px | −2 |
| `lineHeightLG` | 24px | 22px | −2 |
| `lineHeightHeading5` | 24px | 22px | −2 |
| `lineHeightHeading4` | 28px | 24px | −4 |
| `lineHeightHeading3` | 32px | 28px | −4 |
| `lineHeightHeading2` | 38px | 34px | −4 |
| `lineHeightHeading1` | 46px | 40px | −6 |
| `fontWeightNormal` | 400 | 400 | 0 |
| `fontWeightStrong` | 600 | 600 | 0 |

To apply Compact typography mode:
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const typoColl = collections.find(c => c.name === '3. Typography');
const compact = typoColl.modes.find(m => m.name === 'Compact');
frame.setExplicitVariableModeForCollection(typoColl, compact.modeId);
```

---

## Usage Decision Guide

```
What is this text's role?

Page title (once per page)           → Heading/1 (38/46px Medium)
Major section title                  → Heading/2 or Heading/3
Card/panel header                    → Heading/3 (24/32px) or Heading/4 (20/28px)
Sub-section / group label            → Heading/4 or Heading/5
Inline label with strong emphasis    → Text Base/Strong (14/22px Medium)

Standard body / form fields          → Text Base/Normal (14/22px Regular)
Intro / lead paragraph               → Text LG/Normal (16/24px Regular)
Hyperlinks inline                    → Text Base/Underline
Crossed-out old value                → Text Base/Delete

Caption / timestamp / metadata       → Text SM/Normal (12/20px Regular)
Hint / helper text below field       → Text SM/Normal, colorTextTertiary
Small label with extra weight        → Text SM/Strong
```
