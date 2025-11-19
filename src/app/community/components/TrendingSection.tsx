import { Post } from "./types";
import { Flame, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface TrendingSectionProps {
  posts: Post[];
}

export default function TrendingSection({ posts }: TrendingSectionProps) {
  // Get top 3 trending posts based on engagement
  const trendingPosts = [...posts]
    .sort((a, b) => {
      const aScore = a.likes + a.comments * 2 + a.shares * 3;
      const bScore = b.likes + b.comments * 2 + b.shares * 3;
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl rounded-[24px] p-[20px] border-2 border-[#ff978e]/30 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[8px]">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-[8px] rounded-[10px]">
            <Flame className="size-[16px] text-white" />
          </div>
          <p className="font-baloo font-bold text-[18px] text-[#c73b3b]">
            Bài viết hot
          </p>
        </div>

        <div className="flex flex-col gap-[12px]">
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="p-[14px] rounded-[14px] bg-gradient-to-r from-[#fff8f8] to-white hover:from-[#fff0f0] hover:to-[#ffe4e4] transition-all cursor-pointer border border-transparent hover:border-[#ff978e]/30 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex gap-[10px]">
                <div className="relative">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-[10px] size-[36px] flex items-center justify-center shadow-md">
                    <span className="font-baloo font-bold text-[14px] text-white">
                      {index + 1}
                    </span>
                  </div>
                  {index === 0 && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="text-[16px]">🔥</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-baloo font-semibold text-[13px] text-[#c73b3b] line-clamp-2 mb-[6px] group-hover:text-[#f66868] transition-colors">
                    {post.title}
                  </p>

                  <div className="flex items-center gap-[8px] text-[11px] text-[#b1acac]">
                    <div className="flex items-center gap-[4px]">
                      <span>❤️</span>
                      <span className="font-baloo">{post.likes}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-[4px]">
                      <span>💬</span>
                      <span className="font-baloo">{post.comments}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-[4px]">
                      <span>👁️</span>
                      <span className="font-baloo">{post.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-[6px] mt-[6px]">
                    <div className="size-[20px] rounded-full overflow-hidden ring-1 ring-[#ff978e]/30">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-baloo text-[10px] text-[#b1acac]">
                      @{post.author.username}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
