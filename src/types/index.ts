// 주문 타입 정의
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'dine-in' | 'takeout' | 'delivery';
  tableNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuId: string;
  menuName: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

// 메뉴 타입 정의
export interface MenuItem {
  id: string;
  name: string;
  category: 'tteokgalbi' | 'side' | 'drink' | 'set';
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 재고 타입 정의
export interface InventoryItem {
  id: string;
  name: string;
  category: 'meat' | 'vegetable' | 'seasoning' | 'packaging' | 'other';
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastRestocked: Date;
  supplier?: string;
  cost: number;
}

// 고객 타입 정의
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: Date;
  createdAt: Date;
}

// 매출 통계 타입 정의
export interface SalesStats {
  date: Date;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingItems: {
    menuId: string;
    menuName: string;
    quantitySold: number;
    revenue: number;
  }[];
}
