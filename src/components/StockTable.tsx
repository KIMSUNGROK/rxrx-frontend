"use client";

import { StockPrice } from "@/lib/api";

export default function StockTable({ data }: { data: StockPrice[] }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">사용 가능한 데이터가 없습니다</p>;
  }

  // 최신 순 정렬
  const sorted = [...data].sort(
    (a, b) => new Date(b.trade_date).getTime() - new Date(a.trade_date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 text-gray-500 bg-gray-50">
            <th className="text-left py-3 px-4 font-semibold uppercase tracking-wider">일자</th>
            <th className="text-right py-3 px-4 font-semibold uppercase tracking-wider">시가</th>
            <th className="text-right py-3 px-4 font-semibold uppercase tracking-wider">고가</th>
            <th className="text-right py-3 px-4 font-semibold uppercase tracking-wider">저가</th>
            <th className="text-right py-3 px-4 font-semibold uppercase tracking-wider">종가</th>
            <th className="text-right py-3 px-4 font-semibold uppercase tracking-wider">거래량</th>
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
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-gray-600 font-medium">{row.trade_date}</td>
                <td className="py-3 px-4 text-right text-gray-600">
                  ${row.open.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  ${row.high.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  ${row.low.toFixed(2)}
                </td>
                <td
                  className={`py-3 px-4 text-right font-medium ${
                    isUp
                      ? "text-emerald-600"
                      : isDown
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  ${row.close.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-500">
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
