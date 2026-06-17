import { createStyles } from 'antd-style'

export const useOrderListStyles = createStyles(({ token }) => ({
  // OrderRow
  rowCard: {
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    overflow: 'hidden',
    marginBottom: token.margin,
    transition: 'border-color 0.15s ease',
    cursor: 'default',
    '&:hover': {
      borderColor: token.colorBorder,
    },
  },

  // OrderRowHeader
  rowHeader: {
    padding: `${token.paddingXS}px ${token.paddingLG}px`,
    backgroundColor: token.colorBgContainer,
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
  },
  rowHeaderIcon: {
    color: token.colorTextTertiary,
  },

  // OrderRowBody
  rowBody: {
    padding: `${token.padding}px ${token.paddingLG}px`,
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    backgroundColor: token.colorBgContainer,
  },

  // OrderTable — loading skeleton card
  skeletonCard: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingLG,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
  },
  emptyWrapper: {
    padding: token.paddingLG,
  },
  scrollInner: {
    paddingBottom: token.padding,
  },

  // OrderListToolbar
  toolbar: {
    padding: `${token.paddingSM}px ${token.paddingLG}px`,
  },

  // OrderBulkActionBar
  bulkBar: {
    padding: `${token.paddingXS}px ${token.paddingLG}px`,
  },

  // OrderTableHeader
  tableHeader: {
    padding: `${token.paddingXS}px ${token.paddingLG}px`,
    marginBottom: token.marginXS,
  },
  columnLabel: {
    fontSize: token.fontSizeSM,
  },

  // OrderProductInfo
  productName: {
    fontWeight: token.fontWeightStrong,
  },

  // OrderSyncStatus
  refreshIcon: {
    color: token.colorTextTertiary,
    cursor: 'pointer',
  },

  // OrderProcessingInfo
  deadline: {
    color: token.colorText,
  },
  deadlineOverdue: {
    color: token.colorError,
  },
  infoIcon: {
    color: token.colorTextTertiary,
  },
}))
