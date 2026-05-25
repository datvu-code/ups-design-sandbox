import { useState } from 'react'
import { Button, Flex } from 'antd'
import { CustomerInfo } from '../modules/Order/components/OrderCreate/CustomerInfo'
import { ProductInfo } from '../modules/Order/components/OrderCreate/ProductInfo'
import { PaymentInfo } from '../modules/Order/components/OrderCreate/PaymentInfo'
import { ShippingInfo } from '../modules/Order/components/OrderCreate/ShippingInfo'
import { OrderSidebar } from '../modules/Order/components/OrderCreate/OrderSidebar'
import {
  mockChannels,
  mockShops,
  mockWarehouses,
  mockSalesStaff,
  mockMarketingStaff,
  mockTags,
} from '../../mock-data/order'
import type { OrderCreateForm } from '../modules/Order/types'

const DEFAULT_FORM: OrderCreateForm = {
  customerId: null,
  channel: null,
  shop: null,
  warehouse: null,
  warehouseMode: 'auto',
  noteType: 'internal',
  note: '',
  tags: [],
  salesStaff: 'daothingoc9@gmail.com',
  marketingStaff: null,
  orderDate: '',
  expectedDeliveryDate: null,
  utm: '',
  orderCodeMode: 'auto',
  isKocKol: false,
}

const actionBarStyle: React.CSSProperties = {
  position: 'sticky',
  bottom: 0,
  backgroundColor: 'var(--ant-color-bg-container)',
  borderTop: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)',
  padding: 'var(--ant-padding-sm) var(--ant-padding-lg)',
  zIndex: 10,
}

export function OrderCreatePage() {
  const [form, setForm] = useState<OrderCreateForm>(DEFAULT_FORM)

  const handleFormChange = (patch: Partial<OrderCreateForm>) =>
    setForm((prev) => ({ ...prev, ...patch }))

  return (
    <div>
      <Flex gap={24} align="flex-start">
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 64 }}>
          <CustomerInfo />
          <ProductInfo
            form={form}
            channels={mockChannels}
            shops={mockShops}
            warehouses={mockWarehouses}
            availableTags={mockTags}
            onFormChange={handleFormChange}
            onAddGift={() => {}}
            onAddProduct={() => {}}
          />
          <PaymentInfo />
          <ShippingInfo />
        </div>
        <div style={{ flex: '0 0 280px', paddingBottom: 64 }}>
          <OrderSidebar
            form={form}
            salesStaffOptions={mockSalesStaff}
            marketingStaffOptions={mockMarketingStaff}
            onFormChange={handleFormChange}
          />
        </div>
      </Flex>

      <div style={actionBarStyle}>
        <Flex justify="flex-end" gap={8}>
          <Button type="text">Huỷ bỏ</Button>
          <Button>Lưu nháp</Button>
          <Button type="primary">Lưu &amp; chốt đơn</Button>
        </Flex>
      </div>
    </div>
  )
}
