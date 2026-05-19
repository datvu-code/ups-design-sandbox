# General Components

---

## Button

**When to use:** Any user-triggered action — submit, confirm, navigate, command. Use when a click should initiate a business operation.

### Figma component
`Button / Basic` — Component Set

### Variants
| Prop | Values |
|---|---|
| `Type` | Primary, Default, Text, Link, Button (Dashed) |
| `Size` | Large (40px), Default (32px), Small (24px) |
| `State` | Default, Hover, Focused, Disabled |
| `Content` | Basic (with label), Icon Only |
| `Ghost` | False, True |
| `Danger` | False, True |
| `Shape` | Default, Round |

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `primary\|default\|dashed\|text\|link` | `default` | Visual hierarchy |
| `size` | `large\|middle\|small` | `middle` | Height: 40/32/24px |
| `danger` | boolean | false | Red destructive style |
| `ghost` | boolean | false | Transparent bg, inverted border/text |
| `disabled` | boolean | false | Non-interactive state |
| `loading` | boolean / `{delay, icon}` | false | Spinner + prevents double submit |
| `icon` | ReactNode | — | Leading or trailing icon |
| `iconPlacement` | `start\|end` | `start` | Icon position |
| `shape` | `default\|circle\|round` | `default` | Corner style |
| `block` | boolean | false | Full-width |
| `htmlType` | `button\|submit\|reset` | `button` | Native form type |
| `href` | string | — | Renders as `<a>` |
| `onClick` | function | — | Click handler |

### Usage rules
- **One `primary` per section** — never two primary buttons side-by-side
- Pair primary with `default` or `text` for secondary actions
- Always set `loading` on async submit buttons to prevent double-clicks
- Use `danger` + `type="primary"` for irreversible destructive actions (delete, remove)
- `ghost` is for buttons on dark or colored backgrounds only
- `type="text"` / `type="link"` for the lowest visual emphasis inline actions
- `Icon Only` content variant requires a Tooltip for accessibility

### Do NOT use when
- Navigating external URLs with full page reload — use `<a>` tag
- Displaying a status or label — use Tag
- An action lives inside a table cell — use `type="link"` or icon button

---

## FloatButton

**When to use:** Global, persistent actions that must be accessible from anywhere on the page (back-to-top, help, chat). Buttons the user should see while browsing anywhere on the site.

### Figma components
- `FloatButton` — single button
- `FloatButton Group` — stacked group (vertical or horizontal)
- `FloatButton Menu` — expandable trigger with children
- `FloatButton / FloatButton Item / Group Item` — individual item in group

### Variants
| Component | Variant props |
|---|---|
| FloatButton | Type=Default\|Primary, State=Default\|Hover, Shape=Circle\|Square, Badge=None\|Dot\|Small |
| FloatButton Group | Type=Circle\|Square, Direction=Vertical\|Horizontal |
| FloatButton Menu | Open=No\|Yes, Placement=Top\|Bottom\|Right\|Left |

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `default\|primary` | `default` | Color style |
| `shape` | `circle\|square` | `circle` | Button shape |
| `icon` | ReactNode | — | Icon inside button |
| `tooltip` | ReactNode / TooltipProps | — | Hover label |
| `badge` | BadgeProps | — | Count or dot indicator |
| `disabled` | boolean | — | Disable interaction |
| `href` | string | — | Link target |
| `onClick` | function | — | Click handler |

**FloatButton.Group:**
| Prop | Type | Default |
|---|---|---|
| `trigger` | `click\|hover` | — |
| `open` | boolean | — |
| `placement` | `top\|left\|right\|bottom` | `right` |
| `shape` | `circle\|square` | `circle` |
| `onOpenChange` | function | — |

**FloatButton.BackTop:**
| Prop | Type | Default |
|---|---|---|
| `visibilityHeight` | number | 400 |
| `duration` | number | 450ms |
| `target` | function | window |

### Usage rules
- Always position bottom-right, 24px from edges (default behavior)
- Use `circle` shape as default; `square` only for text/description content
- Maximum 5 items in a group; more → use Drawer or side panel
- Always add `tooltip` for icon-only buttons (accessibility)
- Use `FloatButton.BackTop` for long scrollable pages — appears after scrolling 400px

### Do NOT use when
- Action is scoped to a specific section — embed it inline instead
- Dense enterprise dashboards where it competes with data
- Mobile-first designs that already have a bottom nav bar

---

## Icon

**When to use:** Reinforce meaning alongside labels, indicate actions, represent status. Icons alone (without labels) require tooltips.

### Figma component
The Icon page contains the full icon library — `323:0`. Icons are INSTANCE_SWAP props on most components.

### Usage rules
- Always pair standalone icons with `Tooltip` for screen readers
- Use `colorIcon` (#707274) for default icons, `colorIconHover` (#0f1215) on hover
- `fontSizeIcon` (12px) is the standard icon size token; match to text size context
- Icons in buttons use the component's own `icon` prop — do not nest manually
- For decorative-only icons, set `aria-hidden="true"`

---

## Typography

**When to use:** Displaying article/blog/note content, titles, paragraphs. Text that needs copyable, editable, or ellipsis behavior.

### Figma components
- `Title` — heading levels 1–5
- `Text` — body text with type and style variants
- `Link` — inline anchor text

### Variants
| Component | Variant props |
|---|---|
| Title | Level=1\|2\|3\|4\|5, Editable=True\|False |
| Text | Type=Default\|Secondary\|Success\|Warning\|Danger\|Mark\|Disabled, Style=Default\|Underline\|Delete\|Italic\|Strong, Size=Base\|LG\|SM |
| Link | Underlined=Yes\|No |

### Key API props

**Typography.Title:**
| Prop | Type | Default |
|---|---|---|
| `level` | 1–5 | 1 |
| `editable` | boolean / config | false |
| `copyable` | boolean / config | false |
| `ellipsis` | boolean / config | false |
| `type` | `secondary\|success\|warning\|danger` | — |

**Typography.Text:**
| Prop | Type | Default |
|---|---|---|
| `type` | `secondary\|success\|warning\|danger` | — |
| `strong` | boolean | false |
| `italic` | boolean | false |
| `underline` | boolean | false |
| `delete` | boolean | false |
| `mark` | boolean | false |
| `code` | boolean | false |
| `keyboard` | boolean | false |
| `copyable` | boolean / config | false |
| `editable` | boolean / config | false |
| `ellipsis` | boolean / config | false |
| `disabled` | boolean | false |

**Typography.Paragraph:** Same as Text, plus multi-row `ellipsis` with `rows` config.

**Typography.Link:** Same as Text — renders `<a>` tag.

### Usage rules
- Use `<Title level={3}>` for card/panel headers, `level={4}` for sub-sections
- `type="secondary"` for supporting text, `type="danger"` for error messages inline
- `copyable` on order IDs, tracking codes, API keys — reduces friction for users
- `editable` for inline rename/edit patterns (table row name, note title)
- `ellipsis` with `rows={2}` for card descriptions — always add `tooltip` so full text is accessible
- `<Text code>` for monospace values (not full code blocks — use a code block component)

### Do NOT use when
- Displaying form field labels — use `Form.Item label`
- Rendering large code blocks — use a syntax highlighter
