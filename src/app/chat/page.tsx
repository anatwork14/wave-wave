"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Camera, Upload, SendHorizonal, HelpCircle } from "lucide-react";

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
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Message, useChatStore } from "@/store/useChatStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import ChatArea from "./chatArea";

type ChatMode = "Auto" | "Conversation" | "Syllabus" | "Quiz";

export default function Page() {
  const pathname = usePathname();
  const chatName = decodeURIComponent(pathname.replace(/^\/chat\/?/, "")); // cleaner extraction

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("Auto");
  const [tokenUsage, setTokenUsage] = useState(0);
  const chatModes: ChatMode[] = ["Auto", "Conversation", "Syllabus", "Quiz"];
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isStreaming, setIsStreaming] = useState(false); // For WebSocket state
  const wsRef = useRef<WebSocket | null>(null);
  // This is the correct frontend call to match the backend fix
  const {
    currentChat,
    setCurrentChat,
    addMessage,
    setChatSessions,
    chatSessions,
    setAssistantTyping,
    setAssistantMessageContent,
    setCurrentChatMessages,
  } = useChatStore();
  const { user } = useUserStore();

  // This function is correct as-is

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const messageToSend = input;

    // 1. Optimistically update UI with user message
    if (currentChat) {
      addMessage(currentChat.id, userMessage);
    }
    // We handle the new chat case later after we get the session_id

    setInput(""); // Clear input immediately
    setTokenUsage((prev) => prev + Math.ceil(messageToSend.length / 4));

    // 2. Set assistant to 'typing' status
    setAssistantTyping(true);
    setAssistantMessageContent(""); // Clear any previous temporary content

    // Determine session ID for the backend call
    const sessionId = currentChat?.id || null;
    const isNewChat = !currentChat;

    try {
      // 3. Send request to the FastAPI chat endpoint
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "1",
          message: messageToSend,
          session_id: sessionId,
        }),
      });

      if (!response.ok) throw new Error("Agent response failed.");

      const data = await response.json(); // { user_id, session_id, response }

      const finalAgentContent = data.response.trim();

      const agentMessage: Message = {
        role: "assistant",
        content: finalAgentContent,
      };

      // 4. Update store state with the final message and stop typing
      setAssistantTyping(false); // Stop the typing indicator
      setAssistantMessageContent(finalAgentContent); // Set the content for the typewriter effect

      // The TypewriterEffect component will now run its animation

      // 5. Officially add the message to the chat history after the typing effect is done
      // NOTE: For a smooth flow, the message is added immediately here. The ChatArea component
      // is responsible for displaying the *last* assistant message using the Typewriter effect
      // and only showing the TypingIndicator when `assistantTyping` is true.

      if (isNewChat) {
        const newSessionData = {
          id: data.session_id,
          title: messageToSend.substring(0, 30) + "...",
          actor: "teacher_agent",
          time: new Date().toISOString(),
          messages: [userMessage, agentMessage], // Include both messages
        };
        setChatSessions([...chatSessions, newSessionData]);
        setCurrentChat(newSessionData);
      } else {
        if (agentMessage.content.length > 0) {
          addMessage(data.session_id, agentMessage);
        } else {
          addMessage(currentChat.id, {
            role: "assistant",
            content: "Lỗi: Miniwave bị vấn đề rồi, hãy qua lại sau",
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Ensure typing indicator is removed on error
      setAssistantTyping(false);
      setAssistantMessageContent("");

      // Revert optimistic update or add error message
      if (currentChat) {
        addMessage(currentChat.id, {
          role: "assistant",
          content: "Lỗi: Không thể kết nối với Miniwave.",
        });
      }
    }
  };
  useEffect(() => {
    async function fetchSessionEvents(
      user_id: string,
      session_id: string | undefined
    ) {
      if (!session_id) return [];
      const res = await fetch(
        `http://127.0.0.1:8000/api/sessions/${user_id}/${session_id}`
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
      // Assuming the backend returns an array of Message objects
      return json.events || [];
    }

    // Only run if a chat is selected AND its messages haven't been loaded yet.
    // The safest dependency is just `currentChat` and you run the fetch once
    // when a chat is selected (and its messages array is empty or short, depending on your logic).

    // 🎯 FIX: Add a check to prevent fetching if messages are already there.
    if (
      !currentChat ||
      (currentChat.messages && currentChat.messages.length > 0)
    ) {
      // If currentChat is null, or it already has messages, don't re-fetch.
      return;
    }

    // Now call the fetch logic
    const session_id = String(currentChat.id);

    // Use a self-executing async function inside useEffect
    // The logic is wrapped in a cleanup-friendly way if you were fetching on every render,
    // but here it's simple: just fetch when a new currentChat is set.

    const loadMessages = async () => {
      try {
        const events = await fetchSessionEvents("1", session_id);

        // 🎯 THE KEY FIX: Replace all messages in one go
        // This ensures currentChat changes only once, stopping the infinite loop.
        setCurrentChatMessages(currentChat.id, events);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
        // Optional: Handle error display to the user
      }
    };

    loadMessages();

    // The dependency array should ONLY contain 'currentChat' to run once per chat selection.
    // We remove 'addMessage' as it's no longer used, and 'setCurrentChatMessages' is stable from zustand.
  }, [currentChat, setCurrentChatMessages]);

  const handleModeSelect = (selected: ChatMode) => setMode(selected);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("File uploaded:", file);
  };

  // 🎯 CAMERA/WEBSOCKET HANDLER
  const handleCameraCapture = async () => {
    if (!currentChat) {
      alert("Vui lòng chọn hoặc bắt đầu cuộc trò chuyện trước.");
      return;
    }

    if (isStreaming) {
      // Stop streaming
      wsRef.current?.close(1000, "User initiated close");
      setIsStreaming(false);
      return;
    }
    // URL matches your backend: /ws/video-stream/{user_id}/{session_id}
    const wsUrl = `ws://127.0.0.1:8000/ws/video-stream/"1"/${currentChat.id}`;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected. Starting stream.");
        setIsStreaming(true);

        // Example: Capture and send frames every 100ms
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new (window as any).ImageCapture(videoTrack);

        const sendFrame = async () => {
          if (ws.readyState === WebSocket.OPEN) {
            try {
              const bitmap = await imageCapture.grabFrame();
              const canvas = document.createElement("canvas");
              canvas.width = bitmap.width;
              canvas.height = bitmap.height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(bitmap, 0, 0);

              // Convert canvas to JPEG blob and send as binary
              canvas.toBlob(
                (blob) => {
                  if (blob) ws.send(blob);
                },
                "image/jpeg",
                0.8
              );

              setTimeout(sendFrame, 100); // 10 FPS
            } catch (err) {
              console.error("Error sending frame:", err);
            }
          }
        };
        sendFrame();
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "text_analysis" && currentChat) {
          // Display agent's response in the chat area
          addMessage(currentChat.id, {
            role: "assistant",
            content: data.data,
          });
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket Error:", e);
        setIsStreaming(false);
      };

      ws.onclose = () => {
        console.log("WebSocket closed.");
        stream.getTracks().forEach((track) => track.stop()); // Stop camera
        setIsStreaming(false);
      };
    } catch (err) {
      console.error("Camera access or WebSocket failed:", err);
      alert("Không thể truy cập camera hoặc kết nối.");
    }
  };

  // --- UI ---
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "350px" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
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

        {/* Chat Hero Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center h-full">
            {currentChat ? (
              <ChatArea messages={currentChat.messages} />
            ) : (
              <div className="flex flex-col items-center">
                <Image
                  src="/capybara.svg"
                  alt="hero_section_chat"
                  width={280} // 👈 smaller size
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
        <div className="sticky bottom-0 left-0 right-0 p-4 z-50">
          <div className="max-w-3xl w-full mx-auto mb-[20px]">
            <InputGroup>
              <InputGroupTextarea
                placeholder="Bắt đầu cuộc trò chuyện với Miniwave..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                className="resize-none"
              />

              <InputGroupAddon
                align="block-end"
                className="flex items-center gap-2"
              >
                {/* Upload Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      variant="ghost"
                      size="sm"
                      onClick={handleUploadClick}
                    >
                      <Upload className="w-4 h-4" />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Tải tệp lên</TooltipContent>
                </Tooltip>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Camera */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      variant="ghost"
                      size="sm"
                      onClick={handleCameraCapture}
                    >
                      <Camera className="w-6 h-6" />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Mở camera</TooltipContent>
                </Tooltip>

                {/* Mode Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <InputGroupButton variant="ghost" size="sm">
                      {mode}
                    </InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    className="min-w-[140px]"
                  >
                    <DropdownMenuLabel className="px-3 py-2 text-sm text-gray-500">
                      Chọn chế độ
                    </DropdownMenuLabel>
                    {chatModes.map((m) => (
                      <DropdownMenuItem
                        key={m}
                        onClick={() => handleModeSelect(m)}
                      >
                        {m}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Token Count */}
                <InputGroupText className="ml-auto text-sm text-gray-500">
                  {tokenUsage} tokens đã dùng
                </InputGroupText>

                <Separator orientation="vertical" className="!h-6" />

                {/* Send */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      variant="default"
                      className="rounded-full p-2 flex items-center justify-center bg-[#F66868]"
                      onClick={handleSend}
                      disabled={!input.trim()}
                    >
                      Gửi
                      <SendHorizonal className="ml-1 w-5 h-5" />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Gửi yêu cầu</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
