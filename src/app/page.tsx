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
      fetchDaily(20),
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

  // 52주 고/저 계산 (가용 데이터 기준)
  const highs = dailyData.map((d) => d.high);
  const lows = dailyData.map((d) => d.low);
  const high52 = highs.length > 0 ? Math.max(...highs) : 0;
  const low52 = lows.length > 0 ? Math.min(...lows) : 0;

  // 평균 거래량
  const volumes = dailyData.map((d) => d.volume);
  const avgVolume =
    volumes.length > 0
      ? Math.round(volumes.reduce((a, b) => a + b, 0) / volumes.length)
      : 0;

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">RXRX</h1>
          <span className="text-gray-500 text-xl font-medium">Recursion Pharmaceuticals</span>
          <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2.5 py-1 rounded-full font-semibold">
            NASDAQ
          </span>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard
          label="종가"
          value={latest ? `$${latest.close?.toFixed(2)}` : "—"}
          sub={latest?.trade_date}
        />
        <KPICard
          label="변동율"
          value={
            changePct !== null && changePct !== undefined
              ? `${changeSign}${changePct.toFixed(2)}%`
              : "—"
          }
          color={changeColor}
        />
        <KPICard
          label="최고가 (52주)"
          value={high52 > 0 ? `$${high52.toFixed(2)}` : "—"}
          sub="가용 데이터 기준"
        />
        <KPICard
          label="평균 거래량"
          value={avgVolume > 0 ? avgVolume.toLocaleString() : "—"}
          sub="기간 평균"
        />
      </div>

      {/* TradingView Chart */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
          RXRX 차트 (NASDAQ)
        </h2>
        <TradingViewWidget />
      </div>

      {/* Recent Prices Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
          최근 주가 데이터
        </h2>
        <StockTable data={dailyData} />
      </div>
    </div>
  );
}
