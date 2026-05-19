# UpS Component Specifications

This skill is the authoritative reference for every UI component available in the **UpS Components** Figma library. Load it whenever you need to know which component to use, what variants and props are available, and when to use or avoid each component.

**Figma library:** UpS Components (`HttbhVBjPw9HxgqcjBONuh`)  
**Code library:** Ant Design 6 (React)  
**Font:** Roboto (always preload `Regular` + `Medium` before any `use_figma` text operation)

---

## Reference Files

| Group | File | Components |
|---|---|---|
| **General** | [general.md](general.md) | Button, FloatButton, Icon, Typography |
| **Layout** | [layout.md](layout.md) | Layout, Grid (Row/Col), Flex, Space, Divider, Splitter |
| **Navigation** | [navigation.md](navigation.md) | Menu, Tabs, Steps, Pagination, Dropdown, Breadcrumb, Anchor |
| **Data Entry** | [data-entry.md](data-entry.md) | Input, Select, Form, Checkbox, Radio, Switch, DatePicker, InputNumber, Slider, Upload, AutoComplete, Cascader, Rate, Transfer, TreeSelect |
| **Data Display** | [data-display.md](data-display.md) | Table, Card, Tag, Badge, Avatar, Collapse, Descriptions, Timeline, Statistic, Tree, Empty, Popover, Tooltip, Segmented, Carousel, Calendar, QRCode, Tour, Image |
| **Feedback** | [feedback.md](feedback.md) | Modal, Drawer, Alert, Message, Notification, Popconfirm, Progress, Result, Skeleton, Spin |

---

## Library Usage

**Library name:** UpS Components  
**Library key:** `lk-3320fd49dbfc2dd64e2042a35e86e22c8c0ca11b7d9e69139dbda23d67037680fa31bfa6acb221778ee8d819889a2852d94a22b7029fc239450d00feb1da10a8`

When working in another Figma file with this library enabled:
- Search with `search_design_system` before placing any component
- Import with `importComponentSetByKeyAsync` — never recreate from scratch
- Never detach library instances unless modifying a one-off isolated variant
- Verify `libraryName === "UpS Components"` to confirm correct library source

### Slot pattern (no-detach customization)
Some components expose a `SLOT` node for injecting custom content:
```js
const slot = inst.findOne(n => n.type === 'SLOT');
for (const child of [...slot.children]) child.remove();
slot.appendChild(myContent);
```

---

## Component Selection Quick Reference

### Input vs Select vs Radio vs Checkbox vs Switch

| Scenario | Component |
|---|---|
| Free text entry | Input |
| Number with stepper | InputNumber |
| Pick 1 from ≤ 4 options (all visible) | Radio |
| Pick 1 from 5+ options | Select |
| Pick multiple from ≤ 6 options (all visible) | Checkbox.Group |
| Pick multiple from 7+ options | Select (mode="multiple") |
| Immediate on/off toggle | Switch |
| On/off inside a form (requires submit) | Checkbox |
| Hierarchical pick 1 | Cascader or TreeSelect |
| Search-as-you-type suggestions | AutoComplete |
| Range selection | Slider |
| Date/time | DatePicker |

### Tag vs Badge vs Alert vs Message vs Notification vs Result

| Scenario | Component |
|---|---|
| Label on a data record | Tag |
| Count indicator on icon/avatar | Badge |
| Inline contextual warning on page | Alert |
| Quick 1-line feedback after action | Message |
| Rich async feedback with title+body | Notification |
| Blocking outcome / error page | Result |
| Completion percentage display | Progress |

### Modal vs Drawer vs Popconfirm

| Scenario | Component |
|---|---|
| Must confirm before irreversible action | Modal.confirm() |
| Short 1-line confirm next to trigger | Popconfirm |
| Detail view or form in overlay | Drawer |
| Status outcome (success/error) | Modal.success() / Modal.error() |

### Table vs List vs Descriptions vs Timeline

| Scenario | Component |
|---|---|
| Multi-column structured data | Table |
| Single-column uniform items | List |
| Read-only field-value pairs | Descriptions |
| Chronological event history | Timeline |
| Hierarchical/tree structured data | Tree or expandable Table |

### Menu vs Tabs vs Steps vs Breadcrumb

| Scenario | Component |
|---|---|
| Main app navigation (sidebar/topbar) | Menu |
| Switch content within a page | Tabs |
| Sequential multi-step process | Steps |
| Show location in page hierarchy | Breadcrumb |
| In-page section jump links | Anchor |

---

## Variant Cheat Sheet

### Sizes (all components)
- `large` — 40px height, prominent CTAs, hero search bars
- `middle` / `default` — 32px height, standard forms and toolbars
- `small` — 24px height, dense tables, compact toolbars, tags

### Input variants
- `outlined` — bordered (default, all primary form fields)
- `filled` — gray fill, no border until focus (search bars, filter inputs)
- `borderless` — no border (inline table editing only)
- `underlined` — bottom border only (minimal editorial forms)

### Button types
- `primary` — main CTA, one per section
- `default` — secondary action
- `dashed` — add / create action
- `text` — lowest emphasis inline action
- `link` — external navigation or inline hyperlink

### Button `danger` combinations
- `type="primary" danger` — red filled (Delete, Danger confirm)
- `type="default" danger` — red outlined (secondary destructive)
- `type="text" danger` — red text (inline destructive)

---

## State Variants (common across components)

| State | Meaning |
|---|---|
| Default | Normal resting state |
| Hover | Mouse over |
| Focused | Keyboard focus / active |
| Pressed / Active | Mouse down / clicked |
| Disabled | Non-interactive |
| Loading | Async operation in progress |
| Error | Validation failed |
| Warning | Partial problem / caution |
| Success | Validation passed / completed |

---

## Font Preload (required in every `use_figma` script touching text)

```js
await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });
```
