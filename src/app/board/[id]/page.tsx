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
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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

  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleString("ko-KR", { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit' 
      }) 
    : "날짜 정보 없음";

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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-gray-500 italic">내용이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
