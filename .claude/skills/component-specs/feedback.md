# Feedback Components

---

## Modal

**When to use:** When requiring users to interact with the application without jumping to a new page and interrupting the workflow — blocking confirmations, outcome feedback, critical decisions.

### Figma components
- `Modal / Basic` — Type=Text|Slot
- `Modal / Information` — Status=Error|Info|Success|Warning

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `open` | boolean | false | Controlled visibility |
| `title` | ReactNode | — | Dialog heading |
| `width` | string / number | 520 | Dialog width |
| `centered` | boolean | false | Vertically center |
| `closable` | boolean / ClosableType | true | Show X button |
| `mask` | boolean | true | Backdrop overlay |
| `maskClosable` | boolean | true | Close on mask click |
| `keyboard` | boolean | true | Close on Escape |
| `footer` | ReactNode / function | OK + Cancel | Button area |
| `okText` | ReactNode | OK | Primary button label |
| `okType` | string | `primary` | Primary button type |
| `cancelText` | ReactNode | Cancel | Cancel button label |
| `onOk` | function | — | OK callback |
| `onCancel` | function | — | Cancel/close callback |
| `zIndex` | number | 1000 | Stack order |
| `destroyOnClose` | boolean | false | Unmount content on close |
| `loading` | boolean | false | OK button loading state |

### Static methods
```js
Modal.confirm({ title, content, onOk, onCancel })
Modal.success({ title, content, onOk })
Modal.error({ title, content })
Modal.warning({ title, content })
Modal.info({ title, content })
```

### Slot pattern (UpS)
`Modal / Basic / Type=Slot` has a Slot frame that accepts custom children without detaching:
```js
const slot = inst.findOne(n => n.type === 'SLOT');
slot.appendChild(customContent);
```

### Usage rules
- Default width 520px; increase to 720px for forms with multiple fields
- Always include a Cancel button alongside OK for reversible actions
- Destructive OK: set `okType="danger"` and `okText="Delete"` / `"Confirm"`
- `maskClosable={false}` for critical confirmations (delete, payment) — force explicit decision
- `destroyOnClose` for modals with forms — clears state between openings
- Use `footer={null}` for custom footer layouts or when only an OK button is needed
- For status outcomes, always use `Modal.success()` / `Modal.error()` — never custom status in basic modal

### Do NOT use when
- Overlay contains a long form (> 5 fields) — use Drawer instead
- Simple yes/no next to the trigger element — use Popconfirm
- Displaying non-actionable detail info — use Drawer

---

## Drawer

**When to use:** Detail views, long forms, settings panels — when the user needs context from the parent page while working in the overlay.

### Figma component
`Drawer` — Placement=Right|Top|Bottom|Left

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `open` | boolean | false | Controlled visibility |
| `onClose` | function(e) | — | Close callback |
| `title` | ReactNode | — | Drawer header |
| `placement` | `right\|left\|top\|bottom` | `right` | Slide direction |
| `size` | `default\|large` | `default` | 378px / 736px preset |
| `width` | number / string | 378 | Custom width (right/left) |
| `height` | number / string | 378 | Custom height (top/bottom) |
| `closable` | boolean / object | true | Close button |
| `mask` | boolean | true | Backdrop overlay |
| `maskClosable` | boolean | true | Close on mask click |
| `keyboard` | boolean | true | Close on Escape |
| `loading` | boolean | false | Skeleton loading state |
| `resizable` | boolean / ResizableConfig | — | User-resizable |
| `zIndex` | number | 1000 | Stack order |
| `footer` | ReactNode | — | Bottom action bar |
| `extra` | ReactNode | — | Header right-side action |
| `destroyOnClose` | boolean | false | Unmount on close |

### Placement guide
- `right` (default, 378px) — order detail, user profile, entity detail view
- `right` (736px / `size="large"`) — create/edit forms with many fields
- `left` — filter configuration panel
- `bottom` — mobile-adapted actions sheet

### Usage rules
- `size="default"` (378px) for view-only detail drawers
- `size="large"` (736px) for create/edit forms — enough space for a full form
- Always put action buttons (Save, Cancel) in `footer` — not floating at the bottom of content
- `destroyOnClose` for drawers with forms — resets state on close
- `extra` for secondary header actions (share, print, export)
- `loading={true}` while fetching the drawer's data before content is ready

### Do NOT use when
- Simple yes/no confirmation — use Modal or Popconfirm
- Very short content (< 3 fields) — use Modal

---

## Alert

**When to use:** Page-level contextual messages — form submission error summaries, service degradation warnings, feature announcements. Persistent static banners the user can read and optionally dismiss.

### Figma component
`Alert` — Type=Error|Info|Success|Warning, Banner=False|True, Description=True|False

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `success\|info\|warning\|error` | `info` | Semantic type |
| `title` | ReactNode | — | Main message |
| `description` | ReactNode | — | Supplementary detail |
| `showIcon` | boolean | false | Show type icon |
| `icon` | ReactNode | — | Custom icon |
| `closable` | boolean / ClosableType | false | User-dismissable |
| `action` | ReactNode | — | Custom action element |
| `banner` | boolean | false | Full-width page banner mode |
| `variant` | `outlined\|filled` | `outlined` | Visual style |

### Usage rules
- Always use matching `type` — never use `type="info"` for error messages
- Always set `showIcon={true}` — the icon provides critical visual scanning cue
- `description` for multi-line detail below the main message
- `closable` when the user should be able to dismiss the alert (non-critical info)
- `banner` mode at the very top of a page — for service notices, feature flags, maintenance
- `action` for an inline button (e.g. "Retry", "Learn more")

### Do NOT use when
- Transient post-action feedback — use Message (auto-dismissing)
- Full-page outcome (success/error after form submit) — use Result
- Per-field validation error — use Form.Item rules

---

## Message

**When to use:** Brief auto-dismissing toasts for completed actions — saved, deleted, copied, error after an operation. Non-intrusive top-center feedback.

### Figma component
`Message` — Type=Error|Loading|Normal|Success|Warning

### API methods
```js
message.success('Saved successfully')
message.error('Failed to save')
message.warning('Connection unstable')
message.info('Processing your request')
message.loading('Uploading...', 0) // 0 = no auto-close
```

### Config
```js
message.config({
  duration: 3,      // Auto-close seconds (default: 3)
  top: 8,           // Distance from top
  maxCount: 3,      // Max simultaneous messages
})
```

### Usage rules
- Show immediately after an operation completes (not during)
- Default duration 3s; extend to 5s for longer messages users need to read
- Use `message.loading()` for async operations and close it manually on completion
- `message.loading()` with key for updatable messages (upload progress → success)
- Never use for persistent warnings — use Alert or Notification

---

## Notification

**When to use:** Complex notifications with title + description — background job results, system-level alerts, messages that arrive while the user is elsewhere on the page.

### Figma component
`Notification` — Type=Basic|Error|Info|Success|Warning

### API methods
```js
notification.success({ title: '...', description: '...' })
notification.error({ title: '...', description: '...' })
notification.warning({ title: '...', description: '...' })
notification.info({ title: '...', description: '...' })
notification.open({ title: '...', description: '...', icon: <...> })
notification.destroy(key) // close specific
notification.destroy()   // close all
```

### Key config props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — | Required header |
| `description` | ReactNode | — | Body content |
| `duration` | number | 4.5 | Auto-close seconds (0 = never) |
| `placement` | `topRight\|topLeft\|top\|bottomRight\|bottomLeft\|bottom` | `topRight` | Screen position |
| `icon` | ReactNode | — | Custom icon |
| `closeIcon` | ReactNode / boolean | true | Close button |
| `actions` | ReactNode | — | Custom buttons |
| `showProgress` | boolean | — | Auto-close progress bar |
| `pauseOnHover` | boolean | true | Pause timer on hover |
| `key` | string | — | For programmatic update/close |
| `onClick` | function | — | Click callback |
| `onClose` | function | — | Close callback |

### Usage rules
- Use `duration={0}` for critical notifications the user must explicitly close
- Always provide both `title` and `description` — never just description
- `placement="topRight"` (default) for all standard notifications
- Use `key` when you need to update an in-progress notification (e.g. "Import started" → "Import complete")
- `actions` for notifications with a primary action ("View Results", "Retry")

### Message vs Notification
| | Message | Notification |
|---|---|---|
| Trigger | User action | System event / async result |
| Content | 1 line | Title + description |
| Duration | 3s default | 4.5s default |
| Position | Top center | Top right |
| Interactive | No | Yes (actions, close) |

---

## Popconfirm

**When to use:** Inline confirmation bubble anchored to the triggering element — delete row button, archive icon. Lighter than Modal for reversible confirmations.

### Figma component
`Popconfirm` — Placement (12 positions: Bottom|Bottom Left|Bottom Right|Left|Left Bottom|Left Top|Right|Right Bottom|Right Top|Top|Top Left|Top Right)

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — | Confirmation question |
| `description` | ReactNode | — | Supplementary detail |
| `okText` | ReactNode | OK | Confirm button |
| `okType` | string | `primary` | Confirm button type |
| `cancelText` | ReactNode | Cancel | Cancel button |
| `icon` | ReactNode | ExclamationCircle | Warning icon |
| `placement` | string | `top` | 12 positions |
| `open` | boolean | — | Controlled |
| `disabled` | boolean | false | Disable popconfirm |
| `onConfirm` | function | — | Confirm callback |
| `onCancel` | function | — | Cancel callback |

### Usage rules
- Use for row-level destructive actions (delete, remove from list)
- `okType="danger"` and `okText="Delete"` for destructive confirmations
- `placement="top"` for table row actions; `placement="left"` for right-side icons
- For complex confirmations (affects many items, irreversible) → use Modal instead

---

## Progress

**When to use:** Showing completion of an operation that takes > 2 seconds. File upload, import/export, batch processing.

### Figma components
- `Progress / Standard` — Size=Default|Small|Custom, Status=Normal|Exception|Success, strokeLinecap=Round|Square
- `Progress / Circle` — Size, Status, strokeLinecap
- `Progress / Dashboard` — Size, Status, strokeLinecap
- `Progress / Steps` — Size, Status
- `Progress / Responsive circular progress bar` — State, Status
- `Progress / Gradient (Standard\|Circle\|Dashboard)` — Status
- `Progress / Value Position` — Status, Position=Outside|Inside, Placement=Start|End|Center|Bottom

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `percent` | number | 0 | Completion % |
| `type` | `line\|circle\|dashboard` | `line` | Visual style |
| `status` | `success\|exception\|normal\|active` | — | Current state |
| `showInfo` | boolean | true | Show value/icon |
| `format` | function(percent) | — | Custom text |
| `strokeColor` | string / object | — | Progress bar color |
| `railColor` | string | — | Track color |
| `strokeLinecap` | `round\|butt` | `round` | Line cap style |
| `size` | number / array / `small\|default` | `default` | Bar dimensions |
| `steps` | number / object | — | Discrete step count |
| `success` | `{percent, strokeColor}` | — | Success segment |

### Type guide
- `line` — linear horizontal bar; file upload, task progress
- `circle` — circular ring; compact space (table cell, card metric)
- `dashboard` — gauge/semi-circle; capacity utilization, completion rate KPI
- Steps — discrete segmented bar (stage 1/2/3 of 5)

### Status guide
- `normal` — in progress (blue/primary)
- `active` — animated pulse (for indeterminate progress)
- `success` — completed (green)
- `exception` — failed (red)

---

## Result

**When to use:** Full-section outcome display — post-submission screens, error pages (404, 403, 500), verification pending states.

### Figma component
`Result` — Status=Info|Success|Warning|Error|403|404|500|Custom icon

### Key API props
| Prop | Type | Notes |
|---|---|---|
| `status` | `success\|error\|info\|warning\|403\|404\|500` | Built-in illustration |
| `title` | ReactNode | Primary outcome text |
| `subTitle` | ReactNode | Supporting detail |
| `extra` | ReactNode | Action button(s) |
| `icon` | ReactNode | Custom illustration |

### Usage rules
- Always include at least one action in `extra` (Go Home, Try Again, Contact Support)
- `status="success"` for order placed, payment complete, account created
- `status="404"` / `status="403"` / `status="500"` for standard error pages
- `status="warning"` for pending verification, awaiting approval states
- `icon` prop for custom illustrations when built-in icons don't fit the context

---

## Skeleton

**When to use:** Loading state before content arrives. Always show skeleton, never a blank area.

### Figma components
- `Skeleton` — Type=Basic|Complex
- `Skeleton / Skeleton Button Item` — Shape=Circle|Default|Round, Size=Default|Large|Small
- `Skeleton / Skeleton Input Item` — Size=Default|Large|Small
- `Skeleton / Skeleton Image Item` — Type=Dot Chart|Image
- `Skeleton / Skeleton Avatar Item` — Shape=Circle|Square, Size=Default|Small|Large

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `active` | boolean | false | Animated shimmer |
| `loading` | boolean | — | Wrap real content; shows skeleton when true |
| `avatar` | boolean / AvatarProps | false | Show avatar placeholder |
| `paragraph` | boolean / ParagraphProps | true | Show paragraph lines |
| `title` | boolean / TitleProps | true | Show title line |
| `round` | boolean | false | Rounded corners on lines |

### Usage rules
- Always use `active={true}` for the shimmer animation — static skeleton feels broken
- Match skeleton shape to real content (Button skeleton for button area, Input skeleton for input area)
- Use `Skeleton` wrapping real content via `loading` prop for seamless swap
- Remove skeleton immediately when data arrives — never show it alongside real content
- For loads < 300ms, skip skeleton and show nothing; for > 300ms always show skeleton

---

## Spin

**When to use:** Overlaying a container while async content loads — table, card, form. Use when progress cannot be quantified.

### Figma components
- `Spin` — Size=Default|Large|Small
- `Spin / Spinner` — icon element
- `Spin / SpinningIndicator` — custom indicator
- `Spin / Inside the container` — container overlay variant

### Key API props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `spinning` | boolean | true | Show/hide spinner |
| `size` | `small\|default\|large` | `default` | Spinner dimensions |
| `tip` | ReactNode | — | Loading text below spinner |
| `indicator` | ReactNode | — | Custom spinner element |
| `delay` | number | — | Delay before showing (ms) |
| `fullscreen` | boolean | false | Cover entire viewport |

### Usage rules
- Always set `tip` for operations > 2 seconds ("Uploading...", "Processing orders...")
- Use `delay={300}` to avoid spinner flash for fast operations
- `spinning={false}` to hide while keeping the Spin component mounted
- `Spin / Inside the container` to block a specific panel — never use full-page Spin unless truly blocking all interaction
- For initial page loads with structured content → use Skeleton instead
