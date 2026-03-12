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
          관리자 문의 : futurisme@kakao.com
        </p>
      </div>
    </footer>
  );
}

import VisitorTracker from "@/components/VisitorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col antialiased font-sans selection:bg-gray-200">
        <VisitorTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
