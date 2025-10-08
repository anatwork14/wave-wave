"use client";

import * as React from "react";
import {
  BookOpen,
  Command,
  Database,
  Globe2,
  Home,
  MessageSquareCodeIcon,
  PlusCircle,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

// ✅ Sample data
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
  chat_sessions: [
    {
      id: 1,
      title: "Meeting Tomorrow",
      summary: `Reminder about tomorrow’s meeting at 10 AM`,
      time: "09:34 AM",
      messages: [
        {
          role: "user",
          content:
            "Hi team, just a reminder about our meeting tomorrow at 10 AM. Please come prepared with your project updates.",
        },
        {
          role: "assistant",
          content:
            "Got it! I’ll remind the team to bring their updates to the 10 AM meeting tomorrow.",
        },
      ],
    },
    {
      id: 2,
      title: "Project Update Discussion",
      summary: "Follow-up on project progress and next steps.",
      time: "Yesterday",
      messages: [
        {
          role: "user",
          content:
            "Thanks for the update. The progress looks great so far. Let's schedule a call to discuss the next steps.",
        },
        {
          role: "assistant",
          content:
            "Sounds good! I can help outline the next steps before your call with Alice.",
        },
      ],
    },
    {
      id: 3,
      title: "Weekend Team Outing",
      summary: "Planning a weekend activity — hiking or beach day?",
      time: "2 days ago",
      messages: [
        {
          role: "user",
          content:
            "Hey everyone! I'm thinking of organizing a team outing this weekend. Would you be interested in a hiking trip or a beach day?",
        },
        {
          role: "assistant",
          content:
            "A beach day sounds relaxing! I can help you plan the itinerary if you’d like.",
        },
      ],
    },
    {
      id: 4,
      title: "Budget Adjustment Question",
      summary: "Discussion about potential budget adjustments.",
      time: "2 days ago",
      messages: [
        {
          role: "user",
          content:
            "I've reviewed the budget numbers you sent over. Can we set up a quick call to discuss some potential adjustments?",
        },
        {
          role: "assistant",
          content:
            "Sure! I can help you run through possible budget adjustments before your call.",
        },
      ],
    },
    {
      id: 5,
      title: "Company Announcement",
      summary: "All-hands meeting update — big news ahead!",
      time: "1 week ago",
      messages: [
        {
          role: "user",
          content:
            "Please join us for an all-hands meeting this Friday at 3 PM. We have some exciting news to share about the company's future.",
        },
        {
          role: "assistant",
          content:
            "Exciting! Want me to draft a quick summary of the announcement for your newsletter?",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [sessions, setSessions] = React.useState(data.chat_sessions);
  const { setOpen } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Sidebar 1 (Navigation Icons) */}
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
                  <div className="bg-[#F66868]/20 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
                          const shuffled = [...data.chat_sessions].sort(
                            () => Math.random() - 0.5
                          );
                          setSessions(
                            shuffled.slice(
                              0,
                              Math.max(5, Math.floor(Math.random() * 10) + 1)
                            )
                          );
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

      {/* Sidebar 2 (Chat List) */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex gap-0">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <Button variant="default" size="sm">
              <PlusCircle /> Tạo chat mới
            </Button>

            <Label className="flex items-center gap-2 text-sm">
              <span>Save</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0 p-0">
            <SidebarGroupContent>
              {sessions.map((chat) => (
                <a
                  href="#"
                  key={chat.id}
                  className="flex flex-col gap-1 bg-[#F66868]/5 hover:bg-pink-100 p-3 border-b border-pink-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#C73B3B]">
                      {chat.title}
                    </span>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-600">{chat.summary}</p>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
