import { Checkbox, DatePicker, Flex, Input, Radio, Select, Typography } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'
import type { OrderCodeMode, OrderCreateForm, StaffOption } from '../../types'

interface OrderSidebarProps {
  form: OrderCreateForm
  salesStaffOptions: StaffOption[]
  marketingStaffOptions: StaffOption[]
  onFormChange: (patch: Partial<OrderCreateForm>) => void
}

export function OrderSidebar({
  form,
  salesStaffOptions,
  marketingStaffOptions,
  onFormChange,
}: OrderSidebarProps) {
  const { styles } = useOrderCreateStyles()
  return (
    <div className={styles.sidebar}>
      <Typography.Text strong className={styles.sectionTitle}>
        Thông tin đơn hàng
      </Typography.Text>

      <div style={{ marginBottom: 16 }}>
        <Checkbox
          checked={form.isKocKol}
          onChange={(e) => onFormChange({ isKocKol: e.target.checked })}
        >
          <Typography.Text>Đơn sản phẩm gửi KOC, KOL</Typography.Text>
        </Checkbox>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>Nhân viên bán hàng</span>
        <Select
          style={{ width: '100%' }}
          value={form.salesStaff}
          onChange={(v) => onFormChange({ salesStaff: v })}
          options={salesStaffOptions}
          allowClear
          suffixIcon={<IconChevronDown size={14} />}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>Nhân viên marketing</span>
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

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>Ngày phát sinh đơn</span>
        <DatePicker
          style={{ width: '100%' }}
          showTime
          format="DD/MM/YYYY HH:mm"
          allowClear
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>Ngày dự kiến bàn giao ĐVVC</span>
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Chọn"
          format="DD/MM/YYYY"
          allowClear
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>UTM</span>
        <Input
          value={form.utm}
          onChange={(e) => onFormChange({ utm: e.target.value })}
          placeholder="Nhập link"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className={styles.formLabel}>Mã đơn hàng</span>
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
