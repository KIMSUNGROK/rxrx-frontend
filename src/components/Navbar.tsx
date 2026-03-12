"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Stock", path: "/stock" },
  { name: "News", path: "/news" },
  { name: "Board", path: "/board" },
  { name: "Platform", path: "#platform" },
  { name: "Pipeline", path: "#pipeline" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navClasses = `fixed top-0 left-0 right-0 z-50 h-[64px] transition-all duration-500 flex items-center px-4 sm:px-10 ${
    scrolled || menuOpen
      ? "bg-white/88 backdrop-blur-[24px] saturate-150 border-b border-black/5"
      : "bg-transparent border-b border-transparent"
  }`;

  return (
    <>
      <nav
        className={navClasses}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#1a1a2e] group-hover:text-[#1a9e96] transition-colors duration-300"
              >
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="8" r="2" fill="currentColor" />
                <circle cx="4" cy="16" r="2" fill="currentColor" />
                <path d="M15.5 10L18.5 9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8.5 14L5.5 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-['Syne'] text-[17px] font-bold text-[#1a1a2e] tracking-tight group-hover:text-[#1a9e96] transition-colors duration-300">
                RECURSION
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`font-['DM_Mono'] text-[11.5px] uppercase tracking-[0.06em] transition-colors duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1a9e96] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === item.path
                    ? "text-[#1a9e96] after:w-full"
                    : "text-[#6b7280] hover:text-[#1a9e96]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#1a1a2e] hover:text-[#1a9e96] transition-colors p-1 relative w-7 h-7 flex flex-col items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 absolute ${
                  menuOpen ? "rotate-45 top-[13px]" : "top-[9px]"
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 absolute top-[13px] ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 absolute ${
                  menuOpen ? "-rotate-45 top-[13px]" : "top-[17px]"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-40 mobile-menu-panel md:hidden animate-slide-down">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`font-['DM_Mono'] text-[12px] uppercase tracking-[0.08em] font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? "text-[#1a9e96] bg-[rgba(26,158,150,0.06)]"
                    : "text-[#6b7280] hover:text-[#1a9e96] hover:bg-[rgba(26,158,150,0.04)]"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
