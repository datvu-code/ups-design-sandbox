import { Button, Flex, Select, Typography, theme } from 'antd'
import { IconChevronDown, IconSortAscending, IconSortDescending } from '@tabler/icons-react'

const chevron = <IconChevronDown size={14} />

type SortDirection = 'asc' | 'desc'

const sortOptions = [
  { value: 'placed_at', label: 'Thời gian đặt hàng' },
  { value: 'total_amount', label: 'Tổng tiền' },
  { value: 'status', label: 'Trạng thái' },
]

interface OrderSortControlProps {
  sortBy: string
  sortDirection: SortDirection
  onSortByChange: (value: string) => void
  onDirectionChange: (direction: SortDirection) => void
}

export function OrderSortControl({
  sortBy,
  sortDirection,
  onSortByChange,
  onDirectionChange,
}: OrderSortControlProps) {
  const { token } = theme.useToken()
  return (
    <Flex align="center" gap={token.marginXS}>
      <Typography.Text type="secondary">Sắp xếp theo:</Typography.Text>
      <Select
        value={sortBy}
        options={sortOptions}
        onChange={onSortByChange}
        suffixIcon={chevron}
        style={{ width: 200 }}
      />
      <Button
        type="default"
        icon={<IconSortAscending size={16} />}
        onClick={() => onDirectionChange('asc')}
        style={sortDirection === 'asc'
          ? { borderColor: token.colorPrimary, color: token.colorPrimary }
          : undefined}
      />
      <Button
        type="default"
        icon={<IconSortDescending size={16} />}
        onClick={() => onDirectionChange('desc')}
        style={sortDirection === 'desc'
          ? { borderColor: token.colorPrimary, color: token.colorPrimary }
          : undefined}
      />
    </Flex>
  )
}
