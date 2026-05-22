import { Flex, Typography, Tooltip } from 'antd'
import { IconInfoCircle } from '@tabler/icons-react'
import type { OrderProcessing } from '../../types'
import styles from './OrderProcessingInfo.module.css'

interface OrderProcessingInfoProps {
  processing: OrderProcessing
}

export function OrderProcessingInfo({ processing }: OrderProcessingInfoProps) {
  return (
    <Flex vertical gap={4}>
      {processing.deadline && (
        <Typography.Text
          className={processing.isOverdue ? styles.deadlineOverdue : styles.deadline}
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
            <IconInfoCircle size={14} className={styles.infoIcon} />
          </Tooltip>
        </Flex>
      )}
      {processing.cbhBefore !== undefined && (
        <Flex align="center" gap={4}>
          <Typography.Text type="secondary">
            CBH trước {processing.cbhBefore ?? '--'}
          </Typography.Text>
          <Tooltip title="Thời hạn cập nhật CBH">
            <IconInfoCircle size={14} className={styles.infoIcon} />
          </Tooltip>
        </Flex>
      )}
      {processing.dsProcessingId && (
        <Typography.Link href="#">DS xử lý: {processing.dsProcessingId}</Typography.Link>
      )}
    </Flex>
  )
}
