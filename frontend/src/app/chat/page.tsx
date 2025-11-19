"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SendHorizonal, HelpCircle, Sparkles } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ChatSession, Message, useChatStore } from "@/store/useChatStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import ChatArea from "./chatArea";

// -------------------------------------------
// 🔹 Helper Functions
// (These are fine, assuming they are moved to a lib file)
// -------------------------------------------

async function fetchUserSessions(userId: string): Promise<ChatSession[]> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch sessions");
    const json = await res.json();
    return (json.sessions || []) as ChatSession[];
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return [];
  }
}

function formatActor(actorMessage: string): string {
  if (!actorMessage) return "No messages yet";
  const prefix = actorMessage.startsWith("You:") ? "" : "Miniwave: ";
  return `${prefix}${actorMessage.slice(0, 40)}...`;
}

// -------------------------------------------
// 🔹 Page Component
// -------------------------------------------

export default function Page() {
  const pathname = usePathname();
  const chatName = decodeURIComponent(pathname.replace(/^\/chat\/?/, ""));

  const [input, setInput] = useState("");

  const {
    currentChat,
    setCurrentChat,
    addMessage,
    setChatSessions,
    setAssistantTyping,
    setCurrentChatMessages,
  } = useChatStore();
  const { user } = useUserStore();
  console.log("CurrentChat: ", currentChat);
  // -----------------------------------------------
  // ⭐ FIXED handleSend FUNCTION ⭐
  // -----------------------------------------------
  async function handleSend(messageText: string) {
    if (!user || !messageText.trim()) {
      return;
    }

    const isNewChat = currentChat === null;

    // 1. Create the user's message bubble
    // 👈 FIX: Removed 'id' field to match your store's Message type
    const userBubble: Message = {
      role: "user",
      content: messageText,
    };

    // 2. Clear input and show typing indicator
    setInput("");
    setAssistantTyping(true);

    let tempChatId: string | null = null; // To hold the ID for the catch block

    try {
      if (isNewChat) {
        // --- Handle NEW Chat ---

        // 1. Optimistically create a temp chat and set it
        // 👈 FIX: Used `id: -1` (number) instead of "temp_chat_id" (string)
        const tempChat: ChatSession = {
          id: -1,
          title: "New Chat",
          time: new Date().toISOString(),
          actor: formatActor(`You: ${messageText}`),
          messages: [userBubble],
        };
        tempChatId = tempChat.id;
        setCurrentChat(tempChat);
        // Note: We don't add to chatSessions list yet

        // 2. Call backend (session_id is null)
        const res = await fetch("http://127.0.0.1:8000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            user_id: user.id,
            session_id: null,
          }),
        });

        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json(); // { user_id, session_id, response }

        // 3. "Reload" state from server
        const newSessions = await fetchUserSessions(user.id);
        setChatSessions(newSessions);

        // 4. Find and set the *real* chat as active
        const newChat = newSessions.find((s) => s.id === data.session_id);
        if (newChat) {
          // This triggers the `useEffect` to fetch real messages
          setCurrentChat(newChat);
        }
      } else if (currentChat) {
        const sessionId = currentChat.id; // freeze the ID
        tempChatId = sessionId;

        // optimistic update
        addMessage(sessionId, userBubble);

        try {
          const res = await fetch("http://127.0.0.1:8000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: messageText,
              user_id: user.id,
              session_id: sessionId,
            }),
          });

          if (!res.ok) throw new Error("Network error");
          const data = await res.json();

          const assistantBubble: Message = {
            role: "assistant",
            content: data.response,
          };

          addMessage(sessionId, assistantBubble);

          const currentSessions = useChatStore.getState().chatSessions;
          const updatedSessions = currentSessions.map((s) =>
            s.id === currentChat.id
              ? {
                  ...s,
                  actor: formatActor(data.response),
                  time: new Date().toISOString(),
                }
              : s
          );

          // Now pass the final, updated array to the setter
          setChatSessions(updatedSessions);
        } catch (err) {
          addMessage(sessionId, {
            role: "assistant",
            content: "Sorry, I ran into an error. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      // 👈 FIX: Create error bubble without 'id'
      const errorBubble: Message = {
        role: "assistant",
        content: "Sorry, I ran into an error. Please try again.",
      };

      // 👈 FIX: Use the stored chat ID (either temp or real) to add the error message
      if (tempChatId !== null) {
        addMessage(tempChatId, errorBubble);
      }
    } finally {
      // 5. Stop the typing indicator
      setAssistantTyping(false);
    }
  }

  // -----------------------------------------------
  // ⭐ FIXED useEffect LOGIC ⭐
  // -----------------------------------------------
  useEffect(() => {
    async function fetchSessionEvents(session_id: string | undefined) {
      if (!session_id || !user?.id) return []; // Added user?.id guard
      const res = await fetch(
        `http://127.0.0.1:8000/api/sessions/${user.id}/${session_id}`
      );

      if (!res.ok) {
        console.error(
          "Failed to fetch session events:",
          res.status,
          res.statusText
        );
        return [];
      }

      const json = await res.json();
      const events = json.events || [];
      console.log("Fetched raw events:", json);

      // (Your parsing logic is correct and remains unchanged)
      const quizRegex = /\[QuizID: ([^\]]+)\]/;
      const syllabusRegex = /\[SyllabusID:([^\]]+)\]/;
      const videoRegex = /(https?:\/\/[^\s]+\.mp4)/;

      const parsedEvents = events.map((message: Message) => {
        if (message.role === "assistant" && message.content) {
          const quizMatch = message.content.match(quizRegex);
          const syllabusMatch = message.content.match(syllabusRegex);
          const videoMatch = message.content.match(videoRegex);

          return {
            ...message,
            quiz: (quizMatch && quizMatch[1]) || null,
            syllabus: (syllabusMatch && syllabusMatch[1]) || null,
            video: (videoMatch && videoMatch[1]) || null,
          };
        }
        return message;
      });

      return parsedEvents;
    }

    // 👈 FIX: Guard now checks for the numeric ID `-1`
    if (
      !currentChat || // No chat selected
      currentChat.id === "-1" || // Don't fetch for temp chat
      (currentChat.messages && currentChat.messages.length > 0) // Messages already loaded
    ) {
      return;
    }

    const session_id = String(currentChat.id);

    const loadMessages = async () => {
      try {
        const events = await fetchSessionEvents(session_id);
        setCurrentChatMessages(currentChat.id, events);
        console.log("Saved parsed events to store:", events);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      }
    };

    loadMessages();
  }, [currentChat, setCurrentChatMessages]); // Added user?.id dependency

  // --- UI ---
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "350px" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        {/* Header (Unchanged) */}
        <header className="bg-background sticky top-0 flex items-center w-full gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/chat">Chat Wave</BreadcrumbLink>
              </BreadcrumbItem>
              {chatName && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{chatName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="absolute right-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#F66868] hover:bg-[#F66868]/10 hover:text-[#F66868]/80 cursor-pointer transition-all duration-300"
                >
                  <HelpCircle />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="p-3 text-sm leading-relaxed max-w-[240px]"
              >
                <DropdownMenuLabel className="font-semibold text-center mb-2">
                  Chat Wave là gì?
                </DropdownMenuLabel>
                <p>
                  🌊 Tại đây, bạn có thể trò chuyện với Miniwave bằng ngôn ngữ
                  ký hiệu, luyện tập qua hội thoại, tạo quiz vui nhộn và học
                  theo giáo trình riêng.
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                  Hãy bắt đầu gõ tin nhắn để Miniwave cùng bạn học nhé!
                </p>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Chat Hero Section (Unchanged) */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center h-full">
            {currentChat ? (
              <ChatArea messages={currentChat.messages} />
            ) : (
              <div className="flex flex-col items-center">
                <Image
                  src="/capybara.svg"
                  alt="hero_section_chat"
                  width={280}
                  height={280}
                  className="select-none item-justify-center my-auto"
                />
                <div className="text-center mt-4 text-gray-500">
                  <h2 className="text-4xl font-semibold mb-2 text-black">
                    Chào mừng đến với{" "}
                    <span className="text-[#F66868] font-bold">Chat Wave</span>
                  </h2>
                  <p className="mb-4 text-lg">
                    Chọn một cuộc trò chuyện hoặc tạo cuộc trò chuyện mới cùng{" "}
                    <b>Miniwave</b>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Section */}
        <div className="sticky bottom-0 left-0 right-0 z-50">
          {/* Gradient fade effect */}
          <div className="absolute bottom-full left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

          <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 p-4">
            <div className="max-w-3xl w-full mx-auto mb-5">
              {/* Input wrapper with glow effect */}
              <div className="relative group">
                <div className="">
                  <InputGroup>
                    <InputGroupTextarea
                      placeholder="Bắt đầu cuộc trò chuyện với Miniwave..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={3}
                      className="resize-none border-0 focus:ring-0 bg-transparent py-4 px-5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600 rounded-2xl"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#d1d5db transparent",
                      }}
                    />

                    <InputGroupAddon
                      align="inline-end"
                      className="flex items-center gap-2 px-4 pb-3"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleSend(input)}
                            disabled={!input.trim()}
                            className={`
                      relative overflow-hidden px-5 py-2.5 rounded-full font-semibold text-sm
                      transition-all duration-300 flex items-center gap-2 group/send
                      ${
                        input.trim()
                          ? "bg-[#f66868] text-white shadow-lg cursor-pointer hover:scale-105 active:scale-95"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      }
                    `}
                          >
                            {input.trim() && (
                              <div className="absolute inset-0 bg-[#ff5252] opacity-0 group-hover/send:opacity-100 transition-opacity duration-500" />
                            )}

                            <span className="relative z-10 flex items-center gap-2">
                              Gửi
                              <SendHorizonal className="w-4 h-4 group-hover/send:translate-x-0.5 transition-transform duration-200" />
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {input.trim()
                            ? "Gửi tin nhắn (Enter)"
                            : "Nhập nội dung để gửi"}
                        </TooltipContent>
                      </Tooltip>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* Bottom Info Text */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Miniwave có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
              </span>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
