import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "리커전 파마슈티컬스 한국인 투자자 커뮤니티",
  description: "RXRX (Recursion Pharmaceuticals) Stock Tracking & ML Dashboard",
};

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-900 text-lg font-bold">
              리커전 파마슈티컬스 한국인 투자자 커뮤니티
            </Link>
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
        <p>리커전 파마슈티컬스 한국인 투자자 커뮤니티 &copy; {new Date().getFullYear()}</p>
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
