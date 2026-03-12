const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://rxrx-backend.onrender.com";

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  // 8-second timeout to prevent build hangs on Vercel if Render backend is sleeping
  const timeoutId = setTimeout(() => controller.abort(), 8000); 
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function fetchDaily(limit: number = 100) {
  const res = await fetchWithTimeout(`${API_BASE}/api/v1/stock/daily?limit=${limit}`, {
    next: { revalidate: 300 }, // 5분 캐시
  });
  if (!res.ok) throw new Error("Failed to fetch daily data");
  return res.json();
}

export async function fetchLatest() {
  const res = await fetchWithTimeout(`${API_BASE}/api/v1/stock/latest`, {
    next: { revalidate: 60 }, // 1분 캐시
  });
  if (!res.ok) throw new Error("Failed to fetch latest data");
  return res.json();
}

export interface StockPrice {
  id: number;
  trade_date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adj_close: number;
  volume: number;
}

export interface LatestPrice extends StockPrice {
  change: number | null;
  change_pct: number | null;
}
