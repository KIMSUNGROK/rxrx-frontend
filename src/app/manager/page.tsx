"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchDaily, StockPrice } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://rxrx-backend.onrender.com";

interface ColumnDef {
  name: string;
  type: string;
}

interface TableDef {
  table_name: string;
  columns: ColumnDef[];
}

export default function ManagerDashboardPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [dailyData, setDailyData] = useState<StockPrice[]>([]);
  
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [dbSchema, setDbSchema] = useState<TableDef[]>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Fetch dashboard data if logged in
    if (localStorage.getItem("rxrx_admin_logged_in") === "true") {
      fetchDaily(200).then(res => {
        setDailyData(res.data || []);
      }).catch(err => {
        console.error("Failed to fetch daily data for admin dashboard", err);
      });

      // Fetch System Status
      fetch(`${API_BASE}/api/v1/system/status`)
        .then(res => res.json())
        .then(data => setSystemStatus(data))
        .catch(console.error);

      // Fetch DB Schema
      fetch(`${API_BASE}/api/v1/system/schema`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setDbSchema(data.data);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "manager" && password === "manager") {
      localStorage.setItem("rxrx_admin_logged_in", "true");
      alert("관리자로 로그인되었습니다.");
      window.location.reload();
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rxrx_admin_logged_in");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };

  if (!isClient) return null;

  const isLoggedIn = localStorage.getItem("rxrx_admin_logged_in") === "true";

  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">관리자 대시보드</h1>
            <p className="text-gray-500 mt-1">시스템 권한으로 진입했습니다.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://rxrx-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm"
            >
              API 문서
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <Link 
              href="/" 
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              홈으로
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Data Stats Widget */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">데이터 요약 (DB)</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">동기화 주기</p>
                <p className="text-sm text-emerald-600 font-bold">{systemStatus ? systemStatus.fetch_interval : "1 minute"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <div>
                <p className="text-gray-500 font-medium text-sm mb-1">총 레코드 수</p>
                <p className="text-3xl font-bold text-gray-900">{dailyData.length.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm mb-1">최초 데이터 일자</p>
                <p className="text-xl font-semibold text-gray-800 tracking-tight mt-1">
                  {dailyData.length > 0 ? dailyData[0].trade_date : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm mb-1">최근 데이터 일자</p>
                <p className="text-xl font-semibold text-gray-800 tracking-tight mt-1">
                  {dailyData.length > 0
                    ? dailyData[dailyData.length - 1].trade_date
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm mb-1">API 상태</p>
                <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold border border-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  정상 연결됨
                </div>
              </div>
            </div>
            {systemStatus && typeof systemStatus === 'object' && 'status' in systemStatus && (
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">서비스 상태: <span className="text-emerald-600 font-bold ml-1">{systemStatus.status ? String(systemStatus.status).toUpperCase() : "UNKNOWN"}</span></span>
                <span className="text-gray-400 text-xs">FastAPI / Yahoo Finance 연결 활성화</span>
              </div>
            )}
          </div>

          {/* Visitor Statistics Graph (Mock) */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">사이트 방문 통계</h2>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button className="px-3 py-1 text-xs font-semibold bg-white shadow-sm rounded-md text-gray-900">일간</button>
                <button className="px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition">주간</button>
                <button className="px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition">월간</button>
                <button className="px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition">연간</button>
              </div>
            </div>

            {/* CSS Bar Chart Mock */}
            <div className="flex-1 flex items-end justify-between gap-2 pt-10 pb-2 relative h-48 border-b border-gray-200">
              {/* Fake Y-Axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 font-medium pb-2 -ml-2">
                <span>1K</span>
                <span>500</span>
                <span>0</span>
              </div>
              
              {/* Bars */}
              <div className="w-1/6 bg-blue-100 hover:bg-blue-200 transition rounded-t-md h-[30%] relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">342 명</div>
              </div>
              <div className="w-1/6 bg-blue-200 hover:bg-blue-300 transition rounded-t-md h-[45%] relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">451 명</div>
              </div>
              <div className="w-1/6 bg-blue-300 hover:bg-blue-400 transition rounded-t-md h-[25%] relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">210 명</div>
              </div>
              <div className="w-1/6 bg-blue-400 hover:bg-blue-500 transition rounded-t-md h-[60%] relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">630 명</div>
              </div>
              <div className="w-1/6 bg-blue-500 hover:bg-blue-600 transition rounded-t-md h-[40%] relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">421 명</div>
              </div>
              <div className="w-1/6 bg-blue-600 hover:bg-blue-700 transition rounded-t-md h-[85%] relative group shadow-sm cursor-pointer border border-blue-500">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded opacity-100 transition whitespace-nowrap z-10 shadow-lg font-bold">890 명</div>
              </div>
            </div>
            
            {/* Fake X-Axis labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
              <span className="w-1/6 text-center">3/7</span>
              <span className="w-1/6 text-center">3/8</span>
              <span className="w-1/6 text-center">3/9</span>
              <span className="w-1/6 text-center">3/10</span>
              <span className="w-1/6 text-center">3/11</span>
              <span className="w-1/6 text-center text-blue-700 font-bold">오늘</span>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">누적 총 접속자: <strong className="text-gray-900 border-b border-gray-900 pb-0.5">142,093</strong>명</p>
            </div>
          </div>
        </div>

        {/* Database Schema Map */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Supabase 데이터베이스 스키마 맵 (실시간)</h2>
          </div>
          
          {dbSchema.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
              <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500 font-medium text-sm">Supabase OpenAPI 구성 정보를 불러오는 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dbSchema.map((table) => (
                <div key={table.table_name} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="bg-indigo-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-indigo-900 text-sm tracking-tight flex items-center gap-2">
                       <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                      {table.table_name}
                    </h3>
                    <span className="text-xs font-semibold bg-white text-indigo-600 px-2 py-0.5 rounded shadow-sm border border-indigo-100">{Array.isArray(table.columns) ? table.columns.length : 0} Cols</span>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {Array.isArray(table.columns) && table.columns.map((col) => (
                      <li key={col.name} className="flex items-center justify-between px-4 py-2 hover:bg-indigo-50/50 transition-colors">
                        <span className="text-sm font-medium text-gray-700">{col.name}</span>
                        <span className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono">{col.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area inside Dashboard */}
        <div className="mt-auto pt-6 pb-6 text-center border-t border-gray-200">
          <div className="text-sm text-gray-400 font-medium">
            <span className="block mb-1 text-gray-500 font-bold">RXRX Admin Management System</span>
            Powered by Next.js + FastAPI + Supabase | Data from Yahoo Finance
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 flex flex-col justify-center min-h-[60vh]">
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">관리자 로그인</h1>
          <p className="text-gray-500 text-sm mt-2">시스템 관리자용 접속 페이지입니다.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="id" className="block text-sm font-semibold text-gray-900 mb-2">
              아이디
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition font-medium"
              placeholder="관리자 아이디를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition font-medium"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-lg transition shadow-sm mt-4 text-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
