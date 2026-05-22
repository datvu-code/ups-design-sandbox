import { Checkbox, Flex, Typography } from 'antd'
import { ORDER_TABLE_COLUMNS } from '../../utils/tableColumns'

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
  return (
    <Flex
      align="center"
      style={{
        padding: 'var(--ant-padding-xs) var(--ant-padding-lg)',
        marginBottom: 'var(--ant-margin-xs)',
      }}
    >
      {ORDER_TABLE_COLUMNS.map((col, idx) => {
        const isLast = idx === ORDER_TABLE_COLUMNS.length - 1
        const cellStyle = {
          flex: col.flex,
          minWidth: col.minWidth,
          paddingRight: isLast ? 0 : 8,
        }

        if (idx === 0) {
          return (
            <Flex key={col.key} align="center" gap={8} style={cellStyle}>
              <Checkbox
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={(e) => onSelectAll(e.target.checked)}
                style={{ flexShrink: 0 }}
              />
              <Typography.Text
                type="secondary"
                style={{ fontSize: 'var(--ant-font-size-sm)' }}
              >
                {col.label}
              </Typography.Text>
            </Flex>
          )
        }

        return (
          <Flex key={col.key} justify="flex-start" align="center" style={cellStyle}>
            <Typography.Text
              type="secondary"
              style={{ fontSize: 'var(--ant-font-size-sm)' }}
            >
              {col.label}
            </Typography.Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
