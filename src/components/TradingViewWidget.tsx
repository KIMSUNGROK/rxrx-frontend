"use client";

import { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 이전 위젯 제거
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:RXRX",
      interval: "D",
      timezone: "Asia/Seoul",
      theme: "light",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(255, 255, 255, 1)",
      gridColor: "rgba(243, 244, 246, 1)",
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
      hide_volume: false,
      studies: ["MASimple@tv-basicstudies"],
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: "500px", width: "100%" }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
