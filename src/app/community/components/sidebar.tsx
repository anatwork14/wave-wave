"use client";

import { Home, MessageSquare, Bookmark, Plus, Users } from "lucide-react";
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
      <aside className="hidden lg:flex sticky top-24 self-start flex-col gap-y-6 border-r border-border p-4 lg:p-6 w-full max-w-[260px] h-fit">
        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <NavItem icon={<MessageSquare size={20} />} label="Bàn luận" active />
          <NavItem icon={<Home size={20} />} label="Bài viết của bạn" />
          <NavItem icon={<Bookmark size={20} />} label="Đã lưu" />
          <NavItem icon={<Users size={20} />} label="Đang theo dõi" />
        </nav>

        {/* Create Post Button */}
        <Button
          onClick={onCreatePostClick}
          className="w-full bg-[#f66868] text-white hover:bg-[#e45a5a] transition-all"
        >
          <Plus size={20} />
          <span className="ml-1">Tạo Bài viết</span>
        </Button>

        {/* User Profile Card */}
        <Card className="p-4 border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/avatar.png"
              alt="Profile"
              className="h-12 w-12 rounded-full"
              width={48}
              height={48}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">You</p>
              <p className="text-xs text-muted-foreground">@yourhandle</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t">
            <Stat label="Bài viết" value="24" />
            <Stat label="Ng theo dõi" value="1.2K" />
            <Stat label="Đang theo dõi" value="342" />
          </div>
        </Card>
      </aside>

      {/* 📱 Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 px-3 z-50">
        <NavIcon icon={<MessageSquare size={22} />} label="Bàn luận" active />
        <NavIcon icon={<Home size={22} />} label="Bài viết" />
        <Button
          onClick={onCreatePostClick}
          size="icon"
          className="rounded-full bg-[#f66868] text-white shadow-lg hover:bg-[#e45a5a]"
        >
          <Plus size={22} />
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-[#f66868] text-white shadow-sm"
          : "text-foreground hover:bg-muted"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
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
      className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
        active
          ? "text-[#f66868]"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-[11px]">{label}</span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-bold text-sm text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
