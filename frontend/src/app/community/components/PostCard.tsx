import { Post } from "./types";
import {
  Bookmark,
  Share2,
  Heart,
  MessageCircle,
  FileText,
  BookOpen,
  Eye,
  UserPlus,
  UserCheck,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PostCardProps {
  post: Post;
  onToggleBookmark: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onFollowUser: (userId: string) => void;
}

export default function PostCard({
  post,
  onToggleBookmark,
  onToggleLike,
  onFollowUser,
}: PostCardProps) {
  const timeAgo = formatDistanceToNow(post.timestamp, {
    addSuffix: true,
    locale: vi,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
      className="relative bg-white/80 backdrop-blur-xl rounded-[24px] border-2 border-[#ff978e]/30 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#f66868]/10 transition-all duration-300 group"
      whileHover={{ y: -4 }}
      layout
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f66868]/0 to-[#e14640]/0 group-hover:from-[#f66868]/5 group-hover:to-[#e14640]/5 transition-all duration-300 pointer-events-none" />

      <div className="relative">
        {/* Author Info */}
        <div className="flex items-center justify-between p-[20px] pb-[12px]">
          <div className="flex items-center gap-[12px]">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative size-[48px] rounded-full overflow-hidden cursor-pointer">
                <img
                  alt={post.author.name}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={post.author.avatar}
                />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <p className="font-baloo font-semibold leading-[normal] text-[15px] text-black">
                {post.author.name}
              </p>
              <div className="flex items-center gap-[6px]">
                <p className="font-baloo font-normal leading-[normal] text-[#b1acac] text-[11px]">
                  @{post.author.username}
                </p>
                <span className="text-[#b1acac]">•</span>
                <p className="font-baloo font-normal leading-[normal] text-[#b1acac] text-[11px]">
                  {timeAgo}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-[8px] items-center">
            {!post.author.isFollowing ? (
              <motion.button
                onClick={() => onFollowUser(post.author.id)}
                className="bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[16px] py-[6px] rounded-[12px] flex items-center gap-[6px] shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="size-[14px]" />
                <span className="font-baloo text-[12px]">Theo dõi</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => onFollowUser(post.author.id)}
                className="bg-white/60 backdrop-blur-sm border border-[#e2e2e2] text-[#5b5858] px-[16px] py-[6px] rounded-[12px] flex items-center gap-[6px] hover:border-[#f66868]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserCheck className="size-[14px]" />
                <span className="font-baloo text-[12px]">Đang theo dõi</span>
              </motion.button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="bg-white/60 backdrop-blur-sm border border-[#e2e2e2] p-[6px] rounded-[10px] hover:border-[#f66868] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="size-[16px] text-[#5b5858]" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem className="font-baloo gap-[8px]">
                  <Edit className="size-[14px]" />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem className="font-baloo gap-[8px] text-red-600">
                  <Trash2 className="size-[14px]" />
                  Xóa bài viết
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category and Tags */}
        <div className="px-[20px] pb-[12px]">
          <div className="flex gap-[8px] items-center flex-wrap">
            <motion.div
              className="bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 backdrop-blur-sm flex items-center justify-center px-[12px] py-[5px] relative rounded-[10px]"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-baloo font-semibold leading-[normal] relative shrink-0 text-[#e14640] text-[13px] text-nowrap whitespace-pre">
                {post.category}
              </p>
            </motion.div>
            {post.tags.slice(0, 3).map((tag) => (
              <motion.div
                key={tag}
                className="bg-white/40 backdrop-blur-sm border border-[#ff978e]/20 flex items-center justify-center px-[10px] py-[4px] relative rounded-[8px] hover:border-[#f66868] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-baloo leading-[normal] relative shrink-0 text-[#e14640] text-[11px] text-nowrap whitespace-pre">
                  #{tag}
                </p>
              </motion.div>
            ))}
            {post.tags.length > 3 && (
              <span className="font-baloo text-[11px] text-[#b1acac]">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-[20px] pb-[16px]">
          <motion.div className="flex flex-col gap-[12px]" initial={false}>
            <p className="font-baloo font-bold leading-[1.3] text-[#c73b3b] text-[22px]">
              {post.title}
            </p>
            <p
              className={`font-baloo font-normal leading-[1.6] text-[14px] text-[#5b5858] text-justify transition-all ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {post.content}
            </p>
            {post.content.length > 150 && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-baloo text-[13px] text-[#f66868] hover:text-[#e14640] text-left transition-colors"
                whileHover={{ x: 5 }}
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Post Image */}
        {post.image && (
          <motion.div
            className="px-[20px] pb-[16px]"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-[280px] rounded-[16px] overflow-hidden border-2 border-[#ff978e]/20 cursor-pointer">
              <img
                alt={post.title}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full hover:scale-105 transition-transform duration-500"
                src={post.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Quiz or Syllabus Card */}
        {(post.quiz || post.syllabus) && (
          <div className="px-[20px] pb-[16px]">
            <motion.div
              className="w-full bg-gradient-to-br from-[#fff0f0] to-[#ffe4e4] border-2 border-[#ff978e]/40 rounded-[16px] p-[20px] hover:shadow-xl transition-all cursor-pointer group/card overflow-hidden relative"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f66868]/0 to-[#e14640]/0 group-hover/card:from-[#f66868]/10 group-hover/card:to-[#e14640]/10 transition-all duration-300" />
              <div className="flex items-center gap-[16px] relative z-10">
                <motion.div
                  className="bg-gradient-to-br from-[#f66868] to-[#e14640] p-[14px] rounded-[14px] shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {post.quiz ? (
                    <FileText className="size-[28px] text-white" />
                  ) : (
                    <BookOpen className="size-[28px] text-white" />
                  )}
                </motion.div>
                <div className="flex-1">
                  <p className="font-baloo font-bold text-[17px] text-[#c73b3b] mb-[4px]">
                    {post.quiz?.title || post.syllabus?.title}
                  </p>
                  <p className="font-baloo text-[12px] text-[#5b5858]">
                    {post.quiz &&
                      `${post.quiz.questionCount} câu hỏi • ${post.quiz.difficulty}`}
                    {post.syllabus &&
                      `${post.syllabus.lessonCount} bài học • ${post.syllabus.duration}`}
                  </p>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[20px] py-[10px] rounded-[12px] font-baloo font-semibold shadow-lg whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {post.quiz ? "Làm quiz" : "Xem chi tiết"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-[20px] h-[1px] bg-gradient-to-r from-transparent via-[#ff978e]/30 to-transparent" />

        {/* Interactions */}
        <div className="flex items-center justify-between px-[20px] py-[14px]">
          <div className="flex items-center gap-[12px]">
            <motion.button
              onClick={() => onToggleLike(post.id)}
              className={`flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all ${
                post.isLiked
                  ? "bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 text-[#f66868]"
                  : "bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                className={`size-[18px] ${
                  post.isLiked ? "fill-[#f66868]" : ""
                }`}
              />
              <span className="font-baloo text-[14px]">{post.likes}</span>
            </motion.button>

            <motion.button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="size-[18px]" />
              <span className="font-baloo text-[14px]">{post.comments}</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="size-[18px]" />
              <span className="font-baloo text-[14px]">{post.shares}</span>
            </motion.button>
          </div>

          <motion.button
            onClick={() => onToggleBookmark(post.id)}
            className={`flex items-center gap-[6px] px-[14px] py-[8px] rounded-[12px] transition-all ${
              post.bookmarked
                ? "bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 text-[#f66868]"
                : "bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark
              className={`size-[18px] ${
                post.bookmarked ? "fill-[#f66868]" : ""
              }`}
            />
          </motion.button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t-2 border-[#ff978e]/20"
            >
              <div className="px-[20px] py-[16px] bg-[#fff8f8]/50 backdrop-blur-sm">
                <div className="flex gap-[12px] mb-[16px]">
                  <div className="size-[36px] rounded-full overflow-hidden ring-2 ring-[#ff978e]/20 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      className="w-full bg-white/80 backdrop-blur-sm border border-[#ff978e]/30 rounded-[12px] px-[16px] py-[10px] text-[13px] font-baloo focus:outline-none focus:border-[#f66868] focus:ring-2 focus:ring-[#f66868]/20 transition-all"
                    />
                  </div>
                </div>
                <p className="font-baloo text-[12px] text-[#b1acac] text-center">
                  Chưa có bình luận nào
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
