# Layout Components

---

## Layout

**When to use:** Defining the overall page shell — header, sidebar, content area, footer. Use when building the structural frame of any app screen.

### Figma component
`Layout` — Type=Header-Content-Footer | Header-Sider | Custom trigger | Fixed Header | Sider | Responsive | Header Sider 2

### Sub-components
- `Layout` — outer wrapper
- `Layout.Header` — top bar
- `Layout.Sider` — collapsible sidebar
- `Layout.Content` — main area
- `Layout.Footer` — bottom bar

### Key API props

**Layout:**
| Prop | Type | Notes |
|---|---|---|
| `hasSider` | boolean | Set when Sider is a direct child |

**Layout.Sider:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `collapsed` | boolean | — | Controlled collapsed state |
| `defaultCollapsed` | boolean | false | Initial state |
| `collapsible` | boolean | false | Show collapse trigger |
| `width` | number / string | 200 | Expanded width |
| `collapsedWidth` | number | 80 | Width when collapsed (0 = hidden + trigger) |
| `theme` | `light\|dark` | `dark` | Color theme |
| `trigger` | ReactNode | — | Custom collapse trigger |
| `reverseArrow` | boolean | false | Flip arrow direction |
| `breakpoint` | `xs\|sm\|md\|lg\|xl\|xxl` | — | Auto-collapse at this breakpoint |
| `onCollapse` | function | — | Collapse state change callback |
| `onBreakpoint` | function | — | Breakpoint triggered callback |

### Usage rules
- UpS uses `theme="dark"` on `Sider` (background: `colorBgSpotlight` = `#191b1d`)
- Set `hasSider` on the outer `Layout` when `Sider` is a direct child
- For zero-width collapse (hidden sidebar), use `collapsedWidth={0}` — this shows a floating toggle
- Always define `breakpoint` for responsive behavior; default triggers at `lg`
- `Layout.Header` height is 64px by default; override via CSS

---

## Grid (Row / Col)

**When to use:** Multi-column page layouts, card grids, responsive content areas. The 24-column system maps directly to Ant Design's `<Row>/<Col>`.

### Figma component
`Grid` — Columns=1|2|3|4|6|8

### Key API props

**Row:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `gutter` | number / [h, v] / responsive object | 0 | Column spacing |
| `justify` | `start\|end\|center\|space-around\|space-between\|space-evenly` | `start` | Horizontal align |
| `align` | `top\|middle\|bottom\|stretch` | `top` | Vertical align |
| `wrap` | boolean | true | Allow column wrapping |

**Col:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `span` | number (1–24) | — | Columns to occupy |
| `offset` | number | 0 | Shift right by N columns |
| `push` / `pull` | number | 0 | Move left/right |
| `order` | number | 0 | Flex order |
| `xs\|sm\|md\|lg\|xl\|xxl` | number / object | — | Responsive span |

### Breakpoints
| Key | Min width |
|---|---|
| xs | 0 (< 576px) |
| sm | 576px |
| md | 768px |
| lg | 992px |
| xl | 1200px |
| xxl | 1600px |

### Common span patterns
| Layout | Col spans |
|---|---|
| Full width | `span={24}` |
| Halves | `span={12}` |
| Thirds | `span={8}` |
| Quarters | `span={6}` |
| Main + sidebar | `span={16}` + `span={8}` |
| Wide + narrow | `span={18}` + `span={6}` |

### Usage rules
- Always set `gutter` for column spacing — never use `margin` on Col directly
- For cards in a grid: `<Row gutter={[16, 16]}>` (horizontal and vertical gaps)
- Responsive: pass object to `xs`/`md`/`lg` for different spans per breakpoint
- UpS standard canvas = 1440px → use `xl` breakpoint config for primary layout

---

## Flex

**When to use:** Directional alignment and spacing between elements — when Grid's column model is overkill. Use for toolbars, action bars, centered content, and wrapping tag groups.

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `vertical` | boolean | false | Column direction |
| `justify` | CSS `justify-content` | `normal` | Main-axis alignment |
| `align` | CSS `align-items` | `normal` | Cross-axis alignment |
| `gap` | `small\|middle\|large\|number` | — | Spacing between children |
| `wrap` | boolean / CSS `flex-wrap` | `nowrap` | Allow wrapping |
| `flex` | CSS `flex` | `normal` | Flex shorthand |
| `component` | React.ComponentType | `div` | Custom wrapper element |

### Usage rules
- Use `gap="small"` (8px) for button groups, `gap="middle"` (16px) for sections
- `justify="space-between"` for header bar layouts (title left, actions right)
- `align="center"` for vertically centering items in a row
- Prefer Flex over manual `display: flex` CSS for consistency with token system

### Flex vs Space
- **Flex**: block-level, no DOM wrappers on children, best for layouts
- **Space**: inline-level, wraps each child in a span, best for inline chip/tag rows

---

## Space

**When to use:** Adding consistent gaps between inline sibling elements — button groups, form inline actions, tag lists. Avoid components clinging together.

### Figma component
`Space` — Slots=1–12, Space=Small|Middle|Large|None, Orientation=Horizontal|Vertical, Split=True|False

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `small\|middle\|large\|number` | `small` | Gap: 8/16/24px |
| `direction` | `horizontal\|vertical` | `horizontal` | Layout axis |
| `align` | `start\|end\|center\|baseline` | `center` | Cross-axis align |
| `wrap` | boolean | false | Allow line wrapping |
| `separator` | ReactNode | — | Divider between items |

**Space.Compact:** Collapses borders between adjacent form inputs/buttons — use for joined control groups (search + button, prefix + input).

### Usage rules
- `size="small"` (8px) between related controls; `size="middle"` (16px) between groups
- `separator` for breadcrumb-style inline text chains
- `Space.Compact` for Input + Button, Select + Input, or button toggle groups — creates a merged border appearance

---

## Divider

**When to use:** Separating sections of an article or form. Dividing inline text and links (e.g. operation columns in tables).

### Figma component
`Divider Horizontal` — Variant=Solid|Dashed|Dotted, Orientation=Center|Left|Right|None, Text Type=None|Plain|Title

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `orientation` | `left\|right\|center` | `center` | Text label position |
| `dashed` | boolean | false | Dashed line style |
| `variant` | `solid\|dashed\|dotted` | `solid` | Line style |
| `vertical` | boolean | false | Vertical inline divider |
| `plain` | boolean | true | Plain text (not title style) |
| `size` | `small\|medium` | `large` | Vertical margin |
| `children` | ReactNode | — | Label inside the divider |

### Usage rules
- Horizontal divider with no label: `<Divider />` — use between card sections
- Horizontal divider with label: `<Divider>Section Title</Divider>` — use in long forms
- Vertical divider: `<Divider type="vertical" />` — use between inline link/action pairs in tables
- `variant="dashed"` for optional/soft separations; `variant="dotted"` for subtle delineations

---

## Splitter

**When to use:** Resizable dual-pane layouts where the user controls panel sizes — file explorer + preview, code + output, list + detail.

### Figma components
- `Splitter` — Orientation=Horizontal|Vertical, Collapsible=True|False
- `Splitter / Bar Dragger` — Orientation, State=Default|Hover|Active|Disabled
- `Splitter / Collapse Button` — Direction=Right|Left|Up|Down, State=Default|Hover|Active

### Key API props

**Splitter:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `orientation` | `horizontal\|vertical` | `horizontal` | Split direction |
| `collapsible` | boolean / config | — | Enable collapse buttons |
| `lazy` | boolean | false | Defer resize until drag end |
| `onResize` | function | — | Fires during drag |
| `onResizeEnd` | function | — | Fires after drag |
| `onCollapse` | function | — | Panel collapse/expand |

**Splitter.Panel:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | number / string | — | Controlled size (px or %) |
| `defaultSize` | number / string | — | Initial size |
| `min` | number / string | — | Minimum size |
| `max` | number / string | — | Maximum size |
| `resizable` | boolean | true | Allow resize |
| `collapsible` | boolean / config | false | Collapsible toggle |

### Usage rules
- Set `min` and `max` on panels to prevent unusable extremes
- Use `lazy={true}` for heavy panels (charts, maps) to reduce reflow during drag
- `collapsible` on secondary panels (sidebar, preview) — not on primary content
- Horizontal split for list+detail (left/right); vertical for top/bottom stacked views
