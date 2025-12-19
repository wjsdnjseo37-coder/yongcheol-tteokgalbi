"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled';

interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  tableNumber?: string;
  notes?: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    menuItem: {
      name: string;
    };
  }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('주문 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return '대기중';
      case 'preparing': return '준비중';
      case 'completed': return '완료';
      case 'cancelled': return '취소됨';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
            ← 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">📋 주문 관리</h1>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">대기중인 주문</h3>
            <p className="text-4xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">준비중인 주문</h3>
            <p className="text-4xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'preparing').length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 주문 금액</h3>
            <p className="text-4xl font-bold text-green-600">
              {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 주문 목록 */}
        <div className="grid gap-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">아직 주문이 없습니다.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {order.orderNumber}
                      </h3>
                      {order.tableNumber && (
                        <span className="text-lg font-semibold text-blue-600">
                          테이블 {order.tableNumber}
                        </span>
                      )}
                    </div>
                    <div className="mb-2">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-gray-600">
                          {item.menuItem.name} x {item.quantity}
                        </p>
                      ))}
                    </div>
                    {order.notes && (
                      <p className="text-sm text-gray-500">메모: {order.notes}</p>
                    )}
                    <div className="text-sm text-gray-500 mt-2">
                      주문시간: {new Date(order.createdAt).toLocaleString('ko-KR')}
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
