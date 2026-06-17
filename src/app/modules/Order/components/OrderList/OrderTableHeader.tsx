import { Checkbox, Flex, Typography } from 'antd'
import { useOrderListStyles } from './OrderList.style'
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
  const { styles } = useOrderListStyles()
  return (
    <div className={styles.tableHeader}>
      <Flex align="center">
        {ORDER_TABLE_COLUMNS.map((col, idx) => {
          const isLast = idx === ORDER_TABLE_COLUMNS.length - 1
          const cellStyle = { flex: col.flex, minWidth: col.minWidth, paddingRight: isLast ? 0 : 8 }

          if (idx === 0) {
            return (
              <Flex key={col.key} align="center" gap={8} style={cellStyle}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  style={{ flexShrink: 0 }}
                />
                <Typography.Text type="secondary" className={styles.columnLabel}>
                  {col.label}
                </Typography.Text>
              </Flex>
            )
          }

          return (
            <Flex key={col.key} justify="flex-start" align="center" style={cellStyle}>
              <Typography.Text type="secondary" className={styles.columnLabel}>
                {col.label}
              </Typography.Text>
            </Flex>
          )
        })}
      </Flex>
    </div>
  )
}
