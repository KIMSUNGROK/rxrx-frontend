import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import VisitorTracker from "@/components/VisitorTracker";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "리커전 파마슈티컬스 한국인 투자자 커뮤니티",
  description: "RXRX (Recursion Pharmaceuticals) Stock Tracking & ML Dashboard",
};

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm font-mono">
        <p>리커전 파마슈티컬스 한국인 투자자 커뮤니티 &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-gray-400">
          관리자 문의 : futurisme@kakao.com
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
      <body className={`${syne.variable} ${dmMono.variable} bg-[#f8f8fa] text-[#1a1a2e] min-h-screen flex flex-col antialiased font-sans selection:bg-teal-100 selection:text-teal-900`}>
        <VisitorTracker />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
