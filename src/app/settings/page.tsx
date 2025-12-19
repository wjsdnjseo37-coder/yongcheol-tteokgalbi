"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
            ← 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">⚙️ 설정</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 기본 설정 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">기본 설정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">가게 이름</label>
                <input
                  type="text"
                  defaultValue="용철떡갈비"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">전화번호</label>
                <input
                  type="tel"
                  defaultValue="02-1234-5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">주소</label>
                <input
                  type="text"
                  defaultValue="서울시 강남구 테헤란로 123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                저장
              </button>
            </div>
          </div>

          {/* 직원 관리 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">직원 관리</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">김사장 (관리자)</p>
                  <p className="text-sm text-gray-600">admin@example.com</p>
                </div>
                <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">관리자</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">이직원 (직원)</p>
                  <p className="text-sm text-gray-600">staff1@example.com</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">직원</span>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                + 직원 추가
              </button>
            </div>
          </div>

          {/* 영업 시간 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">영업 시간</h2>
            <div className="space-y-3">
              {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-8 font-semibold">{day}</span>
                  <input
                    type="time"
                    defaultValue="11:00"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <span>~</span>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">휴무</span>
                  </label>
                </div>
              ))}
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold mt-4">
                저장
              </button>
            </div>
          </div>

          {/* 시스템 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">시스템 정보</h2>
            <div className="space-y-3 text-gray-700">
              <p>버전: <strong>1.0.0</strong></p>
              <p>마지막 업데이트: <strong>2025-12-17</strong></p>
              <p>데이터베이스 상태: <strong className="text-green-600">정상</strong></p>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold mt-4">
                데이터 백업
              </button>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                데이터 초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
