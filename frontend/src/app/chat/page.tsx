"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
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
import { usePromptStore } from "@/store/useUserPrompt";

// -------------------------------------------
// 🔹 Helper Functions
// -------------------------------------------

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
  const router = useRouter(); // 👈 Added router for URL updates
  const chatName = decodeURIComponent(pathname.replace(/^\/chat\/?/, ""));

  const { prompt } = usePromptStore();
  const [input, setInput] = useState(prompt);

  const {
    currentChat,
    setCurrentChat,
    addMessage,
    setChatSessions,
    chatSessions, // 👈 Need access to current list to prepend new chat
    setAssistantTyping,
    setCurrentChatMessages,
    newestChat,
    setNewestChat,
  } = useChatStore();

  const { user } = useUserStore();
  useEffect(() => {
    // If newestChat is true AND we have at least one session AND the current chat is not already the first one
    if (
      newestChat &&
      chatSessions.length > 0 &&
      currentChat?.id !== chatSessions[0].id
    ) {
      const firstChat = chatSessions[0]; // 1. Set the first chat as the current chat
      setCurrentChat(firstChat); // 2. Update the URL to match the new chat's ID/title
    } // DEPENDENCIES: Only re-run if newestChat flag changes, or the list of sessions changes // If the chatSessions list is updated (e.g., a new chat is prepended), this will run.
  }, [newestChat, chatSessions, setCurrentChat, currentChat?.id]);
  // -----------------------------------------------
  // ⭐ OPTIMIZED handleSend FUNCTION ⭐
  // -----------------------------------------------
  async function handleSend(messageText: string) {
    if (!user || !messageText.trim()) return;

    const isNewChat = !currentChat || currentChat.id === "-1";

    // 1. Create User Bubble
    const userBubble: Message = {
      role: "user",
      content: messageText,
    };

    // 2. UI Updates: Clear input & Show typing
    setInput("");
    setAssistantTyping(true);

    // 3. Prepare Optimistic State
    // If it's a new chat, we use a temp ID. If existing, we use the real ID.
    let activeSessionId = isNewChat ? "-1" : currentChat.id;

    // If existing chat, update UI immediately
    if (!isNewChat) {
      addMessage(activeSessionId, userBubble);
    } else {
      // Set temporary optimistic chat for visual feedback
      setCurrentChat({
        id: "-1",
        title: "New Chat",
        time: new Date().toISOString(),
        actor: formatActor(`You: ${messageText}`),
        messages: [userBubble],
      });
    }

    try {
      // 4. API Call
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`, // Ensure this env var is set, or use hardcoded URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            user_id: user.id,
            session_id: isNewChat ? null : activeSessionId,
          }),
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      // Expected response: { user_id, session_id, response }
      const data = await res.json();

      // 5. Create Assistant Bubble
      const assistantBubble: Message = {
        role: "assistant",
        content: data.response,
      };

      if (isNewChat) {
        // --- HANDLE NEW CHAT EFFICIENTLY ---

        const newSessionId = data.session_id;

        // Construct the full session object manually
        // This avoids fetching ALL sessions from the DB again
        const newSession: ChatSession = {
          id: newSessionId,
          title: messageText.slice(0, 30) || "New Chat", // Simple title generation
          time: new Date().toISOString(),
          actor: formatActor(data.response),
          messages: [userBubble, assistantBubble],
        };

        // Update Store: Prepend new session to the list
        setChatSessions([newSession, ...chatSessions]);

        // Set as Current Chat
        setCurrentChat(newSession);

        // Update URL without page reload
      } else {
        // --- HANDLE EXISTING CHAT ---
        addMessage(activeSessionId, assistantBubble);

        // Update the specific session in the sidebar list (to update timestamp/preview)
        const updatedSessions = chatSessions.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                actor: formatActor(data.response),
                time: new Date().toISOString(),
              }
            : s
        );
        setChatSessions(updatedSessions);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      const errorBubble: Message = {
        role: "assistant",
        content: "Sorry, I ran into an error. Please check your connection.",
      };

      // Add error to whatever chat is currently active (temp or real)
      if (useChatStore.getState().currentChat) {
        addMessage(useChatStore.getState().currentChat!.id, errorBubble);
      }
    } finally {
      setAssistantTyping(false);
    }
  }

  // -----------------------------------------------
  // ⭐ FIXED useEffect LOGIC ⭐
  // -----------------------------------------------

  // Define fetch logic outside useEffect to keep it clean
  const fetchSessionEvents = useCallback(
    async (session_id: string) => {
      if (!user?.id) return [];
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:8000"
          }/api/sessions/${user.id}/${session_id}`
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.events || [];
      } catch (err) {
        console.error(err);
        return [];
      }
    },
    [user?.id]
  );

  useEffect(() => {
    // 1. Safety Checks
    if (
      !currentChat ||
      currentChat.id === "-1" || // Ignore optimistic temp chat
      !user?.id
    ) {
      return;
    }

    // 2. Prevent refetching if we already have messages
    // (e.g., immediately after creating a new chat via handleSend)
    if (currentChat.messages && currentChat.messages.length > 0) {
      // Optional: You might want to fetch anyway to sync, but checking length saves bandwidth
      // return;
    }

    const session_id = String(currentChat.id);

    const loadMessages = async () => {
      const events = await fetchSessionEvents(session_id);

      // Regex Parsing
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

      // Only update if we actually got data, otherwise we might wipe optimistic updates
      if (parsedEvents.length > 0) {
        setCurrentChatMessages(currentChat.id, parsedEvents);
      }
    };

    loadMessages();
  }, [currentChat?.id, user?.id, setCurrentChatMessages, fetchSessionEvents]);
  // Only re-run if ID changes, not the whole currentChat object content

  // --- UI ---
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "350px" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="bg-background sticky top-0 flex items-center w-full gap-2 border-b p-4 z-10">
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
          {/* Help Button Code... */}
          <div className="absolute right-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#F66868] hover:bg-[#F66868]/10"
                >
                  <HelpCircle />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="p-3 text-sm max-w-[240px]"
              >
                <DropdownMenuLabel className="font-semibold text-center mb-2">
                  Chat Wave là gì?
                </DropdownMenuLabel>
                <p>🌊 Tại đây, bạn có thể trò chuyện với Miniwave...</p>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Chat Hero Section */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          <div className="flex-1 flex items-center justify-center h-full">
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
          <div className="absolute bottom-full left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

          <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 p-4">
            <div className="max-w-3xl w-full mx-auto mb-5">
              <div className="relative group">
                <InputGroup>
                  <InputGroupTextarea
                    placeholder="Bắt đầu cuộc trò chuyện với Miniwave..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(input);
                      }
                    }}
                    rows={3}
                    className="resize-none border-0 focus:ring-0 bg-transparent py-4 px-5 max-h-[150px] overflow-y-auto rounded-2xl"
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
                          className={`relative overflow-hidden px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 group/send ${
                            input.trim()
                              ? "bg-[#f66868] text-white shadow-lg cursor-pointer hover:scale-105 active:scale-95"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {input.trim() && (
                            <div className="absolute inset-0 bg-[#ff5252] opacity-0 group-hover/send:opacity-100 transition-opacity duration-500" />
                          )}
                          <span className="relative z-10 flex items-center gap-2">
                            Gửi <SendHorizonal className="w-4 h-4" />
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
