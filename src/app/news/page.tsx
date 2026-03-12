"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NewsPost {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string;
  content?: string;
  isNotice?: boolean;
}

const defaultNews: NewsPost[] = [
  { id: 4, title: "배포후 테스트입니다.", author: "관리자", date: new Date().toLocaleDateString("ko-KR"), views: 42, content: "배포 후 테스트 공지글입니다.", isNotice: true },
  { id: 3, title: "Recursion Pharmaceuticals, 새로운 파트너십 발표", author: "리커전 공식", date: "2024-03-12", views: 1042, content: "새로운 파트너십을 체결했습니다." },
  { id: 2, title: "RXRX, AI 기반 신약 발굴 플랫폼 업데이트", author: "바이오뉴스", date: "2024-03-10", views: 856, content: "AI 신약 발굴 성과입니다." },
  { id: 1, title: "NVIDIA와의 파트너십을 통한 컴퓨팅 모델 시연", author: "리커전 공식", date: "2024-03-05", views: 2304, content: "엔비디아 컴퓨팅 모델입니다." },
];

export default function NewsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("rxrx_admin_logged_in") === "true");

    const savedNews = localStorage.getItem("rxrx_news_posts");
    if (savedNews) {
      try {
        setNews(JSON.parse(savedNews));
      } catch (e) {
        setNews(defaultNews);
      }
    } else {
      setNews(defaultNews);
      localStorage.setItem("rxrx_news_posts", JSON.stringify(defaultNews));
    }
    setIsLoaded(true);
  }, []);

  const handleNewsClick = (id: number) => {
    // Increment view count
    const updatedNews = news.map(post => 
      post.id === id ? { ...post, views: post.views + 1 } : post
    );
    setNews(updatedNews);
    localStorage.setItem("rxrx_news_posts", JSON.stringify(updatedNews));
    
    // Navigate to details
    router.push(`/news/${id}`);
  };

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[500px]"></div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">리커전 뉴스</h1>
        <button 
          onClick={() => {
            if (isAdmin) {
              router.push("/news/write");
            } else {
              alert("관리자만 등록 가능합니다.");
            }
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition sm:block"
        >
          기사 작성하기
        </button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-gray-500">
              <tr>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24 text-center">번호</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">주요 소식</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">작성자</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">출처</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-28 text-center">작성일</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24 text-center">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    등록된 뉴스가 없습니다.
                  </td>
                </tr>
              ) : (
                [...news].sort((a, b) => {
                  if (a.isNotice && !b.isNotice) return -1;
                  if (!a.isNotice && b.isNotice) return 1;
                  return b.id - a.id; // secondary sort by ID desc
                }).map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => handleNewsClick(item.id)}
                    className={`transition cursor-pointer ${item.isNotice ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                  >
                    <td className="py-4 px-6 text-gray-500 font-medium text-center">
                      {item.isNotice ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">공지</span>
                      ) : (
                        item.id
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-semibold hover:text-emerald-600 transition truncate max-w-xs sm:max-w-md">
                      {item.isNotice && <span className="text-red-600 font-bold mr-2">[공지]</span>}
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium text-center">관리자</td>
                    <td className="py-4 px-6 text-gray-600 text-center">{item.author}</td>
                    <td className="py-4 px-6 text-gray-500 text-center">{item.date}</td>
                    <td className="py-4 px-6 text-gray-400 text-center">{item.views.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">총 {news.length}개의 뉴스</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-400 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              이전
            </button>
            <button className="px-3 py-1 border border-emerald-600 bg-emerald-50 text-emerald-700 rounded font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 rounded hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
