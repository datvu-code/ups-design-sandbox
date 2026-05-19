---
name: principles-of-design
description: >
  Ant Design principles of design — answer the "how" question whenever generating, building,
  implementing, or reviewing any UI/UX work. Use this skill alongside design-principles (the "what")
  whenever the user asks to design, build, implement, generate UI, create screens, review designs,
  or propose UX flows. This skill provides concrete visual and interaction rules: spacing systems,
  alignment conventions, contrast hierarchy, inline editing patterns, transition behaviors, and
  feedback patterns. Trigger even for small requests (e.g. "add a button", "tweak this form") —
  these rules apply at every granularity.
---

# Principles of Design (Ant Design)

Two layers: **Visual & Layout** (how elements are arranged) and **Interaction** (how interfaces feel and respond). Apply these as concrete implementation rules when generating any UI.

---

## Visual & Layout Principles

### 1. Proximity — Group related things
Items close together read as one unit. Use proximity to reveal page structure and information hierarchy.

**Rule:** Use the vertical spacing system: `8px` (small), `16px` (middle), `24px` (large). Formula: `y = 8 + 8n`. Don't improvise arbitrary gaps — pick from this scale.

---

### 2. Alignment — Guide the eye with a single starting point
Alignment delivers information more smoothly by respecting Gestalt continuity. Inconsistent alignment creates visual friction.

**Rules:**
- Left-align titles and body text to a single visual starting point
- Right-align form labels (colon-aligned) so users can scan labels quickly
- Right-align numbers with consistent decimal places for easy comparison

---

### 3. Contrast — Make hierarchy unmistakable
Contrast creates visual interest and helps users find information fast. Weak contrast is a design failure — it must be strong.

**Three kinds:**
- **Major/minor hierarchy** — primary vs. secondary actions (button weight, color, size)
- **Whole/part differentiation** — typesetting, typeface, size variation between sections and content
- **State contrast** — static via color; dynamic via hover/interaction changes

---

### 4. Repetition — Reduce learning cost through consistency
Repeating visual elements (rules, colors, formats, spatial relationships) signals relevance between components and lowers cognitive load across the interface.

**Apply to:** thick rules, borders, colors, icons, component styles, and spacing patterns. If something appears more than once, make it look the same every time.

---

## Interaction Principles

### 5. Make it Direct — Edit in context, not on a separate page
Alan Cooper: "Where there is output, let there be input." Inline editing is always preferable to navigation away.

**Patterns:**
- Single-field inline edit (click to edit in place)
- Text link / icon edit trigger
- Multi-field inline edit
- Drag & drop (one-dimensional reordering)

---

### 6. Stay on the Page — Avoid page refreshes and navigation
Page changes cause change blindness and break mental flow. Solve problems on the current page whenever possible.

**Patterns:**
- **Overlays** — detail overlays, input overlays (prefer undo over double-confirm modals)
- **Inlays** — list inlay, tabs
- **Virtual pages** — slide-in panels that don't reload
- **Process flows** — responsive disclosure, configurator, dialog overlay process

---

### 7. Keep it Lightweight — Put tools close to where they're needed
Fitts's Law: a tool that is close and large enough to target reduces interaction cost. Contextual tools eliminate the overhead of going somewhere else.

**Patterns:**
- **Always-visible tools** — for critical, frequent actions
- **Hover-reveal tools** — contextual, appear on demand
- **Toggle-reveal tools** — for non-primary flows
- Expand clickable area beyond the visible target when the visual element is small

---

### 8. Provide an Invitation — Hint at what's possible
Rich interactions (drag, inline edit, contextual tools) are invisible until discovered. Invitations are the cues that surface them just in time.

**Patterns:**
- **Static invitations** — text prompts, blank slate copy, unfinished state hints, onboarding tours
- **Dynamic invitations** — hover invitation (element appears on hover), inference invitation (system suggests based on context), "more content" invitation (scroll/expand cue)

---

### 9. Use Transition — Make changes feel natural
Transitions reduce jarring state changes and reinforce what just happened. They communicate cause and effect, not just decoration.

**Three element states:**
- **Adding** — animate in to show how to interact
- **Receding** — animate out to remove irrelevant elements gracefully
- **Normal** — static elements don't need transition

**Patterns:**
- Maintain context while changing views (slide, carousel, accordion)
- Explain what just happened (add/delete/modify animations)
- Improve perceived performance (skeleton screens, progressive load)
- Natural motion (ease curves, not linear)

---

### 10. React Immediately — Feedback must be instant
Every interaction needs a response. Delayed or absent feedback makes the system feel broken. Users who click a button expect it to depress; users who type expect to see characters.

**Patterns:**
- **Lookup** — autocomplete (certain/uncertain categories), live search
- **Live suggest** — live preview for real-time input feedback, progressive disclosure
- **Progress indicators** — loading states for button, table, list, and page
- **Refresh** — click refresh (manual), periodic refresh (automatic), optimistic update

---

## How to apply these principles

When generating UI, layout, or interaction code:

1. **Spacing** — always use the 8/16/24px scale. Never invent intermediate values.
2. **Alignment** — anchor text left, numbers and form labels right.
3. **Contrast** — establish a clear primary/secondary action hierarchy in every view.
4. **Edit in place** — default to inline editing over navigation to a separate page.
5. **Stay on the page** — use overlays, inlays, or panels before reaching for a new route.
6. **Contextual tools** — place actions near the content they act on, reveal on hover if non-critical.
7. **Every action gets feedback** — loading state, success state, or error state. No silent completion.
8. **Hint before the user asks** — use invitations to surface non-obvious interactions.
