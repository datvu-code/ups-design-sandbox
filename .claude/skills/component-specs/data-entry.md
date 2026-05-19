# Data Entry Components

---

## Input

**When to use:** Any free-text user entry in a form — names, descriptions, search queries, messages, credentials.

### Figma components
- `Input / Input Item / Outlined` — Status, Size, State
- `Input / Input Item / Filled` — Size, State, Status
- `Input / Input Item / Borderless` — Size, State
- `Input / Input Item / Underlined` — Size, State
- `Input / Textarea` — Size, State
- `Input / Password` — Size, State, Hide=True|False
- `Input / Search` — Size, Button Type=Default|Primary with Icon|Primary with Text
- `Input / OTP` — Length=4|6|8
- `Input / Input Caption` — Status=Default|Error|Warning
- `Input / Input Pre Post Tab` — Type=Basic|Icon|Select, Tab=Post|Pre, Size
- `Input / Input Show Count` — Size, Status
- `OTP / Basic` — Status, Size, State
- `OTP / Filled` — Size, State, Status
- `OTP / Borderless` — Size, State

### Key API props

**Input:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | string | — | Controlled value |
| `defaultValue` | string | — | Uncontrolled initial |
| `placeholder` | string | — | Placeholder text |
| `size` | `large\|middle\|small` | `middle` | Height: 40/32/24px |
| `variant` | `outlined\|filled\|borderless\|underlined` | `outlined` | Visual style |
| `status` | `error\|warning` | — | Validation state |
| `prefix` | ReactNode | — | Leading icon/text |
| `suffix` | ReactNode | — | Trailing icon/text |
| `allowClear` | boolean | — | Clear button |
| `maxLength` | number | — | Character limit |
| `showCount` | boolean / object | false | Character count |
| `disabled` | boolean | false | Non-interactive |
| `onChange` | function(e) | — | Change handler |
| `onPressEnter` | function(e) | — | Enter key handler |

**Input.TextArea:** All Input props, plus:
| Prop | Type | Default |
|---|---|---|
| `autoSize` | boolean / `{minRows, maxRows}` | false |
| `rows` | number | — |

**Input.Search:**
| Prop | Type | Notes |
|---|---|---|
| `enterButton` | ReactNode / boolean | Submit button |
| `loading` | boolean | Search in progress |
| `onSearch` | function(value, event) | Search callback |

**Input.Password:**
| Prop | Type | Notes |
|---|---|---|
| `visibilityToggle` | boolean | Show/hide toggle |
| `iconRender` | function | Custom eye icons |

**Input.OTP:**
| Prop | Type | Default |
|---|---|---|
| `length` | number | 6 |
| `mask` | boolean / string | false |
| `separator` | ReactNode | — |
| `onChange` | function(value) | — |

### Variant guide
- `outlined` — standard bordered, use for all primary form fields
- `filled` — gray fill, no visible border until focus; use for search bars or filters on non-white bg
- `borderless` — no border; use strictly inside table cells for inline editing
- `underlined` — bottom border only; minimal editorial or profile forms

### Usage rules
- Always wrap in `Form.Item` when inside a form (label + validation)
- Use `Input.Search` for filtering/querying data, not plain Input
- Use `Input.Password` for all credential fields — never `type="password"` on plain Input
- Use `Input.OTP` for verification codes (default 6 digits)
- `status="error"` + `Form.Item` validation message for field-level errors
- Never set `status` manually without a matching `Form.Item` error message

---

## Select

**When to use:** Choosing one or more items from a predefined list. Alternative to radio buttons when there are 5+ options. Searchable when list > 10 items.

### Figma components
- `Select` — Active=No|Yes, Size, Placement
- `Select / Select Input / Outlined` — Status, Size, Type=Basic|Multiple|Search, State
- `Select / Select Input / Filled` — Status, Size, Type, State
- `Select / Select Input / Borderless` — Size, Type, State
- `Select / Select Input / Underlined` — Size, Type, State
- `Select / Multiple Selection Item` — Size, State
- `Select Menu / Select Menu Item` — State=Default|Hover|Selected|Selected Multiple|Disabled
- `Prefix` — Type=Icon|Text, Size

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `options` | `{label, value}[]` | — | Option list |
| `value` | string / number / array | — | Controlled value |
| `defaultValue` | — | — | Initial uncontrolled |
| `placeholder` | ReactNode | — | Hint text |
| `mode` | `multiple\|tags` | — | Multi-select mode |
| `showSearch` | boolean | false (single) | Searchable |
| `size` | `large\|middle\|small` | `middle` | Height |
| `variant` | `outlined\|filled\|borderless\|underlined` | `outlined` | Visual style |
| `status` | `error\|warning` | — | Validation state |
| `allowClear` | boolean | false | Clear button |
| `disabled` | boolean | false | Disable |
| `loading` | boolean | false | Loading spinner |
| `maxCount` | number | — | Max selectable (multiple) |
| `open` | boolean | — | Controlled open |
| `onChange` | function | — | Value change |
| `onSearch` | function | — | Search input change |

### Usage rules
- 5+ options → use Select; < 5 → use Radio group
- Always set `showSearch` when list > 10 items
- `mode="multiple"` for multi-select; `mode="tags"` for free-form tag input
- `allowClear` on non-required selects
- Fewer than 5 selected items visible at once → use standard multiple; many tags → consider Transfer

---

## Form

**When to use:** Collecting user data that requires validation. Creating or editing an entity record.

### Figma components
- `Form / Basic` — Layout=Horizontal|Inline|Vertical, Size=Default|Large|Small
- `Form / Login` — Layout=Vertical|Inline
- `Form / Form Item / Horizontal` — Type (all input types), Size
- `Form / Form Item / Vertical` — Type (all input types)
- `Form / Form Item / Inline` — Type (all input types)
- `Form / Form Label Horizontal` — Size
- `Form / Form Label Vertical` — Tooltip=True|False, Mark=None|Optional|Required

### Key API props

**Form:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `layout` | `horizontal\|vertical\|inline` | `horizontal` | Form structure |
| `size` | `large\|middle\|small` | — | All child controls |
| `initialValues` | object | — | Default field values |
| `onFinish` | function(values) | — | Successful submit callback |
| `onFinishFailed` | function | — | Validation fail callback |
| `onValuesChange` | function | — | Any field change callback |
| `disabled` | boolean | false | Disable all fields |
| `validateTrigger` | string / string[] | `onChange` | When to validate |
| `scrollToFirstError` | boolean | false | Auto-scroll to error |

**Form.Item:**
| Prop | Type | Notes |
|---|---|---|
| `name` | string / string[] | Field identifier (supports nested: `['address', 'city']`) |
| `label` | ReactNode | Field label |
| `rules` | Rule[] | Validation rules |
| `required` | boolean | Required indicator (override) |
| `dependencies` | string[] | Re-validate when these fields change |
| `validateStatus` | `success\|warning\|error\|validating` | Manual status |
| `hasFeedback` | boolean | Show status icon |
| `initialValue` | any | Field-level default |
| `tooltip` | ReactNode | Info tooltip on label |

### Layout guide
- `horizontal` — label left, control right; traditional settings forms and admin forms
- `vertical` — label above control; primary data entry forms, creation wizards
- `inline` — all on one row; compact filter bars, quick-edit rows

### Usage rules
- Every input must live inside a `Form.Item` with a `name` prop for validation
- Use `rules={[{ required: true }, { type: 'email' }]}` — never validate manually
- `dependencies` for conditional fields (e.g. password confirmation)
- `Form.useForm()` for programmatic control (reset, validate, setFieldValue)
- `scrollToFirstError` on long forms so users see the first error after submit

---

## Checkbox

**When to use:** Selecting multiple values from several options. Select-all in table headers. Agreement checkboxes (terms). Note: Checkbox marks state, requires form submit — unlike Switch.

### Figma component
`Checkbox` — Status=Active|Inactive|Indeterminate, State=Default|Hover|Focused|Disabled

### Key API props

**Checkbox:**
| Prop | Type | Default |
|---|---|---|
| `checked` | boolean | false |
| `defaultChecked` | boolean | false |
| `indeterminate` | boolean | false |
| `disabled` | boolean | false |
| `onChange` | function(e) | — |

**Checkbox.Group:**
| Prop | Type | Default |
|---|---|---|
| `options` | string[] / Option[] | [] |
| `value` | any[] | [] |
| `defaultValue` | any[] | [] |
| `disabled` | boolean | false |
| `onChange` | function(checkedValues) | — |

### Usage rules
- `indeterminate` for select-all header checkbox (some but not all rows checked)
- Checkbox.Group for 2–6 options visible simultaneously
- More than 6 options → use Select (multiple)
- For binary yes/no that applies immediately → use Switch instead

---

## Radio

**When to use:** Selecting a single state from mutually exclusive options. When all options must be visible for comparison (unlike Select which hides options in a dropdown).

### Figma components
- `Radio` — Checked=False|True, State=Default|Hover|Focused|Disabled
- `Radio Group` — Size=Default|Large|Small, Style=Outlined|Solid, Block=Off|On
- `Radio / Radio Button` — Position=Center|First|Last, Size, State, Style=Outlined|Solid

### Key API props

**Radio.Group:**
| Prop | Type | Default |
|---|---|---|
| `value` | any | — |
| `defaultValue` | any | — |
| `options` | string[] / Option[] | — |
| `disabled` | boolean | false |
| `direction` | `horizontal\|vertical` | `horizontal` |
| `buttonStyle` | `outline\|solid` | `outline` |
| `size` | `large\|middle\|small` | — |
| `block` | boolean | false |
| `onChange` | function | — |

### Radio types
- `Radio` (circular) — vertical lists, configuration dialogs, option groups
- `Radio.Button` — horizontal button-group toggles (Day/Week/Month, List/Grid)
- `Radio Group` — container that wraps multiple Radio items

### Usage rules
- 2–4 options → Radio group; 5+ → Select
- `Radio.Button` with `buttonStyle="solid"` for active/inactive view toggles
- `block={true}` for full-width radio options in mobile forms
- Vertical Radio groups for settings with descriptions under each option

---

## Switch

**When to use:** Immediately applied binary toggles (enable/disable, on/off). Settings that take effect without a Save button.

### Figma components
- `Switch / Basic` — Size=Default|Small, State=Default|Pressed|Loading|Disabled, Active=True|False
- `Switch / Text and Icon` — Type=Icon|Number, State, Active

### Key API props
| Prop | Type | Default |
|---|---|---|
| `checked` | boolean | false |
| `defaultChecked` | boolean | false |
| `size` | `default\|small` | `default` |
| `loading` | boolean | false |
| `disabled` | boolean | false |
| `checkedChildren` | ReactNode | — |
| `unCheckedChildren` | ReactNode | — |
| `onChange` | function(checked) | — |
| `onClick` | function | — |

### Usage rules
- Use Switch for instant-apply settings; use Checkbox for form-submit toggles
- `size="small"` inside table cells or compact toolbars
- `checkedChildren` / `unCheckedChildren` for context labels (On/Off, Yes/No)
- `loading` while an async save operation is in progress after toggle

---

## DatePicker / TimePicker

**When to use:** Date selection for shipping dates, due dates, date range filters, appointment scheduling.

### Figma components
- `DatePicker` — Active=No|Yes, Size
- `DatePicker / DatePicker Input / Outlined|Filled|Borderless|Underlined` — Status, Size, State, Range
- `DatePicker Menu` — Type=Date and Time|Day|Month|Year, Range=False|True
- `DatePicker / DatePicker / Menu Item` — State=Current|Default|Hover|Inactive|Selected

### Key API props

**DatePicker / RangePicker:**
| Prop | Type | Default | Notes |
|---|---|---|---|
| `picker` | `date\|month\|week\|year\|quarter` | `date` | Picker mode |
| `format` | string / string[] | `YYYY-MM-DD` | Display format |
| `value` | dayjs | — | Controlled |
| `defaultValue` | dayjs | — | Uncontrolled |
| `size` | `large\|middle\|small` | `middle` | Height |
| `variant` | `outlined\|filled\|borderless\|underlined` | `outlined` | Style |
| `status` | `error\|warning` | — | Validation state |
| `disabled` | boolean / [boolean, boolean] | false | Disable picker |
| `disabledDate` | function(date) | — | Block specific dates |
| `showTime` | boolean / object | — | Time selection |
| `allowClear` | boolean | true | Clear button |
| `placeholder` | string / [string, string] | — | Hint text |
| `onChange` | function(date, dateString) | — | Change callback |

**RangePicker only:**
| Prop | Type | Notes |
|---|---|---|
| `presets` | RangePreset[] | Quick-select presets (Today, Last 7 days, etc.) |
| `allowEmpty` | [boolean, boolean] | Allow empty start or end |
| `separator` | ReactNode | Custom range separator |

### Usage rules
- Always use `picker="month"` for month-only selection — don't show full calendar
- Add `presets` to RangePicker for common filter ranges (Last 7 days, Last 30 days, This month)
- `showTime` for datetime selection; set time format: `showTime={{ format: 'HH:mm' }}`
- `disabledDate` to block past dates on future-only pickers (shipping date)
- Use dayjs for value manipulation — never native Date objects

---

## InputNumber

**When to use:** Numeric input with defined range — quantity, price, age, percentage. When the value benefits from +/− stepper controls.

### Figma components
- `InputNumber / Basic` — Size, State
- `InputNumber / Prefix Suffix` — Size, State, Status
- `InputNumber / Filled\|Borderless\|Underlined` — Size, State, Status
- `InputNumber / Spinner` — Size, State, Type=Outlined|Filled
- `InputNumber / InputNumber Action` — State=Default|Hover

### Key API props
| Prop | Type | Default |
|---|---|---|
| `min` | number | MIN_SAFE_INTEGER |
| `max` | number | MAX_SAFE_INTEGER |
| `step` | number / string | 1 |
| `precision` | number | — |
| `formatter` | function | — |
| `parser` | function | — |
| `prefix` | ReactNode | — |
| `controls` | boolean / object | true |
| `size` | `large\|middle\|small` | — |
| `variant` | `outlined\|filled\|borderless\|underlined` | `outlined` |
| `status` | `error\|warning` | — |
| `disabled` | boolean | false |
| `onChange` | function | — |
| `mode` | `input\|spinner` | `input` |

---

## Slider

**When to use:** Selecting a value within a range where the approximate value matters — volume, brightness, opacity, price range. Pair with InputNumber when precision matters.

### Figma components
- `Slider / Basic` — Vertical=False|True, Reverse=False|True
- `Slider / Slider Handle` — State=Default|Hover|Disabled|Pressed, Vertical
- `Slider / Slider Rail` — Vertical, Hover=No|Yes
- `Slider / Slider Track` — Range=False|True, Vertical, State
- `Slider / Slider Mark` — Layout=Horizontal|Vertical, Active=True|False

### Key API props
| Prop | Type | Default |
|---|---|---|
| `min` | number | 0 |
| `max` | number | 100 |
| `step` | number / null | 1 |
| `value` | number / [number, number] | — |
| `defaultValue` | number / [number, number] | 0 |
| `range` | boolean | false |
| `vertical` | boolean | false |
| `disabled` | boolean | false |
| `marks` | object | — |
| `dots` | boolean | false |
| `included` | boolean | true |
| `reverse` | boolean | false |
| `tooltip` | object | — |
| `onChange` | function | — |
| `onChangeComplete` | function | — |

---

## Upload

**When to use:** File attachment in forms — documents, images, CSV imports. Drag-and-drop for bulk uploads.

### Figma components
- `Upload / Button` — Size, State
- `Upload / Upload List Item / Basic` — State=Default|Hover|Error
- `Upload / Upload List Item / Picture` — Status=Error|Upload|Uploaded, State, Type=Card|Circle
- `Upload / Upload List Item / Picture card` — Type=Error|Loading|Upload

### Key API props
| Prop | Type | Default |
|---|---|---|
| `action` | string / function | — | Upload URL |
| `fileList` | UploadFile[] | — | Controlled file list |
| `listType` | `text\|picture\|picture-card\|picture-circle` | `text` | Display style |
| `accept` | string | — | Accepted MIME types |
| `multiple` | boolean | false | Multiple file select |
| `maxCount` | number | — | Max files |
| `beforeUpload` | function(file) | — | Pre-upload hook; return false to cancel |
| `customRequest` | function | — | Override XHR behavior |
| `onChange` | function | — | Status change callback |
| `onDrop` | function | — | Drag-drop callback |
| `disabled` | boolean | false | Disable upload |
| `showUploadList` | boolean / object | true | Show file list |

### listType guide
- `text` — file name + status for documents
- `picture` — thumbnail + name for images in a list
- `picture-card` — grid preview cards for image galleries
- `picture-circle` — circular avatar-style upload

---

## AutoComplete

**When to use:** Search-as-you-type with dynamic suggestions from server — address lookup, product search, user mention.

### Figma components
- `AutoComplete` — Active=No|Yes, Size, Type=Default|Borderless
- `AutoComplete / With Button` — Active, Size, Type=Button Default|Button Primary
- `AutoComplete / AutoComplete Menu` — Type=Default|With Groups
- `AutoComplete / AutoComplete Menu Item` — Type=Default|Header, State

---

## Cascader

**When to use:** Hierarchical data selection — Province→City→District, Category→Subcategory. When options have a clear parent-child relationship.

### Figma components
- `Cascader` — Active=No|Yes, Size, Placement
- `Cascader / Cascader Menu Item` — Type=Default|Checkbox, State, Selected

---

## Rate

**When to use:** Rating input — product reviews, feedback scores, satisfaction surveys.

### Figma components (from token data)
- Rate: `Component/starColor`, `Component/starBg`, `Component/starSize` variants

---

## Transfer

**When to use:** Moving items between two sets — assigning permissions, selecting visible columns, assigning users to groups.

---

## TreeSelect

**When to use:** Selecting from a hierarchical tree — organizational units, nested categories, folder picker.
