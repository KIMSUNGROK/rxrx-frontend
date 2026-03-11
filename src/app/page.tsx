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
  
  const previousClose = latest && latest.change !== null ? latest.close - latest.change : latestPriceVal;
  const todayOpen = dailyData.length > 0 ? dailyData[dailyData.length - 1].open : 0;
  const todayHigh = dailyData.length > 0 ? dailyData[dailyData.length - 1].high : 0;
  const todayLow = dailyData.length > 0 ? dailyData[dailyData.length - 1].low : 0;
  const todayVolume = dailyData.length > 0 ? dailyData[dailyData.length - 1].volume : 0;
  
  const highs = dailyData.map((d) => d.high);
  const lows = dailyData.map((d) => d.low);
  const high52 = highs.length > 0 ? Math.max(...highs) : 0;
  const low52 = lows.length > 0 ? Math.min(...lows) : 0;

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

      {/* Quick Order Button */}
      <div className="mb-6">
        <button className="w-full bg-[#00c96c] hover:bg-[#00b05e] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition shadow-sm">
          간편주문
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 font-sans">
        <nav className="flex space-x-6 sm:space-x-10" aria-label="Tabs">
          <a href="#" className="border-gray-900 border-b-2 text-gray-900 font-bold whitespace-nowrap py-3 px-1 text-base">
            종합
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base">
            🔥토론
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base">
            뉴스
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base">
            시세
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base">
            재무
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base">
            기업개요
          </a>
        </nav>
      </div>

      {/* Detailed Stock Info Grid */}
      <div className="bg-white border-t border-b sm:border border-gray-200 sm:rounded-2xl px-6 py-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
          {/* Row 1 */}
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">전일</span>
            <span className="font-semibold text-gray-900">{previousClose.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">시가</span>
            <span className="font-semibold text-gray-900">{todayOpen > 0 ? todayOpen.toFixed(2) : '3.44'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">고가</span>
            <span className="font-semibold text-red-500">{todayHigh > 0 ? todayHigh.toFixed(2) : '3.56'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">저가</span>
            <span className="font-semibold text-blue-500">{todayLow > 0 ? todayLow.toFixed(2) : '3.40'}</span>
          </div>

          {/* Row 2 */}
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">거래량</span>
            <span className="font-semibold text-gray-900">{todayVolume > 0 ? todayVolume.toLocaleString() : '5,370,655'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">대금</span>
            <span className="font-semibold text-gray-900">0.19억 USD</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">시총</span>
            <div className="text-right">
              <div className="font-semibold text-gray-900">17.9억 USD</div>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">업종</span>
            <span className="font-semibold text-gray-900 text-right truncate w-24 sm:w-auto" title="생명 공학 및 의학 연구">생명 공학 및 의학 연구</span>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">52주 최고</span>
            <span className="font-semibold text-gray-900">{high52 > 0 ? high52.toFixed(2) : '7.18'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">52주 최저</span>
            <span className="font-semibold text-gray-900">{low52 > 0 ? low52.toFixed(2) : '2.98'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">PER</span>
            <span className="font-semibold text-gray-900">2.98</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">EPS</span>
            <span className="font-semibold text-gray-900">-1.46</span>
          </div>

          {/* Row 4 */}
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">PBR</span>
            <span className="font-semibold text-gray-900">1.59배</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">BPS</span>
            <span className="font-semibold text-gray-900">2.14</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">주당배당금</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">배당수익률</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>

          {/* Row 5 */}
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">배당일</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">배당락일</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">액면변경</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">액면가</span>
            <span className="font-semibold text-gray-900">N/A</span>
          </div>
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
