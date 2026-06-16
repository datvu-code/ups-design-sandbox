## Visual Parity Checklist

Use this checklist before swapping each legacy `src/ui/common` primitive to an AntD adapter. Compare against the current Tailwind component in at least one existing screen and the Settings/brands pilot when applicable.

### Button

- [ ] Variants match legacy visual states: `primary`, `secondary`, `link`.
- [ ] Sizes match legacy height, padding, border radius, and typography for `small`, `default`, `medium`, `large`.
- [ ] `disabled`, loading, `leftIcon`, and `rightIcon` spacing match legacy behavior.
- [ ] `onClick`, `type`/`htmlType`, `className`, and `style` are preserved.

### Alert

- [ ] `info`, `success`, `warning`, and `error` colors and spacing match legacy alerts.
- [ ] `title`, `message`/`description`, icon visibility, and no-border mode are visually compatible.
- [ ] `closable`/`onClose` behavior matches the legacy component.
- [ ] `className` and `style` passthrough remain intact.

### Switch

- [ ] Default and `sm`/small sizes match legacy dimensions and thumb alignment.
- [ ] Checked, unchecked, disabled, and hover/focus visual states match legacy screens.
- [ ] `onChange(checked)` fires once with the same boolean contract.
- [ ] Formik `name` integration updates the same field value as before.

### Tooltip

- [ ] Default placement and configured placement values match legacy behavior.
- [ ] Content from `content`/`title` renders with compatible typography and width.
- [ ] Disabled tooltip returns children without changing their interaction behavior.
- [ ] Trigger wrapping preserves child layout and click/hover behavior.

### Card

- [ ] Header title and `extra` action area align with legacy spacing and typography.
- [ ] Body padding, border radius, and shadow/border treatment match the old Card.
- [ ] `children`, `className`, `bodyClassName`, `style`, and `bodyStyle` remain passthrough-compatible.
- [ ] Nested common components retain their legacy spacing inside the Card.
