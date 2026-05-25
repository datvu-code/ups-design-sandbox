import { Flex, Typography } from 'antd'
import { IconPackage } from '@tabler/icons-react'

export function ProductEmpty() {
  return (
    <Flex vertical align="center" justify="center" gap={8} style={{ padding: 'var(--ant-padding-xl) 0' }}>
      <IconPackage size={48} style={{ color: 'var(--ant-color-text-quaternary)' }} strokeWidth={1} />
      <Typography.Text type="secondary">
        Vui lòng chọn <Typography.Text strong>Kênh bán, Gian hàng</Typography.Text> để thêm sản phẩm
      </Typography.Text>
    </Flex>
  )
}
