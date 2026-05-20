import { Flex, Typography } from 'antd'
import type { OrderShipping } from '../types'

interface OrderShippingInfoProps {
  shipping: OrderShipping
}

export function OrderShippingInfo({ shipping }: OrderShippingInfoProps) {
  return (
    <Flex vertical gap={4}>
      <Typography.Text>{shipping.carrier}</Typography.Text>
      <Typography.Text type="secondary">
        Mã kiện hàng: {shipping.trackingNumber}
      </Typography.Text>
      <Typography.Text type="secondary">
        Mã vận đơn: {shipping.waybillNumber ?? '–'}
      </Typography.Text>
      <Typography.Text type="secondary">[{shipping.pickupMethod}]</Typography.Text>
    </Flex>
  )
}
