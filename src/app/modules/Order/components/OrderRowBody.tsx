import { Checkbox, Flex, Typography } from 'antd'
import { OrderProductInfo } from './OrderProductInfo'
import { OrderProcessingInfo } from './OrderProcessingInfo'
import { OrderShippingInfo } from './OrderShippingInfo'
import { OrderRowAction } from './OrderRowAction'
import { ORDER_TABLE_COLUMNS } from '../utils/tableColumns'
import type { Order } from '../types'

function formatAmount(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ'
}

interface OrderRowBodyProps {
  order: Order
  selected: boolean
  onSelect: (id: string, checked: boolean) => void
  onAction: (key: string, orderId: string) => void
}

export function OrderRowBody({ order, selected, onSelect, onAction }: OrderRowBodyProps) {
  const lastIdx = ORDER_TABLE_COLUMNS.length - 1

  const cell = (idx: number) => ({
    flex: ORDER_TABLE_COLUMNS[idx].flex,
    minWidth: ORDER_TABLE_COLUMNS[idx].minWidth,
    paddingRight: idx < lastIdx ? 8 : 0,
  })

  return (
    <Flex
      align="flex-start"
      style={{
        padding: 'var(--ant-padding) var(--ant-padding-lg)',
        borderBottom: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)',
        backgroundColor: 'var(--ant-color-bg-container)',
      }}
    >
      <Flex align="flex-start" gap={8} style={cell(0)}>
        <Checkbox
          checked={selected}
          onChange={(e) => onSelect(order.id, e.target.checked)}
          style={{ flexShrink: 0, marginTop: 'var(--ant-padding-xxs)' }}
        />
        <Flex vertical gap={8} style={{ flex: 1, minWidth: 0 }}>
          {order.items.map((item, idx) => (
            <OrderProductInfo key={idx} item={item} />
          ))}
        </Flex>
      </Flex>

      <Flex vertical gap={4} style={cell(1)}>
        {order.items.map((item, idx) => (
          <Typography.Text key={idx} strong>
            {formatAmount(item.totalAmount)}
          </Typography.Text>
        ))}
      </Flex>

      <Flex style={cell(2)}>
        <Typography.Text>{order.warehouse}</Typography.Text>
      </Flex>

      <Flex style={cell(3)}>
        <OrderProcessingInfo processing={order.processing} />
      </Flex>

      <Flex style={cell(4)}>
        <OrderShippingInfo shipping={order.shipping} />
      </Flex>

      <Flex vertical gap={4} style={cell(5)}>
        <Typography.Text>{order.recipient.name}</Typography.Text>
        <Typography.Text type="secondary">{order.recipient.province}</Typography.Text>
      </Flex>

      <Flex justify="flex-start" style={cell(6)}>
        <OrderRowAction orderId={order.id} onAction={onAction} />
      </Flex>
    </Flex>
  )
}
