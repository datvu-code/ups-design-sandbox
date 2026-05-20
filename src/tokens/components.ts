import type { ThemeConfig } from 'antd'

/**
 * Component token overrides — mirrors Figma "4. Components / [Name] / Component" entries
 * that carry a direct value (not a VARIABLE_ALIAS to a global token).
 *
 * Only 172 of the ~1,958 component variables are genuine overrides.
 * All others are aliases to global tokens — handled automatically by antd.
 *
 * Source: HttbhVBjPw9HxgqcjBONuh (UpS Components)
 */
export const componentTokens: ThemeConfig['components'] = {
  // AutoComplete uses Select internals — tokens not exposed separately in antd ComponentTokenMap

  Avatar: {
    textFontSize: 18,
    groupOverlapping: -8,
    iconFontSize: 18,
  },

  Badge: {
    statusSize: 6,
    indicatorHeight: 20,
    dotSize: 6,
  },

  Button: {
    paddingInline: 15,
    paddingInlineSM: 7,
    paddingInlineLG: 15,
    onlyIconSizeSM: 14,
    onlyIconSizeLG: 18,
    dashedBgDisabled: 'rgba(0,0,0,0.04)',
    fontWeight: 400,
  },

  Calendar: {
    yearControlWidth: 80,
    monthControlWidth: 70,
    miniContentHeight: 256,
  },

  Card: {
    headerHeight: 56,
    headerHeightSM: 38,
    headerPadding: 24,
    headerPaddingSM: 12,
    bodyPadding: 24,
    bodyPaddingSM: 12,
  },

  Carousel: {
    dotWidth: 16,
    dotHeight: 3,
    dotActiveWidth: 24,
    dotOffset: 12,
    arrowSize: 16,
  },

  Cascader: {
    dropdownHeight: 180,
    controlWidth: 184,
    controlItemWidth: 111,
  },

  DatePicker: {
    cellWidth: 36,
    paddingInline: 11,
    paddingInlineSM: 7,
    paddingInlineLG: 11,
    paddingBlock: 4,
    paddingBlockSM: 0,
    paddingBlockLG: 7,
    multipleItemHeight: 24,
    multipleItemHeightSM: 16,
    multipleItemHeightLG: 32,
    presetsWidth: 120,
    presetsMaxWidth: 200,
    timeCellHeight: 28,
    timeColumnWidth: 56,
    timeColumnHeight: 224,
    withoutTimeCellHeight: 66,
    cellHoverWithRangeBg: '#cbe0fd',
    cellRangeBorderColor: '#82b4f9',
  },

  Descriptions: {
    colonMarginLeft: 2,
    titleMarginBottom: 20,
  },

  Dropdown: {
    paddingBlock: 5,
  },

  Form: {
    labelColonMarginInlineStart: 2,
  },

  Image: {
    previewOperationSize: 18,
    previewOperationColor: 'rgba(255,255,255,0.65)',
    previewOperationHoverColor: 'rgba(255,255,255,0.85)',
    previewOperationColorDisabled: 'rgba(255,255,255,0.25)',
  },

  Input: {
    paddingInline: 11,
    paddingInlineSM: 7,
    paddingInlineLG: 11,
    paddingBlock: 4,
    paddingBlockSM: 0,
    paddingBlockLG: 7,
  },

  InputNumber: {
    paddingInline: 11,
    paddingInlineSM: 7,
    paddingInlineLG: 11,
    paddingBlock: 4,
    paddingBlockSM: 0,
    paddingBlockLG: 7,
    handleWidth: 22,
    controlWidth: 90,
  },

  Layout: {
    headerBg: '#001529',
    siderBg: '#001529',
    triggerBg: '#002140',
    headerHeight: 64,
    triggerHeight: 48,
  },

  Menu: {
    darkItemBg: '#001529',
    darkSubMenuItemBg: '#000c17',
    darkPopupBg: '#001529',
    darkItemColor: 'rgba(255,255,255,0.65)',
    darkItemDisabledColor: 'rgba(255,255,255,0.25)',
    darkGroupTitleColor: 'rgba(255,255,255,0.65)',
    horizontalLineHeight: 46,
    activeBarBorderWidth: 1,
    collapsedWidth: 80,
    dropdownWidth: 160,
    itemMarginInline: 4,
    itemPaddingInline: 16,
    iconMarginInlineEnd: 10,
  },

  Mentions: {
    controlItemWidth: 100,
  },

  Modal: {
    titleFontSize: 16,
  },

  Notification: {
    width: 384,
  },

  Pagination: {
    miniOptionsSizeChangerTop: 0,
  },

  Popover: {
    titleMinWidth: 177,
  },

  Progress: {
    lineBorderRadius: 100,
  },

  Radio: {
    radioSize: 16,
    dotSize: 8,
    buttonPaddingInline: 15,
  },

  Rate: {
    starSize: 20,
    starSizeLG: 25,
    starSizeSM: 15,
  },

  Result: {
    iconFontSize: 72,
  },

  Select: {
    showArrowPaddingInlineEnd: 18,
  },

  Skeleton: {
    titleHeight: 16,
    paragraphLiHeight: 16,
    paragraphMarginTop: 28,
  },

  Slider: {
    railSize: 4,
    handleSize: 10,
    handleSizeHover: 12,
    handleLineWidth: 2,
    handleLineWidthHover: 2.5,
    controlSize: 10,
    dotSize: 8,
    handleColorDisabled: '#bfbfbf',
    handleActiveOutlineColor: 'rgba(22,119,255,0.2)',
  },

  Spin: {
    dotSize: 20,
    dotSizeSM: 14,
    contentHeight: 400,
  },

  Splitter: {
    splitBarSize: 2,
    splitBarDraggableSize: 20,
    splitTriggerSize: 6,
  },

  Steps: {
    dotSize: 8,
    dotCurrentSize: 10,
    descriptionMaxWidth: 140,
  },

  Switch: {
    trackHeight: 22,
    trackHeightSM: 16,
    trackMinWidth: 44,
    trackMinWidthSM: 28,
    trackPadding: 2,
    handleSize: 18,
    handleSizeSM: 12,
    innerMinMargin: 9,
    innerMinMarginSM: 6,
    innerMaxMargin: 24,
    innerMaxMarginSM: 18,
  },

  Table: {
    stickyScrollBarBorderRadius: 100,
  },

  Tabs: {
    horizontalItemGutter: 32,
    cardHeight: 40,
    cardHeightLG: 48,
    cardGutter: 2,
  },

  // TimePicker builds on DatePicker in antd — tokens not exposed separately in ComponentTokenMap

  Timeline: {
    itemPaddingBottom: 20,
  },

  Tooltip: {
    maxWidth: 250,
  },

  Tour: {
    closeBtnSize: 22,
    primaryNextBtnHoverBg: '#f0f0f0',
    primaryPrevBtnBg: 'rgba(255,255,255,0.15)',
  },

  Transfer: {
    listWidth: 180,
    listWidthLG: 250,
    listHeight: 200,
    itemPaddingBlock: 5,
  },

  Upload: {
    pictureCardSize: 102,
  },
}
