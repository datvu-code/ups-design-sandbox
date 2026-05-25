import { Button, Flex, Typography } from 'antd'
import { IconPlus } from '@tabler/icons-react'

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ant-color-bg-container)',
  borderRadius: 'var(--ant-border-radius-lg)',
  padding: 'var(--ant-padding-lg)',
  marginBottom: 'var(--ant-margin)',
}

export function PaymentInfo() {
  return (
    <div style={sectionStyle}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 'var(--ant-margin)' }}>
        <Flex align="center" gap={8}>
          <Typography.Text strong style={{ fontSize: 'var(--ant-font-size-lg)' }}>Thông tin thanh toán</Typography.Text>
          <span style={{
            fontSize: 'var(--ant-font-size-sm)',
            padding: '1px 8px',
            borderRadius: 'var(--ant-border-radius-sm)',
            border: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border)',
            color: 'var(--ant-color-text-secondary)',
          }}>
            Chưa thanh toán
          </span>
        </Flex>
        <Button type="primary" icon={<IconPlus size={14} />}>
          Thêm thanh toán
        </Button>
      </Flex>

      <Flex gap={32} style={{ marginBottom: 'var(--ant-margin)' }}>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>Khách phải trả </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>Đã thanh toán: </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>Còn phải trả: </Typography.Text>
          <Typography.Text strong>0đ</Typography.Text>
        </div>
      </Flex>

      <Typography.Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>
        Chưa có giao dịch thanh toán nào
      </Typography.Text>
    </div>
  )
}
