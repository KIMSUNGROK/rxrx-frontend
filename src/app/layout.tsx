import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RXRX Stock Intelligence",
  description: "RXRX (Recursion Pharmaceuticals) Stock Tracking & ML Dashboard",
};

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <img 
                src="https://www.recursion.com/images/recursion-logo-white.svg" 
                alt="Recursion" 
                className="h-6 w-auto dark:invert dark:opacity-90"
                onError={(e) => {
                  // 로고 로드 실패시 폴백 (기존 아이콘)
                  e.currentTarget.style.display = 'none';
                  const svg = e.currentTarget.parentElement?.querySelector('svg');
                  if (svg) svg.style.display = 'block';
                }}
              />
              {/* Fallback SVG if image fails */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-gray-900 hidden"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>RXRX</span>
            </a>
            <span className="text-gray-500 text-sm font-normal hidden sm:inline-block border-l border-gray-300 pl-3">주식 인텔리전스</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">홈</a>
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">대시보드</a>
            <a href="/board" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">자유게시판</a>
            <a
              href="https://rxrx-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 text-sm font-medium transition flex items-center gap-1"
            >
              API 문서 
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
        <p>RXRX 주식 인텔리전스 플랫폼 &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-gray-400">
          Powered by Next.js + FastAPI + Supabase | Data from Yahoo Finance
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col antialiased font-sans selection:bg-gray-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
