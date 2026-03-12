"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackgroundWrapper";

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
  { id: 10, title: "Recursion, 2025년 4분기 실적 발표 — 매출 3,550만 달러로 예상치 상회", author: "Recursion 공식", date: "2026-02-25", views: 1823, content: "Recursion Pharmaceuticals는 2025년 4분기 실적을 발표하며 3,550만 달러의 매출을 기록했습니다. 이는 시장 예상치를 상회하는 수치이며, 주당 손실은 예상보다 적은 0.21달러를 기록했습니다. CEO Najat Khan은 AI 기반 운영 체제의 임상 개념 증명에 성공하며 회사가 변곡점에 도달했다고 강조했습니다." },
  { id: 9, title: "REC-4881 임상 1b/2상 결과 — 용종 43% 중앙값 감소 달성", author: "임상시험 속보", date: "2025-12-15", views: 2541, content: "REC-4881의 Phase 1b/2 임상시험 데이터에서 가족성 선종성 용종증(FAP) 환자의 용종이 중앙값 43% 감소했으며, 환자의 75%가 반응을 보였습니다. 이 결과로 Pivotal 연구를 앞두고 주요 프로그램의 리스크가 크게 낮춰졌습니다. 2026년 FDA와 등록 경로에 대한 논의가 예정되어 있습니다." },
  { id: 8, title: "Roche로부터 3,000만 달러 마일스톤 수령 — 신경과학 협력 진전", author: "제약업계 뉴스", date: "2025-10-20", views: 1654, content: "Recursion은 Roche 및 Genentech와의 신경과학·GI 종양학 협력에서 3,000만 달러의 마일스톤 지급을 수령했습니다. 이 파트너십은 최대 40개 프로그램을 개시할 수 있으며, 각 프로그램별 3억 달러 이상의 개발·상업화 마일스톤이 설정되어 있습니다." },
  { id: 7, title: "Sanofi 협력 5번째 마일스톤 달성 — 누적 1.3억 달러 수령", author: "Recursion 공식", date: "2025-09-10", views: 1287, content: "Recursion은 Sanofi와의 자가면역 질환 소분자 리드 발굴 협력에서 다섯 번째 마일스톤을 달성했습니다. 이로써 Sanofi로부터의 누적 현금 유입은 1억 3,000만 달러에 달합니다. AI 플랫폼의 상업적 가치가 입증되고 있습니다." },
  { id: 6, title: "FDA, AI 기반 인간 모델 신약 개발 허용 — RXRX 13.3% 급등", author: "시장 속보", date: "2025-03-18", views: 3102, content: "미국 FDA가 기존 동물 실험 대신 AI 기반 인간 모델을 신약 개발 및 독성 평가에 활용할 수 있다는 정책 변경을 발표했습니다. 이 소식에 Recursion을 포함한 AI 바이오 기업 주가가 급등했으며, RXRX는 하루 만에 13.3% 상승했습니다." },
  { id: 5, title: "R&D 파이프라인 6개로 재편 — 선택과 집중 전략 발표", author: "키움증권 리서치", date: "2025-05-12", views: 987, content: "Recursion은 R&D 파이프라인을 6개 핵심 프로그램으로 재편하여 선택과 집중을 통한 현금 소진율 절감 전략을 발표했습니다. REC-4881과 REC-617 임상 데이터 발표가 2025년 하반기로 예정되었습니다." },
  { id: 4, title: "Exscientia 인수 완료 — 약 6.88억 달러 규모", author: "M&A 뉴스", date: "2025-01-15", views: 2198, content: "Recursion은 Exscientia 인수를 완료했습니다. 약 6억 8,800만 달러 규모의 이번 인수로 초기 종양학 파이프라인과 정밀 화학 역량이 강화되었으며, 연간 매출은 전년 대비 27% 증가했습니다." },
  { id: 3, title: "NVIDIA와 Boltz-2 AI 모델 공동 개발 — 단백질-리간드 결합 예측", author: "AI 테크 뉴스", date: "2025-06-22", views: 1543, content: "Recursion은 MIT 및 NVIDIA와 함께 Boltz-2 AI 모델을 개발하여 단백질-리간드 결합 예측 기술을 고도화했습니다. 이 기술은 Recursion OS에 통합되어 신약 후보 물질 탐색 속도를 획기적으로 향상시킵니다." },
  { id: 2, title: "ARK Invest, Recursion 지분 55만주 추가 매수", author: "투자 동향", date: "2026-02-10", views: 1876, content: "캐시 우드가 이끄는 ARK Investment Management는 2026년 2월 Recursion 주식을 556,868주 추가 매수했습니다. AI 기반 신약 개발에 대한 장기적 성장 잠재력을 높이 평가한 것으로 분석됩니다." },
  { id: 1, title: "CEO Najat Khan, J.P. Morgan 헬스케어 컨퍼런스 발표", author: "Recursion 공식", date: "2026-01-14", views: 1102, content: "Recursion Pharmaceuticals CEO Najat Khan은 제44회 J.P. Morgan 헬스케어 컨퍼런스에서 회사의 전략과 비전을 발표했습니다. 5개 임상 프로그램 진행 상황, 5억 달러 이상의 마일스톤 확보, 그리고 2028년 초까지의 운영 자금 확보 현황을 소개했습니다." },
];

export default function NewsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("rxrx_admin_logged_in") === "true");

    const SEED_VERSION = "v2"; // bump this to force reseed
    const storedVersion = localStorage.getItem("rxrx_news_seed_version");
    
    if (storedVersion === SEED_VERSION) {
      // Same version — load user's data
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
    } else {
      // New version — reseed
      setNews(defaultNews);
      localStorage.setItem("rxrx_news_posts", JSON.stringify(defaultNews));
      localStorage.setItem("rxrx_news_seed_version", SEED_VERSION);
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[420px] overflow-hidden pointer-events-none">
        <ParticleBackground />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] hero-bottom-fade" />
      </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-16">
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

      <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/50 border-b-2 border-gray-200/50 text-gray-500">
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
        <div className="bg-white/40 border-t border-gray-200/50 px-6 py-4 flex items-center justify-between">
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
    </div>
  );
}
