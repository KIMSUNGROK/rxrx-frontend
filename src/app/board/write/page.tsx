"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BoardWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

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
          // Insert image HTML at current selection or cursor
          document.execCommand("insertImage", false, base64);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const content = editorRef.current?.innerHTML || "";
    // Check if empty text and no images
    const textContent = editorRef.current?.textContent || "";

    if (!title.trim() || !author.trim() || (!textContent.trim() && !content.includes("<img"))) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      views: 0,
      createdAt: new Date().toISOString(),
    };

    const savedPosts = localStorage.getItem("rxrx_board_posts");
    const posts = savedPosts ? JSON.parse(savedPosts) : [];
    
    // Add new post to the beginning
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem("rxrx_board_posts", JSON.stringify(updatedPosts));

    // Redirect to board
    router.push("/board");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">글쓰기</h1>
        <Link 
          href="/board" 
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
              제목
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

          {/* Author row */}
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-gray-900 mb-2">
              작성자
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition font-medium"
              placeholder="닉네임"
            />
          </div>

          {/* Editor row */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
              본문
            </label>
            <div
              ref={editorRef}
              contentEditable
              onPaste={handlePaste}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 leading-relaxed min-h-[350px] overflow-y-auto bg-white"
              style={{ outline: "none" }}
              data-placeholder="여기에 글을 작성하고 이미지를 붙여넣기 할 수 있습니다..."
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

          {/* Submit button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition shadow-sm"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
