"use client";

import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { Feed } from "./components/feed";
import { CreatePostModal } from "./components/create-post-modal";
import { ToastContainer } from "./components/toast-notification";

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Anderson",
      avatar: "/professional-woman-diverse.png",
      timestamp: "2h ago",
      title: "Tips for Effective Remote Work",
      content:
        "After working remotely for 3 years, I've learned that having a dedicated workspace is crucial. Here are my top 5 tips for staying productive and maintaining work-life balance...",
      category: "Productivity",
      upvotes: 234,
      downvotes: 12,
      comments: 45,
      shares: 28,
      saved: false,
      userVote: null,
    },
    {
      id: 2,
      author: "James Chen",
      avatar: "/professional-man.jpg",
      timestamp: "4h ago",
      title: "New Framework Release: React 19",
      content:
        "Excited to announce the release of React 19! This version includes significant performance improvements, better error handling, and new hooks for state management. Check out the migration guide...",
      category: "Technology",
      upvotes: 512,
      downvotes: 8,
      comments: 89,
      shares: 156,
      saved: false,
      userVote: null,
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "/professional-woman-glasses.png",
      timestamp: "6h ago",
      title: "Design System Best Practices",
      content:
        "Building a scalable design system requires careful planning and documentation. In this post, I'll share the lessons learned from creating a design system used by 50+ teams...",
      category: "Design",
      upvotes: 189,
      downvotes: 5,
      comments: 32,
      shares: 67,
      saved: false,
      userVote: null,
    },
  ]);

  const handleVote = (postId: number, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newPost = { ...post };
          if (post.userVote === voteType) {
            newPost.userVote = null;
            if (voteType === "up") newPost.upvotes--;
            else newPost.downvotes--;
          } else {
            if (post.userVote === "up") newPost.upvotes--;
            if (post.userVote === "down") newPost.downvotes--;
            newPost.userVote = voteType;
            if (voteType === "up") newPost.upvotes++;
            else newPost.downvotes++;
          }
          return newPost;
        }
        return post;
      })
    );
  };

  const handleSave = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  const handleCreatePost = (newPost: {
    title: string;
    content: string;
    category: string;
  }) => {
    const post = {
      id: posts.length + 1,
      author: "You",
      avatar: "/diverse-user-avatars.png",
      timestamp: "now",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      shares: 0,
      saved: false,
      userVote: null,
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen w-full bg-background mt-20 flex flex-col">
      {/* Modals & Toasts */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
      <ToastContainer />

      {/* Main Grid Layout */}
      <div className="w-full flex-1 grid grid-cols-12 gap-6 px-4 md:px-6">
        {/* Left Sidebar */}
        <div className="lg:block lg:col-span-3">
          <Sidebar onCreatePostClick={() => setIsModalOpen(true)} />
        </div>

        {/* Feed */}
        <div className="col-span-12 lg:col-span-9">
          <Feed posts={posts} onVote={handleVote} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
