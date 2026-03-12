"use client";

import { useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://rxrx-backend.onrender.com";

export default function VisitorTracker() {
  useEffect(() => {
    // Only track if not tracked in the last 24 hours
    const lastTracked = localStorage.getItem("rxrx_last_visit");
    const now = Date.now();
    
    if (!lastTracked || now - parseInt(lastTracked) > 24 * 60 * 60 * 1000) {
      // Fire and forget, no need to await or handle errors loudly
      fetch(`${API_BASE}/api/v1/visitors`, { method: "POST" })
        .then(res => {
          if (res.ok) {
            localStorage.setItem("rxrx_last_visit", now.toString());
          }
        })
        .catch(() => {});
    }
  }, []);

  return null; // This component renders nothing
}
