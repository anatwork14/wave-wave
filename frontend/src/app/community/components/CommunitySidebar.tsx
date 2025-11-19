import { User } from "./types";
import { UserPlus, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface CommunitySidebarProps {
  user: User;
}

export default function CommunitySidebar({ user }: CommunitySidebarProps) {
  const topTopics = [
    { name: "Gia đình", count: 234, trend: "+12%" },
    { name: "Mua sắm", count: 189, trend: "+8%" },
    { name: "Ăn uống", count: 156, trend: "+15%" },
    { name: "Nghề nghiệp", count: 142, trend: "+5%" },
    { name: "Giải trí", count: 128, trend: "+10%" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      {/* User Profile Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-[24px] p-[24px] border-2 border-[#ff978e]/30 shadow-xl overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br from-[#f66868]/10 to-[#e14640]/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex flex-col items-center gap-[16px]">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative size-[90px] rounded-full overflow-hidden">
                <img
                  alt={user.name}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full cursor-pointer"
                  src={user.avatar}
                />
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-[4px]">
              <p className="font-baloo font-bold text-[20px] text-black">
                {user.name}
              </p>
              <p className="font-baloo text-[13px] text-[#b1acac]">
                @{user.username}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-[32px] w-full justify-center pt-[16px] border-t-2 border-[#ffc4c4]/30">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <div className="flex items-center gap-[6px]">
                  <p className="font-baloo font-bold text-[18px] text-[#c73b3b]">
                    {user.posts}
                  </p>
                </div>
                <p className="font-baloo text-[11px] text-[#5b5858]">
                  Bài viết
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <div className="flex items-center gap-[6px]">
                  <p className="font-baloo font-bold text-[18px] text-[#c73b3b]">
                    {user.followers}
                  </p>
                </div>
                <p className="font-baloo text-[11px] text-[#5b5858]">
                  Người theo dõi
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <div className="flex items-center gap-[6px]">
                  <p className="font-baloo font-bold text-[18px] text-[#c73b3b]">
                    {user.following}
                  </p>
                </div>
                <p className="font-baloo text-[11px] text-[#5b5858]">
                  Đang theo dõi
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suggested Users */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-[24px] p-[20px] border-2 border-[#ff978e]/30 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -4 }}
      >
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="bg-gradient-to-r from-[#f66868] to-[#e14640] p-[8px] rounded-[10px]">
              <UserPlus className="size-[16px] text-white" />
            </div>
            <p className="font-baloo font-bold text-[18px] text-[#c73b3b]">
              Gợi ý theo dõi
            </p>
          </div>

          <div className="flex flex-col gap-[12px]">
            {[
              {
                name: "Lan Anh",
                username: "lananh_learning",
                avatar:
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                followers: "1.2k",
              },
              {
                name: "Minh Tuấn",
                username: "minhtuan_sign",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                followers: "890",
              },
              {
                name: "Thu Hà",
                username: "thuha_teach",
                avatar:
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
                followers: "2.3k",
              },
            ].map((suggestedUser, index) => (
              <motion.div
                key={suggestedUser.username}
                className="flex items-center justify-between p-[12px] rounded-[12px] bg-gradient-to-r from-[#fff8f8] to-white hover:from-[#fff0f0] hover:to-[#ffe4e4] transition-all border border-transparent hover:border-[#ff978e]/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-[10px]">
                  <div className="relative size-[40px] rounded-full overflow-hidden ring-2 ring-[#ff978e]/20">
                    <img
                      alt={suggestedUser.name}
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                      src={suggestedUser.avatar}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-baloo font-semibold text-[13px] text-black">
                      {suggestedUser.name}
                    </p>
                    <p className="font-baloo text-[10px] text-[#b1acac]">
                      {suggestedUser.followers} người theo dõi
                    </p>
                  </div>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[14px] py-[6px] rounded-[10px] font-baloo font-semibold text-[12px] shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Theo dõi
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
