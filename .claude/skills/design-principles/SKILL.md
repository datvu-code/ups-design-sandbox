---
name: design-principles
description: >
  UpS product design principles — ground every design decision in these 7 principles before generating,
  building, implementing, or reviewing any UI/UX work. Use this skill whenever the user asks to design,
  build, implement, generate UI, create screens, review designs, or propose UX flows for the UpS product.
  This skill answers the "what are we building and why" question so that generated designs reflect UpS's
  real operational context, not generic UI patterns. Trigger even when the user's request seems small
  (e.g. "add a button", "tweak this screen") — principles apply at every scale.
---

# UpS Design Principles

Before generating or reviewing any design work, ground your decisions in these 7 principles. For each principle, answer its key check question — either explicitly to the user, or as a silent filter on your own output.

---

## 1. Đóng gói tri thức vận hành, không chỉ cung cấp công cụ
**Embed operational knowledge, not just tools**

UpS's biggest advantage is real operational experience from hundreds of stores. That knowledge must be embedded into the product itself — through smart defaults, standardized flows, and organized information — not left in someone's head. The product should guide users to do things the right way without them having to figure out the process first.

> **Key check:** Are we embedding operational knowledge into the product experience, or are we leaving users to figure out the right way themselves?

---

## 2. Hoà hợp với thế giới người dùng đang sống
**Harmonize with the world users already live in**

UpS users have thousands of hours on Shopee, TikTok Shop, and Google Sheets. Every habit and expectation was shaped by those tools. Designing differently without good reason pushes users back to their old ways. Familiarity doesn't mean copying — when UpS has a better approach, lead rather than follow, but explain why the new way is worth learning.

> **Key check:** Are we building on what users already know, or forcing them to relearn from scratch?

---

## 3. Chủ động ngăn sai sót, không đợi người dùng phát hiện
**Proactively prevent errors — don't wait for users to discover them**

E-commerce operations have no room for small mistakes. Every error directly impacts revenue and store reputation. The product must take responsibility for validation: identify risks, remove conflicting choices, warn early, and provide clear feedback after every action. When something completes, the system must say what happened — silence forces users to guess.

> **Key check:** Are we proactively preventing errors and responding clearly, or making users remember, check, and hope for the best?

---

## 4. Giảm tải cả thao tác lẫn suy nghĩ
**Reduce both physical and cognitive load**

UpS users manage multiple platforms and stores under constant time pressure. Every step the system can do for them, every moment they have to pause and think "what do I do next?" — is a design failure. Product value is not measured by feature count, but by how much time and effort — physical and mental — is removed from daily operations.

> **Key check:** Are we truly reducing workload — both hands and brain — or just adding another place users must manage?

---

## 5. Xây dựng niềm tin bằng dữ liệu kiểm chứng được
**Build trust through verifiable data**

Users make real business decisions based on what UpS displays. Many have left because one number didn't match reality. Data trust is the foundation everything else rests on: every metric must be traceable to its source, timestamped clearly, and honest about its limits. When data is delayed, incomplete, or estimated — say so. Showing "no data" is always better than showing wrong data.

> **Key check:** Can users verify any number they see on UpS, or are we asking them to trust without basis?

---

## 6. Gợi ý bước tiếp theo, rồi tránh sang một bên
**Suggest the next step, then get out of the way**

The most valuable thing UpS can do is tell users what to do next without being asked — this is the path from a data-recording system to an intelligent operating system. Today that means surfacing the right context at the right time. Whatever the level of automation, the principle is constant: always explain the reasoning, always allow intervention, always keep the human as the final decision-maker.

> **Key check:** Are we proactively guiding users toward what matters most, or passively waiting for them to discover problems?

---

## 7. Đi xa bằng những bước đi chắc chắn
**Go far with solid steps**

The pressure to build many things at once is real, but big leaps rarely deliver as much value as small, steady improvements grounded in real understanding. A 10/10 feature on a core flow is worth more than five ambitious features each at 6-7/10. Build discipline: do fewer things but do them deeply, complete before expanding, and validate with real feedback from real users before taking the next step.

> **Key check:** Are we building steps solid enough to compound into real value, or betting on big leaps and hoping they land right?

---

## How to apply these principles

When generating a design, layout, component, or UX flow:

1. **Before producing output** — silently run through the 7 key checks. Let them shape your decisions on defaults, error states, information hierarchy, and what to omit.
2. **When proposing a design** — explicitly call out which principles shaped key decisions, especially when you deviate from a conventional pattern.
3. **When reviewing an existing design** — use the key checks as a diagnostic lens. Flag where the design passes or fails each one.
4. **When uncertain between two approaches** — ask which option better satisfies the most principles, especially #3 (error prevention) and #4 (load reduction), which are highest-stakes for UpS's operational context.
