## Context

- **Hiện trạng**: `src/ui/common` gồm Button, Alert, Switch, Tooltip, Card, Input, Select, Checkbox, Radio*, Tab, TableBasic, Dropdown, Pagination, TableCard (loại trừ). Style chủ yếu Tailwind (`tw-*`) + CSS module riêng (`css/`).
- **Nền AntD**: PR2 đã thêm `AntdProvider` với `zIndexPopupBase: 1050`, chưa theme brand.
- **Pilot**: `Settings/brands` dùng `antd-adapters` module-local (`AntdBrandButton`, `AntdBrandSwitch`, …) thay import trực tiếp từ `ui/common`.
- **Ràng buộc** (từ `docs/react18-antd-v6-upgrade-report.md`): không đổi logic nghiệp vụ, không reset CSS global, không StrictMode.

## Goals / Non-Goals

**Goals:**

- Mỗi component `ui/common` (trừ TableCard) có implementation AntD qua adapter, **giữ nguyên public props API**.
- Giao diện sau migrate **nhìn giống** component cũ (spacing, màu primary, border radius, typography).
- Rollout theo **phase**: adapter → swap implementation trong `ui/common` HOẶC import adapter tại pilot module → mở rộng dần.
- Một pilot end-to-end (brands) làm mẫu trước khi rollout hàng loạt.

**Non-Goals:**

- Migrate `TableCard` / `TableUpbaseAdvanced`.
- Migrate MUI, Bootstrap, RSuite, Metronic.
- Thay đổi GraphQL, Redux, route, form schema, localStorage.
- Import `antd/dist/reset.css`.
- Viết lại toàn bộ ~200 consumer trong một PR.

## Decisions

### 1. Adapter-first, không đổi import path consumer

**Quyết định**: Tạo `src/ui/common/antd-adapters/<Component>.js` map props; file gốc `Button.js` v.v. re-export hoặc delegate sang adapter khi bật flag/phase cuối.

**Lý do**: ~200 file import `ui/common` — đổi path gây diff khổng lồ. API ổn định giảm regression.

**Thay thế đã xét**: Đổi toàn bộ import sang `antd` trực tiếp — rejected (scope quá lớn, dễ lệch props).

### 2. Visual parity = AntD + className Tailwind legacy

**Quyết định**: Giữ `className`/`style` consumer truyền vào; adapter merge class Tailwind tương đương component cũ; bổ sung `ConfigProvider theme.token` cho `colorPrimary`, `borderRadius`.

**Lý do**: AntD default theme khác brand Upbase (`#FF5629`).

### 3. TableCard ngoài scope — TableBasic trong scope

**Quyết định**: `TableBasic` migrate sang `antd` `Table` với column mapping; `TableCard` không đổi.

**Lý do**: TableCard bọc `TableUpbaseAdvanced` — phụ thuộc phức tạp, tách PR riêng sau.

### 4. Formik-aware components giữ hook logic

**Quyết định**: `Switch`, `Checkbox`, `Input` adapters vẫn hỗ trợ `useFormikContext` / `name` field giống file gốc — chỉ thay phần render DOM.

**Lý do**: Đổi logic Formik = regression form settings/order.

### 5. Pilot brands → consolidate

**Quyết định**: Sau khi pattern ổn, move `AntdBrand*` → `AntdButton` trong `ui/common/antd-adapters`, brands import từ common.

**Lý do**: Tránh duplicate adapter mỗi module.

### 6. Không feature flag runtime (phase 1)

**Quyết định**: Migrate từng component trong PR nhỏ; swap implementation trong file gốc khi adapter đạt parity checklist.

**Thay thế**: `REACT_APP_USE_ANTD_COMMON` — có thể thêm sau nếu cần A/B; hiện ưu tiên PR nhỏ theo component.

## Legacy Props → AntD Mapping

### Primitives

- `Button`: map `variant` → AntD `type`/legacy className (`primary` → primary brand, `secondary` → default, `link` → link); giữ `size`, `type`, `disabled`, `leftIcon`, `rightIcon`, `onClick`, `children`.
- `Alert`: map `type` → AntD `type`; giữ `title`, `description`, `closable`, `onClose`; adapter chịu trách nhiệm tái tạo spacing/typography Tailwind cũ.
- `Switch`: map `checked`, `disabled`, `size`, `onChange(checked)` vào AntD `Switch`; nếu có `name`, vẫn dùng Formik context như legacy.
- `Tooltip`: map content/title, `placement`, `trigger`, và `children` vào AntD `Tooltip`; không đổi interaction của child.
- `Card`: map `title`, `extra`, `children`, `className`, `bodyClassName` vào AntD `Card` + wrapper class để giữ layout cũ.

### Form Controls

- `Input` / `InputVertical`: giữ event/value shape của `onChange`, `onBlur`, `value`, `disabled`, `placeholder`, error text, và className passthrough.
- `ReSelectVertical` / `ReSelectStandalone`: adapter AntD `Select` phải preserve `options`, `value`, `onChange`, `isMulti`, `isDisabled`, `placeholder`, search behavior ở mức consumer đang dùng.
- `Checkbox` / `Checkbox3Status`: map `checked`, `indeterminate`, `disabled`, `onChange`; giữ state transition 3 trạng thái và Formik `name`.
- `RadioGroup` / `RadioButtonGroup`: map `options`, `value`, `onChange`, disabled per option; giữ output value như legacy.

### Data Display

- `Tab`: map active key/default key và panel rendering vào AntD `Tabs`; parent business logic không remount ngoài behavior cũ.
- `TableBasic`: map `columns`, `data`, `loading`, `rowKey`, row render props vào AntD `Table`; không nối thêm data fetching hoặc pagination.
- `DropdownWrapper`: map trigger/menu items/action handlers vào AntD `Dropdown`/`Menu`; giữ handler routing.
- `Pagination`: map `current`, `total`, `pageSize`, `onChange(page)` vào AntD `Pagination`; giữ consumer-controlled pagination state.
- `TableCard`: không map, không sửa trong change này.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Visual drift (màu/size AntD default) | Theme token + giữ className Tailwind; screenshot checklist per component |
| z-index modal/dropdown bị che | Giữ `zIndexPopupBase: 1050`; test modal Metronic + AntD |
| Formik double onChange | Chỉ map `onChange` một lần trong adapter; test Switch/Checkbox trên brands |
| Bundle size tăng | Chỉ import named components (`import { Button } from 'antd'`) |
| TableBasic column API khác AntD | Adapter chuyển `columns` format nội bộ → `antd` columns |
| Duplicate adapters (brands vs common) | Task consolidate sau pilot |

## Migration Plan

1. **Phase 0**: Theme token + folder `ui/common/antd-adapters` + parity checklist doc.
2. **Phase 1** (primitives): Button, Alert, Switch, Tooltip, Card.
3. **Phase 2** (form): Input, InputVertical, Select, Checkbox, Radio*.
4. **Phase 3** (data): Tab, TableBasic, Dropdown, Pagination.
5. **Phase 4**: Consolidate brands adapters; mở rộng module tiếp theo (channels, users).
6. **Rollback**: Revert implementation trong file `ui/common/*.js` về Tailwind (git revert PR component đó).

## Open Questions

- Có cần `StatusBadge` trong scope không? (có file nhưng chưa export trong `index.js`)
- Pagination: giữ custom hay `antd` Pagination — cần so sánh props hiện tại.
- Select: đang dùng react-select — AntD `Select` có thể khác behavior search/multi.
