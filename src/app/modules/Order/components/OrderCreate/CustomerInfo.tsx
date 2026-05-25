import { AutoComplete, Input, Typography } from 'antd'
import { IconSearch } from '@tabler/icons-react'

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ant-color-bg-container)',
  borderRadius: 'var(--ant-border-radius-lg)',
  padding: 'var(--ant-padding-lg)',
  marginBottom: 'var(--ant-margin)',
}

export function CustomerInfo() {
  return (
    <div style={sectionStyle}>
      <Typography.Text
        strong
        style={{ display: 'block', fontSize: 'var(--ant-font-size-lg)', marginBottom: 'var(--ant-margin)' }}
      >
        Thông tin khách hàng
      </Typography.Text>
      <AutoComplete style={{ width: '100%' }} options={[]}>
        <Input
          prefix={<IconSearch size={14} style={{ color: 'var(--ant-color-text-tertiary)' }} />}
          placeholder="Tìm thông tin khách hàng (tên, số điện thoại, mã khách hàng, email, mã tham chiếu)"
        />
      </AutoComplete>
    </div>
  )
}
