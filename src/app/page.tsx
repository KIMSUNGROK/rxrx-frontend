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
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color || "text-white"}`}>{value}</p>
      {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
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
      ? "text-emerald-400"
      : changePct && changePct < 0
      ? "text-red-400"
      : "text-gray-300";

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold text-white">RXRX</h1>
          <span className="text-gray-400 text-lg">Recursion Pharmaceuticals</span>
          <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-0.5 rounded-full">
            NASDAQ
          </span>
        </div>
        {latest && (
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-4xl font-bold text-white">
              ${latest.close?.toFixed(2)}
            </span>
            <span className={`text-xl font-semibold ${changeColor}`}>
              {changeSign}
              {changePct?.toFixed(2)}%
            </span>
            {latest.change !== null && (
              <span className={`text-lg ${changeColor}`}>
                ({changeSign}${Math.abs(latest.change).toFixed(2)})
              </span>
            )}
            <span className="text-gray-500 text-sm">
              {latest.trade_date}
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard
          label="Close"
          value={latest ? `$${latest.close?.toFixed(2)}` : "—"}
          sub={latest?.trade_date}
        />
        <KPICard
          label="Change"
          value={
            changePct !== null && changePct !== undefined
              ? `${changeSign}${changePct.toFixed(2)}%`
              : "—"
          }
          color={changeColor}
        />
        <KPICard
          label="Period High"
          value={high52 > 0 ? `$${high52.toFixed(2)}` : "—"}
          sub="Available data range"
        />
        <KPICard
          label="Avg Volume"
          value={avgVolume > 0 ? avgVolume.toLocaleString() : "—"}
          sub="Period average"
        />
      </div>

      {/* TradingView Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">
          RXRX Chart (NASDAQ)
        </h2>
        <TradingViewWidget />
      </div>

      {/* Recent Prices Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-3">
          Recent Price Data
        </h2>
        <StockTable data={dailyData} />
      </div>
    </div>
  );
}
