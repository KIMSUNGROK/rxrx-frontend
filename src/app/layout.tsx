import type { Metadata } from "next";
import Link from "next/link";
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
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              {/* Inline SVG for Recursion Logo */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-gray-900"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span>RXRX</span>
            </Link>
            <span className="text-gray-500 text-sm font-normal hidden sm:inline-block border-l border-gray-300 pl-3">리커전 한국인 투자자 커뮤니티</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">홈</Link>
            <Link href="/news" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">리커전 뉴스</Link>
            <Link href="/board" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">자유게시판</Link>
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
        <p>리커전 한국인 투자자 커뮤니티 &copy; {new Date().getFullYear()}</p>
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
