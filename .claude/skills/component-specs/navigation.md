# Navigation Components

---

## Menu

**When to use:** Main application navigation. Top nav bar (horizontal), sidebar nav (inline/vertical), right-click context menus (vertical/popup).

### Figma components
- `Menu` — Theme=Light|Dark, Mode=Inline|Horizontal|Vertical, Collapsed=No|Yes
- `Menu / Menu Item / Inline / Navigation Item` — State, Status, Theme, Content, Level
- `Menu / Menu Item / Inline / Submenu Title` — State, Collapsed, Theme, Content
- `Menu / Menu Item / Inline / Group Title` — Theme
- `Menu / Menu Item / Horizontal` — State, Theme
- `Menu / Menu Item / Vertical / Navigation Item` — State, Status, Theme, Content
- `Menu / Menu Item / Vertical / Submenu Title` — State, Theme, Content
- `Menu / Menu Item / Vertical / Popover Menu` — Theme
- `Menu / Menu Item / Logo placeholder` — Theme, Content=Icon|Logotype
- `Menu / Menu / Submenu` — Theme, Mode, Active, Collapsed

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `mode` | `inline\|horizontal\|vertical` | `inline` | Layout mode |
| `theme` | `light\|dark` | `light` | Color scheme |
| `items` | ItemType[] | — | Menu item tree |
| `selectedKeys` | string[] | — | Controlled selected item |
| `openKeys` | string[] | — | Controlled open submenus |
| `defaultSelectedKeys` | string[] | — | Initial selected |
| `defaultOpenKeys` | string[] | — | Initial open submenus |
| `inlineCollapsed` | boolean | — | Collapse inline menu to icons |
| `inlineIndent` | number | 24 | Nested item indentation (px) |
| `multiple` | boolean | false | Allow multi-select |
| `selectable` | boolean | true | Allow item selection |
| `triggerSubMenuAction` | `hover\|click` | `hover` | Submenu trigger |
| `expandIcon` | ReactNode | — | Custom expand arrow |
| `onClick` | function | — | Item click callback |
| `onSelect` | function | — | Selection callback |
| `onOpenChange` | function | — | Open/close callback |

**MenuItem (in `items` array):**
| Prop | Type | Notes |
|---|---|---|
| `key` | string | Unique identifier |
| `label` | ReactNode | Display text |
| `icon` | ReactNode | Leading icon |
| `disabled` | boolean | Non-interactive |
| `danger` | boolean | Red destructive style |
| `children` | ItemType[] | Sub-menu items |

### Usage rules
- **UpS sidebar** uses `mode="inline"`, `theme="dark"` (`colorBgSpotlight` = `#191b1d`)
- Selected item: `colorPrimaryBg` (#fff0e9) background + `colorPrimary` (#e65018) text
- Collapsed sidebar shows icons only — always provide `icon` on every item
- Use `Group Title` for non-interactive section labels (not Submenu)
- `Level` variants (1, 2) indicate nesting depth on Inline Navigation Items
- `Status=Error` variant exists for nav items with error badges

### Do NOT use when
- Switching content tabs within a page — use Tabs
- Selecting a value from options — use Select
- Breadcrumb navigation path — use Breadcrumb

---

## Tabs

**When to use:** Switching between related content views within the same page context. Section-level navigation where all tabs share the same layout.

### Figma components
- `Tabs / Basic` — Placement=Bottom|Left|Right|Top, Size=Default|Large|Small
- `Tabs / Card` — Size=Default|Large|Small
- `Tabs / Container` — Size=Default|Large|Small
- `Tabs / Tab Item / Basic` — Placement, Size, State=Active|Default|Hover|Disabled
- `Tabs / Tab Item / Card` — Size, State
- `Tabs / Tab Item / Card Add` — Size

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `activeKey` | string | — | Controlled active tab |
| `defaultActiveKey` | string | First tab | Initial active |
| `type` | `line\|card\|editable-card` | `line` | Visual style |
| `size` | `large\|middle\|small` | `middle` | Tab bar size |
| `tabPosition` | `top\|bottom\|left\|right` | `top` | Tab bar placement |
| `centered` | boolean | false | Center-align tabs |
| `animated` | boolean / object | `{inkBar: true, tabPane: false}` | Animations |
| `destroyOnHidden` | boolean | false | Remove inactive DOM |
| `onChange` | function | — | Active tab change callback |
| `onEdit` | function | — | Add/remove (editable-card only) |

**Tab item (in `items` array):**
| Prop | Type | Notes |
|---|---|---|
| `key` | string | Unique identifier |
| `label` | ReactNode | Tab header |
| `icon` | ReactNode | Tab icon |
| `children` | ReactNode | Tab content |
| `disabled` | boolean | Disable tab |
| `closable` | boolean | Show close button (editable-card) |

### Tab types
- `line` — underline tabs, default, most common (Order Info / Timeline / Documents)
- `card` — box tabs, good for panel switching with visual container
- `editable-card` — closeable tabs with add button, for browser-like interfaces

### Usage rules
- Maximum 7 visible tabs — more → use Select or segmented control
- Always set `destroyOnHidden={false}` (default) unless tab has expensive re-mount
- `tabPosition="left"` for settings pages with many categories
- Use `type="card"` inside a card component to create sub-panel switching

### Do NOT use when
- Top-level page navigation — use Menu
- Sequential multi-step flow — use Steps
- More than 7 tabs — use Menu or Select

---

## Steps

**When to use:** Multi-step processes — checkout flows, onboarding wizards, create-order forms. When a task is complex and sequential.

### Figma components
- `Steps` — Type=Basic|Custom Icon|Dot|Navigation|Inline, Size=Default|Small, Direction=Horizontal|Vertical|Steps
- `Steps / Steps Item / Horizontal` — Status=Finish|Process|Wait|Error, Style=Basic|Basic Small|Custom Icon, Center, State
- `Steps / Steps Item / Vertical` — Type=Basic|Basic Small|Dot, Status, State
- `Steps / Steps Item / Dot Horizontal` — Status, State, Order=Center|First|Last
- `Steps / Steps Item / Inline Step` — Status=Waiting|Process|Error|Finish, State
- `Steps / Steps Item / Tail` — Direction, Style, State=Active|Waiting
- `Steps / Steps Item / Progress Icon` — Type, State
- `Panel Steps` — Type=1|2
- `Panel Steps / Panel Steps Item` — Type, Step, State

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `current` | number | 0 | Active step (zero-indexed) |
| `type` | `default\|dot\|inline\|navigation\|panel` | `default` | Visual style |
| `direction` | `horizontal\|vertical` | `horizontal` | Layout axis |
| `size` | `default\|small` | `default` | Step size |
| `status` | `wait\|process\|finish\|error` | `process` | Current step status |
| `percent` | number | — | Progress % on current icon |
| `responsive` | boolean | true | Auto-switch to vertical < 532px |
| `onChange` | function | — | Step click callback |
| `items` | StepItem[] | — | Step definitions |

**StepItem:**
| Prop | Type | Notes |
|---|---|---|
| `title` | ReactNode | Step label |
| `subTitle` | ReactNode | Secondary label |
| `description` | ReactNode | Detailed description |
| `icon` | ReactNode | Custom icon |
| `status` | `wait\|process\|finish\|error` | Individual status |
| `disabled` | boolean | Non-clickable |

### Step types
- `default` — numbered circles, most common, 3–5 steps
- `dot` — minimal dots, for subtle step indication without numbers
- `navigation` — clickable breadcrumb-style tabs
- `inline` — compact row-level step inside a table or list row
- `panel` — accordion-style expandable steps (Panel Steps component)

### Usage rules
- 3–5 steps max for horizontal; 5–8 for vertical
- Fewer than 3 steps → use a simple two-column layout
- `status="error"` on a step to show validation failure and keep user on that step
- `inline` type for showing order/shipment mini-status inside table rows
- `Panel Steps` for wizard UX where each step expands content inline

---

## Pagination

**When to use:** Any list or table with more rows than visible on screen. When loading all items takes too long or is impractical.

### Figma components
- `Pagination` — Variant=Basic|Jumper|Mini|Mini Jumper|More|Simple|Prev and next
- `Pagination / Pagination Item / Number` — Size, State, Active
- `Pagination / Pagination Item / Arrow` — Type=Arrow|Text, Size, State, Direction
- `Pagination / Pagination Item / More` — State, Direction

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `current` | number | — | Controlled page number |
| `total` | number | 0 | Total item count |
| `pageSize` | number | — | Items per page (controlled) |
| `defaultCurrent` | number | 1 | Initial page |
| `defaultPageSize` | number | 10 | Initial page size |
| `pageSizeOptions` | number[] | [10,20,50,100] | Size selector options |
| `showSizeChanger` | boolean / SelectProps | — | Page size selector |
| `showQuickJumper` | boolean | false | Jump-to-page input |
| `showTotal` | function | — | Total count display |
| `simple` | boolean | false | Simplified mode |
| `size` | `default\|small` | `default` | Component size |
| `disabled` | boolean | — | Disable all controls |
| `responsive` | boolean | — | Auto-adapt to window |
| `hideOnSinglePage` | boolean | false | Hide when only 1 page |
| `align` | `start\|center\|end` | `end` | Horizontal alignment |
| `onChange` | function(page, size) | — | Page change callback |

### Usage rules
- Always show `showTotal` to display "Showing X–Y of Z items" — essential for data trust
- Show `showSizeChanger` when dataset > 50 rows
- Show `showQuickJumper` when dataset > 200 rows
- Place below table/list, right-aligned (`align="end"`)
- Use `simple` mode for minimal mobile contexts
- Fewer than 10 total items → show all without pagination

---

## Dropdown

**When to use:** When there are more than a few options to choose from. Action menus triggered by hover or click.

### Figma components
- `Dropdown` — Open Menu=No|Yes, Type=Basic Inline|Button Basic|Button Twofold, Placement
- `Dropdown Menu` — Arrow=None|Bottom Left|Bottom Center|Bottom Right|Top Left|Top Center|Top Right
- `Dropdown Menu / Dropdown Menu Item` — State=Default|Hover|Disabled|Selected, Danger=False|True
- `Dropdown Menu / Extra Item` — Type=Icon|Text
- `Dropdown / Dropdown Button Basic` — State=Default|Hover|Focused|Pressed|Disabled
- `Dropdown / Dropdown Button Twofold` — State (split button states)

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `menu` | MenuProps | — | Menu configuration |
| `open` | boolean | — | Controlled open state |
| `trigger` | Array | `[hover]` | `click\|hover\|contextMenu` |
| `placement` | string | `bottomLeft` | `bottom\|bottomLeft\|bottomRight\|top\|topLeft\|topRight` |
| `arrow` | boolean / object | false | Show arrow pointer |
| `disabled` | boolean | — | Disable dropdown |
| `destroyOnHidden` | boolean | false | Remove DOM when closed |
| `onOpenChange` | function | — | Open state callback |

### Dropdown types (Figma)
- **Basic Inline** — trigger on any element (text, icon, link)
- **Button Basic** — standard button trigger
- **Button Twofold** — split button: left = primary action, right = dropdown arrow

### Usage rules
- More than 1 action → use Dropdown; exactly 1 action → plain Button
- More than 8 items → use Drawer with a list
- `trigger={['click']}` for action menus on data rows; `trigger={['hover']}` for nav menus
- Always use `danger: true` on destructive menu items (delete, archive)
- Split button (Twofold): left button = default action, right = variant options (Save / Save as Draft)

---

## Breadcrumb

**When to use:** Showing current location in a hierarchy deeper than 2 levels. Letting users navigate back to parent pages.

### Figma components
- `Breadcrumb` — Type=Basic|Dropdown|Icon
- `Breadcrumb / Breadcrumb Link` — State=Default|Hover|Current

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | ItemType[] | — | Route stack |
| `separator` | ReactNode | `/` | Custom separator |
| `itemRender` | function | — | Custom item renderer |
| `params` | object | — | Route params |

**ItemType:**
| Prop | Type |
|---|---|
| `title` | ReactNode |
| `href` | string |
| `path` | string |
| `menu` | MenuProps |
| `onClick` | function |

### Usage rules
- Maximum 4 levels before it becomes cluttered
- Last item (current page) is always non-linked and uses `colorText`
- Previous items are links using `colorLink`
- Use dropdown variant when intermediate levels have sibling pages worth switching to
- Always place below the page header, above the page title

---

## Anchor

**When to use:** In-page jump navigation for long single-page docs, settings, or help content. Shows which section the user is currently viewing.

### Figma components
- `Anchor` — Direction=Vertical|Horizontal
- `Anchor / Anchor Item` — State=Default|Active, Level=1|2, Direction=Vertical|Horizontal

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | AnchorItem[] | — | Link definitions |
| `direction` | `vertical\|horizontal` | `vertical` | Layout |
| `affix` | boolean | true | Sticky positioning |
| `offsetTop` | number | 0 | Sticky offset from top |
| `targetOffset` | number | — | Offset for determining active anchor |
| `onChange` | function | — | Active link change callback |
| `onClick` | function | — | Link click callback |

### Usage rules
- Use vertical for right-side table-of-contents on documentation pages
- Use horizontal for tabs-style page-level navigation on single long pages
- `affix={true}` (default) keeps anchor sticky while scrolling
- Max 2 nesting levels (Level 1 and Level 2 in Figma)
- Only use for pages taller than 3 viewport heights
