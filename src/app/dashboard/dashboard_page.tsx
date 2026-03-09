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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Technical Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Latest Close</p>
          <p className="text-2xl font-bold text-white">${latest.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">SMA 20</p>
          <p
            className={`text-2xl font-bold ${
              latest > sma20 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {sma20 > 0 ? `$${sma20.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {latest > sma20 ? "Above ▲" : "Below ▼"}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">SMA 50</p>
          <p
            className={`text-2xl font-bold ${
              latest > sma50 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {sma50 > 0 ? `$${sma50.toFixed(2)}` : "—"}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {latest > sma50 ? "Above ▲" : "Below ▼"}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Range</p>
          <p className="text-lg font-bold text-white">
            ${lowest.toFixed(2)} — ${highest.toFixed(2)}
          </p>
          <p className="text-gray-500 text-xs mt-1">Period high/low</p>
        </div>
      </div>

      {/* Data Stats */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Total Records</p>
            <p className="text-white font-medium">{dailyData.length}</p>
          </div>
          <div>
            <p className="text-gray-400">First Date</p>
            <p className="text-white font-medium">
              {dailyData.length > 0 ? dailyData[0].trade_date : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Last Date</p>
            <p className="text-white font-medium">
              {dailyData.length > 0
                ? dailyData[dailyData.length - 1].trade_date
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400">API Status</p>
            <p className="text-emerald-400 font-medium">● Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
