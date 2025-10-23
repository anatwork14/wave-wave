"use client";

import { PostCard } from "./post-card";
import { CreatePostCard } from "./create-post-card";

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
    <main className="flex-1 w-full border-r border-border overflow-y-auto">
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border p-4 z-10">
        <h2 className="text-xl font-bold text-[#f66868]">Bài viết cộng đồng</h2>
      </div>

      <div className="p-4 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onVote={onVote} onSave={onSave} />
        ))}
      </div>
    </main>
  );
}
