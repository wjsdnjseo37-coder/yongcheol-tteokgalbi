"use client";

import { useState } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  address?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: '김철수',
      phone: '010-1234-5678',
      totalOrders: 15,
      totalSpent: 450000,
      lastVisit: '2025-12-17',
      address: '서울시 강남구'
    },
    {
      id: '2',
      name: '이영희',
      phone: '010-2345-6789',
      totalOrders: 8,
      totalSpent: 240000,
      lastVisit: '2025-12-16',
      address: '서울시 서초구'
    },
    {
      id: '3',
      name: '박민수',
      phone: '010-3456-7890',
      totalOrders: 12,
      totalSpent: 360000,
      lastVisit: '2025-12-15',
      address: '서울시 송파구'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }

    const customer: Customer = {
      id: String(customers.length + 1),
      ...newCustomer,
      totalOrders: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', phone: '', address: '' });
    setIsAddingNew(false);
  };

  const deleteCustomer = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.includes(searchTerm) || customer.phone.includes(searchTerm)
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageSpent = totalRevenue / totalCustomers;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              ← 홈으로
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">👥 고객 관리</h1>
          </div>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {isAddingNew ? '취소' : '+ 새 고객 추가'}
          </button>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 고객 수</h3>
            <p className="text-4xl font-bold text-orange-600">{totalCustomers}명</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 매출액</h3>
            <p className="text-4xl font-bold text-blue-600">
              {totalRevenue.toLocaleString()}원
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">고객당 평균 구매액</h3>
            <p className="text-4xl font-bold text-green-600">
              {Math.round(averageSpent).toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 새 고객 추가 폼 */}
        {isAddingNew && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">새 고객 등록</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="고객명"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="전화번호 (010-1234-5678)"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="주소 (선택)"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addCustomer}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              고객 추가
            </button>
          </div>
        )}

        {/* 검색 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 고객명 또는 전화번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* 고객 목록 */}
        <div className="grid gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                    <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                      VIP
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                    <p>📞 {customer.phone}</p>
                    {customer.address && <p>📍 {customer.address}</p>}
                    <p>주문 횟수: <strong className="text-gray-900">{customer.totalOrders}회</strong></p>
                    <p>총 구매액: <strong className="text-orange-600">{customer.totalSpent.toLocaleString()}원</strong></p>
                    <p className="col-span-2 text-sm">마지막 방문: {customer.lastVisit}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('고객 상세 정보 기능 개발 예정')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    상세
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
