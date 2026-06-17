import { Button, Flex, Typography } from 'antd'
import { IconPlus } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'

export function ShippingInfo() {
  const { styles } = useOrderCreateStyles()
  return (
    <div className={styles.section}>
      <Flex justify="space-between" align="center">
        <Typography.Text strong className={styles.sectionTitle} style={{ marginBottom: 0 }}>
          Thông tin vận chuyển
        </Typography.Text>
        <Button type="primary" icon={<IconPlus size={14} />}>
          Thêm vận chuyển
        </Button>
      </Flex>
    </div>
  )
}
