"use client";

import { useState } from "react";
import { StockPrice } from "@/lib/api";

export default function StockTable({ data }: { data: StockPrice[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">사용 가능한 데이터가 없습니다</p>;
  }

  // 최신 순 정렬
  const sorted = [...data].sort(
    (a, b) => new Date(b.trade_date).getTime() - new Date(a.trade_date).getTime()
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sorted.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 10개씩 페이지 번호 그룹화 (게시판 형식)
  const pageGroupSize = 10;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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
          {currentData.map((row, i) => {
            // 원본 배열(sorted)에서 해당 항목의 인덱스를 찾아 이전 날짜(prev) 계산
            const sortedIndex = startIndex + i;
            const prev = sorted[sortedIndex + 1];
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

      {/* Pagination (Board Style) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 mt-8 mb-4">
          <button
            onClick={() => handlePageChange(startPage - 1)}
            disabled={startPage === 1}
            className="px-3 py-1 rounded text-gray-500 border border-transparent hover:border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition font-medium"
          >
            &lt; 이전
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3.5 py-1.5 rounded-md transition text-sm font-medium ${
                currentPage === page
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(endPage + 1)}
            disabled={endPage === totalPages}
            className="px-3 py-1 rounded text-gray-500 border border-transparent hover:border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition font-medium"
          >
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
}
