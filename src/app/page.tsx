"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🍖 용철떡갈비 POS 시스템
            </h1>
            <p className="text-xl text-gray-600">
              매장 운영을 위한 통합 관리 시스템
            </p>
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {currentTime.toLocaleTimeString('ko-KR')}
          </div>
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
          </div>
        </header>

        {/* 메인 메뉴 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 메뉴 관리 */}
            <Link href="/menu" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">🍽️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  메뉴 관리
                </h2>
                <p className="text-gray-600">
                  메뉴 추가, 수정 및 가격 관리
                </p>
              </div>
            </Link>

            {/* 주문 관리 */}
            <Link href="/orders" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  주문 관리
                </h2>
                <p className="text-gray-600">
                  주문 접수 및 처리 관리
                </p>
              </div>
            </Link>

            {/* 재고 관리 */}
            <Link href="/inventory" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  재고 관리
                </h2>
                <p className="text-gray-600">
                  재고 현황 및 입고 관리
                </p>
              </div>
            </Link>

            {/* 고객 관리 */}
            <Link href="/customers" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  고객 관리
                </h2>
                <p className="text-gray-600">
                  고객 정보 및 주문 이력 관리
                </p>
              </div>
            </Link>

            {/* 매출 통계 */}
            <Link href="/sales" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">💰</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  매출 통계
                </h2>
                <p className="text-gray-600">
                  일별 매출 및 통계 분석
                </p>
              </div>
            </Link>

            {/* 설정 */}
            <Link href="/settings" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">⚙️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  설정
                </h2>
                <p className="text-gray-600">
                  시스템 설정 및 관리
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* 빠른 시작 가이드 */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 빠른 시작 가이드</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>1. 메뉴 관리</strong> - 판매할 메뉴를 먼저 등록하세요</p>
              <p><strong>2. 주문 관리</strong> - 고객 주문을 접수하고 처리하세요</p>
              <p><strong>3. 재고 관리</strong> - 재고를 등록하고 관리하세요</p>
              <p><strong>4. 고객 관리</strong> - 단골 고객 정보를 관리하세요</p>
              <p><strong>5. 매출 통계</strong> - 일별 매출을 확인하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
              <span className="text-2xl">🏪</span>
            </div>
            <p className="text-4xl font-bold mb-1">{stores.length}개</p>
            <p className="text-xs opacity-80">모든 매장 영업중</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">오늘 전체 매출</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-4xl font-bold mb-1">{(totalRevenue / 10000).toFixed(0)}만원</p>
            <p className="text-xs opacity-80">전일 대비 +12.5%</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">오늘 전체 주문</h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-4xl font-bold mb-1">{totalOrders}건</p>
            <p className="text-xs opacity-80">평균 주문액 {Math.round(totalRevenue / totalOrders / 1000)}천원</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">대기중 발주</h3>
              <span className="text-2xl">⏰</span>
            </div>
            <p className="text-4xl font-bold mb-1">{pendingOrdersCount}건</p>
            <p className="text-xs opacity-80">{lowStockCount}개 매장 재고부족</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 매장별 현황 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 매장별 실시간 현황</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stores.map((store, index) => (
                  <div
                    key={store.id}
                    className="border-2 border-gray-100 rounded-lg p-4 hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                          <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏪'}</span>
                        </div>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 bg-green-100 text-green-700">
                          ● 영업중
                        </span>
                      </div>
                      {store.pendingOrders > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                          발주 {store.pendingOrders}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">매출</span>
                        <span className="font-bold text-orange-600">
                          {(store.todayRevenue / 10000).toFixed(0)}만원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">주문</span>
                        <span className="font-semibold">{store.todayOrders}건</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">객단가</span>
                        <span className="font-semibold">{(store.avgOrderValue / 1000).toFixed(1)}천원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">피크타임</span>
                        <span className="font-semibold text-blue-600">{store.peakHour}</span>
                      </div>
                      {store.lowStock > 0 && (
                        <div className="flex items-center gap-1 text-red-600 font-semibold">
                          <span>⚠️</span>
                          <span>재고부족 {store.lowStock}개 항목</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 매출 진행바 */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                          style={{ width: `${(store.todayRevenue / 1500000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        목표 대비 {Math.round((store.todayRevenue / 1500000) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 최근 발주 현황 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 최근 발주 현황</h2>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-l-4 border-orange-500 bg-gray-50 p-3 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-bold text-sm text-gray-900">{order.id}</span>
                        <span className="text-xs text-gray-600 ml-2">{order.store}</span>
                      </div>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{order.items}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-600">{(order.amount / 10000).toFixed(0)}만원</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'pending' ? '대기중' : order.status === 'approved' ? '승인됨' : '배송중'}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/orders" className="block text-center text-sm text-orange-600 hover:text-orange-700 font-semibold mt-4">
                  전체 발주 보기 →
                </Link>
              </div>

              {/* 알림 섹션 */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🔔</span>
                  <span>알림</span>
                </h3>
                <div className="space-y-2">
                  {lowStockCount > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded-r text-xs">
                      <p className="font-semibold text-red-800">재고 부족 알림</p>
                      <p className="text-red-600">{lowStockCount}개 매장에서 재고 부족</p>
                    </div>
                  )}
                  {pendingOrdersCount > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-2 rounded-r text-xs">
                      <p className="font-semibold text-yellow-800">발주 승인 대기</p>
                      <p className="text-yellow-600">{pendingOrdersCount}건의 발주가 대기중입니다</p>
                    </div>
                  )}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r text-xs">
                    <p className="font-semibold text-blue-800">오늘의 실적</p>
                    <p className="text-blue-600">전일 대비 매출 12.5% 증가</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 메뉴 바로가기 */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔧 본사 관리 메뉴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 매장 발주 관리 */}
            <Link href="/orders" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">🏪</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  매장 발주 관리
                </h2>
                <p className="text-gray-600">
                  매장별 발주 승인 및 배송 관리
                </p>
              </div>
            </Link>

            {/* 통합 매출 */}
            <Link href="/sales" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">💰</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  통합 매출
                </h2>
                <p className="text-gray-600">
                  전체 매장 매출 분석 및 비교
                </p>
              </div>
            </Link>

            {/* 메뉴 관리 */}
            <Link href="/menu" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">🍖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  표준 메뉴
                </h2>
                <p className="text-gray-600">
                  전체 매장 표준 메뉴 관리
                </p>
              </div>
            </Link>

            {/* 재고 관리 */}
            <Link href="/inventory" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  재고 현황
                </h2>
                <p className="text-gray-600">
                  매장별 재고 현황 및 발주 관리
                </p>
              </div>
            </Link>

            {/* 직원 관리 */}
            <Link href="/customers" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  직원 관리
                </h2>
                <p className="text-gray-600">
                  전체 직원 계정 및 권한 관리
                </p>
              </div>
            </Link>

            {/* 설정 */}
            <Link href="/settings" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">⚙️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  시스템 설정
                </h2>
                <p className="text-gray-600">
                  본사 시스템 및 정책 설정
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
