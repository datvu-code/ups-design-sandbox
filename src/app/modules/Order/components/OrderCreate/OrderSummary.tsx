import { Flex, Typography } from 'antd'
import { IconChevronUp } from '@tabler/icons-react'

const { Text } = Typography

interface SummaryRowProps {
  label: string
  value: string
  collapsible?: boolean
  muted?: boolean
  indent?: boolean
}

function SummaryRow({ label, value, collapsible, muted, indent }: SummaryRowProps) {
  return (
    <Flex justify="space-between" align="center" style={{ paddingLeft: indent ? 12 : 0 }}>
      <Flex align="center" gap={4}>
        {collapsible && (
          <IconChevronUp size={12} style={{ color: 'var(--ant-color-text-tertiary)' }} />
        )}
        <Text type={muted ? 'secondary' : undefined} style={{ fontSize: 'var(--ant-font-size-sm)' }}>
          {label}
        </Text>
      </Flex>
      <Text type={muted ? 'secondary' : undefined} style={{ fontSize: 'var(--ant-font-size-sm)' }}>
        {value}
      </Text>
    </Flex>
  )
}

export function OrderSummary() {
  return (
    <Flex vertical gap={6}>
      <SummaryRow label="Số lượng hàng hoá:" value="0" />
      <SummaryRow label="Tổng tiền hàng hoá:" value="0đ" />
      <SummaryRow label="Tổng giảm giá:" value="0đ" collapsible />
      <SummaryRow label="Giảm giá sản phẩm:" value="0đ" indent muted />
      <SummaryRow label="Giảm giá sản phẩm bởi shop:" value="0đ" indent muted />
      <SummaryRow label="Giảm giá bởi sàn:" value="–" indent muted />
      <SummaryRow label="Mã giảm giá:" value="0đ" collapsible />
      <Flex justify="space-between" align="center">
        <Text style={{ color: 'var(--ant-color-primary)', fontSize: 'var(--ant-font-size-sm)' }}>
          Mã giảm giá của shop:
        </Text>
        <Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>~0%  0 đ</Text>
      </Flex>
      <SummaryRow label="Mã giảm giá của sàn:" value="–" indent muted />
      <SummaryRow label="Phí vận chuyển phải trả:" value="0đ" collapsible />
      <SummaryRow label="Phí vận chuyển NBH hỗ trợ:" value="0 đ" indent muted />
      <SummaryRow label="Phí vận chuyển báo khách:" value="0 đ" indent muted />
      <SummaryRow label="Phí vận chuyển ĐVVC:" value="0đ" indent muted />
      <SummaryRow label="Chênh lệch phí vận chuyển:" value="0đ" indent muted />
      <SummaryRow label="Xu đã sử dụng:" value="0đ" />
      <SummaryRow label="Điểm khách hàng thân thiết:" value="" collapsible />
      <Flex justify="space-between" align="center" style={{ paddingLeft: 12 }}>
        <Text style={{ color: 'var(--ant-color-primary)', fontSize: 'var(--ant-font-size-sm)' }}>
          Điểm quy đổi:
        </Text>
        <Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>0 (0đ)</Text>
      </Flex>
      <SummaryRow label="Điểm tích luỹ:" value="+0" indent muted />
      <div style={{ borderTop: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)', paddingTop: 8, marginTop: 4 }}>
        <Flex justify="space-between">
          <Text strong>Tổng tiền phải trả:</Text>
          <Text strong>0đ</Text>
        </Flex>
      </div>
    </Flex>
  )
}
