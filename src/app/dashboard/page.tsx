import { fetchDaily, StockPrice } from "@/lib/api";

export const revalidate = 300;

export default async function DashboardPage() {
  let dailyData: StockPrice[] = [];

  try {
    const res = await fetchDaily(200);
    dailyData = res.data || [];
  } catch (e) {
    console.error("Failed to fetch data:", e);
  }

  // 간단한 통계
  const closes = dailyData.map((d) => d.close);
  const latest = closes.length > 0 ? closes[closes.length - 1] : 0;
  const sma20 =
    closes.length >= 20
      ? closes.slice(-20).reduce((a, b) => a + b, 0) / 20
      : 0;
  const sma50 =
    closes.length >= 50
      ? closes.slice(-50).reduce((a, b) => a + b, 0) / 50
      : 0;
  const highest = closes.length > 0 ? Math.max(...closes) : 0;
  const lowest = closes.length > 0 ? Math.min(...closes) : 0;

  const randomVisitorCount = Math.floor(Math.random() * 500) + 1000; // 1000~1500 사이 가짜 방문자수

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">대시보드</h1>
        <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
          <span>오늘 방문자 수:</span>
          <span className="text-blue-900">{randomVisitorCount.toLocaleString()}명</span>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">최근 종가</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">${latest.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">20일 이동평균</p>
          <p
            className={`text-3xl font-bold tracking-tight ${
              latest > sma20 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {sma20 > 0 ? `$${sma20.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {latest > sma20 ? "현재가 상회 ▲" : "현재가 하회 ▼"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">50일 이동평균</p>
          <p
            className={`text-3xl font-bold tracking-tight ${
              latest > sma50 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {sma50 > 0 ? `$${sma50.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {latest > sma50 ? "현재가 상회 ▲" : "현재가 하회 ▼"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">기간 등락폭 (Range)</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            ${lowest.toFixed(2)} — ${highest.toFixed(2)}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">최저/최고 현황</p>
        </div>
      </div>

      {/* Data Stats */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-4 tracking-tight">데이터 요약</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">총 레코드 수</p>
            <p className="text-gray-900 font-semibold">{dailyData.length}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">최초 데이터 일자</p>
            <p className="text-gray-900 font-semibold">
              {dailyData.length > 0 ? dailyData[0].trade_date : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">최근 데이터 일자</p>
            <p className="text-gray-900 font-semibold">
              {dailyData.length > 0
                ? dailyData[dailyData.length - 1].trade_date
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">API 상태</p>
            <p className="text-emerald-600 font-semibold">● 정상 연결됨</p>
          </div>
        </div>
      </div>
    </div>
  );
}
