import { Button, Flex, Select, Typography } from 'antd'
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
  return (
    <Flex align="center" gap={8}>
      <Typography.Text type="secondary">Sắp xếp theo:</Typography.Text>
      <Select
        value={sortBy}
        options={sortOptions}
        onChange={onSortByChange}
        suffixIcon={chevron}
        style={{ width: 200 }}
      />
      <Button
        type={sortDirection === 'asc' ? 'primary' : 'default'}
        icon={<IconSortAscending size={16} />}
        onClick={() => onDirectionChange('asc')}
      />
      <Button
        type={sortDirection === 'desc' ? 'primary' : 'default'}
        icon={<IconSortDescending size={16} />}
        onClick={() => onDirectionChange('desc')}
      />
    </Flex>
  )
}
