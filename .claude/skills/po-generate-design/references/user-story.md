# User Story

> Nguồn: [deanpeters/Product-Manager-Skills — skills/user-story](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/user-story)

---

## Định nghĩa

User Story là một mô tả ngắn gọn về một tính năng từ góc nhìn của người dùng cuối. Nó kết hợp format của Mike Cohn với Gherkin acceptance criteria để làm rõ **WHO** muốn gì, **WHAT** họ muốn, **WHY** họ muốn — và **HOW** bạn sẽ biết khi nào nó hoàn thành.

> "A conversation starter that captures *who* benefits, *what* they're doing, *why* it matters, and *how* you'll know it works."

---

## Cấu trúc

User Story gồm hai phần:

### Phần 1 — Use Case (Mike Cohn format)

```
As a [persona]
I want to [action]
so that [desired outcome]
```

### Phần 2 — Acceptance Criteria (Gherkin format)

```
Scenario: [Brief, human-readable scenario describing value]
Given: [Initial context or precondition]
and Given: [Additional context or preconditions — lặp lại nếu cần]
When: [Event that triggers the action]
Then: [Expected outcome aligned to "so that"]
```

> **Quy tắc cứng:** Chỉ dùng **một When** và **một Then**. Nhiều cặp When/Then = story cần tách.

---

## Template đầy đủ

```markdown
### User Story [ID]:

- **Summary:** [Brief, memorable title focused on user value]

#### Use Case:
- **As a** [user name if available, otherwise persona, otherwise role]
- **I want to** [action the user takes to get to the outcome]
- **so that** [desired outcome for the user]

#### Acceptance Criteria:
- **Scenario:** [Brief, human-readable scenario describing value]
- **Given:** [Initial context or precondition]
- **and Given:** [Additional context or preconditions]
- **and Given:** [UI-focused context ensuring the When can happen]
- **and Given:** [Outcomes-focused context ensuring the Then is delivered]
- **When:** [Event that triggers the action]
- **Then:** [Expected outcome aligned to "so that"]
```

---

## Ví dụ tốt

```markdown
### User Story 042:

- **Summary:** Enable Google login for trial users to reduce signup friction

#### Use Case:
- **As a** trial user visiting the app for the first time
- **I want to** log in using my Google account
- **so that** I can access the app without creating and remembering a new password

#### Acceptance Criteria:
- **Scenario:** First-time trial user logs in via Google OAuth
- **Given:** I am on the login page
- **and Given:** I have a Google account
- **and Given:** The "Sign in with Google" button is visible
- **When:** I click the "Sign in with Google" button and authorize the app
- **Then:** I am logged into the app and redirected to the onboarding flow
```

**Tại sao tốt:**
- Persona cụ thể ("trial user visiting for the first time")
- Action rõ ràng ("log in using my Google account")
- Outcome giải thích động lực ("without creating a new password")
- Acceptance criteria có thể kiểm chứng được
- Đúng một When, một Then

---

## 5 lỗi phổ biến

| Lỗi | Ví dụ tệ | Cách sửa |
|---|---|---|
| Kỹ thuật giả user story | "Implement OAuth endpoint" | Viết từ góc nhìn người dùng, không phải developer |
| Persona quá chung | "As a user" | Xác định role cụ thể: trial user, admin, warehouse staff |
| "So that" lặp lại action | "so that I can log in" | "so that I can access without a new password" — outcome thực sự |
| Story bao nhiều feature | "add, remove, update, checkout" | Tách thành từng story độc lập |
| Acceptance criteria không đo được | "Then it works better" | "Then I am redirected to the dashboard within 2 seconds" |

---

## Ví dụ story cần tách

```markdown
### User Story 100 (CẦN TÁCH):

#### Use Case:
- As a shopper
- I want to add items, remove items, update quantities, and checkout
- so that I can complete my purchase

#### Acceptance Criteria:
- When I add an item → Then it appears in the cart
- When I remove an item → Then it disappears
- When I checkout → Then I proceed to payment
```

**Dấu hiệu:** Nhiều When/Then, scope quá lớn, các outcome không liên quan nhau.

**Cách tách:** Mỗi action (`add item`, `remove item`, `checkout`) trở thành một story riêng, mỗi cái có acceptance criteria tập trung.

---

## Vai trò trong po-generate-design

Dimension **WHO**, **WHAT**, **WHY** trong bước đánh giá 7 chiều map trực tiếp vào ba thành phần Use Case. Acceptance Criteria (Gherkin) là điều kiện để story được coi là **done** — phải đo được và QA có thể verify.
