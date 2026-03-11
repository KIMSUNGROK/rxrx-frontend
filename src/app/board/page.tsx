export default function BoardPage() {
  // Mock data for the board
  const mockPosts = [
    { id: 4, title: "배포후 테스트입니다.", author: "관리자", views: 42 },
    { id: 3, title: "RXRX 주가 분석 의견 나눕니다.", author: "주린이", views: 128 },
    { id: 2, title: "안녕하세요 가입 인사 드립니다~", author: "뉴비즈", views: 56 },
    { id: 1, title: "Recursion 파이프라인 정리 요약", author: "제약전문가", views: 304 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">자유게시판</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          글쓰기
        </button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-gray-500">
              <tr>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24">번호</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">제목</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">글쓴이</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-28 text-center">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                mockPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="py-4 px-6 text-gray-500 font-medium">{post.id}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium hover:text-emerald-600 transition">
                      {post.title}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-center">{post.author}</td>
                    <td className="py-4 px-6 text-gray-500 text-center">{post.views.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">총 4개의 게시글</span>
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
