import { Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const rowActionItems: MenuProps['items'] = [
  { key: 'print_waybill', label: 'In vận đơn' },
  { key: 'view_detail', label: 'Xem chi tiết' },
  { key: 'confirm_pack', label: 'Xác nhận đóng gói' },
  { key: 'cancel', label: 'Huỷ đơn hàng', danger: true },
]

interface OrderRowActionProps {
  orderId: string
  onAction: (key: string, orderId: string) => void
}

export function OrderRowAction({ orderId, onAction }: OrderRowActionProps) {
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onAction(key, orderId)
  }
  return (
    <Dropdown menu={{ items: rowActionItems, onClick: handleMenuClick }} trigger={['click']}>
      <Button icon={<DownOutlined />} iconPosition="end">
        Chọn
      </Button>
    </Dropdown>
  )
}
