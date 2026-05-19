import { Button, Dropdown, Flex, Typography, theme } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'
import { OrderSortControl } from './OrderSortControl'
import type { MenuProps } from 'antd'

const bulkActionItems: MenuProps['items'] = [
  { key: 'print_waybill', label: 'In vận đơn' },
  { key: 'confirm_pack', label: 'Xác nhận đóng gói' },
  { key: 'cancel', label: 'Huỷ đơn hàng', danger: true },
]

interface OrderBulkActionBarProps {
  selectedCount: number
  sortBy: string
  sortDirection: 'asc' | 'desc'
  onSortByChange: (value: string) => void
  onDirectionChange: (direction: 'asc' | 'desc') => void
}

export function OrderBulkActionBar({
  selectedCount,
  sortBy,
  sortDirection,
  onSortByChange,
  onDirectionChange,
}: OrderBulkActionBarProps) {
  const { token } = theme.useToken()
  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      gap={token.marginSM}
      style={{ padding: `${token.paddingXS}px ${token.paddingLG}px` }}
    >
      <Flex align="center" gap={token.marginSM}>
        <Dropdown menu={{ items: bulkActionItems }} trigger={['click']} disabled={selectedCount === 0}>
          <Button disabled={selectedCount === 0}>
            Thao tác hàng loạt <IconChevronDown size={14} />
          </Button>
        </Dropdown>
        <Typography.Text type="secondary">
          Đã chọn: {selectedCount} kiện hàng
        </Typography.Text>
      </Flex>
      <OrderSortControl
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={onSortByChange}
        onDirectionChange={onDirectionChange}
      />
    </Flex>
  )
}
