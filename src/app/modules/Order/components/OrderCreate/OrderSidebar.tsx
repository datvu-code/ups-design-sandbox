import { Checkbox, DatePicker, Flex, Input, Radio, Select, Typography } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'
import type { OrderCodeMode, OrderCreateForm, StaffOption } from '../../types'

interface OrderSidebarProps {
  form: OrderCreateForm
  salesStaffOptions: StaffOption[]
  marketingStaffOptions: StaffOption[]
  onFormChange: (patch: Partial<OrderCreateForm>) => void
}

const rowStyle: React.CSSProperties = {
  marginBottom: 'var(--ant-margin)',
}

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--ant-font-size-sm)',
  color: 'var(--ant-color-text)',
  marginBottom: 8,
  display: 'block',
}

export function OrderSidebar({
  form,
  salesStaffOptions,
  marketingStaffOptions,
  onFormChange,
}: OrderSidebarProps) {
  return (
    <div style={{
      backgroundColor: 'var(--ant-color-bg-container)',
      borderRadius: 'var(--ant-border-radius-lg)',
      padding: 'var(--ant-padding-lg)',
      position: 'sticky',
      top: 16,
    }}>
      <Typography.Text strong style={{ display: 'block', fontSize: 'var(--ant-font-size-lg)', marginBottom: 'var(--ant-margin)' }}>
        Thông tin đơn hàng
      </Typography.Text>

      <div style={rowStyle}>
        <Checkbox
          checked={form.isKocKol}
          onChange={(e) => onFormChange({ isKocKol: e.target.checked })}
        >
          <Typography.Text style={{ fontSize: 'var(--ant-font-size-sm)' }}>
            Đơn sản phẩm gửi KOC, KOL
          </Typography.Text>
        </Checkbox>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Nhân viên bán hàng</span>
        <Select
          style={{ width: '100%' }}
          value={form.salesStaff}
          onChange={(v) => onFormChange({ salesStaff: v })}
          options={salesStaffOptions}
          allowClear
          suffixIcon={<IconChevronDown size={14} />}
        />
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Nhân viên marketing</span>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn nhân viên marketing"
          value={form.marketingStaff}
          onChange={(v) => onFormChange({ marketingStaff: v })}
          options={marketingStaffOptions}
          allowClear
          suffixIcon={<IconChevronDown size={14} />}
        />
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Ngày phát sinh đơn</span>
        <DatePicker
          style={{ width: '100%' }}
          showTime
          format="DD/MM/YYYY HH:mm"
          allowClear
        />
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Ngày dự kiến bàn giao ĐVVC</span>
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Chọn"
          format="DD/MM/YYYY"
          allowClear
        />
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>UTM</span>
        <Input
          value={form.utm}
          onChange={(e) => onFormChange({ utm: e.target.value })}
          placeholder="Nhập link"
        />
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Mã đơn hàng</span>
        <Radio.Group
          value={form.orderCodeMode}
          onChange={(e) => onFormChange({ orderCodeMode: e.target.value as OrderCodeMode })}
        >
          <Flex vertical gap={4}>
            <Radio value="manual">Nhập tay</Radio>
            <Radio value="auto">Hệ thống tự động tạo</Radio>
          </Flex>
        </Radio.Group>
      </div>
    </div>
  )
}
