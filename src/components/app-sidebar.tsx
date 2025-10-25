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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useChatStore } from "@/store/useChatStore";
import { formatActor, formatTime } from "@/lib/utils";

// ✅ Demo data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Trang chủ", url: "/", icon: Home, isActive: true },
    { title: "Học tập", url: "/study", icon: BookOpen, isActive: false },
    { title: "Cộng đồng", url: "/community", icon: Globe2, isActive: false },
    { title: "Từ điển", url: "/dictionary", icon: Database, isActive: false },
    {
      title: "Chat Wave",
      url: "/chat",
      icon: MessageSquareCodeIcon,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { chatSessions, setChatSessions, currentChat, setCurrentChat } =
    useChatStore();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setOpen } = useSidebar();
  const router = useRouter();

  // -------------------------------
  // 🔹 Fetch sessions
  // -------------------------------
  async function fetchUserSessions(userId: string) {
    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${userId}`);
    const json = await res.json();
    return json.sessions || [];
  }

  React.useEffect(() => {
    (async () => {
      try {
        const sessions = await fetchUserSessions("1");
        setChatSessions(sessions);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
        setChatSessions([]);
      }
    })();
  }, [setChatSessions]);

  // -------------------------------
  // 🔹 Search filter (case-insensitive)
  // -------------------------------
  const filteredSessions = React.useMemo(() => {
    if (!searchQuery.trim()) return chatSessions;
    const lower = searchQuery.toLowerCase();
    return chatSessions.filter((s) => s.title.toLowerCase().includes(lower));
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
                  <div className="bg-[#F66868]/20 flex size-8 items-center justify-center rounded-lg">
                    <Image src={"logo.svg"} alt="logo" width={24} height={24} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
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
                        } else {
                          router.push(item.url);
                        }
                      }}
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
          <NavUser user={data.user} />
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
              onClick={() => setCurrentChat(null)}
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
          {/* 🔹 Scrollable session list */}
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
                      chat == currentChat && "bg-[#f66868]/40"
                    } `}
                    onClick={() => setCurrentChat(chat)}
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
