"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Heart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "./toast-notification";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface PostCardProps {
  post: Post;
  onVote: (postId: number, voteType: "up" | "down") => void;
  onSave: (postId: number) => void;
}

const SAMPLE_COMMENTS = [
  {
    id: 1,
    author: "Minh Anh",
    avatar: "/abstract-geometric-shapes.png",
    timestamp: "1 giờ trước",
    content: "Bài viết rất hay và bổ ích, cảm ơn bạn!",
    likes: 12,
    replies: 2,
  },
  {
    id: 2,
    author: "Ngọc Huy",
    avatar: "/abstract-geometric-shapes.png",
    timestamp: "30 phút trước",
    content: "Mình đồng ý với ý kiến này 👏",
    likes: 8,
    replies: 1,
  },
];

export function PostCard({ post, onVote, onSave }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [newComment, setNewComment] = useState("");
  const { showToast } = useToast();

  const handleVote = (voteType: "up" | "down") => {
    onVote(post.id, voteType);
    showToast(
      post.userVote === voteType
        ? `${voteType === "up" ? "Đã hủy thích" : "Đã hủy không thích"}`
        : `${
            voteType === "up" ? "Đã thích bài viết" : "Đã không thích bài viết"
          }`,
      "success"
    );
  };

  const handleSave = () => {
    onSave(post.id);
    showToast(
      post.saved ? "Đã gỡ khỏi danh sách lưu" : "Đã lưu bài viết",
      "success"
    );
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}?post=${post.id}`;
      await navigator.clipboard.writeText(url);
      showToast("Đã sao chép liên kết bài viết 📋", "success");
    } catch {
      showToast("Không thể sao chép liên kết", "error");
    }
  };

  const toggleCommentLike = (commentId: number) => {
    setLikedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    showToast("Đã đăng bình luận 💬", "success");
    setNewComment("");
  };

  return (
    <Card className="p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-3">
          <Image
            src={post.avatar || "/avatar.png"}
            alt={post.author}
            className="h-10 w-10 rounded-full ring-2 ring-rose-100 dark:ring-rose-900"
            width={40}
            height={40}
          />
          <div>
            <h3 className="font-semibold text-foreground">{post.author}</h3>
            <p className="text-xs text-muted-foreground">
              {post.timestamp} • {post.category}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-rose-100/50 rounded-lg transition">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-1">
        <h2 className="text-lg font-bold text-rose-700 dark:text-rose-300 mb-1">
          {post.title}
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <ActionButton
          active={post.userVote === "up"}
          icon={<ThumbsUp size={18} />}
          label={post.upvotes}
          onClick={() => handleVote("up")}
          tooltip="Thích"
          activeColor="rose"
        />
        <ActionButton
          active={post.userVote === "down"}
          icon={<ThumbsDown size={18} />}
          label={post.downvotes}
          onClick={() => handleVote("down")}
          tooltip="Không thích"
          activeColor="blue"
        />
        <ActionButton
          icon={<MessageCircle size={18} />}
          label={post.comments}
          onClick={() => setShowComments(!showComments)}
          tooltip="Bình luận"
          active={showComments}
          activeColor="rose"
        />
        <ActionButton
          icon={<Share2 size={18} />}
          label={post.shares}
          onClick={handleShare}
          tooltip="Chia sẻ"
        />
        <ActionButton
          icon={<Bookmark size={18} />}
          active={post.saved}
          onClick={handleSave}
          tooltip={post.saved ? "Bỏ lưu" : "Lưu"}
          className="ml-auto"
          activeColor="rose"
        />
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-rose-100/60 space-y-4">
          {/* Input */}
          <div className="flex gap-3">
            <img src="/avatar.png" alt="Bạn" className="h-8 w-8 rounded-full" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận..."
                className="flex-1 bg-white/80 dark:bg-neutral-800/80 border border-rose-200/50 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-rose-300 outline-none"
              />
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-[#f66868] to-[#ff8585] hover:from-[#e05555] hover:to-[#ff7070] text-white"
              >
                Gửi
              </Button>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-3">
            {SAMPLE_COMMENTS.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-3 rounded-xl bg-rose-50/60 dark:bg-neutral-800/40 border border-rose-100/60 dark:border-rose-900/40 transition"
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">
                      {comment.author}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-foreground/80">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center gap-1 transition ${
                        likedComments.includes(comment.id)
                          ? "text-rose-500"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={
                          likedComments.includes(comment.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                      {comment.likes +
                        (likedComments.includes(comment.id) ? 1 : 0)}
                    </button>
                    <button className="text-muted-foreground hover:text-foreground">
                      Trả lời ({comment.replies})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label?: string | number;
  active?: boolean;
  onClick: () => void;
  tooltip?: string;
  className?: string;
  activeColor?: "rose" | "blue";
}

export function ActionButton({
  icon,
  label,
  active = false,
  onClick,
  tooltip,
  className = "",
  activeColor = "rose",
}: ActionButtonProps) {
  const activeClasses =
    activeColor === "blue"
      ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
      : "bg-rose-100 text-rose-600 hover:bg-rose-200";

  const buttonContent = (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? activeClasses
          : "text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
      } ${className}`}
    >
      {icon}
      {label !== undefined && <span>{label}</span>}
    </button>
  );

  // If tooltip is provided, wrap with Tooltip
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // No tooltip case
  return buttonContent;
}
