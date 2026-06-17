import { Flex, Typography } from 'antd'
import { IconPackage } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'

export function ProductEmpty() {
  const { styles } = useOrderCreateStyles()
  return (
    <Flex vertical align="center" justify="center" gap={8} className={styles.emptyWrapper}>
      <IconPackage size={48} className={styles.emptyIcon} strokeWidth={1} />
      <Typography.Text type="secondary">
        Vui lòng chọn <Typography.Text strong>Kênh bán, Gian hàng</Typography.Text> để thêm sản phẩm
      </Typography.Text>
    </Flex>
  )
}
