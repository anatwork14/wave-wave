"use client";

import { useState, useRef } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useChatStore } from "@/store/useChatStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ChatMode = "Auto" | "Conversation" | "Syllabus" | "Quiz";

export default function Page() {
  const pathname = usePathname();
  const chatName = decodeURIComponent(pathname.replace(/^\/chat\/?/, "")); // cleaner extraction

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("Auto");
  const [tokenUsage, setTokenUsage] = useState(0);
  const chatModes: ChatMode[] = ["Auto", "Conversation", "Syllabus", "Quiz"];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { currentChat, setCurrentChat } = useChatStore();

  // --- Handlers ---
  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Sending:", input, "Mode:", mode);
    setTokenUsage((prev) => prev + Math.ceil(input.length / 4));
    setInput("");
  };

  const handleModeSelect = (selected: ChatMode) => setMode(selected);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("File uploaded:", file);
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera opened:", stream);
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Camera access failed:", err);
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

        {/* Chat Input Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center h-full">
            {!currentChat && (
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
        <div className="sticky bottom-0 left-0 right-0 p-4">
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
