# BDD — Behavior-Driven Development

> Nguồn: https://cucumber.io/docs/bdd

---

## Định nghĩa

BDD là cách làm việc giúp software teams thu hẹp khoảng cách giữa business people và technical people bằng cách:

- Khuyến khích **collaboration** xuyên suốt các role để xây dựng shared understanding về problem
- Làm việc theo **vòng lặp nhỏ, nhanh** để tăng feedback và flow of value
- Tạo ra **system documentation** được tự động kiểm tra đối chiếu với hành vi thực của hệ thống

Trọng tâm là các **concrete, real-world examples** minh hoạ hệ thống nên hành xử như thế nào — không phải mô tả implementation.

---

## Ba practices cốt lõi

```
Discovery → Formulation → Automation
```

### 1. Discovery — "What it *could* do"

Nói chuyện về **concrete examples** của tính năng mới để:
- Explore, discover và đồng thuận về chi tiết
- Phát hiện khoảng trống trong hiểu biết (nơi cần thêm thông tin)
- Loại bỏ low-priority functionality ra khỏi scope sớm

> "BDD helps teams to have the right conversations at the right time so you minimise the amount of time spent in meetings and maximise the amount of valuable code you produce."

**Discovery là bước đầu tiên nên master.** Formulation và Automation sẽ không hiệu quả nếu Discovery chưa tốt.

### 2. Formulation — "What it *should* do"

Document các examples theo cách có thể **automated** và kiểm tra lại sự đồng thuận. Output là các Gherkin scenarios — vừa là specification, vừa là test case.

### 3. Automation — "That it *actually does* it"

Implement hành vi được mô tả bởi từng documented example, bắt đầu bằng automated test để dẫn dắt development. Kết quả là **living documentation**: code reflects documentation, documentation reflects shared understanding.

---

## Three Amigos

Discovery workshop lý tưởng gồm 3–6 người, tối thiểu là "Three Amigos":

| Role | Trách nhiệm trong workshop |
|---|---|
| **Product Owner** | Định nghĩa problem và intent |
| **Developer** | Đề xuất solution, xác định tính khả thi |
| **Tester** | Xác định edge cases, điều kiện lỗi, scenarios bị bỏ sót |

---

## Discovery Workshop

Một structured conversation xoay quanh **real-world examples** từ góc nhìn người dùng. Output của workshop:
- Shared understanding về business rules
- Danh sách scenarios (happy path + edge cases)
- Phát hiện scope có thể defer

---

## Liên hệ với po-generate-design

Skill này thực hiện **Discovery** theo format AI-assisted:

| BDD practice | po-generate-design làm gì |
|---|---|
| Discovery | Đánh giá 7 chiều — phát hiện khoảng trống trong PO input trước khi code |
| Formulation | Structure Confirmation — Gherkin scenarios được PO approve |
| Automation | Execution — generate UI code đúng với confirmed behavior |

Bước đánh giá 7 chiều là Discovery; Structure Confirmation là Formulation. Skill này không làm Automation (chạy test) — đó là việc của sme-webapp.
