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

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  
  const [visitorStats, setVisitorStats] = useState({ 
    daily: 0, weekly: 0, monthly: 0, yearly: 0, total: 0 
  });
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    setIsClient(true);
    
    // Fetch dashboard data if logged in
    const cachedAdmin = localStorage.getItem("rxrx_admin_logged_in");
    const cachedAdminId = localStorage.getItem("rxrx_admin_id");
    if (cachedAdmin === "true" && cachedAdminId) {
      setId(cachedAdminId); // Keep ID in state for password change
      
      fetchDaily(200).then(res => {
        if (res.status === 'success' && res.data) {
          setDailyData(res.data);
        } else {
          setDailyData([]);
        }
      }).catch(err => {
        console.error("Failed to fetch daily data for admin dashboard", err);
      });

      // Fetch System Status
      fetch(`${API_BASE}/api/v1/system/status`)
        .then(res => res.json())
        .then(data => setSystemStatus(data))
        .catch(console.error);

      // Fetch Visitor Stats
      fetch(`${API_BASE}/api/v1/visitors/stats`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success" && data.data) {
            setVisitorStats(data.data);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      });
      const data = await res.json();
      
      if (res.ok && data.status === "success") {
        localStorage.setItem("rxrx_admin_logged_in", "true");
        localStorage.setItem("rxrx_admin_id", id);
        alert("관리자로 로그인되었습니다.");
        window.location.reload();
      } else {
        setError(data.detail || "아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rxrx_admin_logged_in");
    localStorage.removeItem("rxrx_admin_id");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, current_password: currentPassword, new_password: newPassword })
      });
      const data = await res.json();
      
      if (res.ok && data.status === "success") {
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        handleLogout();
      } else {
        setPasswordMsg(data.detail || "오류가 발생했습니다.");
      }
    } catch (err) {
      setPasswordMsg("비밀번호 변경 처리 중 서버 통신 오류가 발생했습니다.");
    }
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
            <Link
              href="/"
              className="px-4 py-2 border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              홈화면으로 이동
            </Link>
            <a
              href="https://rxrx-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm"
            >
              API 문서
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-semibold transition shadow-sm"
            >
              비밀번호 변경
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              로그아웃
            </button>
          </div>
        </div>
        
        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">관리자 비밀번호 변경</h3>
                <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleChangePassword} className="p-6">
                {passwordMsg && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 mb-6">
                    {passwordMsg}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
                    <input type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full border py-2 px-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500 border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 (4자 이상)</label>
                    <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border py-2 px-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500 border-gray-300" />
                  </div>
                </div>
                <div className="mt-8 flex gap-3 justify-end">
                  <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">취소</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm">변경 저장</button>
                </div>
              </form>
            </div>
          </div>
        )}

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

          {/* Visitor Statistics Graph (Real DB Data) */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">사이트 방문 통계</h2>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setActiveTab('daily')} className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'daily' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>일간</button>
                <button onClick={() => setActiveTab('weekly')} className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'weekly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>주간</button>
                <button onClick={() => setActiveTab('monthly')} className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>월간</button>
                <button onClick={() => setActiveTab('yearly')} className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>연간</button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 font-medium mb-2">{activeTab === 'daily' ? '오늘' : activeTab === 'weekly' ? '이번 주' : activeTab === 'monthly' ? '이번 달' : '올해'} 방문자 수</p>
                <p className="text-5xl font-extrabold text-blue-600 tracking-tight">
                  {visitorStats[activeTab as keyof typeof visitorStats].toLocaleString()} <span className="text-2xl text-gray-400 font-medium tracking-normal">명</span>
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">누적 총 접속자: <strong className="text-gray-900 border-b border-gray-400 pb-0.5">{visitorStats.total.toLocaleString()}</strong>명</p>
            </div>
          </div>
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
