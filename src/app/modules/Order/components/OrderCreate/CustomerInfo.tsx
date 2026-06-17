import { AutoComplete, Input, Typography } from 'antd'
import { IconSearch } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'

export function CustomerInfo() {
  const { styles } = useOrderCreateStyles()
  return (
    <div className={styles.section}>
      <Typography.Text strong className={styles.sectionTitle}>
        Thông tin khách hàng
      </Typography.Text>
      <AutoComplete style={{ width: '100%' }} options={[]}>
        <Input
          prefix={<IconSearch size={14} />}
          placeholder="Tìm thông tin khách hàng (tên, số điện thoại, mã khách hàng, email, mã tham chiếu)"
        />
      </AutoComplete>
    </div>
  )
}
