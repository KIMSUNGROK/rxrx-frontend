"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ManagerLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Redirect if already logged in
    if (localStorage.getItem("rxrx_admin_logged_in") === "true") {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "manager" && password === "manager") {
      localStorage.setItem("rxrx_admin_logged_in", "true");
      alert("관리자로 로그인되었습니다.");
      router.push("/");
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
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">관리자 접속 중</h1>
          <p className="text-gray-500 mb-8">현재 관리자 권한으로 시스템을 이용 중입니다.</p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition text-center"
            >
              홈으로 이동
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              로그아웃
            </button>
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
