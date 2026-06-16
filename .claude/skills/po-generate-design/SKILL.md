---
name: po-generate-design
description: "Use this skill whenever a PO, product owner, or stakeholder shares product requirements and wants UI generated or implemented. Triggers on wireframe images, user flow diagrams, BRD/PRD documents, feature descriptions, or any mix — even when the user says 'implement this', 'build this screen', 'design this feature', 'execute this spec', or pastes a requirements doc. Also triggers when someone shares a Figma file or sketch and asks for code. Default to this skill whenever product intent and UI generation are both present."
---

# po-generate-design

Skill để đọc input từ PO — BRD, PRD, wireframe, user flow, hoặc kết hợp — và generate UI đúng với intent.

Vấn đề cốt lõi skill này giải quyết: input từ PO thường thiếu theo những cách không rõ ràng. Execute trên requirement thiếu sẽ ra UI trông đúng nhưng sai intent. Skill này bắt các khoảng trống đó trước khi viết code.

---

## Frameworks nền tảng

Skill được xây dựng trên ba framework — đọc references để hiểu sâu hơn:

| Framework | Vai trò trong skill | Reference |
|---|---|---|
| **User Story** | Cấu trúc WHO / WHAT / WHY; format `In order to / As a / I want to` trong Structure Confirmation | [references/user-story.md](references/user-story.md) |
| **BDD** | Discovery → Formulation → Automation; bước đánh giá = Discovery, Structure Confirmation = Formulation | [references/bdd.md](references/bdd.md) |
| **Gherkin** | Ngôn ngữ đặc tả `Feature / Scenario / Given / When / Then`; mapping đầy đủ với 7 chiều đánh giá | [references/gherkin.md](references/gherkin.md) |

---

## Hai chế độ

### Validated Track (mặc định)

Chạy đánh giá 7 chiều trên mọi input của PO. Xác định khoảng trống trước khi thực thi.

### Fast Track (chỉ khi có từ khoá)

Khi user dùng một trong các cụm từ sau, bỏ qua đánh giá và thực thi ngay:

> "fast track", "direct", "just do it", "no questions", "execute directly", "straight forward"

Trong Fast Track: nêu ngắn gọn bạn sẽ generate gì, rồi tiến hành.

---

## Validated Track — Đánh giá 7 chiều

Đánh giá input theo đủ 7 chiều. Đánh dấu mỗi chiều ☑ (đủ), ☐ (thiếu), hoặc ◑ (có nhưng chưa rõ).

| # | Chiều | Cần kiểm tra |
|---|---|---|
| 1 | **WHY** | Mục tiêu business, động lực người dùng — "In order to [goal]". Thiếu WHY thì mọi quyết định implementation mất anchor. |
| 2 | **WHO** | Persona, role, cấp độ truy cập, bối cảnh kỹ thuật. |
| 3 | **WHAT** | Dữ liệu cần hiển thị, hành động được phép, business rules, validation. |
| 4 | **FLOW** | Entry point → các bước chính → điều kiện thành công/thoát. Kiểm tra xem có đang *declarative* (mô tả hành vi mong muốn) hay *imperative* (mô tả từng bước implementation). |
| 5 | **STATES** | Tối thiểu bắt buộc: **Loaded · Empty · Loading · Error**. Flag bất kỳ state nào bị thiếu. |
| 6 | **OUTPUT** | "Done" trông như thế nào sau mỗi hành động — redirect? toast? badge? thay đổi inline? |
| 7 | **CONSTRAINTS** | Volume, performance, đa kênh, ranh giới scope, phân quyền. |

### Format output

```
☑ WHY         — [nhận xét 1 dòng]
☑ WHO         — [nhận xét 1 dòng]
☑ WHAT        — [nhận xét 1 dòng]
☑ FLOW        — [nhận xét 1 dòng]
☐ STATES      — Loaded ✓ · Empty ? · Loading ? · Error ? — [lý do quan trọng]
☐ OUTPUT      — [điều chưa rõ và quyết định nào bị ảnh hưởng]
☐ CONSTRAINTS — [điều còn thiếu và rủi ro nó tạo ra]

→ X/7 covered. Thiếu [danh sách].
→ PO muốn mình hỏi inline hay update document?
```

Chỉ đánh ☑ khi chiều đó được cover thực chất. Partial = ◑ kèm ghi chú.

**Kiểm tra FLOW:** Flow dạng imperative ("user clicks → modal opens → fills form → saves") ràng buộc implementation. Flag là ◑ và ghi chú rằng intent declarative là preferred.

### Sau khi PO giải quyết các khoảng trống

1. Đánh giá lại chỉ những chiều còn thiếu
2. Nếu đủ 7 ☑ → chuyển sang structure confirmation
3. Nếu còn thiếu → lặp lại

---

## Structure Confirmation (trước khi thực thi)

Khi đủ 7 chiều, trình bày confirmed structure theo Gherkin và xin phê duyệt.
Xem [references/gherkin.md](references/gherkin.md) để tra cứu đầy đủ keyword syntax.

```gherkin
Feature: [tên tính năng]
  In order to [WHY]
  As a [WHO]
  I want to [WHAT]

  Scenario: Happy path
    Given [CONSTRAINTS / context]
    When  [hành động chính]
    Then  [OUTPUT — kết quả thành công]

  Scenario: Empty state
    Given [không có dữ liệu]
    When  [user vào màn hình]
    Then  [empty output]

  Scenario: Error state
    Given [ngữ cảnh lỗi]
    When  [hành động thất bại]
    Then  [error output]

Constraints: [các giới hạn quan trọng]

→ Mình sẽ generate [nêu cụ thể những gì sẽ được tạo]. Proceed?
```

Chỉ tiến hành sau khi có phê duyệt rõ ràng.

---

## Thực thi

Sau khi được phê duyệt (hoặc Fast Track), generate UI theo design system của sandbox (xem `CLAUDE.md` và `DESIGN.md`):

- **Components**: Chỉ dùng Ant Design — không có project adapters trong sandbox; import trực tiếp từ `antd`
- **Styling**: CSS variables `var(--ant-*)` trong inline `style` cho static token values · CSS Modules (`.module.css`) cho hover/focus/pseudo-selectors và structural selectors — không hardcode hex hay px
- **Icons**: Chỉ dùng `@tabler/icons-react` — không dùng `@ant-design/icons`; 14px trong form, 16px trong toolbar; mọi `Select` phải có `suffixIcon={<IconChevronDown size={14} />}`
- **TypeScript**: tất cả props phải có interface rõ ràng trong `types/index.ts` của module — không dùng `any`
- **Đặt file**: feature components trong `src/app/modules/[Module]/components/` · mock data trong `src/mock-data/[module].ts` · thêm route mới vào `src/layouts/navConfig.tsx`
- **States**: luôn implement đủ Loaded · Empty · Loading · Error
- **Data**: components nhận mock data qua props — không import mock data trực tiếp bên trong component
