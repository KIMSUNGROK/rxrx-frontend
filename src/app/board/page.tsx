"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackgroundWrapper";

// Define the post type
interface Post {
  id: number;
  title: string;
  author: string;
  views: number;
  content?: string;
  createdAt?: string;
  isNotice?: boolean;
}

const DEFAULT_MOCK_POSTS: Post[] = [
  { id: 10, title: "REC-4881 FAP 임상 결과 분석 — 용종 43% 감소의 의미", author: "바이오분석가", views: 342, createdAt: "2026-03-10T09:30:00Z", content: "REC-4881의 Phase 1b/2 결과에서 용종 중앙값 43% 감소, 75% 반응률을 기록했습니다. 이번 데이터는 2026년 FDA 등록 경로 논의의 근거가 됩니다. FAP 치료제가 승인되면 희귀질환 시장에서 독점적 위치를 확보할 수 있습니다. 여러분의 의견은 어떠신가요?" },
  { id: 9, title: "4분기 실적 리뷰 — 매출 3,550만 달러, 적자 축소", author: "주식마스터", views: 278, createdAt: "2026-03-05T14:20:00Z", content: "2025년 4분기 매출 3,550만 달러로 예상치 상회. 주당 손실 0.21달러로 적자도 줄었습니다. Roche 마일스톤 3,000만 달러가 큰 기여를 했고, Sanofi 협력 매출도 증가세입니다. 현금 보유 7.85억 달러, 2028년 초까지 운영 가능합니다." },
  { id: 8, title: "NVIDIA 지분 매각 이후에도 기술 협력은 유지 — 어떻게 보시나요?", author: "AI투자러", views: 456, createdAt: "2026-02-28T11:00:00Z", content: "엔비디아가 Recursion 지분을 매각했지만 기술 협력은 계속됩니다. Boltz-2 AI 모델 공동개발, HighRes 자율주행 연구실 협력 등이 여전히 진행 중입니다. 지분 매각은 포트폴리오 리밸런싱으로 보입니다. 기술 파트너십이 유지되는 한 큰 문제는 아닐 것 같습니다." },
  { id: 7, title: "ARK Invest 55만주 추가 매수 — 캐시 우드의 확신", author: "ETF워처", views: 523, createdAt: "2026-02-15T16:45:00Z", content: "ARK Investment가 2026년 2월에만 556,868주를 추가 매수했습니다. 캐시 우드는 AI 기반 신약 개발의 장기 성장성을 높이 평가하고 있으며, Recursion은 ARK Genomic Revolution ETF(ARKG)의 핵심 보유 종목 중 하나입니다." },
  { id: 6, title: "목표가 정리: 뱅크오브아메리카 $6, 기타 애널리스트 의견", author: "증권맨", views: 367, createdAt: "2026-02-05T10:30:00Z", content: "뱅크오브아메리카가 목표가를 7달러에서 6달러로 하향했지만 보류(Hold) 등급을 유지했습니다. 반면 일부 애널리스트는 매수(Buy) 등급을 유지하며 AI 신약 발굴의 가치를 높이 평가하고 있습니다. 현재 주가 대비 업사이드 여력이 있다고 봅니다." },
  { id: 5, title: "Exscientia 인수 효과 — 파이프라인 확장과 매출 27% 증가", author: "M&A전문가", views: 289, createdAt: "2026-01-20T13:15:00Z", content: "6.88억 달러 규모의 Exscientia 인수로 초기 종양학 파이프라인과 정밀 화학 역량이 대폭 강화되었습니다. 연간 매출 27% 증가의 주요 원인이며, 통합 시너지가 본격적으로 나타나고 있습니다." },
  { id: 4, title: "Roche, Sanofi, Bayer, Merck — 빅파마 협력 현황 총정리", author: "제약전문가", views: 612, createdAt: "2026-01-10T09:00:00Z", content: "Recursion의 주요 빅파마 파트너십을 정리합니다. Roche(신경과학/GI종양학, 최대 40개 프로그램), Sanofi(자가면역, 누적 1.3억 달러), Bayer(종양학, LOWE 소프트웨어 베타), Merck KGaA(종양학/면역학). 협력 누적 5억 달러 이상의 현금 유입이 있었습니다." },
  { id: 3, title: "신규 투자자를 위한 Recursion 기업 분석 요약", author: "뉴비가이드", views: 834, createdAt: "2025-12-20T15:00:00Z", content: "Recursion Pharmaceuticals(RXRX)는 AI를 활용하여 신약을 개발하는 TechBio 기업입니다. 50+ 페타바이트 자체 데이터, BioHive 슈퍼컴퓨터, 5개 임상 프로그램을 보유하고 있습니다. 주요 리스크는 임상 실패 가능성과 지속적인 적자이며, 현금 7.5억 달러로 2028년 초까지 운영 가능합니다." },
  { id: 2, title: "FDA의 AI 모델 허용 정책이 Recursion에 미치는 영향", author: "규제분석가", views: 445, createdAt: "2025-11-15T11:30:00Z", content: "FDA가 동물 실험 대신 AI 기반 인간 모델을 신약 개발에 허용하면서, Recursion 같은 AI 바이오 기업에 직접적 수혜가 예상됩니다. 전임상 단계의 속도와 비용 효율성이 크게 개선될 수 있으며, 이는 Recursion의 핵심 경쟁력과 직결됩니다." },
  { id: 1, title: "안녕하세요! 리커전 한국 투자 커뮤니티에 오신 것을 환영합니다", author: "관리자", views: 1205, createdAt: "2025-10-01T08:00:00Z", content: "리커전 파마슈티컬스(RXRX) 한국인 투자 커뮤니티에 오신 것을 환영합니다! 이곳에서 Recursion 관련 투자 정보, 임상시험 업데이트, 주가 분석 등을 함께 나눠주세요. 건전한 토론 문화를 위해 서로 존중하는 대화 부탁드립니다.", isNotice: true },
];

export default function BoardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load posts from localStorage on mount
    const SEED_VERSION = "v2"; // bump this to force reseed
    const storedVersion = localStorage.getItem("rxrx_board_seed_version");
    
    if (storedVersion === SEED_VERSION) {
      // Same version — load user's data
      const savedPosts = localStorage.getItem("rxrx_board_posts");
      if (savedPosts) {
        try {
          const parsed = JSON.parse(savedPosts);
          setPosts(parsed);
        } catch (e) {
          console.error("Failed to parse posts from localStorage", e);
          setPosts(DEFAULT_MOCK_POSTS);
          localStorage.setItem("rxrx_board_posts", JSON.stringify(DEFAULT_MOCK_POSTS));
        }
      } else {
        setPosts(DEFAULT_MOCK_POSTS);
        localStorage.setItem("rxrx_board_posts", JSON.stringify(DEFAULT_MOCK_POSTS));
      }
    } else {
      // New version — reseed
      setPosts(DEFAULT_MOCK_POSTS);
      localStorage.setItem("rxrx_board_posts", JSON.stringify(DEFAULT_MOCK_POSTS));
      localStorage.setItem("rxrx_board_seed_version", SEED_VERSION);
    }
    setIsLoaded(true);
  }, []);

  const handlePostClick = (postId: number) => {
    // Increase view count
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem("rxrx_board_posts", JSON.stringify(updatedPosts));
    
    // Navigate to the post detail page
    router.push(`/board/${postId}`);
  };

  // Prevent hydration mismatch by returning empty structure until client loads
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[500px]">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">자유게시판</h1>
        </div>
      </div>
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
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">자유게시판</h1>
        <Link 
          href="/board/write"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition inline-block"
        >
          글쓰기
        </Link>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/50 border-b-2 border-gray-200/50 text-gray-500">
              <tr>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-24 text-center">번호</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">제목</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">작성자</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-32 text-center">작성일</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider w-28 text-center">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    등록된 게시글이 없습니다. 첫 글을 작성해보세요!
                  </td>
                </tr>
              ) : (
                [...posts].sort((a, b) => {
                  if (a.isNotice && !b.isNotice) return -1;
                  if (!a.isNotice && b.isNotice) return 1;
                  return b.id - a.id; // secondary sort by ID desc
                }).map((post) => (
                  <tr 
                    key={post.id} 
                    onClick={() => handlePostClick(post.id)}
                    className={`transition cursor-pointer ${post.isNotice ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                  >
                    <td className="py-4 px-6 text-gray-500 font-medium text-center">
                      {post.isNotice ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">공지</span>
                      ) : (
                        post.id
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium hover:text-emerald-600 transition truncate max-w-xs sm:max-w-md">
                      {post.isNotice && <span className="text-red-600 font-bold mr-2">[공지]</span>}
                      {post.title}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-center">{post.author}</td>
                    <td className="py-4 px-6 text-gray-500 text-center text-sm">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString("ko-KR") : "ᅳ"}
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-center">{post.views.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="bg-white/40 border-t border-gray-200/50 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">총 {posts.length}개의 게시글</span>
          {posts.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
