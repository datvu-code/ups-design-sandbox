import { Button, Col, DatePicker, Flex, Input, Row, Select } from 'antd'
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch } from '@tabler/icons-react'
import type { OrderDateFilterType, OrderFilterState, OrderSearchType } from '../types'

const chevron = <IconChevronDown size={14} />

const dateFilterOptions = [
  { value: 'created_at', label: 'Thời gian tạo đơn hàng' },
  { value: 'updated_at', label: 'Thời gian cập nhật' },
  { value: 'delivered_at', label: 'Thời gian giao hàng' },
]

const searchTypeOptions = [
  { value: 'order_id', label: 'Mã đơn hàng' },
  { value: 'product_name', label: 'Tên sản phẩm' },
  { value: 'recipient_name', label: 'Tên người nhận' },
  { value: 'tracking_number', label: 'Mã vận đơn' },
]

const platformOptions = [
  { value: 'shopee', label: 'Shopee' },
  { value: 'tiktok', label: 'TikTok Shop' },
  { value: 'lazada', label: 'Lazada' },
]

const shopOptions = [{ value: 'shop_1', label: 'Đinh Hương' }]

const warehouseOptions = [{ value: 'kho_thoi_trang', label: 'KHO THỜI TRANG' }]

interface OrderFilterBarProps {
  filter: OrderFilterState
  onFilterChange: (patch: Partial<OrderFilterState>) => void
  onAdvancedFilter: () => void
}

export function OrderFilterBar({ filter, onFilterChange, onAdvancedFilter }: OrderFilterBarProps) {
  return (
    <Flex vertical gap={8}>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">
          <Flex>
            <Select
              value={filter.dateFilterType}
              options={dateFilterOptions}
              onChange={(v) => onFilterChange({ dateFilterType: v as OrderDateFilterType })}
              suffixIcon={chevron}
              style={{ width: 220, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <DatePicker.RangePicker
              showTime
              placeholder={['hh:mm dd/mm/yyyy', 'hh:mm dd/mm/yyyy']}
              format="HH:mm DD/MM/YYYY"
              onChange={(_, s) =>
                onFilterChange({ dateRange: s[0] && s[1] ? [s[0], s[1]] : null })
              }
              style={{ flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
          </Flex>
        </Col>
        <Col flex="220px">
          <Select
            value={filter.platform ?? undefined}
            options={platformOptions}
            placeholder="Chọn sàn"
            allowClear
            suffixIcon={chevron}
            onChange={(v) => onFilterChange({ platform: v ?? null })}
            style={{ width: '100%' }}
          />
        </Col>
        <Col flex="220px">
          <Select
            value={filter.shop ?? undefined}
            options={shopOptions}
            placeholder="Chọn gian hàng"
            allowClear
            suffixIcon={chevron}
            onChange={(v) => onFilterChange({ shop: v ?? null })}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Row gutter={8} wrap={false}>
        <Col flex="auto">
          <Flex>
            <Select
              value={filter.searchType}
              options={searchTypeOptions}
              onChange={(v) => onFilterChange({ searchType: v as OrderSearchType })}
              suffixIcon={chevron}
              style={{ width: 160, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <Input
              value={filter.searchQuery}
              placeholder="Tìm đơn hàng"
              prefix={
                <IconSearch
                  size={16}
                  style={{ color: 'var(--ant-color-text-tertiary)' }}
                />
              }
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              style={{ flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
          </Flex>
        </Col>
        <Col flex="220px">
          <Select
            value={filter.warehouse ?? undefined}
            options={warehouseOptions}
            placeholder="Chọn kho"
            allowClear
            suffixIcon={chevron}
            onChange={(v) => onFilterChange({ warehouse: v ?? null })}
            style={{ width: '100%' }}
          />
        </Col>
        <Col flex="none">
          <Button icon={<IconAdjustmentsHorizontal size={16} />} onClick={onAdvancedFilter}>
            Lọc nâng cao
          </Button>
        </Col>
      </Row>
    </Flex>
  )
}
