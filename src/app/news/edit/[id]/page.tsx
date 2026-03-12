"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface NewsPost {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string;
  content?: string;
  createdAt?: string;
}

export default function NewsEditPage() {
  const router = useRouter();
  const params = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [title, setTitle] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adminStatus = localStorage.getItem("rxrx_admin_logged_in") === "true";
    if (!adminStatus) {
      alert("관리자 권한이 필요합니다.");
      router.push("/news");
      return;
    }
    
    setIsAdmin(true);

    const fetchPost = () => {
      const savedPosts = localStorage.getItem("rxrx_news_posts");
      if (savedPosts) {
        try {
          const posts: NewsPost[] = JSON.parse(savedPosts);
          const found = posts.find(p => p.id === Number(params.id));
          
          if (found) {
            setTitle(found.title);
            if (editorRef.current) {
              editorRef.current.innerHTML = found.content || "";
            }
          } else {
            alert("존재하지 않는 뉴스입니다.");
            router.push("/news");
          }
        } catch (e) {
          console.error("Failed to parse posts", e);
          router.push("/news");
        }
      } else {
        router.push("/news");
      }
      setIsLoaded(true);
    };

    fetchPost();
  }, [params.id, router]);

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (!file) continue;

        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          document.execCommand("insertImage", false, base64);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const content = editorRef.current?.innerHTML || "";
    const textContent = editorRef.current?.textContent || "";

    if (!title.trim() || (!textContent.trim() && !content.includes("<img"))) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const savedPosts = localStorage.getItem("rxrx_news_posts");
    if (savedPosts) {
      const posts: NewsPost[] = JSON.parse(savedPosts);
      const postIndex = posts.findIndex(p => p.id === Number(params.id));
      
      if (postIndex !== -1) {
        posts[postIndex] = {
          ...posts[postIndex],
          title,
          content,
        };
        
        localStorage.setItem("rxrx_news_posts", JSON.stringify(posts));
        alert("뉴스가 수정되었습니다.");
        router.push(`/news/${params.id}`);
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">뉴스 수정</h1>
        <Link 
          href={`/news/${params.id}`}
          className="text-gray-500 hover:text-gray-900 font-medium transition"
        >
          취소
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title row */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              뉴스 제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition font-medium"
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* Editor row */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
              본문
            </label>
            
            {/* WYSIWYG Editor Toolbar */}
            <div className="flex flex-wrap items-center gap-1 bg-gray-50 border border-gray-300 border-b-0 rounded-t-lg px-3 py-2">
              <button
                type="button"
                onClick={() => document.execCommand('bold', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
                title="굵게"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('italic', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
                title="기울임"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4-4-4-4M6 16l-4 4 4 4" /></svg>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('underline', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
                title="밑줄"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3m-9 18h6" /></svg>
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <select
                onChange={(e) => document.execCommand('formatBlock', false, e.target.value)}
                className="bg-transparent text-sm text-gray-700 py-1 focus:outline-none hover:bg-gray-200 rounded px-1 transition cursor-pointer"
                defaultValue="DIV"
              >
                <option value="DIV">일반 본문</option>
                <option value="H1">제목 1</option>
                <option value="H2">제목 2</option>
                <option value="H3">제목 3</option>
              </select>

              <div className="w-px h-6 bg-gray-300 mx-1"></div>

              <button
                type="button"
                onClick={() => document.execCommand('justifyLeft', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16" /></svg>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('justifyCenter', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M4 18h16" /></svg>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('justifyRight', false, '')}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M10 12h10M4 18h16" /></svg>
              </button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              onPaste={handlePaste}
              className="w-full border border-gray-300 rounded-b-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 leading-relaxed min-h-[350px] overflow-y-auto bg-white"
              style={{ outline: "none" }}
              data-placeholder="뉴스 내용을 작성하세요..."
            />
            <style dangerouslySetInnerHTML={{__html: `
              div[contenteditable]:empty:before {
                content: attr(data-placeholder);
                color: #9ca3af;
                pointer-events: none;
                display: block; /* For Firefox */
              }
            `}} />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition shadow-sm"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
