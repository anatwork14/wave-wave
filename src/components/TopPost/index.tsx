"use client";
import Image from "next/image";
import { Share2, Bookmark, Check } from "lucide-react";
import MarkdownRenderer from "../MarkdownRender";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TopPostProps {
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  title: string;
  tags: string[];
  content: string; // Each item can contain Markdown
}

export default function TopPost({
  authorName,
  authorHandle,
  authorAvatar,
  title,
  tags,
  content,
}: TopPostProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  useEffect(() => {
    if (bookmarked || isShare) {
      const timer = setTimeout(() => {
        setBookmarked(false);
        setIsShare(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookmarked, isShare]);
  return (
    <section className="rounded-2xl border-2 border-[#FF978E] bg-white p-6 shadow-sm text-gray-800 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 transition-all duration-500">
        <span
          className="bg-rose-100 text-[#F66868] border-2 border-[#FF978E] font-semibold px-4 py-1 rounded-lg text-lg 
    transition-all duration-300 ease-in-out hover:bg-[#F66868] hover:text-white"
        >
          Cộng đồng
        </span>

        <span className="text-sm text-gray-600 opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100">
          Bài đăng nổi bật trong 24 giờ qua
        </span>
      </div>
      <hr className="mb-5 border border-rose-300" />
      {/* Author Info */}
      <div className="mb-9">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Image
              src={authorAvatar}
              alt={authorName}
              width={50}
              height={50}
              className="rounded-full border border-rose-200"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{authorName}</h4>
              <p className="text-gray-500 text-sm">@{authorHandle}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 text-rose-500">
            {/* Share Button */}
            <button
              onClick={() => setIsShare(true)}
              className={`p-2 rounded-lg transition-all duration-300 transform flex items-center justify-center
          ${
            isShare
              ? "bg-rose-700 text-white scale-105"
              : "bg-rose-100 text-rose-500 hover:bg-rose-200 hover:text-rose-600"
          }`}
            >
              {isShare ? (
                <Check className="w-6 h-6" />
              ) : (
                <Share2 className="w-6 h-6" />
              )}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => setBookmarked(true)}
              className={`p-2 rounded-lg transition-all duration-300 transform flex items-center justify-center
          ${
            bookmarked
              ? "bg-rose-700 text-white scale-105"
              : "bg-rose-100 text-rose-500 hover:bg-rose-200 hover:text-rose-600"
          }`}
            >
              {bookmarked ? (
                <Check className="w-6 h-6" />
              ) : (
                <Bookmark className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-9">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-1 py-0.5 bg-rose-100 text-[#E14640] text-[10px] rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Post Content (Markdown) */}
      <h2 className="text-2xl font-bold text-[#C73B3B] mb-3">{title}</h2>
      <MarkdownRenderer
        className="hidden 2xl:block"
        content={content.substring(0, 800) + "..."}
      />
      <MarkdownRenderer
        className="block 2xl:hidden"
        content={content.substring(0, 550) + "..."}
      />

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          className="bg-[#C73B3B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-900 transition cursor-pointer"
          href="/community"
        >
          Xem thêm tại TAB Cộng đồng
        </Link>
      </div>
    </section>
  );
}
