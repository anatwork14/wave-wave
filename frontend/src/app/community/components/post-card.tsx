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
  FileText,
  BookOpen,
  ExternalLink,
  Calendar,
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
  attachedQuiz?: { id: string; title: string; createdDate: string };
  attachedSyllabus?: { id: string; title: string; createdDate: string };
}

interface PostCardProps {
  post: Post;
  onVote: (postId: number, voteType: "up" | "down") => void;
  onSave: (postId: number) => void;
  onQuizClick?: (quizId: string) => void;
  onSyllabusClick?: (syllabusId: string) => void;
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

export function PostCard({
  post,
  onVote,
  onSave,
  onQuizClick,
  onSyllabusClick,
}: PostCardProps) {
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
    <Card className="p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={post.avatar || "/avatar.png"}
              alt={post.author}
              className="h-11 w-11 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
              width={44}
              height={44}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.author}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className="px-2 py-0.5 bg-[#f66868]/10 dark:bg-[#f66868]/20 text-[#f66868] dark:text-[#ff8585] rounded-full font-medium">
                {post.category}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <MoreHorizontal
            size={18}
            className="text-gray-500 dark:text-gray-400"
          />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Attachments */}
      {(post.attachedQuiz || post.attachedSyllabus) && (
        <div className="mb-4 space-y-3">
          {/* Quiz Attachment */}
          {post.attachedQuiz && (
            <button
              onClick={() => onQuizClick?.(post.attachedQuiz!.id)}
              className="w-full p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {post.attachedQuiz.title}
                    </p>
                    <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Tạo ngày{" "}
                      {new Date(
                        post.attachedQuiz.createdDate
                      ).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )}

          {/* Syllabus Attachment */}
          {post.attachedSyllabus && (
            <button
              onClick={() => onSyllabusClick?.(post.attachedSyllabus!.id)}
              className="w-full p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-600 dark:bg-purple-500 rounded-xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {post.attachedSyllabus.title}
                    </p>
                    <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Tạo ngày{" "}
                      {new Date(
                        post.attachedSyllabus.createdDate
                      ).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
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
        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-800 space-y-4">
          {/* Input */}
          <div className="flex gap-3">
            <img
              src="/avatar.png"
              alt="Bạn"
              className="h-9 w-9 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newComment.trim()) {
                    handleAddComment();
                  }
                }}
                placeholder="Viết bình luận..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f66868] focus:border-transparent outline-none transition-all"
              />
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-[#f66868] to-[#ff5252] hover:from-[#e45a5a] hover:to-[#e44545] text-white rounded-xl px-5 font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
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
                className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="h-9 w-9 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.author}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2.5 text-xs">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 font-medium transition-all ${
                        likedComments.includes(comment.id)
                          ? "text-[#f66868]"
                          : "text-gray-500 dark:text-gray-400 hover:text-[#f66868]"
                      }`}
                    >
                      <Heart
                        size={15}
                        fill={
                          likedComments.includes(comment.id)
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          likedComments.includes(comment.id) ? "scale-110" : ""
                        }
                      />
                      {comment.likes +
                        (likedComments.includes(comment.id) ? 1 : 0)}
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
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
      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
      : "bg-[#f66868]/10 dark:bg-[#f66868]/20 text-[#f66868] dark:text-[#ff8585] hover:bg-[#f66868]/20 dark:hover:bg-[#f66868]/30";

  const buttonContent = (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        active
          ? activeClasses
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      } ${className}`}
    >
      {icon}
      {label !== undefined && <span>{label}</span>}
    </button>
  );

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

  return buttonContent;
}
