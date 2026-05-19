import { Button, Dropdown, Flex } from 'antd'
import { IconChevronDown, IconHistory } from '@tabler/icons-react'
import type { MenuProps } from 'antd'

const exportOrderItems: MenuProps['items'] = [
  { key: 'export_all', label: 'Xuất tất cả đơn hàng' },
  { key: 'export_selected', label: 'Xuất đơn hàng đã chọn' },
]

const exportTransactionItems: MenuProps['items'] = [
  { key: 'export_all_tx', label: 'Xuất tất cả giao dịch' },
  { key: 'export_selected_tx', label: 'Xuất giao dịch đã chọn' },
]

interface OrderExportActionsProps {
  onViewHistory: () => void
}

export function OrderExportActions({ onViewHistory }: OrderExportActionsProps) {
  return (
    <Flex align="center" gap={8}>
      <Dropdown menu={{ items: exportOrderItems }} trigger={['click']}>
        <Button>
          Xuất đơn hàng <IconChevronDown size={14} />
        </Button>
      </Dropdown>
      <Dropdown menu={{ items: exportTransactionItems }} trigger={['click']}>
        <Button>
          Xuất giao dịch thanh toán <IconChevronDown size={14} />
        </Button>
      </Dropdown>
      <Button icon={<IconHistory size={16} />} onClick={onViewHistory} />
    </Flex>
  )
}
