## 1. Chuẩn bị nền (Phase 0)

- [x] 1.1 Tạo `src/ui/common/antd-adapters/` + `index.js` export pattern (tham chiếu `Settings/brands/components/antd-adapters`)
- [x] 1.2 Bổ sung theme token trong `AntdProvider` (`colorPrimary`, `borderRadius`, font) khớp Tailwind legacy
- [x] 1.3 Viết checklist visual parity (1 file markdown ngắn trong change hoặc `docs/`) cho từng primitive
- [x] 1.4 Xác nhận build pass: `yarn run build:rs`

## 2. Primitives — Button, Alert, Switch, Tooltip, Card (Phase 1)

- [x] 2.1 `AntdButton` — map variant/size/icon; parity với `Button.js`
- [x] 2.2 `AntdAlert` — map type/title/description/closable
- [x] 2.3 `AntdSwitch` — map size + Formik `name`; parity với `Switch.js`
- [x] 2.4 `AntdTooltip` — map placement/trigger/children
- [x] 2.5 `AntdCard` — map title/extra/body className
- [x] 2.6 Swap `ui/common/Button.js` (và tương tự) delegate sang adapter HOẶC export adapter — giữ API export
- [x] 2.7 Smoke test: Settings/brands (đã pilot) + 1 màn khác dùng Button/Alert

## 3. Form controls — Input, Select, Checkbox, Radio (Phase 2)

- [x] 3.1 `AntdInput` + `AntdInputVertical` — controlled + error state
- [x] 3.2 `AntdSelect` — ReSelectVertical + ReSelectStandalone behavior
- [x] 3.3 `AntdCheckbox` + `AntdCheckbox3Status`
- [x] 3.4 `AntdRadioGroup` + `AntdRadioButtonGroup`
- [x] 3.5 Smoke test form: Settings/channels hoặc users (Formik fields)

## 4. Data display — Tab, TableBasic, Dropdown, Pagination (Phase 3)

- [x] 4.1 `AntdTab`
- [x] 4.2 `AntdTableBasic` — column mapper; không đụng TableCard
- [x] 4.3 `AntdDropdown` (DropdownWrapper)
- [x] 4.4 `AntdPagination`
- [x] 4.5 Smoke test list có pagination + TableBasic

## 5. Consolidate pilot & mở rộng (Phase 4)

- [ ] 5.1 Chuyển `AntdBrand*` → import từ `ui/common/antd-adapters`
- [ ] 5.2 Xóa duplicate `Settings/brands/.../antd-adapters` nếu không còn cần
- [ ] 5.3 Chọn module pilot tiếp theo (ví dụ Settings/users) — chỉ đổi import UI
- [ ] 5.4 Cập nhật `src/ui/common/index.js` exports nếu thêm component mới (StatusBadge — quyết định scope)

## 6. Visual parity fixes (post-migrate)

- [ ] 6.1 **RadioGroup / RadioButtonGroup**: tăng khoảng cách giữa vòng radio (hoặc icon) và label text — khớp legacy Bootstrap `.radio` (~8px); cập nhật `RadioGroup.css` cho DOM AntD (`.ant-radio-wrapper`)
- [ ] 6.2 **AntdDropdownWrapper toggle**: text trong nút không xuống dòng — `white-space: nowrap` trên label toggle; trigger co giãn theo nội dung khi cần
- [ ] 6.3 **AntdDropdownWrapper menu**: text dài không wrap trong menu hẹp — bỏ/giảm `maxWidth: 300px` cố định; menu `width: max-content` / `min-width` khớp nội dung dài nhất; item `nowrap`
- [ ] 6.4 Smoke test: 1 màn có RadioGroup + info icon; 1 màn có Dropdown label dài (Order filter / Settings)

## 7. Hoàn tất change

- [ ] 7.1 Review toàn bộ task checkbox
- [ ] 7.2 `openspec archive` sau khi merge PR series
