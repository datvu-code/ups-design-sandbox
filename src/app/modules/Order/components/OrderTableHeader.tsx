import { Checkbox, Flex, Typography, theme } from 'antd'
import { ORDER_TABLE_COLUMNS } from '../utils/tableColumns'

interface OrderTableHeaderProps {
  allSelected: boolean
  indeterminate: boolean
  onSelectAll: (checked: boolean) => void
}

export function OrderTableHeader({
  allSelected,
  indeterminate,
  onSelectAll,
}: OrderTableHeaderProps) {
  const { token } = theme.useToken()
  return (
    <Flex
      align="center"
      style={{
        padding: `${token.paddingXS}px ${token.paddingLG}px`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        marginBottom: token.marginXS,
      }}
    >
      {ORDER_TABLE_COLUMNS.map((col, idx) => {
        const isLast = idx === ORDER_TABLE_COLUMNS.length - 1
        const cellStyle = {
          flex: col.flex,
          minWidth: col.minWidth,
          paddingRight: isLast ? 0 : token.paddingXS,
        }

        if (idx === 0) {
          return (
            <Flex key={col.key} align="center" gap={token.marginXS} style={cellStyle}>
              <Checkbox
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={(e) => onSelectAll(e.target.checked)}
                style={{ flexShrink: 0 }}
              />
              <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                {col.label}
              </Typography.Text>
            </Flex>
          )
        }

        return (
          <Flex
            key={col.key}
            justify="flex-start"
            align="center"
            style={cellStyle}
          >
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              {col.label}
            </Typography.Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
