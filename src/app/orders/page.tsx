"use client";

import { useState } from "react";
import Link from "next/link";

type OrderStatus = 'pending' | 'approved' | 'preparing' | 'shipping' | 'completed' | 'cancelled';

interface StoreOrder {
  id: string;
  orderNumber: string;
  storeName: string;
  storeId: string;
  items: string;
  totalAmount: number;
  status: OrderStatus;
  requestDate: string;
  deliveryDate?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<StoreOrder[]>([
    {
      id: '1',
      orderNumber: 'PO-001',
      storeName: '강남점',
      storeId: '1',
      items: '돼지고기 50kg, 양파 30kg, 간장 10L',
      totalAmount: 850000,
      status: 'pending',
      requestDate: '2025-12-18',
    },
    {
      id: '2',
      orderNumber: 'PO-002',
      storeName: '홍대점',
      storeId: '2',
      items: '포장용기 500개, 참기름 5L',
      totalAmount: 320000,
      status: 'approved',
      requestDate: '2025-12-18',
      deliveryDate: '2025-12-19'
    },
    {
      id: '3',
      orderNumber: 'PO-003',
      storeName: '신촌점',
      storeId: '3',
      items: '돼지고기 30kg, 쇠고기 20kg',
      totalAmount: 1200000,
      status: 'shipping',
      requestDate: '2025-12-17',
      deliveryDate: '2025-12-18'
    }
  ]);

  const [newOrder, setNewOrder] = useState({
    storeName: '',
    items: '',
    totalAmount: 0,
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'shipping': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return '대기중';
      case 'approved': return '승인완료';
      case 'preparing': return '준비중';
      case 'shipping': return '배송중';
      case 'completed': return '완료';
      case 'cancelled': return '취소됨';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stores = [
    { id: '1', name: '강남점' },
    { id: '2', name: '홍대점' },
    { id: '3', name: '신촌점' },
    { id: '4', name: '잠실점' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
            ← 본사 홈
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">🏪 매장 발주 관리</h1>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">대기중인 발주</h3>
            <p className="text-4xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">처리중인 발주</h3>
            <p className="text-4xl font-bold text-blue-600">
              {orders.filter(o => ['approved', 'preparing', 'shipping'].includes(o.status)).length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 발주 금액</h3>
            <p className="text-4xl font-bold text-green-600">
              {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 발주 목록 */}
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {order.orderNumber}
                    </h3>
                    <span className="text-lg font-semibold text-blue-600">
                      {order.storeName}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{order.items}</p>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>발주일: {order.requestDate}</span>
                    {order.deliveryDate && (
                      <span>• 배송예정: {order.deliveryDate}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    {order.totalAmount.toLocaleString()}원
                  </p>
                  <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              {order.status !== 'completed' && order.status !== 'cancelled' && (
                <div className="flex gap-2 mt-4">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'approved')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      승인
                    </button>
                  )}
                  {order.status === 'approved' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      준비 시작
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipping')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      배송 시작
                    </button>
                  )}
                  {order.status === 'shipping' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      배송 완료
                    </button>
                  )}
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    발주 취소
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
