import { Button, Flex, Tag, Typography, message } from 'antd'
import { IconArrowRight, IconCopy } from '@tabler/icons-react'
import { useOrderListStyles } from './OrderList.style'
import type { Order, OrderBadgeStatus } from '../../types'

const badgeConfig: Record<OrderBadgeStatus, { color: string; label: string }> = {
  waiting_pack: { color: 'orange', label: 'Chờ đóng gói' },
  packing: { color: 'green', label: 'Đang đóng gói' },
  waiting_pickup: { color: 'cyan', label: 'Chờ lấy hàng' },
  shipping: { color: 'geekblue', label: 'Đang giao hàng' },
  completed: { color: 'success', label: 'Hoàn thành' },
  cancelled: { color: 'default', label: 'Huỷ' },
  error: { color: 'error', label: 'Xử lý lỗi' },
  pending_approval: { color: 'blue', label: 'Chờ duyệt' },
  no_warehouse: { color: 'gold', label: 'Chưa có kho xử lý' },
}

interface OrderRowHeaderProps {
  order: Pick<Order, 'id' | 'shopName' | 'placedAt' | 'badgeStatus'>
}

export function OrderRowHeader({ order }: OrderRowHeaderProps) {
  const { styles } = useOrderListStyles()
  const badge = badgeConfig[order.badgeStatus]

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id)
    message.success('Đã sao chép mã đơn hàng')
  }

  return (
    <div className={styles.rowHeader}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={8}>
          <IconArrowRight size={14} className={styles.rowHeaderIcon} />
          <Typography.Text strong>{order.shopName}</Typography.Text>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Text type="secondary">Mã đơn hàng: {order.id}</Typography.Text>
          <Button type="text" size="small" icon={<IconCopy size={14} />} onClick={handleCopyId} />
        </Flex>
        <Flex align="center" gap={12}>
          <Typography.Text type="secondary">Đặt lúc: {order.placedAt}</Typography.Text>
          <Tag color={badge.color}>{badge.label}</Tag>
        </Flex>
      </Flex>
    </div>
  )
}
