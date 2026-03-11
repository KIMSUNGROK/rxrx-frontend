export default function NewsPage() {
  // Mock data for the news board
  const mockNews = [
    { id: 3, title: "Recursion Pharmaceuticals, 새로운 파트너십 발표", author: "리커전 공식", date: "2024-03-12", views: 1042 },
    { id: 2, title: "RXRX, AI 기반 신약 발굴 플랫폼 업데이트", author: "바이오뉴스", date: "2024-03-10", views: 856 },
    { id: 1, title: "NVIDIA와의 파트너십을 통한 컴퓨팅 모델 시연", author: "리커전 공식", date: "2024-03-05", views: 2304 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">리커전 뉴스</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition hidden sm:block">
          기사 제보하기
        </button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-gray-500">
              <tr>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24 text-center">번호</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">주요 소식</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">출처</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-28 text-center">작성일</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24 text-center">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    등록된 뉴스가 없습니다.
                  </td>
                </tr>
              ) : (
                mockNews.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="py-4 px-6 text-gray-500 font-medium text-center">{news.id}</td>
                    <td className="py-4 px-6 text-gray-900 font-semibold hover:text-emerald-600 transition">
                      {news.title}
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium text-center">{news.author}</td>
                    <td className="py-4 px-6 text-gray-500 text-center">{news.date}</td>
                    <td className="py-4 px-6 text-gray-400 text-center">{news.views.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">총 3개의 뉴스</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-400 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              이전
            </button>
            <button className="px-3 py-1 border border-emerald-600 bg-emerald-50 text-emerald-700 rounded font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 rounded hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
