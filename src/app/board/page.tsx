"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  { id: 4, title: "배포후 테스트입니다.", author: "관리자", views: 42, createdAt: new Date().toISOString(), isNotice: true },
  { id: 3, title: "RXRX 주가 분석 의견 나눕니다.", author: "주린이", views: 128, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 2, title: "안녕하세요 가입 인사 드립니다~", author: "뉴비즈", views: 56, createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 1, title: "Recursion 파이프라인 정리 요약", author: "제약전문가", views: 304, createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export default function BoardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load posts from localStorage on mount
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
      // First time visit, initialize with mocks
      setPosts(DEFAULT_MOCK_POSTS);
      localStorage.setItem("rxrx_board_posts", JSON.stringify(DEFAULT_MOCK_POSTS));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">자유게시판</h1>
        <Link 
          href="/board/write"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition inline-block"
        >
          글쓰기
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-gray-500">
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
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
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
  );
}
