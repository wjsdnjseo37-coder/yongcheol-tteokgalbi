"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: '떡갈비 정식', category: '정식', price: 15000, description: '떡갈비 + 밥 + 된장찌개 + 반찬', isAvailable: true },
    { id: '2', name: '떡갈비 단품', category: '단품', price: 12000, description: '떡갈비만 제공', isAvailable: true },
    { id: '3', name: '떡갈비 세트', category: '세트', price: 18000, description: '떡갈비 + 김치찌개 + 계란찜', isAvailable: true },
    { id: '4', name: '된장찌개', category: '찌개', price: 7000, description: '구수한 된장찌개', isAvailable: true },
    { id: '5', name: '김치찌개', category: '찌개', price: 7000, description: '칼칼한 김치찌개', isAvailable: true },
    { id: '6', name: '콜라', category: '음료', price: 2000, description: '시원한 콜라', isAvailable: true },
    { id: '7', name: '사이다', category: '음료', price: 2000, description: '시원한 사이다', isAvailable: true }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '단품',
    price: 0,
    description: ''
  });

  const addMenuItem = () => {
    if (!newItem.name || newItem.price <= 0) {
      alert('메뉴명과 가격을 입력해주세요.');
      return;
    }

    const item: MenuItem = {
      id: String(menuItems.length + 1),
      ...newItem,
      isAvailable: true
    };

    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', category: '단품', price: 0, description: '' });
    setIsAddingNew(false);
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const categories = ['전체', ...Array.from(new Set(menuItems.map(item => item.category)))];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredItems = selectedCategory === '전체' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              ← 홈으로
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">🍖 메뉴 관리</h1>
          </div>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {isAddingNew ? '취소' : '+ 새 메뉴 추가'}
          </button>
        </div>

        {/* 새 메뉴 추가 폼 */}
        {isAddingNew && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">새 메뉴 등록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="메뉴명"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="정식">정식</option>
                <option value="단품">단품</option>
                <option value="세트">세트</option>
                <option value="찌개">찌개</option>
                <option value="음료">음료</option>
              </select>
              <input
                type="number"
                placeholder="가격"
                value={newItem.price || ''}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="설명"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addMenuItem}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              메뉴 추가
            </button>
          </div>
        )}

        {/* 카테고리 필터 */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 메뉴 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 relative">
              {!item.isAvailable && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  품절
                </div>
              )}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {item.price.toLocaleString()}원
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    item.isAvailable
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {item.isAvailable ? '품절 처리' : '판매 재개'}
                </button>
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
