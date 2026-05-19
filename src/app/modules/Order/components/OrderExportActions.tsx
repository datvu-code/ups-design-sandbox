import { Button, Dropdown, Flex } from 'antd'
import { DownOutlined, HistoryOutlined } from '@ant-design/icons'
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
        <Button icon={<DownOutlined />} iconPosition="end">
          Xuất đơn hàng
        </Button>
      </Dropdown>
      <Dropdown menu={{ items: exportTransactionItems }} trigger={['click']}>
        <Button icon={<DownOutlined />} iconPosition="end">
          Xuất giao dịch thanh toán
        </Button>
      </Dropdown>
      <Button icon={<HistoryOutlined />} onClick={onViewHistory} />
    </Flex>
  )
}
