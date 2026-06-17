# Tổng Quan Dự Án — UpS Design Sandbox

## Mục Đích

Sandbox là môi trường kiểm chứng kiến trúc CSS 3 lớp và hệ thống design token của UpS trước khi áp dụng vào production (`sme-webapp`). Mục tiêu là **tái sử dụng 70–80% code** từ sandbox sang production.

---

## Hai Dự Án

### Sandbox (`ups-design-sandbox`)
- React 19 · TypeScript · Vite · Ant Design 6.x · `antd-style` · Tailwind (`tw-` prefix)
- Import trực tiếp từ `antd` — không dùng adapter
- Không có business logic (GraphQL, Redux, Formik)
- Thể hiện **trạng thái cuối** sau khi migration hoàn tất

### Production (`sme-webapp` / `sme-src`)
- React · JavaScript · Ant Design 6.x · Tailwind (`tw-` prefix)
- Import từ `@/ui/common` → re-export alias → adapter → antd
- Business logic đầy đủ (GraphQL, Redux, Formik, react-intl)
- Đang trong quá trình migration từ legacy (Bootstrap, MUI, inline styles)

---

## Kiến Trúc CSS 3 Lớp

```
Lớp 1 — Tailwind (tw-*)
  Layout và geometry ONLY
  tw-flex  tw-grid  tw-gap-4  tw-overflow-hidden  tw-w-full
  KHÔNG dùng màu sắc. Chỉ cấu trúc.

Lớp 2 — antd-style createStyles (.style.ts)
  Tất cả giá trị visual dựa trên token
  Màu sắc · hover · active · pseudo-elements · breakpoints
  token.colorXxx — live, TypeScript-autocompleted

Lớp 3 — CSS Modules (.module.css)
  Selector cấu trúc mà CSS-in-JS không xử lý tốt
  :nth-child · print · :global(.ant-*) · sticky
  Dùng var(--ant-*) bên trong CSS
```

---

## Cấu Trúc Adapter Trong Production

Production có **3 lớp** giữa call site và antd:

```
call site
  → import { Button } from '@/ui/common'        ← call site không bao giờ thay đổi
      → Button.js (re-export alias)
          → AntdButton.js (adapter, dịch prop)
              → antd Button                      ← sandbox dùng trực tiếp
```

### Các Adapter Hiện Có
`AntdButton` · `AntdCard` · `AntdInput` · `AntdSelect` · `AntdTab` · `AntdTableBasic` · `AntdAlert` · `AntdCheckbox` · `AntdRadio` · `AntdSwitch` · `AntdDropdown` · `AntdTooltip` · `AntdPagination` · `AntdFilterDateRange` · `AntdWarehouseTreeSelect`

### Tại Sao Adapter Tồn Tại

Adapter giải quyết sự khác biệt giữa **legacy prop API** và **native antd API**:

| Legacy (production call site) | Native antd (sandbox) |
|---|---|
| `variant="secondary"` | `type="default"` |
| `leftIcon={...}` | không tương đương |
| `isMulti` | `mode="multiple"` |
| `isClearable` | `allowClear` |
| `isDisabled` | `disabled` |

Trong Order module, có **75 chỗ dùng `variant=`** và **107 chỗ dùng `isMulti`/`isClearable`** — quá nhiều để đổi hết cùng lúc. Adapter hấp thụ sự khác biệt đó.

---

## Vòng Đời Của Adapter

Adapter **không tồn tại mãi mãi** — nó bị xóa khi migration hoàn tất:

1. Migrate từng call site: thay `@/ui/common` bằng `antd` trực tiếp, đổi tên prop
2. Khi **tất cả** call site của một component đã được migrate → xóa adapter
3. Xóa re-export alias (`Button.js`)
4. Xóa dòng trong `index.js`

Adapter bị xóa là **hệ quả** của việc migrate tất cả call site, không phải bước riêng biệt.

---

## Phân Tích Khoảng Cách (Gap Analysis)

### Blocker Quan Trọng Nhất — Infrastructure Production

| Vấn đề | Hậu quả |
|---|---|
| `cssVar` thiếu trong `AntdProvider.js` | Không có `--ant-*` CSS variables → Layer 3 hoàn toàn không hoạt động |
| `antd-style` chưa cài trong production | `createStyles` không dùng được → Layer 2 không hoạt động |

**Đây là hai blocker phải giải quyết trước — mọi thứ khác đều vô nghĩa nếu chưa có hai cái này.**

### Khoảng Cách Styling

| Vấn đề | Production hiện tại | Sandbox (target) |
|---|---|---|
| Màu sắc token | Hardcode Tailwind: `tw-bg-white`, `tw-text-gray-900` | `createStyles` với `token.*` |
| Hover state | JS `isFocused` state + conditional class | `&:hover` trong `createStyles` |
| Hardcode hex | `SELECT_THEME = { border: "#D9D9D9" }` | Forbidden — chỉ dùng token |
| Inject CSS inline | `AntdTableBasic` inject raw `.ant-table-*` với hex hardcode | Dùng `theme.components` |

### Tailwind Custom Token

Production dùng các custom Tailwind token **không tồn tại** trong sandbox config:
```
tw-h-button-small   tw-p-button-small   tw-gap-button-icon
tw-h-input-default  tw-rounded-input    tw-border-line
tw-text-body        tw-text-error       tw-bg-bg-disabled
```

### Icon

| | Production | Sandbox |
|---|---|---|
| Nguồn | Inline SVG tự viết | `@tabler/icons-react` |

### Dependency Production Không Có Trong Sandbox

`formik` · `react-intl` · `react-redux` · `react-number-format` · `_metronic` · Apollo/GraphQL

---

## Sandbox Hiện Tại — Vấn Đề Thực Sự

**Sandbox chưa chứng minh được luận điểm của chính nó.**

Không có component nào trong sandbox có file `.style.ts` — nghĩa là Layer 2 (`createStyles`) chưa được demo ở bất kỳ đâu. Toàn bộ sandbox hiện tại chỉ có Tailwind layout + antd component, thiếu hoàn toàn phần visual token layer.

---

## Quy Trình Promote Sandbox → Production

Sau khi hai blocker infrastructure được giải quyết, mỗi component promote theo pattern:

| Gì | Hành động |
|---|---|
| `ComponentName.style.ts` | Copy nguyên xi — không thay đổi gì |
| JSX layout + structure | Copy nguyên xi — không thay đổi gì |
| `import { Button } from 'antd'` | Đổi thành `import { Button } from '@/ui/common'` + rename prop |
| Business logic | Thêm vào sau — sandbox không có |

**Ví dụ thực tế — `OrderRowAction`:**

```diff
// Sandbox
import { Button, Dropdown } from 'antd'
<Dropdown menu={{ items, onClick }} trigger={['click']}>
  <Button>Chọn <IconChevronDown size={14} /></Button>
</Dropdown>

// Production (sau khi promote)
import { Button } from '@/ui/common'
import { Dropdown } from 'antd'   // Dropdown chưa có adapter → import thẳng
<Dropdown menu={{ items, onClick }} trigger={['click']}>
  <Button variant="default">Chọn <IconChevronDown size={14} /></Button>
</Dropdown>
// + giữ nguyên toàn bộ business logic (mutations, permissions, routing...)
```

---

## Kết Luận: Sandbox Có Cần Mimick Adapter Không?

**Không.** Sandbox mô hình hóa **trạng thái cuối** — sau khi adapter bị xóa, code trông như thế nào. Đây là điều đúng đắn cần model.

Adapter swap khi promote là công việc cơ học, không cần sandbox phải demo.

---

## Kế Hoạch

### Phase 1 — Unblock Production (2 PR)
1. Thêm `cssVar: { prefix: 'ant' }` vào `AntdProvider.js`
2. `npm install antd-style` trong production

### Phase 2 — Chứng Minh Luận Điểm Trong Sandbox
Chọn một component có nhu cầu visual thực sự (đề xuất: `OrderFilterBar` hoặc `OrderListToolbar`) và implement đầy đủ 3 lớp:
- `.style.ts` với `createStyles` + token
- Tailwind cho layout
- `.module.css` cho structural selectors

### Phase 3 — Promote Thực Tế
Promote component từ Phase 2 vào production, đo lường friction thực tế. Kết quả của Phase 3 là **recipe chuẩn** để mọi engineer trong team áp dụng cho các module còn lại.

---

## Tham Chiếu File Quan Trọng

| Gì | Sandbox | Production |
|---|---|---|
| Theme / ConfigProvider | `src/contexts/ThemeContext.tsx` | `src/app/AntdProvider.js` |
| Adapters | không có | `src/ui/common/antd-adapters/` |
| Re-export aliases | không có | `src/ui/common/` |
| Design tokens | `DESIGN.md` | — |
| Coding rules | `CLAUDE.md` | — |
| Production reference | `sme-src/` (gitignored) | — |
