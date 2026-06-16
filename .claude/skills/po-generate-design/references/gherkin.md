# Gherkin

> Nguồn: https://cucumber.io/docs/gherkin/reference · https://github.com/cucumber/gherkin

---

## Định nghĩa

Gherkin là ngôn ngữ đặc tả hành vi phần mềm bằng plain text, structured, và executable. Nó là cầu nối giữa User Story (intent) và automated test (verification). File Gherkin có extension `.feature`.

---

## Cấu trúc đầy đủ

```gherkin
@tag1 @tag2
Feature: <tên tính năng>
  <mô tả — tùy chọn, thường là User Story format>
  In order to <benefit>
  As a <actor>
  I want to <feature>

  Background:
    Given <điều kiện chạy trước mỗi Scenario trong Feature>

  Rule: <business rule — nhóm các Scenario liên quan>

    Scenario: <tên kịch bản cụ thể>
      Given <trạng thái ban đầu / precondition>
      And   <precondition bổ sung>
      When  <hành động người dùng thực hiện>
      And   <hành động bổ sung>
      Then  <kết quả mong đợi>
      And   <kết quả bổ sung>
      But   <điều không xảy ra>

    Scenario Outline: <kịch bản với nhiều bộ dữ liệu>
      Given there are <start> items
      When I process <count> items
      Then I should have <remaining> items

      Examples:
        | start | count | remaining |
        |    10 |     3 |         7 |
        |    20 |     5 |        15 |
```

---

## Keywords chi tiết

### `Feature`
- Nhóm các Scenario liên quan đến một tính năng
- Thường đặt User Story (`In order to / As a / I want to`) làm description
- Mỗi file `.feature` chứa đúng một `Feature`

### `Rule` *(Gherkin v6+)*
- Đại diện cho một **business rule** trong Feature
- Nhóm các Scenario thuộc cùng một rule

```gherkin
Feature: Highlander

  Rule: There can be only One
    Example: Only One -- More than one alive
      Given there are 3 ninjas
      When 2 ninjas meet, they will fight
      Then one ninja dies

  Rule: There can be Two (in some cases)
    Example: Two -- Dead and Reborn as Phoenix
      ...
```

### `Background`
- Các bước `Given` **chung** được chạy trước **mỗi Scenario** trong Feature
- Dùng cho setup lặp lại (auth, seed data, cấu hình)
- **Không** dùng cho logic phức tạp hoặc điều kiện phụ thuộc Scenario

```gherkin
Background:
  Given a global administrator named "Greg"
  And a blog named "Greg's anti-tax rants"
```

### `Scenario` / `Example`
- Một kịch bản cụ thể, độc lập
- `Example` là alias của `Scenario` (dùng thay thế nhau)
- Mỗi Scenario phải self-contained — không phụ thuộc thứ tự với Scenario khác

### `Scenario Outline` / `Scenario Template`
- Kịch bản lặp lại với nhiều bộ dữ liệu khác nhau
- Dùng `<placeholder>` trong steps, cung cấp data trong `Examples` table

```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    |    12 |   5 |    7 |
    |    20 |   5 |   15 |
```

### `Given` — Precondition
- Mô tả **trạng thái hệ thống trước** khi hành động xảy ra
- Không mô tả hành động của người dùng
- Phù hợp với: dữ liệu tồn tại, user đã đăng nhập, cấu hình đã được set

### `When` — Action
- Mô tả **hành động người dùng** hoặc sự kiện xảy ra với hệ thống
- Là trọng tâm của Scenario — điều mà Scenario đang kiểm tra
- Thường chỉ có **một** `When` mỗi Scenario

### `Then` — Expected outcome
- Mô tả **kết quả mong đợi** sau hành động
- Phải observable: UI thay đổi, message hiện ra, redirect xảy ra, badge cập nhật
- Không mô tả implementation details

### `And` / `But`
- Alias của keyword liền trước để viết tự nhiên hơn
- `And` — bổ sung thêm cùng loại step
- `But` — phủ định (điều gì đó **không** xảy ra)

### Tags (`@tag`)
- Gắn metadata vào Feature hoặc Scenario
- Dùng để filter, group, hoặc đánh dấu priority

```gherkin
@billing @important
Feature: Verify billing

  @smoke
  Scenario: Missing product description
    Given hello
```

### DataTable
- Truyền dữ liệu có cấu trúc vào một step
- Không có header bắt buộc — linh hoạt theo format

```gherkin
Given the following users exist:
  | name   | email              |
  | Aslak  | aslak@cucumber.io  |
  | Julien | julien@cucumber.io |
```

---

## Nguyên tắc viết Gherkin tốt

| Nguyên tắc | Mô tả |
|---|---|
| **Declarative, không imperative** | Mô tả **hành vi mong đợi**, không phải từng bước click |
| **Một `When` mỗi Scenario** | Nếu có nhiều `When`, tách thành nhiều Scenario |
| **Given không phải action** | `Given I click the button` là sai — đó là `When` |
| **Then phải observable** | Kết quả phải nhìn thấy/đo được, không phải internal state |
| **Scenario độc lập** | Không phụ thuộc kết quả của Scenario khác |
| **Background chỉ cho incidental details** | Setup không liên quan đến intent của Scenario |

---

## Ví dụ đầy đủ với nhiều Scenario

```gherkin
Feature: Multiple site support
  In order to quản lý nội dung theo từng blog riêng biệt
  As a blog owner
  I want to chỉ post được lên blog của mình

  Background:
    Given a global administrator named "Greg"
    And a blog named "Greg's anti-tax rants"
    And a customer named "Dr. Bill"
    And a blog named "Expensive Therapy" owned by "Dr. Bill"

  Scenario: Dr. Bill posts to his own blog
    Given I am logged in as Dr. Bill
    When I try to post to "Expensive Therapy"
    Then I should see "Your article was published."

  Scenario: Dr. Bill tries to post to somebody else's blog, and fails
    Given I am logged in as Dr. Bill
    When I try to post to "Greg's anti-tax rants"
    Then I should see "Hey! That's not your blog!"
    But I should not see "Your article was published."
```

---

## Mapping với 7 chiều của po-generate-design

| Gherkin element | Chiều tương ứng |
|---|---|
| `Feature` description `In order to` | WHY |
| `Feature` description `As a` | WHO |
| `Feature` description `I want to` | WHAT |
| `Scenario` names + `When` steps | FLOW |
| Số lượng Scenarios (happy, empty, error) | STATES |
| `Then` steps | OUTPUT |
| `Given` context / `Background` | CONSTRAINTS |
