"use client";

import { StockPrice } from "@/lib/api";

export default function StockTable({ data }: { data: StockPrice[] }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No data available</p>;
  }

  // 최신 순 정렬
  const sorted = [...data].sort(
    (a, b) => new Date(b.trade_date).getTime() - new Date(a.trade_date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="text-left py-3 px-3">Date</th>
            <th className="text-right py-3 px-3">Open</th>
            <th className="text-right py-3 px-3">High</th>
            <th className="text-right py-3 px-3">Low</th>
            <th className="text-right py-3 px-3">Close</th>
            <th className="text-right py-3 px-3">Volume</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const prev = sorted[i + 1];
            const isUp = prev ? row.close > prev.close : false;
            const isDown = prev ? row.close < prev.close : false;

            return (
              <tr
                key={row.id}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
              >
                <td className="py-2.5 px-3 text-gray-300">{row.trade_date}</td>
                <td className="py-2.5 px-3 text-right text-gray-300">
                  ${row.open.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right text-gray-300">
                  ${row.high.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right text-gray-300">
                  ${row.low.toFixed(2)}
                </td>
                <td
                  className={`py-2.5 px-3 text-right font-medium ${
                    isUp
                      ? "text-emerald-400"
                      : isDown
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  ${row.close.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right text-gray-400">
                  {row.volume.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
