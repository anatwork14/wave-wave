import { Post } from "./types";
import PostCard from "./PostCard";
import { ArrowUpDown, TrendingUp, Clock, Flame } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  { name: "Tất cả", icon: "🌟" },
  { name: "Tâm sự", icon: "💭" },
  { name: "Chia sẻ", icon: "📢" },
  { name: "Thủ thuật", icon: "💡" },
  { name: "Quiz", icon: "📝" },
  { name: "Syllabus", icon: "📚" },
  { name: "Blog", icon: "✍️" },
];

interface CommunityFeedProps {
  posts: Post[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onToggleBookmark: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onFollowUser: (userId: string) => void;
  sortBy: "recent" | "popular" | "trending";
  onSortChange: (sort: "recent" | "popular" | "trending") => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export default function CommunityFeed({
  posts,
  selectedCategory,
  onCategoryChange,
  onToggleBookmark,
  onToggleLike,
  onFollowUser,
  sortBy,
  onSortChange,
  selectedTags,
  onTagClick,
}: CommunityFeedProps) {
  // Get all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(
    0,
    10
  );

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Header */}
      <motion.div
        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-[12px]">
          <div className="bg-gradient-to-r from-[#f66868] to-[#e14640] box-border content-stretch flex gap-[10px] items-center px-[20px] py-[8px] relative rounded-[16px] shrink-0 shadow-lg shadow-[#f66868]/30">
            <p className="font-baloo font-semibold leading-[normal] relative shrink-0 text-white text-[24px] text-nowrap whitespace-pre">
              Cộng đồng
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-[16px] py-[6px] rounded-[12px] border border-[#ff978e]/30">
            <p className="font-baloo font-normal leading-[normal] relative shrink-0 text-[14px] text-[#5b5858] text-nowrap whitespace-pre">
              {posts.length} bài đăng
            </p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-[8px] items-center">
          <motion.button
            onClick={() => onSortChange("recent")}
            className={`flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ${
              sortBy === "recent"
                ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md"
                : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Clock className="size-[14px]" />
            <span className="font-baloo text-[13px]">Mới nhất</span>
          </motion.button>

          <motion.button
            onClick={() => onSortChange("popular")}
            className={`flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ${
              sortBy === "popular"
                ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md"
                : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="size-[14px]" />
            <span className="font-baloo text-[13px]">Phổ biến</span>
          </motion.button>

          <motion.button
            onClick={() => onSortChange("trending")}
            className={`flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ${
              sortBy === "trending"
                ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md"
                : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="size-[14px]" />
            <span className="font-baloo text-[13px]">Thịnh hành</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap gap-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {categories.map((category, index) => {
          const isActive =
            category.name === "Tất cả"
              ? selectedCategory === null
              : selectedCategory === category.name;

          return (
            <motion.button
              key={category.name}
              onClick={() =>
                onCategoryChange(
                  category.name === "Tất cả" ? null : category.name
                )
              }
              className={`box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[12px] shrink-0 transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-lg shadow-[#f66868]/30"
                  : "bg-white/80 backdrop-blur-sm border border-[#e2e2e2] hover:border-[#f66868] hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-[16px]">{category.icon}</span>
              <p
                className={`font-baloo font-medium leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre`}
              >
                {category.name}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-[8px] items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-baloo text-[13px] text-[#b1acac]">
            Tags phổ biến:
          </span>
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`px-[12px] py-[4px] rounded-[8px] text-[12px] font-baloo transition-all ${
                selectedTags.includes(tag)
                  ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md"
                  : "bg-white/60 backdrop-blur-sm text-[#e14640] border border-[#ff978e]/30 hover:border-[#f66868]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#ff978e]/30 to-transparent w-full" />

      {/* Posts */}
      <div className="flex flex-col gap-[24px]">
        {posts.length === 0 ? (
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-[20px] p-[60px] text-center border border-[#e2e2e2]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-baloo text-[18px] text-[#b1acac]">
              Không tìm thấy bài viết nào 😔
            </p>
          </motion.div>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <PostCard
                post={post}
                onToggleBookmark={onToggleBookmark}
                onToggleLike={onToggleLike}
                onFollowUser={onFollowUser}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
