import { Button, Flex, Typography } from 'antd'
import { IconPlus } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'

export function PaymentInfo() {
  const { styles } = useOrderCreateStyles()
  return (
    <div className={styles.section}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Flex align="center" gap={8}>
          <Typography.Text strong className={styles.sectionTitle} style={{ marginBottom: 0 }}>
            Thông tin thanh toán
          </Typography.Text>
          <span className={styles.paymentBadge}>Chưa thanh toán</span>
        </Flex>
        <Button type="primary" icon={<IconPlus size={14} />}>
          Thêm thanh toán
        </Button>
      </Flex>

      <Flex gap={32} style={{ marginBottom: 16 }}>
        <div>
          <Typography.Text type="secondary" className={styles.paymentMeta}>Khách phải trả </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary" className={styles.paymentMeta}>Đã thanh toán: </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary" className={styles.paymentMeta}>Còn phải trả: </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
      </Flex>

      <Typography.Text type="secondary" className={styles.paymentMeta}>
        Chưa có giao dịch thanh toán nào
      </Typography.Text>
    </div>
  )
}
