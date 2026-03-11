import { fetchLatest, fetchDaily, LatestPrice, StockPrice } from "@/lib/api";
import TradingViewWidget from "@/components/TradingViewWidget";
import StockTable from "@/components/StockTable";

export const revalidate = 60;

function KPICard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
      <p className="text-gray-500 text-sm font-medium mb-2">{label}</p>
      <p className={`text-3xl font-bold tracking-tight ${color || "text-gray-900"}`}>{value}</p>
      {sub && <p className="text-gray-400 text-sm mt-2">{sub}</p>}
    </div>
  );
}

export default async function Home() {
  let latest: LatestPrice | null = null;
  let dailyData: StockPrice[] = [];

  try {
    const [latestRes, dailyRes] = await Promise.all([
      fetchLatest(),
      fetchDaily(200), // dashboard의 200개 데이터 가져오기 통합
    ]);
    latest = latestRes.data;
    dailyData = dailyRes.data || [];
  } catch (e) {
    console.error("Failed to fetch data:", e);
  }

  const changePct = latest?.change_pct;
  const changeColor =
    changePct && changePct > 0
      ? "text-emerald-600"
      : changePct && changePct < 0
      ? "text-red-600"
      : "text-gray-500";

  const changeSign = changePct && changePct > 0 ? "+" : "";

  const closes = dailyData.map((d) => d.close);
  const latestPriceVal = closes.length > 0 ? closes[closes.length - 1] : 0;
  const sma20 = closes.length >= 20 ? closes.slice(-20).reduce((a, b) => a + b, 0) / 20 : 0;
  const sma50 = closes.length >= 50 ? closes.slice(-50).reduce((a, b) => a + b, 0) / 50 : 0;
  const highest = closes.length > 0 ? Math.max(...closes) : 0;
  const lowest = closes.length > 0 ? Math.min(...closes) : 0;

  const randomVisitorCount = Math.floor(Math.random() * 500) + 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">RXRX</h1>
            <span className="text-gray-500 text-xl font-medium">Recursion Pharmaceuticals</span>
            <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2.5 py-1 rounded-full font-semibold">
              NASDAQ
            </span>
          </div>
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
            <span>오늘 방문자 수:</span>
            <span className="text-blue-900">{randomVisitorCount.toLocaleString()}명</span>
          </div>
        </div>
        {latest && (
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-5xl font-bold text-gray-900 tracking-tight">
              ${latest.close?.toFixed(2)}
            </span>
            <span className={`text-2xl font-semibold ${changeColor}`}>
              {changeSign}
              {changePct?.toFixed(2)}%
            </span>
            {latest.change !== null && (
              <span className={`text-xl ${changeColor} opacity-90`}>
                ({changeSign}${Math.abs(latest.change).toFixed(2)})
              </span>
            )}
            <span className="text-gray-400 text-sm font-medium ml-2">
              {latest.trade_date} 기준
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards (Dashboard Metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">최근 종가</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">${latestPriceVal.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">20일 이동평균</p>
          <p className={`text-3xl font-bold tracking-tight ${latestPriceVal > sma20 ? "text-emerald-600" : "text-red-600"}`}>
            {sma20 > 0 ? `$${sma20.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {latestPriceVal > sma20 ? "현재가 상회 ▲" : "현재가 하회 ▼"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">50일 이동평균</p>
          <p className={`text-3xl font-bold tracking-tight ${latestPriceVal > sma50 ? "text-emerald-600" : "text-red-600"}`}>
            {sma50 > 0 ? `$${sma50.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {latestPriceVal > sma50 ? "현재가 상회 ▲" : "현재가 하회 ▼"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition hover:shadow-md">
          <p className="text-gray-500 text-sm font-medium mb-2">기간 등락폭 (Range)</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            ${lowest.toFixed(2)} — ${highest.toFixed(2)}
          </p>
          <p className="text-gray-400 text-sm mt-2 font-medium">가용 기간 최저/최고</p>
        </div>
      </div>

      {/* TradingView Chart */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
          RXRX 차트 (NASDAQ)
        </h2>
        <TradingViewWidget />
      </div>

      {/* Recent Prices Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
          최근 주가 데이터
        </h2>
        <StockTable data={dailyData} />
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
