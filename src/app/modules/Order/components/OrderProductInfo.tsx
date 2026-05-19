import { Avatar, Flex, Typography, theme } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import type { OrderItem } from '../types'

interface OrderProductInfoProps {
  item: OrderItem
}

export function OrderProductInfo({ item }: OrderProductInfoProps) {
  const { token } = theme.useToken()
  return (
    <Flex gap={token.marginXS} align="flex-start">
      <Avatar
        shape="square"
        size={56}
        src={item.thumbnail || undefined}
        icon={!item.thumbnail ? <ShoppingOutlined /> : undefined}
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
