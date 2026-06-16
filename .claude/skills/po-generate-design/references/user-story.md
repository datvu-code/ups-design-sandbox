# User Story

> Nguồn: https://cucumber.io/docs/terms/user-story

---

## Định nghĩa

User Story là một mô tả ngắn gọn về một tính năng từ góc nhìn của người dùng cuối hoặc stakeholder. Mục tiêu là nắm bắt **WHO** muốn gì, **WHAT** họ muốn, và **WHY** họ muốn nó — không mô tả cách thực hiện.

---

## Hai biến thể format

### Biến thể gốc (Connextra — Mike Cohn)
```
As a <actor>
I want <feature>
So that <benefit>
```

### Biến thể đảo (benefit-first — dùng trong skill này)
```
In order to <benefit>
As a <actor>
I want to <feature>
```

Benefit-first buộc người viết phải xác định WHY trước — ngăn chặn việc mô tả feature mà không có lý do rõ ràng.

---

## Ba thành phần

| Thành phần | Keyword | Câu hỏi cần trả lời |
|---|---|---|
| **WHO** | `As a` | Ai là người dùng? Role, ngữ cảnh, cấp độ truy cập? |
| **WHAT** | `I want` | Hành động hoặc thông tin họ cần? |
| **WHY** | `So that` / `In order to` | Giá trị business hoặc động lực người dùng? |

---

## Ví dụ tốt

```gherkin
In order to gain an understanding of the Cucumber testing system
As a non-programmer
I want to have an overview of Cucumber that is understandable by non-geeks
```

```
As a mobile bank customer
I want to see balance on my accounts
So that I can make better informed decisions about my spending
```

---

## Dấu hiệu User Story kém chất lượng

| Vấn đề | Ví dụ tệ | Cách sửa |
|---|---|---|
| Thiếu WHY | "User có thể filter đơn hàng" | "In order to tìm nhanh đơn cần xử lý, As a seller, I want to filter..." |
| WHO quá chung | "As a user" | Xác định role cụ thể: seller, admin, warehouse staff |
| WHAT là giải pháp, không phải nhu cầu | "I want a dropdown with 5 options" | "I want to narrow down orders by status" |
| Quá lớn (Epic) | Một story bao phủ cả module | Tách nhỏ theo từng flow độc lập |

---

## Liên hệ với Acceptance Criteria

User Story mô tả **intent**. Acceptance Criteria (viết bằng Gherkin) mô tả **khi nào story được coi là done**:

```
User Story:
  In order to tránh ship sai kho
  As a warehouse staff
  I want to xem đơn được phân theo kho xử lý

Acceptance Criteria (Gherkin):
  Scenario: Đơn có kho được phân công
    Given đơn #123 được phân cho kho Hà Nội
    When warehouse staff mở danh sách đơn
    Then đơn #123 hiện trong tab "Kho Hà Nội"
    And hiển thị tên kho rõ ràng trên row

  Scenario: Đơn chưa có kho
    Given đơn #456 chưa được phân kho
    When warehouse staff mở danh sách đơn
    Then đơn #456 hiển thị badge "Chưa có kho xử lý"
    And không xuất hiện trong bất kỳ tab kho nào
```

---

## Vai trò trong po-generate-design

Dimension **WHY**, **WHO**, **WHAT** trong bước đánh giá 7 chiều map trực tiếp vào ba thành phần của User Story. Structure Confirmation sử dụng format benefit-first để đảm bảo intent luôn được ghi lại trước khi execute.
