"use client";
import {
  Home,
  MessageSquare,
  Bookmark,
  Plus,
  Users,
  TrendingUp,
  Sparkles,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface SidebarProps {
  onCreatePostClick?: () => void;
}

export function Sidebar({ onCreatePostClick }: SidebarProps) {
  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:flex sticky top-24 self-start flex-col gap-y-4 w-full max-w-[280px]">
        {/* Navigation Card */}
        <Card className="p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f66868]/5 via-transparent to-[#ff5252]/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <nav className="space-y-1 relative z-10">
            <NavItem
              icon={<MessageSquare size={20} />}
              label="Bàn luận"
              active
            />
            <NavItem icon={<Home size={20} />} label="Bài viết của bạn" />
            <NavItem icon={<Bookmark size={20} />} label="Đã lưu" />
            <NavItem icon={<Users size={20} />} label="Đang theo dõi" />
          </nav>
        </Card>

        {/* Create Post Button */}
        <Button
          onClick={onCreatePostClick}
          className="w-full bg-gradient-to-r from-[#f66868] to-[#ff5252] text-white hover:from-[#e45a5a] hover:to-[#e44545] shadow-lg shadow-[#f66868]/30 hover:shadow-xl hover:shadow-[#f66868]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-12 rounded-xl font-semibold group relative overflow-hidden"
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300 relative z-10"
          />
          <span className="ml-2 relative z-10">Tạo Bài viết</span>
        </Button>

        {/* User Profile Card */}
        <Card className="p-5 border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 shadow-sm hover:shadow-lg hover:border-[#f66868]/30 dark:hover:border-[#f66868]/30 transition-all duration-300 group relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f66868]/10 via-[#ff8585]/5 to-[#ff5252]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/avatar.png"
                  alt="Profile"
                  className="h-14 w-14 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-[#f66868]/50 dark:group-hover:ring-[#f66868]/50 transition-all duration-300"
                  width={56}
                  height={56}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base truncate text-gray-900 dark:text-white flex items-center gap-1.5">
                  You
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @yourhandle
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800 group-hover:border-[#f66868]/20 dark:group-hover:border-[#f66868]/20 transition-colors duration-300">
              <Stat label="Bài viết" value="24" />
              <Stat label="Theo dõi" value="1.2K" />
              <Stat label="Đang theo dõi" value="342" />
            </div>
          </div>
        </Card>

        {/* Trending Topics Card */}
        <Card className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative group">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f66868]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-[#f66868] to-[#ff5252] rounded-lg shadow-lg shadow-[#f66868]/20">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                Đang thịnh hành
                <Sparkles className="w-3.5 h-3.5 text-[#f66868]" />
              </h3>
            </div>
            <div className="space-y-2">
              <TrendingItem topic="#ReactJS" posts="1.2K bài viết" rank={1} />
              <TrendingItem topic="#WebDev" posts="856 bài viết" rank={2} />
              <TrendingItem topic="#AI" posts="642 bài viết" rank={3} />
            </div>
          </div>
        </Card>
      </aside>

      {/* 📱 Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-3 px-2 z-50 shadow-2xl">
        <NavIcon icon={<MessageSquare size={22} />} label="Bàn luận" active />
        <NavIcon icon={<Home size={22} />} label="Bài viết" />
        <Button
          onClick={onCreatePostClick}
          size="icon"
          className="rounded-full bg-gradient-to-r from-[#f66868] to-[#ff5252] text-white shadow-2xl shadow-[#f66868]/50 hover:shadow-[#f66868]/60 hover:scale-110 active:scale-95 transition-all duration-300 h-14 w-14 group relative overflow-hidden -mt-6 ring-4 ring-white dark:ring-gray-950"
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-[#f66868] animate-ping opacity-20" />

          <Plus
            size={24}
            className="group-hover:rotate-90 transition-transform duration-300 relative z-10"
          />
        </Button>
        <NavIcon icon={<Bookmark size={22} />} label="Đã lưu" />
        <NavIcon icon={<Users size={22} />} label="Theo dõi" />
      </div>
    </>
  );
}

function NavItem({
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        active
          ? "bg-gradient-to-r from-[#f66868] to-[#ff5252] text-white shadow-md shadow-[#f66868]/20"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <span
        className={`${
          active ? "" : "group-hover:scale-110"
        } transition-transform duration-200`}
      >
        {icon}
      </span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

function NavIcon({
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
      className={`flex flex-col items-center justify-center gap-1.5 min-w-[64px] transition-all duration-300 ${
        active
          ? "text-[#f66868] scale-105"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-105"
      }`}
    >
      <span className={active ? "drop-shadow-md" : ""}>{icon}</span>
      <span
        className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}
      >
        {label}
      </span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-bold text-base text-gray-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

function TrendingItem({
  topic,
  posts,
  rank,
}: {
  topic: string;
  posts: string;
  rank: number;
}) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-amber-500 to-yellow-500";
      case 2:
        return "from-gray-400 to-gray-500";
      case 3:
        return "from-orange-600 to-amber-700";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  return (
    <button className="w-full text-left p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#f66868]/5 hover:to-transparent dark:hover:from-[#f66868]/10 dark:hover:to-transparent transition-all duration-300 group border border-transparent hover:border-[#f66868]/20 dark:hover:border-[#f66868]/30">
      <div className="flex items-center gap-3">
        {/* Rank badge */}
        <div
          className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getRankColor(
            rank
          )} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          <span className="text-white font-bold text-xs">{rank}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#f66868] dark:group-hover:text-[#ff8585] transition-colors truncate">
            {topic}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {posts}
          </p>
        </div>

        {/* Trending indicator */}
        <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-[#f66868] dark:group-hover:text-[#ff8585] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </button>
  );
}
