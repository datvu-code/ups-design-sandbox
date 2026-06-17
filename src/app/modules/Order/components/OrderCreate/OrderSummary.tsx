import { Flex, Typography } from 'antd'
import { IconChevronUp } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'

const { Text } = Typography

interface SummaryRowProps {
  label: string
  value: string
  collapsible?: boolean
  muted?: boolean
  indent?: boolean
}

function SummaryRow({ label, value, collapsible, muted, indent }: SummaryRowProps) {
  const { styles } = useOrderCreateStyles()
  return (
    <Flex justify="space-between" align="center" style={{ paddingLeft: indent ? 12 : 0 }}>
      <Flex align="center" gap={4}>
        {collapsible && (
          <IconChevronUp size={12} className={styles.infoIcon} />
        )}
        <Text type={muted ? 'secondary' : undefined} className={styles.summaryText}>
          {label}
        </Text>
      </Flex>
      <Text type={muted ? 'secondary' : undefined} className={styles.summaryText}>
        {value}
      </Text>
    </Flex>
  )
}

export function OrderSummary() {
  const { styles } = useOrderCreateStyles()
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
        <Text className={styles.summaryPrimaryText}>Mã giảm giá của shop:</Text>
        <Text type="secondary" className={styles.summaryText}>~0%  0 đ</Text>
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
        <Text className={styles.summaryPrimaryText}>Điểm quy đổi:</Text>
        <Text type="secondary" className={styles.summaryText}>0 (0đ)</Text>
      </Flex>
      <SummaryRow label="Điểm tích luỹ:" value="+0" indent muted />
      <div className={styles.summaryDivider}>
        <Flex justify="space-between">
          <Text strong>Tổng tiền phải trả:</Text>
          <Text strong>0đ</Text>
        </Flex>
      </div>
    </Flex>
  )
}
