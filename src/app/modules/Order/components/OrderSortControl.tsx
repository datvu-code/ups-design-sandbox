import { Button, Flex, Select, Typography, theme } from 'antd'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'

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
        style={{ width: 200 }}
      />
      <Button
        type={sortDirection === 'asc' ? 'primary' : 'default'}
        icon={<SortAscendingOutlined />}
        onClick={() => onDirectionChange('asc')}
      />
      <Button
        type={sortDirection === 'desc' ? 'primary' : 'default'}
        icon={<SortDescendingOutlined />}
        onClick={() => onDirectionChange('desc')}
      />
    </Flex>
  )
}
