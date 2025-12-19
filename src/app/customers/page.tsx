"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  email?: string;
  address?: string;
  createdAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('고객 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
      });

      if (response.ok) {
        await fetchCustomers();
        setNewCustomer({ name: '', phone: '', email: '', address: '' });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error('고객 추가 실패:', error);
      alert('고객 추가에 실패했습니다.');
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.includes(searchTerm) || customer.phone.includes(searchTerm)
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageSpent = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                type="email"
                placeholder="이메일 (선택)"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
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
                    {customer.totalOrders > 10 && (
                      <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                        VIP
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                    <p>📞 {customer.phone}</p>
                    {customer.email && <p>📧 {customer.email}</p>}
                    {customer.address && <p>📍 {customer.address}</p>}
                    <p>주문 횟수: <strong className="text-gray-900">{customer.totalOrders}회</strong></p>
                    <p>총 구매액: <strong className="text-orange-600">{customer.totalSpent.toLocaleString()}원</strong></p>
                    <p className="col-span-2 text-sm">가입일: {new Date(customer.createdAt).toLocaleDateString('ko-KR')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 고객이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
}
