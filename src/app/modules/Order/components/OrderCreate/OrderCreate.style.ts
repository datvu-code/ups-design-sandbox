import { createStyles } from 'antd-style'

export const useOrderCreateStyles = createStyles(({ token }) => ({
  // Shared section card — CustomerInfo, ProductInfo, ShippingInfo, PaymentInfo
  section: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingLG,
    marginBottom: token.margin,
  },
  sectionTitle: {
    display: 'block',
    fontSize: token.fontSizeLG,
    marginBottom: token.margin,
  },

  // OrderSidebar
  sidebar: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingLG,
    position: 'sticky' as const,
    top: token.paddingXS,
  },
  formLabel: {
    fontSize: token.fontSizeSM,
    color: token.colorText,
    marginBottom: token.marginXS,
    display: 'block',
  },

  // PaymentInfo
  paymentBadge: {
    fontSize: token.fontSizeSM,
    padding: `1px ${token.paddingXS}px`,
    borderRadius: token.borderRadiusSM,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
    color: token.colorTextSecondary,
  },
  paymentMeta: {
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
  },

  // ProductInfo — summary border
  summaryPanel: {
    flex: '0 0 300px',
    borderLeft: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    paddingLeft: token.paddingLG,
  },

  // Tertiary icon color (collapsible chevrons, upload icons)
  infoIcon: {
    color: token.colorTextTertiary,
  },

  // OrderNotes
  uploadIcon: {
    color: token.colorTextTertiary,
  },
  uploadLabel: {
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
  },
  noteCharCount: {
    position: 'absolute' as const,
    right: token.paddingXS,
    bottom: token.paddingXS,
    fontSize: token.fontSizeSM,
    pointerEvents: 'none' as const,
    color: token.colorTextTertiary,
  },

  // OrderSummary
  summaryText: {
    fontSize: token.fontSizeSM,
  },
  summaryPrimaryText: {
    fontSize: token.fontSizeSM,
    color: token.colorPrimary,
  },
  summaryDivider: {
    borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    paddingTop: token.paddingXS,
    marginTop: token.marginXXS,
  },

  // ProductEmpty
  emptyIcon: {
    color: token.colorTextQuaternary,
  },
  emptyWrapper: {
    padding: `${token.paddingXL}px 0`,
  },
}))
