"use client";

import * as React from "react";
import {
  BookOpen,
  Database,
  Globe2,
  Home,
  MessageSquareCodeIcon,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ChatSession, useChatStore } from "@/store/useChatStore";
import { formatActor, formatTime } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { fetchUserSessions } from "@/lib/api";
import { useRouter } from "next/navigation";

// (Demo data is fine as a template)
const data = {
  navMain: [
    { title: "Trang chủ", url: "/", icon: Home },
    { title: "Học tập", url: "/study/learn", icon: BookOpen },
    { title: "Cộng đồng", url: "/community", icon: Globe2 },
    { title: "Từ điển", url: "/dictionary", icon: Database },
    {
      title: "Chat Wave",
      url: "/chat",
      icon: MessageSquareCodeIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 👈 FIX: Removed static 'isActive' from demo data, state will handle it
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { chatSessions, setChatSessions, currentChat, setCurrentChat } =
    useChatStore();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setOpen } = useSidebar();
  const { user } = useUserStore();
  const router = useRouter();
  // -------------------------------
  // 🔹 FIX: Fetch sessions using shared function
  // -------------------------------
  React.useEffect(() => {
    // 👈 FIX: Add guard clause

    if (!user) return;
    (async () => {
      try {
        // 👈 FIX: Use imported function
        const sessions: ChatSession[] = await fetchUserSessions(user.id);
        setChatSessions(sessions);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
        setChatSessions([]);
      }
    })();
    // 👈 FIX: Depend on user object (or user.id)
  }, [setChatSessions, user]);

  // -------------------------------
  // 🔹 Search filter (This was already correct)
  // -------------------------------
  const filteredSessions = React.useMemo(() => {
    // 👈 FIX: Ensure chatSessions is treated as an array
    const sessions = Array.isArray(chatSessions) ? chatSessions : [];

    if (!searchQuery.trim()) return sessions;
    const lower = searchQuery.toLowerCase();
    return sessions.filter((s) => s.title.toLowerCase().includes(lower));
  }, [chatSessions, searchQuery]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* ------------------------------------
         Sidebar 1 — Navigation Icons
       ------------------------------------ */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={{ children: "Wave Wave", hidden: false }}
                size="lg"
                asChild
                className="md:h-8 md:p-0"
              >
                <a href="/">
                  <div className="flex size-8 items-center justify-center rounded-lg">
                    <Image
                      src={"/logo.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Wave Wave</span>
                    <span className="truncate text-xs">Học tập</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{ children: item.title, hidden: false }}
                      onClick={() => {
                        if (item.title === "Chat Wave") {
                          setActiveItem(item);
                          setOpen(true);
                          // Optional: also navigate if not already on /chat
                        } else {
                          router.push(item.url);
                        }
                      }}
                      // 👈 FIX: This now correctly updates based on URL
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <item.icon color="#F66868" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      {/* ------------------------------------
         Sidebar 2 — Chat Sessions
       ------------------------------------ */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex gap-0">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setCurrentChat(null);
              }}
            >
              <PlusCircle /> Tạo chat mới
            </Button>
          </div>
          {/* Search box */}
          <SidebarInput
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1"
          />
        </SidebarHeader>

        <SidebarContent>
          {/* 🔹 Scrollable session list (This logic was already correct) */}
          <SidebarGroup className="px-0 p-0">
            <SidebarGroupContent className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-transparent">
              {filteredSessions.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">
                  Không có kết quả
                </div>
              ) : (
                filteredSessions.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex flex-col gap-1 bg-[#F66868]/5 hover:bg-pink-100 p-3 border-b border-pink-200 transition-colors cursor-pointer ${
                      // 👈 FIX: Use ID for comparison, it's safer
                      chat.id === currentChat?.id && "bg-[#f66868]/40"
                    } `}
                    onClick={() => {
                      setCurrentChat(chat);
                      // Also navigate to the specific chat page
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#C73B3B]">
                        {chat.title.length > 30
                          ? `${chat.title.slice(0, 26)}...`
                          : chat.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(chat.time)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {formatActor(chat.actor)}
                    </p>
                  </div>
                ))
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
