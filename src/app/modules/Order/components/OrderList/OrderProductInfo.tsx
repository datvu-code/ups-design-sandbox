import { Avatar, Flex, Typography } from 'antd'
import { IconShoppingBag } from '@tabler/icons-react'
import { useOrderListStyles } from './OrderList.style'
import type { OrderItem } from '../../types'

interface OrderProductInfoProps {
  item: OrderItem
}

export function OrderProductInfo({ item }: OrderProductInfoProps) {
  const { styles } = useOrderListStyles()
  return (
    <Flex gap={8} align="flex-start">
      <Avatar
        shape="square"
        size={56}
        src={item.thumbnail || undefined}
        icon={!item.thumbnail ? <IconShoppingBag size={24} /> : undefined}
        style={{ flexShrink: 0 }}
      />
      <Flex vertical gap={2}>
        <Typography.Text className={styles.productName}>{item.name}</Typography.Text>
        <Typography.Text type="secondary">{item.variant}</Typography.Text>
        <Typography.Text type="secondary">x {item.quantity}</Typography.Text>
      </Flex>
    </Flex>
  )
}
