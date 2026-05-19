# Data Display Components

---

## Table

**When to use:** Displaying a collection of structured data with multiple columns. When sorting, filtering, pagination, or row selection is needed.

### Figma components
- `Table` — Size=Default|Middle|Small, Bordered=True|False
- `Table / Table Item / Header Item` — Size, Bordered, Sort=No|Yes, Hover
- `Table / Table cell` — Type=Text|Badge|Tag|Action|Dropdown|Rate|Switch|Progress, Size, Bordered, Hover, Sort
- `Table / Table Item / Header Control` — Type=Checkbox|Checkbox Dropdown|Empty|Radio
- `Table / Table Item / Row Control` — Type=Checkbox|Collapse|Expand|Radio
- `Table / Table Item / Dropdown Trigger` — Open=Yes|No
- `Table / Table Item / Dropdown Item` — Type=Footer|Header
- `Table / Table Item / Collapse` — Expanded=False|True, Pressed

### Key API props

**Table:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `dataSource` | object[] | — | Data array |
| `columns` | ColumnType[] | — | Column definitions |
| `rowKey` | string / function | `key` | Unique row identifier |
| `size` | `large\|middle\|small` | `large` | Row padding density |
| `bordered` | boolean | false | Show cell borders |
| `loading` | boolean | false | Loading state |
| `scroll` | `{x, y}` | — | Horizontal/vertical scroll |
| `sticky` | boolean / object | false | Fixed header on scroll |
| `showHeader` | boolean | true | Show column headers |
| `pagination` | PaginationProps / false | — | Pagination config |
| `rowSelection` | RowSelection | — | Checkbox/radio selection |
| `expandable` | ExpandableConfig | — | Expandable rows |
| `summary` | function | — | Summary row at bottom |
| `onChange` | function | — | Sort/filter/page callback |
| `onRow` | function | — | Row event handlers |

**Column definition:**
| Prop | Type | Notes |
|---|---|---|
| `title` | ReactNode | Header text |
| `dataIndex` | string / string[] | Data field key |
| `key` | string | Unique column key |
| `render` | function(value, record, index) | Custom cell renderer |
| `width` | number / string | Column width |
| `align` | `left\|center\|right` | Cell alignment |
| `ellipsis` | boolean | Truncate with tooltip |
| `fixed` | `left\|right` | Sticky column |
| `sorter` | function / boolean | Sort comparator |
| `sortOrder` | `ascend\|descend\|null` | Controlled sort |
| `filters` | Filter[] | Filter menu items |
| `filteredValue` | any[] | Controlled filter |
| `onFilter` | function | Filter logic |
| `onCell` | function(record, index) | Cell props override |
| `onHeaderCell` | function(column) | Header cell props |

**rowSelection:**
| Prop | Type | Notes |
|---|---|---|
| `type` | `checkbox\|radio` | Selection type |
| `selectedRowKeys` | Key[] | Controlled selection |
| `onChange` | function | Selection change |
| `getCheckboxProps` | function | Checkbox props per row |

### UpS grouped rows pattern
UpS uses a special grouped-row trick: `dataSource` interleaves `type: 'header'` rows (store/order group) with `type: 'product'` rows. Column `onCell` returns `{ colSpan: 0 }` on product rows for header columns, and `{ colSpan: N }` on header rows to span product columns.

### Usage rules
- Always set `rowKey` — never rely on array index
- Use `scroll={{ x: 'max-content' }}` when columns might overflow horizontally
- `sticky` for tables taller than 400px — keeps headers visible during scroll
- `size="middle"` for standard tables; `size="small"` for nested/sub-tables
- `bordered` for dense data grids (financial, inventory); no border for simpler lists
- Always include Pagination with `showTotal` and `showSizeChanger` for datasets > 20 rows
- Column `fixed="left"` for identifiers (order ID, name); `fixed="right"` for actions

---

## Card

**When to use:** Grouping related content into a self-contained block — dashboard panels, entity detail views, settings sections.

### Figma components
- `Card / Basic` — Size=Default|Small, Borderless=False|True, Tabs=False|True
- `Card / Advanced` — Type=Advanced|Simple
- `Card / Grid` — Columns=4|3|2
- `Card / Inner` (implied by nested card pattern)

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — | Header text |
| `extra` | ReactNode | — | Top-right corner action |
| `cover` | ReactNode | — | Image at top (Advanced) |
| `actions` | ReactNode[] | — | Bottom action bar |
| `loading` | boolean | false | Loading skeleton |
| `hoverable` | boolean | false | Hover lift effect |
| `size` | `default\|small` | `default` | Padding density |
| `variant` | `outlined\|borderless` | `outlined` | Border visibility |
| `tabList` | TabItemType[] | — | Tab navigation in header |
| `activeTabKey` | string | — | Controlled active tab |

**Card.Grid:**
| Prop | Type | Notes |
|---|---|---|
| `hoverable` | boolean (default true) | Hover lift |

**Card.Meta:**
| Prop | Type | Notes |
|---|---|---|
| `avatar` | ReactNode | Left avatar/icon |
| `title` | ReactNode | Meta title |
| `description` | ReactNode | Meta description |

### Usage rules
- `extra` for the primary card-level action (Edit, View All, Refresh)
- `loading={true}` while async data loads — shows a skeleton, not a blank card
- `hoverable` for clickable cards that navigate to a detail view
- `variant="borderless"` for cards on colored backgrounds (inside a bordered parent)
- `Card.Grid` for uniform product/user catalog grids inside a card
- `type="inner"` for sub-sections within a parent card (nested grouping)
- `tabList` for cards with switchable content views (Overview / Analytics / Settings)

---

## Tag

**When to use:** Labeling data by dimension or property. Categorizing. Indicating status inline. Filterable checkable tags.

### Figma components
- `Tag / Basic` — Variant=Default|Closeable|Add New
- `Tag / Colorful` — Preset=Blue|Cyan|Geekblue|Gold|Green|Lime|Magenta|Orange|Purple|Red|Volcano, Type=Solid|Filled|Outlined
- `Tag / Status` — Status=Default|Error|Processing|Success|Warning, Type=Outlined|Filled|Solid
- `Tag / Icon` — Type=Twitter|Youtube|Facebook|LinkedIn (generic icon examples)
- `Tag / Checkable` — Checked=True|False

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `color` | string | — | Preset color name or hex |
| `icon` | ReactNode | — | Leading icon |
| `closeIcon` | ReactNode / boolean | — | Custom close button |
| `disabled` | boolean | false | Disable interaction |
| `variant` | `filled\|solid\|outlined` | `outlined` | Visual style |
| `onClose` | function | — | Close callback |

**Tag.CheckableTag:**
| Prop | Type |
|---|---|
| `checked` | boolean |
| `onChange` | function(checked) |

### Preset color guide
**Status:** `success` (green), `processing` (blue pulsing dot), `warning` (orange), `error` (red), `default` (gray)

**Palette:** `magenta`, `red`, `volcano`, `orange`, `gold`, `lime`, `green`, `cyan`, `blue`, `geekblue`, `purple`

### Usage rules
- Use Status tags for order status, payment status, shipment status
- Use Colorful tags for category color coding — be consistent (Gold=warning, Green=success, Red=error, Blue=info)
- Closeable variant for user-removable filter chips or selected values
- `Add New` variant for inline tag creation buttons
- `CheckableTag` for multi-select filter bars (select multiple product categories)
- Max 3 tags per table cell before truncation is needed

---

## Badge

**When to use:** Showing unread counts on icons/avatars. Status dots. Corner ribbons on cards.

### Figma components
- `Badge / Basic` — Type=Default|Small|Dot
- `Badge / Status` — Status=Default|Error|Processing|Success|Warning
- `Badge / Ribbon` — Color=Volcano|Daybreak Blue|Magenta|Dust Red|Cyan|Polar Green|Golden Purple

### Key API props

**Badge:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `count` | ReactNode | — | Display number |
| `dot` | boolean | false | Show dot instead |
| `overflowCount` | number | 99 | Max before "99+" |
| `showZero` | boolean | false | Show when count=0 |
| `status` | `success\|processing\|default\|error\|warning` | — | Status dot mode |
| `text` | ReactNode | — | Text beside status dot |
| `color` | string | — | Custom dot color |
| `size` | `default\|small` | `default` | Badge size |
| `offset` | [x, y] | — | Position adjustment |

**Badge.Ribbon:**
| Prop | Type | Default |
|---|---|---|
| `text` | ReactNode | — |
| `placement` | `start\|end` | `end` |
| `color` | string | — |

### Usage rules
- `dot` mode for notification bell icons — just shows presence, not count
- `status="processing"` for live/active states (order being processed, live stream)
- `Badge.Ribbon` for highlighting cards as "New", "Hot", "Featured"
- Always wrap Badge around the element it annotates (`<Badge count={5}><BellIcon /></Badge>`)

---

## Avatar

**When to use:** User representation with photo, initials, or icon. Stacked groups for teams/contributors.

### Figma components
- `Avatar` — Type=Icon|Image|Text, Size=Custom|Default|Large|Small, Shape=Circle|Square
- `Avatar Group` — Size=Custom|Default|Large|Small

### Usage rules
- `shape="circle"` for user avatars; `shape="square"` for brand logos or entity icons
- `Avatar.Group` with `maxCount` for teams — overflow shows "+N" counter
- Always provide `alt` text for image avatars (accessibility)
- Size: `large` (40px) for profile headers; `default` (32px) for list items; `small` (24px) for inline

---

## Collapse

**When to use:** Grouping/hiding complex regions to keep the page clean. FAQ sections, filter panels, settings with many options.

### Figma components
- `Collapse` — Type=Basic|Borderless|Ghost, Size=Default|Small|Large
- `Collapse / Collapse Item` — Type, Size, Collapsed=True|False, Expan Icon Placement=Left|Right, Disabled

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | CollapseItem[] | — | Panel definitions |
| `activeKey` | string[] / number[] | — | Controlled open panels |
| `defaultActiveKey` | string[] / number[] | — | Initially open |
| `accordion` | boolean | false | Only one open at a time |
| `bordered` | boolean | true | Show border |
| `ghost` | boolean | false | Transparent borderless |
| `size` | `large\|middle\|small` | `middle` | Padding density |
| `expandIcon` | function | — | Custom expand arrow |
| `expandIconPlacement` | `start\|end` | `start` | Arrow position |
| `onChange` | function | — | Active panel change |

**CollapseItem:**
| Prop | Type | Notes |
|---|---|---|
| `key` | string / number | Unique ID |
| `label` | ReactNode | Header text |
| `children` | ReactNode | Panel content |
| `extra` | ReactNode | Top-right corner |
| `collapsible` | `header\|icon\|disabled` | Trigger mode |
| `showArrow` | boolean | Arrow visibility |

### Usage rules
- `accordion` for FAQ (one answer visible at a time)
- `ghost` for settings sidebar panels (no visible container)
- `expandIconPlacement="end"` for right-aligned expand arrows (cleaner in tight layouts)
- `type="borderless"` for collapse inside a card (avoids double borders)

---

## Descriptions

**When to use:** Read-only entity detail view — order summary, user profile, record inspection. Key-value pair display.

### Figma components
- `Descriptions` — Size=Default|Middle|Small
- `Descriptions / Descriptions Item / Border` — Variant=Content|Label|Status, Size

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — | Section header |
| `extra` | ReactNode | — | Top-right action |
| `items` | DescriptionsItem[] | — | Field definitions |
| `bordered` | boolean | false | Table-style borders |
| `layout` | `horizontal\|vertical` | `horizontal` | Label/value orientation |
| `column` | number / responsive | 3 | Columns per row |
| `size` | `default\|middle\|small` | `default` | Padding density |

**DescriptionsItem:**
| Prop | Type | Notes |
|---|---|---|
| `label` | ReactNode | Field name |
| `children` | ReactNode | Field value |
| `span` | number | Columns to span |

### Usage rules
- `bordered` for dense data inspection (entity detail pages)
- `layout="vertical"` for relaxed product/order summary displays
- Combine with `<Badge status="processing" text="In Progress" />` for status fields
- `column={2}` for two-column layouts; `column={1}` for mobile-adapted views

---

## Timeline

**When to use:** Chronological event display — order history, shipment tracking, audit log, activity feed.

### Figma components
- `Timeline` — Text Placement=Alternate|Left|Right
- `Timeline / Timeline Item / Basic` — Color=Blue|Gray|Green|Red, Text Placement
- `Timeline / Timeline Item / Custom` — Text Position=Alternate|Left|Right
- `Timeline / Timeline Item / Horizontal` — Text Placement=Top|Bottom, Order=First|Center|Last
- `Timeline / Horizontal` — Text Placement=Top|Center|Bottom

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | TimelineItem[] | — | Event definitions |
| `mode` | `left\|alternate\|right` | `left` | Item position |
| `pending` | ReactNode / boolean | false | Loading indicator at end |
| `reverse` | boolean | false | Latest event first |

**TimelineItem:**
| Prop | Type | Notes |
|---|---|---|
| `color` | `blue\|red\|green\|gray` / string | Dot color |
| `dot` | ReactNode | Custom dot element |
| `label` | ReactNode | Left-side label (alternate mode) |
| `children` | ReactNode | Event content |

### Usage rules
- `color="green"` for completed events, `color="blue"` for active/current, `color="red"` for errors
- `mode="alternate"` for timelines with both labels and content (dates on left, events on right)
- `pending` for live timelines still in progress (last item shows loading)
- Use `reverse={true}` when most recent event is most relevant (activity log)

---

## Statistic

**When to use:** Dashboard KPI cards — total orders, revenue, conversion rate, any large focal number.

### Figma components
- `Statistic` — Type=Basic|Down|Up
- `Statistic / Card` — Type=Down|Up
- `Statistic / Countdown` — Type=1|2

### Key API props
| Prop | Type | Notes |
|---|---|---|
| `title` | ReactNode | Metric label |
| `value` | number / string | The main number |
| `prefix` | ReactNode | Before the value |
| `suffix` | ReactNode | After the value |
| `precision` | number | Decimal places |
| `formatter` | function | Custom value render |
| `valueStyle` | CSSProperties | Style on value text |
| `decimalSeparator` | string | Decimal char |
| `groupSeparator` | string | Thousands char |

**Statistic.Countdown:**
| Prop | Type | Notes |
|---|---|---|
| `value` | number / dayjs | Target timestamp |
| `format` | string | Display format |
| `onFinish` | function | Countdown complete |
| `onChange` | function | Tick callback |

---

## Tree

**When to use:** Displaying hierarchical data — folder structures, org charts, permission trees, nested categories.

### Figma components
- `Tree` — Type=Basic|Checkbox|Icon|Leaf|Draggable, Line=False|True
- `Tree / Tree Item` — Type=Basic|Checkbox|Icon, Level=Level 1|2|3, State, Collapsed, Line, Draggable

---

## Collapse (see above)

---

## Empty

**When to use:** Zero-state for any list, table, or container with no data. Always include a primary action.

### Figma components
- `Empty / Image` — Image=1|2 (two illustration variants)

---

## Popover

**When to use:** Rich tooltip with interactive content — user info card, detailed description with links, action group.

### Figma component
`Popover` — Placement=Top Left|Top|Top Right|Bottom Left|Bottom|Bottom Right|Left Top|Left|Left Bottom|Right Top|Right|Right Bottom

### Key API props
| Prop | Type | Notes |
|---|---|---|
| `title` | ReactNode | Popover header |
| `content` | ReactNode | Popover body |
| `trigger` | `hover\|focus\|click\|contextMenu` | Activation |
| `placement` | 12 positions | Position relative to trigger |
| `open` | boolean | Controlled state |
| `onOpenChange` | function | Open state callback |

---

## Tooltip

**When to use:** Brief single-line hover hints for icon buttons, truncated text, abbreviated values.

### Figma components
- `Tooltip` — Placement (12 positions)
- `Tooltip / Color Preset` — Type=Default|Blue|Cyan|Geekblue|Gold|Green|Lime|Magenta|Orange|Purple|Red|Volcano|Yellow|Custom

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — | Tooltip content |
| `placement` | string | `top` | 12 positions |
| `trigger` | string / array | `hover` | Activation |
| `color` | string | — | Background color |
| `arrow` | boolean / object | true | Arrow visibility |
| `open` | boolean | false | Controlled |
| `mouseEnterDelay` | number | 0.1s | Show delay |
| `mouseLeaveDelay` | number | 0.1s | Hide delay |

### Do NOT use when
- Content has interactive elements — use Popover instead
- Multiple lines of text — use Popover instead

---

## Segmented

**When to use:** Compact mutually exclusive view toggle — Day/Week/Month, List/Grid/Map. Max 5 items.

### Figma components
- `Segmented` — Size=Default|Large|Small, Block=True|False, Vertical=False|True, Shape=Default|Round
- `Segmented / Segmented Item` — Size, State, Block, Disabled, Shape

---

## Carousel

**When to use:** Feature banners, image galleries, auto-advancing slides.

---

## Calendar

**When to use:** Event browsing, appointment scheduling, date-based content management. Not for simple date selection in forms (use DatePicker).

---

## QRCode

**When to use:** Sharing links, payment codes, product scan codes. Always pair with download/refresh action.

---

## Tour

**When to use:** First-time onboarding to a feature. Introducing a UI change. Max 5–7 steps per tour.

---

## Image

**When to use:** Product images, attachment previews. Provides built-in zoom/pan/rotate preview overlay.
