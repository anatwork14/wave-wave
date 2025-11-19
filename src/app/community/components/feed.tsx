"use client";
import { PostCard } from "./post-card";
import { Filter, TrendingUp, Clock, Sparkles } from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
  saved: boolean;
  userVote: "up" | "down" | null;
}

interface FeedProps {
  posts: Post[];
  onVote: (postId: number, voteType: "up" | "down") => void;
  onSave: (postId: number) => void;
}

export function Feed({ posts, onVote, onSave }: FeedProps) {
  return (
    <main className="flex-1 w-full">
      {/* Header Section */}
      <div className="sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-10 shadow-sm">
        <div className="p-4 md:p-6">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-[#f66868] to-[#ff5252] rounded-xl shadow-lg shadow-[#f66868]/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f66868] to-[#ff5252] bg-clip-text text-transparent">
              Bài viết cộng đồng
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <FilterTab
              icon={<TrendingUp size={16} />}
              label="Thịnh hành"
              active
            />
            <FilterTab icon={<Clock size={16} />} label="Mới nhất" />
            <FilterTab icon={<Filter size={16} />} label="Theo dõi" />
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="p-4 md:p-6 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onVote={onVote} onSave={onSave} />
        ))}

        {/* Load More Indicator */}
        <div className="flex justify-center py-8">
          <button className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f66868] dark:hover:text-[#f66868] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </main>
  );
}

function FilterTab({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-[#f66868] to-[#ff5252] text-white shadow-md shadow-[#f66868]/20"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
