import type { Order, OrderStatusTab, StaffOption, ChannelOption } from '../app/modules/Order/types'

export const mockChannels: ChannelOption[] = [
  { value: 'shopee', label: 'Shopee' },
  { value: 'lazada', label: 'Lazada' },
  { value: 'tiktok', label: 'TikTok Shop' },
  { value: 'website', label: 'Website' },
  { value: 'manual', label: 'Thủ công' },
]

export const mockShops: ChannelOption[] = [
  { value: 'shop1', label: 'Đinh Hương Official' },
  { value: 'shop2', label: 'Thời trang UpS' },
]

export const mockWarehouses: ChannelOption[] = [
  { value: 'wh1', label: 'Kho thời trang' },
  { value: 'wh2', label: 'Kho phụ kiện' },
]

export const mockSalesStaff: StaffOption[] = [
  { value: 'daothingoc9@gmail.com', label: 'daothingoc9@gmail.com' },
  { value: 'staff2@ups.vn', label: 'staff2@ups.vn' },
]

export const mockMarketingStaff: StaffOption[] = [
  { value: 'marketing1@ups.vn', label: 'Nguyễn Marketing' },
  { value: 'marketing2@ups.vn', label: 'Trần Marketing' },
]

export const mockTags: string[] = ['VIP', 'Khách quen', 'KOC', 'KOL']

export const orderStatusTabs: OrderStatusTab[] = [
  { label: 'Tất cả', status: 'all', count: null },
  { label: 'Chờ duyệt', status: 'pending_approval', count: 2 },
  { label: 'Đóng gói', status: 'packing', count: 22 },
  { label: 'Chờ lấy hàng', status: 'waiting_pickup', count: 0 },
  { label: 'Xử lý lỗi', status: 'error', count: 9 },
  { label: 'Đang giao hàng', status: 'shipping', count: 0 },
  { label: 'Hoàn thành', status: 'completed', count: 1 },
  { label: 'Huỷ', status: 'cancelled', count: 0 },
  { label: 'Chưa có kho xử lý', status: 'no_warehouse', count: 1, warning: true },
  { label: 'Thông tin vận đơn', status: 'waybill_info', count: 22 },
]

export const mockOrders: Order[] = [
  {
    id: '#10014_1790690722',
    shopName: 'Đinh Hương',
    placedAt: '09/04/2026 13:57',
    badgeStatus: 'waiting_pack',
    tabStatus: 'packing',
    items: [
      {
        thumbnail: '',
        name: 'Đầm trắng tiểu thư phong cách hàn quốc',
        variant: 'Default Title',
        quantity: 3,
        totalAmount: 2250000,
      },
    ],
    warehouse: 'KHO THỜI TRANG',
    processing: {
      deadline: 'Quá hạn',
      isOverdue: true,
      deliverBefore: '10/04/2026 23:59',
      cbhBefore: null,
    },
    shipping: {
      carrier: 'ViettelPost Hỏa tốc thỏa thuận',
      trackingNumber: '#10014_1790690722',
      pickupMethod: 'ĐVVC đến lấy',
    },
    recipient: { name: 'Hương', province: 'Sơn La' },
  },
  {
    id: '#10013_1790432503',
    shopName: 'Đinh Hương',
    placedAt: '08/04/2026 14:58',
    badgeStatus: 'packing',
    tabStatus: 'packing',
    items: [
      {
        thumbnail: '',
        name: 'Đầm trắng tiểu thư phong cách hàn quốc',
        variant: 'Default Title',
        quantity: 1,
        totalAmount: 750000,
      },
    ],
    warehouse: 'KHO THỜI TRANG',
    processing: {
      deadline: 'Quá hạn',
      isOverdue: true,
      dsProcessingId: 'PTS_1515_PL_42105',
      deliverBefore: '09/04/2026 23:59',
      cbhBefore: null,
    },
    shipping: {
      carrier: 'ViettelPost Hỏa tốc thỏa thuận',
      trackingNumber: '#10013_1790432503',
      waybillNumber: '138965199998',
      pickupMethod: 'ĐVVC đến lấy',
    },
    recipient: { name: 'Hương', province: 'Sơn La' },
  },
  {
    id: '#10012_1790432479',
    shopName: 'Đinh Hương',
    placedAt: '08/04/2026 14:58',
    badgeStatus: 'packing',
    tabStatus: 'packing',
    items: [
      {
        thumbnail: '',
        name: 'Đầm trắng tiểu thư phong cách hàn quốc',
        variant: 'Default Title',
        quantity: 2,
        totalAmount: 1500000,
      },
    ],
    warehouse: 'KHO THỜI TRANG',
    processing: {
      deadline: 'Quá hạn',
      isOverdue: true,
      deliverBefore: '09/04/2026 23:59',
      cbhBefore: null,
    },
    shipping: {
      carrier: 'ViettelPost Hỏa tốc thỏa thuận',
      trackingNumber: '#10012_1790432479',
      waybillNumber: '138965199997',
      pickupMethod: 'ĐVVC đến lấy',
    },
    recipient: { name: 'Hương', province: 'Sơn La' },
  },
]
