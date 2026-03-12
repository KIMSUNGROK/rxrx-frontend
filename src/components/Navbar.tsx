"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 h-[64px] transition-all duration-500 flex items-center px-4 sm:px-10 ${
    scrolled
      ? "bg-white/88 backdrop-blur-[24px] saturate-150 border-b border-black/5"
      : "bg-transparent border-b border-transparent"
  }`; // using custom bg-color/blur as per spec

  return (
    <nav
      className={navClasses}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Molecule Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#1a1a2e] group-hover:text-[#1a9e96] transition-colors"
            >
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="8" r="2" fill="currentColor" />
              <circle cx="4" cy="16" r="2" fill="currentColor" />
              <path d="M15.5 10L18.5 9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8.5 14L5.5 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-['Syne'] text-[17px] font-bold text-[#1a1a2e] tracking-tight group-hover:text-[#1a9e96] transition-colors">
              RECURSION
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "News", path: "/news" },
            { name: "Board", path: "/board" },
            { name: "Platform", path: "#platform" },
            { name: "Pipeline", path: "#pipeline" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`font-['DM_Mono'] text-[11.5px] uppercase tracking-[0.06em] transition-colors font-medium ${
                pathname === item.path ? "text-[#1a9e96]" : "text-[#6b7280] hover:text-[#1a9e96]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button (Simplified) */}
        <div className="md:hidden flex items-center">
          <button className="text-[#1a1a2e] hover:text-[#1a9e96]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
