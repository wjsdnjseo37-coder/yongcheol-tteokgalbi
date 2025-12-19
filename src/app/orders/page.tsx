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

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    tableNumber: '',
    notes: '',
    items: [] as OrderItem[]
  });
  const [selectedMenu, setSelectedMenu] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.filter((item: MenuItem) => item.available));
      }
    } catch (error) {
      console.error('메뉴 로드 실패:', error);
    }
  };

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

  const addItemToOrder = () => {
    if (!selectedMenu) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    const existingItem = newOrder.items.find(item => item.menuItemId === selectedMenu);
    if (existingItem) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(item =>
          item.menuItemId === selectedMenu
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, { menuItemId: selectedMenu, quantity }]
      });
    }

    setSelectedMenu('');
    setQuantity(1);
  };

  const removeItemFromOrder = (menuItemId: string) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter(item => item.menuItemId !== menuItemId)
    });
  };

  const calculateTotal = () => {
    return newOrder.items.reduce((sum, item) => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      return sum + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  const createOrder = async () => {
    if (newOrder.items.length === 0) {
      alert('주문할 메뉴를 추가해주세요.');
      return;
    }

    try {
      const orderData = {
        tableNumber: newOrder.tableNumber || undefined,
        notes: newOrder.notes || undefined,
        items: newOrder.items
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        await fetchOrders();
        setNewOrder({ tableNumber: '', notes: '', items: [] });
        setIsAddingOrder(false);
        alert('주문이 등록되었습니다!');
      } else {
        alert('주문 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 등록 실패:', error);
      alert('주문 등록에 실패했습니다.');
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              ← 홈으로
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">📋 주문 관리</h1>
          </div>
          <button
            onClick={() => setIsAddingOrder(!isAddingOrder)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {isAddingOrder ? '취소' : '+ 새 주문 등록'}
          </button>
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

        {/* 새 주문 등록 폼 */}
        {isAddingOrder && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">새 주문 등록</h2>
            
            {/* 테이블 번호 및 메모 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="테이블 번호 (선택)"
                value={newOrder.tableNumber}
                onChange={(e) => setNewOrder({ ...newOrder, tableNumber: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="메모 (선택)"
                value={newOrder.notes}
                onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* 메뉴 추가 */}
            <div className="border-t pt-4 mb-4">
              <h3 className="text-lg font-semibold mb-3">메뉴 선택</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                >
                  <option value="">메뉴를 선택하세요</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.price.toLocaleString()}원
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={addItemToOrder}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>

            {/* 선택된 메뉴 목록 */}
            {newOrder.items.length > 0 && (
              <div className="border-t pt-4 mb-4">
                <h3 className="text-lg font-semibold mb-3">주문 내역</h3>
                <div className="space-y-2">
                  {newOrder.items.map((item) => {
                    const menuItem = menuItems.find(m => m.id === item.menuItemId);
                    if (!menuItem) return null;
                    return (
                      <div key={item.menuItemId} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                          <span className="font-semibold">{menuItem.name}</span>
                          <span className="text-gray-600 ml-2">x {item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-orange-600">
                            {(menuItem.price * item.quantity).toLocaleString()}원
                          </span>
                          <button
                            onClick={() => removeItemFromOrder(item.menuItemId)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-xl font-bold">총 금액</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {calculateTotal().toLocaleString()}원
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={createOrder}
                disabled={newOrder.items.length === 0}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                주문 등록
              </button>
            </div>
          </div>
        )}

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
