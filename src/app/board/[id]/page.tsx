"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: string;
  views: number;
  content?: string;
  createdAt?: string;
  password?: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("rxrx_admin_logged_in") === "true");
    
    const fetchPost = () => {
      const savedPosts = localStorage.getItem("rxrx_board_posts");
      if (savedPosts) {
        try {
          const posts: Post[] = JSON.parse(savedPosts);
          const found = posts.find(p => p.id === Number(params.id));
          
          if (found) {
            setPost(found);
          } else {
            alert("존재하지 않는 게시글입니다.");
            router.push("/board");
          }
        } catch (e) {
          console.error("Failed to parse posts", e);
          router.push("/board");
        }
      } else {
        router.push("/board");
      }
      setIsLoaded(true);
    };

    fetchPost();
  }, [params.id, router]);

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[500px] flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!post) {
    return null; // Handled by useEffect redirect
  }

  const handleEdit = () => {
    if (!isAdmin) {
      const pwd = prompt("게시글 수정 비밀번호(4자리)를 입력하세요:");
      if (pwd === null) return;
      if (pwd !== post.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
    router.push(`/board/edit/${post.id}`);
  };

  const handleDelete = () => {
    if (!isAdmin) {
      const pwd = prompt("게시글 삭제 비밀번호(4자리)를 입력하세요:");
      if (pwd === null) return;
      if (pwd !== post.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    } else {
      if (!confirm("관리자 권한으로 이 게시글을 삭제하시겠습니까?")) return;
    }

    const savedPosts = localStorage.getItem("rxrx_board_posts");
    if (savedPosts) {
      const posts: Post[] = JSON.parse(savedPosts);
      const filtered = posts.filter((p) => p.id !== post.id);
      localStorage.setItem("rxrx_board_posts", JSON.stringify(filtered));
      alert("게시글이 삭제되었습니다.");
      router.push("/board");
    }
  };

  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleString("ko-KR", { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit' 
      }) 
    : "날짜 정보 없음";

  // Auto-link bare URLs in the HTML content, avoiding existing hrefs
  const autoLinkText = (htmlContent: string) => {
    // Regex matches http/https URLs not preceded by href=" or src="
    const urlRegex = /(?<!href="|src=")(https?:\/\/[^\s<]+)/g;
    return htmlContent.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-600 underline hover:text-indigo-800 transition">$1</a>');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header section with back button */}
      <div className="mb-6">
        <Link 
          href="/board" 
          className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center transition"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          목록으로
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        {/* Post Header */}
        <div className="border-b border-gray-100 px-6 py-8 sm:px-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 sm:gap-6">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">작성자:</span>
              {post.author}
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">작성일:</span>
              {formattedDate}
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">조회수:</span>
              {post.views.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-6 py-8 sm:px-10 min-h-[300px]">
          {post.content ? (
            <div 
              className="prose prose-emerald max-w-none text-gray-800"
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: autoLinkText(post.content) }}
            />
          ) : (
            <p className="text-gray-500 italic">내용이 없습니다.</p>
          )}
        </div>
      </div>

      {/* Action Controls - Below Content */}
      <div className="flex justify-end gap-2 mt-6">
        <button 
          onClick={handleEdit}
          className="px-4 py-2 border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg text-sm font-medium transition"
        >
          수정
        </button>
        <button 
          onClick={handleDelete}
          className="px-4 py-2 border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg text-sm font-medium transition"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
