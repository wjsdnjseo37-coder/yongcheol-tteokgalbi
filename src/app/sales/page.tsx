"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DailySales {
  id: string;
  date: string;
  totalOrders: number;
  totalRevenue: number;
}

export default function SalesPage() {
  const [sales, setSales] = useState<DailySales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('/api/sales');
      if (response.ok) {
        const data = await response.json();
        setSales(data);
      }
    } catch (error) {
      console.error('매출 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = sales.reduce((sum, d) => sum + d.totalRevenue, 0);
  const totalOrders = sales.reduce((sum, d) => sum + d.totalOrders, 0);
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

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
          <h1 className="text-4xl font-bold text-gray-900">💰 매출 통계</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 매출</h3>
            <p className="text-4xl font-bold text-orange-600">
              {totalRevenue.toLocaleString()}원
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 주문 수</h3>
            <p className="text-4xl font-bold text-blue-600">
              {totalOrders}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">평균 주문액</h3>
            <p className="text-4xl font-bold text-green-600">
              {Math.round(averageOrder).toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">일별 매출 내역</h2>
          <div className="space-y-4">
            {sales.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                매출 데이터가 없습니다.
              </div>
            ) : (
              sales.map((day, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">
                      {new Date(day.date).toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      {day.totalRevenue.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600 mb-2">
                    <span>주문 수: <strong>{day.totalOrders}건</strong></span>
                    <span>평균 주문액: <strong>
                      {day.totalOrders > 0 
                        ? Math.round(day.totalRevenue / day.totalOrders).toLocaleString() 
                        : 0}원
                    </strong></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${totalRevenue > 0 ? (day.totalRevenue / totalRevenue) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
