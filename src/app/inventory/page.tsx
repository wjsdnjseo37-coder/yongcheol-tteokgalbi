import Link from "next/link";

export default function Home() {
  const stores = [
    { id: '1', name: '강남점', todayRevenue: 1250000, todayOrders: 58, status: 'open' },
    { id: '2', name: '홍대점', todayRevenue: 980000, todayOrders: 45, status: 'open' },
    { id: '3', name: '신촌점', todayRevenue: 1100000, todayOrders: 52, status: 'open' },
    { id: '4', name: '잠실점', todayRevenue: 850000, todayOrders: 38, status: 'open' },
  ];

  const totalRevenue = stores.reduce((sum, store) => sum + store.todayRevenue, 0);
  const totalOrders = stores.reduce((sum, store) => sum + store.todayOrders, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🏢 용철떡갈비 본사 관리 시스템
          </h1>
          <p className="text-xl text-gray-600">
            전체 매장을 한눈에 관리하고 모니터링하세요
          </p>
        </header>

        {/* 전체 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">전체 매장 수</h3>
            <p className="text-4xl font-bold text-blue-600">{stores.length}개</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">오늘 전체 매출</h3>
            <p className="text-4xl font-bold text-orange-600">
              {totalRevenue.toLocaleString()}원
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">오늘 전체 주문</h3>
            <p className="text-4xl font-bold text-green-600">{totalOrders}건</p>
          </div>
        </div>

        {/* 매장별 현황 */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📍 매장별 현황</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{store.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                      store.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {store.status === 'open' ? '영업중' : '마감'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">오늘 매출</span>
                    <span className="text-xl font-bold text-orange-600">
                      {store.todayRevenue.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">오늘 주문</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {store.todayOrders}건
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 관리 메뉴 */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔧 본사 관리 메뉴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 매장 관리 */}
            <Link href="/orders" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">🏪</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  매장 관리
                </h2>
                <p className="text-gray-600">
                  전체 매장 정보 및 운영 관리
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