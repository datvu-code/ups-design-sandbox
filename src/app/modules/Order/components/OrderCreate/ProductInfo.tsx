import { Button, Divider, Flex, Radio, Select, Typography } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'
import { ProductEmpty } from './ProductEmpty'
import { OrderSummary } from './OrderSummary'
import { OrderNotes } from './OrderNotes'
import { useOrderCreateStyles } from './OrderCreate.style'
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
  const { styles } = useOrderCreateStyles()
  return (
    <div className={styles.section}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <Typography.Text strong className={styles.sectionTitle} style={{ marginBottom: 0 }}>Thông tin sản phẩm</Typography.Text>
        <Flex gap={8}>
          <Button size="small" onClick={onAddGift}>Thêm quà</Button>
          <Button size="small" type="primary" onClick={onAddProduct}>Thêm sản phẩm</Button>
        </Flex>
      </Flex>

      <Flex gap={12} style={{ marginBottom: 12 }} align="center" wrap>
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

      <Divider style={{ margin: '12px 0' }} />

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
        <div className={styles.summaryPanel}>
          <OrderSummary />
        </div>
      </Flex>
    </div>
  )
}
