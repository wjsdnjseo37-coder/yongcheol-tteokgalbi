"use client";

import { useState } from "react";
import Link from "next/link";

export default function SalesPage() {
  const [selectedStore, setSelectedStore] = useState("all");
  
  const stores = [
    { id: "all", name: "전체 매장" },
    { id: "1", name: "강남점" },
    { id: "2", name: "홍대점" },
    { id: "3", name: "신촌점" },
    { id: "4", name: "잠실점" }
  ];

  const salesData = [
    { storeId: "1", storeName: "강남점", date: "2025-12-17", revenue: 1250000, orders: 58, averageOrder: 21552 },
    { storeId: "1", storeName: "강남점", date: "2025-12-16", revenue: 1180000, orders: 54, averageOrder: 21852 },
    { storeId: "1", storeName: "강남점", date: "2025-12-15", revenue: 950000, orders: 45, averageOrder: 21111 },
    { storeId: "2", storeName: "홍대점", date: "2025-12-17", revenue: 980000, orders: 45, averageOrder: 21778 },
    { storeId: "2", storeName: "홍대점", date: "2025-12-16", revenue: 1050000, orders: 51, averageOrder: 20588 },
    { storeId: "2", storeName: "홍대점", date: "2025-12-15", revenue: 920000, orders: 42, averageOrder: 21905 },
    { storeId: "3", storeName: "신촌점", date: "2025-12-17", revenue: 1100000, orders: 52, averageOrder: 21154 },
    { storeId: "3", storeName: "신촌점", date: "2025-12-16", revenue: 980000, orders: 46, averageOrder: 21304 },
    { storeId: "3", storeName: "신촌점", date: "2025-12-15", revenue: 1050000, orders: 49, averageOrder: 21429 },
    { storeId: "4", storeName: "잠실점", date: "2025-12-17", revenue: 850000, orders: 38, averageOrder: 22368 },
    { storeId: "4", storeName: "잠실점", date: "2025-12-16", revenue: 920000, orders: 43, averageOrder: 21395 },
    { storeId: "4", storeName: "잠실점", date: "2025-12-15", revenue: 780000, orders: 36, averageOrder: 21667 }
  ];

  const filteredData = selectedStore === "all" 
    ? salesData 
    : salesData.filter((d) => d.storeId === selectedStore);

  const storeStats = stores.slice(1).map((store) => {
    const storeData = salesData.filter((d) => d.storeId === store.id);
    const totalRevenue = storeData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = storeData.reduce((sum, d) => sum + d.orders, 0);
    return {
      id: store.id,
      name: store.name,
      totalRevenue,
      totalOrders,
      avgRevenue: totalRevenue / storeData.length
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
            ← 본사 홈
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">💰 통합 매출 관리</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">전체 매출 (최근 3일)</h3>
            <p className="text-4xl font-bold text-orange-600">
              {totalRevenue.toLocaleString()}원
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">전체 주문 수</h3>
            <p className="text-4xl font-bold text-blue-600">
              {totalOrders}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">평균 주문액</h3>
            <p className="text-4xl font-bold text-green-600">
              {Math.round(totalRevenue / totalOrders).toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">📊 매장별 성과 비교 (최근 3일)</h2>
          <div className="space-y-6">
            {storeStats.map((store, index) => (
              <div key={store.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      index === 0 ? "text-yellow-500" : 
                      index === 1 ? "text-gray-400" : 
                      index === 2 ? "text-orange-600" : "text-gray-300"
                    }`}>#{index + 1}</span>
                    <span className="text-xl font-bold text-gray-900">{store.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {store.totalRevenue.toLocaleString()}원
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-600 mb-2">
                  <span>총 주문: <strong>{store.totalOrders}건</strong></span>
                  <span>평균 매출: <strong>{Math.round(store.avgRevenue).toLocaleString()}원/일</strong></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all"
                    style={{ width: `${(store.totalRevenue / 3800000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">일별 상세 매출</h2>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredData.map((day, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">{day.date}</span>
                    {selectedStore === "all" && (
                      <span className="ml-3 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {day.storeName}
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {day.revenue.toLocaleString()}원
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>주문 수: <strong>{day.orders}건</strong></span>
                  <span>평균 주문액: <strong>{day.averageOrder.toLocaleString()}원</strong></span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(day.revenue / 1300000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}