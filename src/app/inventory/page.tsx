"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface InventoryItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastRestocked: string | null;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    quantity: 0,
    unit: '',
    minQuantity: 0
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/inventory');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('재고 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItem.itemName || !newItem.unit) {
      alert('품목명과 단위를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        await fetchItems();
        setNewItem({ itemName: '', quantity: 0, unit: '', minQuantity: 0 });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error('재고 추가 실패:', error);
      alert('재고 추가에 실패했습니다.');
    }
  };

  const lowStockItems = items.filter(item => item.quantity <= item.minQuantity);
  const totalItems = items.length;

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
            <h1 className="text-4xl font-bold text-gray-900">📦 재고 관리</h1>
          </div>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {isAddingNew ? '취소' : '+ 새 재고 추가'}
          </button>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">총 품목 수</h3>
            <p className="text-4xl font-bold text-blue-600">{totalItems}개</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">재고 부족 품목</h3>
            <p className="text-4xl font-bold text-red-600">{lowStockItems.length}개</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">정상 재고</h3>
            <p className="text-4xl font-bold text-green-600">{totalItems - lowStockItems.length}개</p>
          </div>
        </div>

        {/* 새 재고 추가 폼 */}
        {isAddingNew && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">새 재고 등록</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="품목명"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="수량"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="단위 (kg, 개 등)"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="최소 수량"
                value={newItem.minQuantity}
                onChange={(e) => setNewItem({ ...newItem, minQuantity: parseInt(e.target.value) || 0 })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addItem}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              재고 추가
            </button>
          </div>
        )}

        {/* 재고 부족 경고 */}
        {lowStockItems.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ 재고 부족 경고</h3>
            <p className="text-red-700">
              {lowStockItems.map(item => item.itemName).join(', ')} 품목의 재고가 부족합니다.
            </p>
          </div>
        )}

        {/* 재고 목록 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">품목명</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">현재 수량</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">단위</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">최소 수량</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">상태</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">마지막 입고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    등록된 재고가 없습니다.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{item.itemName}</td>
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.unit}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.minQuantity}</td>
                    <td className="px-6 py-4 text-center">
                      {item.quantity <= item.minQuantity ? (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          부족
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          정상
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-sm">
                      {item.lastRestocked
                        ? new Date(item.lastRestocked).toLocaleDateString('ko-KR')
                        : '없음'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
