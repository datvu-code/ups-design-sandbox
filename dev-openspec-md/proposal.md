## Why

Dự án đã nâng React 18 và cài nền Ant Design v6 (`AntdProvider`). Thư viện `src/ui/common` hiện là custom Tailwind, được import rộng rãi (~200+ file). Cần chuyển implementation sang AntD để thống nhất UI stack và sẵn sàng mở rộng, nhưng **không được phá luồng nghiệp vụ** (GraphQL, Redux, Formik, route, query params).

## What Changes

- Thêm lớp **AntD adapter** trong `src/ui/common/antd-adapters/` — map API props của component cũ sang AntD, giữ className/style Tailwind hiện có khi cần visual parity.
- Migrate từng component trong `src/ui/common` sang AntD implementation (trừ **`TableCard`** — giữ nguyên vì phụ thuộc `TableUpbaseAdvanced`).
- Pilot đã bắt đầu ở **Settings/brands** (`antd-adapters` module-level) — chuẩn hóa pattern và có thể gộp về `ui/common` sau pilot.
- Cập nhật `AntdProvider` theme token tối thiểu (màu primary `#FF5629`, border radius, z-index) khi cần khớp giao diện cũ.
- **Không** import `antd/dist/reset.css` global.
- **Không** đổi: export name public API, event handler signature, Formik field name, GraphQL, Redux, routing.

## Non-Goals

- Không migrate `TableCard` / `TableUpbaseAdvanced`.
- Không thay đổi GraphQL queries/mutations, Redux selectors/actions, route, query params, Formik field names, hoặc event handler semantics.
- Không import `antd/dist/reset.css` hoặc reset CSS global khác.
- Không migrate các UI library legacy khác (MUI, Bootstrap/Metronic, RSuite) trong change này.
- Không rewrite toàn bộ ~200 consumer trong một PR.

## Capabilities

### New Capabilities

- `antd-common-adapters`: Cấu trúc thư mục adapter, quy tắc map props, theme token, và checklist visual parity.
- `common-primitives-antd`: Button, Alert, Switch, Tooltip, Card parity.
- `common-form-controls-antd`: Input, InputVertical, Select, Checkbox, Checkbox3Status, RadioGroup, RadioButtonGroup parity.
- `common-data-display-antd`: Tab, TableBasic, DropdownWrapper, Pagination parity; `TableCard` được loại trừ rõ ràng.
- `pilot-brands-consolidation`: Gộp/chuẩn hóa adapters từ Settings/brands về pattern chung.

### Modified Capabilities

<!-- Không có spec baseline trong openspec/specs/ — toàn bộ là capability mới -->

## Impact

- **Code**: `src/ui/common/**`, `src/ui/common/antd-adapters/**`, `src/app/AntdProvider.js`, các module import `ui/common` hoặc `@/ui/common`.
- **Loại trừ**: `src/ui/common/TableCard.js` và mọi consumer chỉ dùng TableCard.
- **Phụ thuộc**: `antd@6`, `@ant-design/icons`, `dayjs` (đã có).
- **Rủi ro**: CSS global conflict, z-index modal, Formik controlled fields, visual drift nếu bỏ className Tailwind.
