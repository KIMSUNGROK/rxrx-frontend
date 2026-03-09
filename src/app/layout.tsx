import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RXRX Stock Intelligence",
  description: "RXRX (Recursion Pharmaceuticals) Stock Tracking & ML Dashboard",
};

function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl font-bold text-white">
              <span className="text-emerald-400">RXRX</span>
              <span className="text-gray-400 text-sm ml-2 font-normal">Stock Intelligence</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-300 hover:text-white text-sm transition">Home</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white text-sm transition">Dashboard</a>
            <a
              href="https://rxrx-backend.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 text-sm transition"
            >
              API Docs ↗
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p>RXRX Stock Intelligence Platform &copy; {new Date().getFullYear()}</p>
        <p className="mt-1 text-gray-600">
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
    <html lang="ko" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
