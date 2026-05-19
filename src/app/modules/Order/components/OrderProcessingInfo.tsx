import { Flex, Typography, Tooltip, theme } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { OrderProcessing } from '../types'

interface OrderProcessingInfoProps {
  processing: OrderProcessing
}

export function OrderProcessingInfo({ processing }: OrderProcessingInfoProps) {
  const { token } = theme.useToken()
  return (
    <Flex vertical gap={4}>
      {processing.deadline && (
        <Typography.Text
          style={{ color: processing.isOverdue ? token.colorError : token.colorText }}
        >
          Còn lại: {processing.deadline}
        </Typography.Text>
      )}
      {processing.deliverBefore && (
        <Flex align="center" gap={4}>
          <Typography.Text type="secondary">
            Giao trước {processing.deliverBefore}
          </Typography.Text>
          <Tooltip title="Thời hạn giao hàng cho khách">
            <InfoCircleOutlined style={{ color: token.colorTextTertiary, fontSize: 12 }} />
          </Tooltip>
        </Flex>
      )}
      {processing.cbhBefore !== undefined && (
        <Flex align="center" gap={4}>
          <Typography.Text type="secondary">
            CBH trước {processing.cbhBefore ?? '--'}
          </Typography.Text>
          <Tooltip title="Thời hạn cập nhật CBH">
            <InfoCircleOutlined style={{ color: token.colorTextTertiary, fontSize: 12 }} />
          </Tooltip>
        </Flex>
      )}
      {processing.dsProcessingId && (
        <Typography.Link href="#">DS xử lý: {processing.dsProcessingId}</Typography.Link>
      )}
    </Flex>
  )
}
