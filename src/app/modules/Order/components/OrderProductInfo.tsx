import { Avatar, Flex, Typography } from 'antd'
import { IconShoppingBag } from '@tabler/icons-react'
import type { OrderItem } from '../types'

interface OrderProductInfoProps {
  item: OrderItem
}

export function OrderProductInfo({ item }: OrderProductInfoProps) {
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
        <Typography.Text style={{ fontWeight: 500 }}>{item.name}</Typography.Text>
        <Typography.Text type="secondary">{item.variant}</Typography.Text>
        <Typography.Text type="secondary">x {item.quantity}</Typography.Text>
      </Flex>
    </Flex>
  )
}
