import { Button, Divider, Flex, Radio, Select, Typography } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'
import { ProductEmpty } from './ProductEmpty'
import { OrderSummary } from './OrderSummary'
import { OrderNotes } from './OrderNotes'
import type { ChannelOption, OrderCreateForm, WarehouseMode } from '../../types'

interface ProductInfoProps {
  form: OrderCreateForm
  channels: ChannelOption[]
  shops: ChannelOption[]
  warehouses: ChannelOption[]
  availableTags: string[]
  onFormChange: (patch: Partial<OrderCreateForm>) => void
  onAddGift: () => void
  onAddProduct: () => void
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ant-color-bg-container)',
  borderRadius: 'var(--ant-border-radius-lg)',
  padding: 'var(--ant-padding-lg)',
  marginBottom: 'var(--ant-margin)',
}

export function ProductInfo({
  form,
  channels,
  shops,
  warehouses,
  availableTags,
  onFormChange,
  onAddGift,
  onAddProduct,
}: ProductInfoProps) {
  return (
    <div style={sectionStyle}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 'var(--ant-margin-sm)' }}>
        <Typography.Text strong style={{ fontSize: 'var(--ant-font-size-lg)' }}>Thông tin sản phẩm</Typography.Text>
        <Flex gap={8}>
          <Button size="small" onClick={onAddGift}>Thêm quà</Button>
          <Button size="small" type="primary" onClick={onAddProduct}>Thêm sản phẩm</Button>
        </Flex>
      </Flex>

      <Flex gap={12} style={{ marginBottom: 'var(--ant-margin-sm)' }} align="center" wrap>
        <Select
          style={{ flex: 1, minWidth: 140 }}
          placeholder="Chọn kênh bán"
          value={form.channel}
          onChange={(v) => onFormChange({ channel: v })}
          options={channels}
          suffixIcon={<IconChevronDown size={14} />}
        />
        <Select
          style={{ flex: 1, minWidth: 140 }}
          placeholder="Chọn gian hàng"
          value={form.shop}
          onChange={(v) => onFormChange({ shop: v })}
          options={shops}
          suffixIcon={<IconChevronDown size={14} />}
        />
        <Select
          style={{ flex: 1, minWidth: 140 }}
          placeholder="Chọn kho xử lý"
          value={form.warehouse}
          onChange={(v) => onFormChange({ warehouse: v })}
          options={warehouses}
          suffixIcon={<IconChevronDown size={14} />}
        />
        <Radio.Group
          value={form.warehouseMode}
          onChange={(e) => onFormChange({ warehouseMode: e.target.value as WarehouseMode })}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Radio value="auto">Tự động điều phối</Radio>
          <Radio value="manual">Chỉ định</Radio>
        </Radio.Group>
      </Flex>

      <ProductEmpty />

      <Divider style={{ margin: 'var(--ant-margin-sm) 0' }} />

      <Flex gap={24}>
        <div style={{ flex: 1 }}>
          <OrderNotes
            tags={form.tags}
            availableTags={availableTags}
            noteType={form.noteType}
            note={form.note}
            onNoteTypeChange={(noteType) => onFormChange({ noteType })}
            onNoteChange={(note) => onFormChange({ note })}
            onTagsChange={(tags) => onFormChange({ tags })}
          />
        </div>
        <div style={{
          flex: '0 0 300px',
          borderLeft: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)',
          paddingLeft: 'var(--ant-padding-lg)',
        }}>
          <OrderSummary />
        </div>
      </Flex>
    </div>
  )
}
