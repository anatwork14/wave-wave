"use client";

import { useState, useRef } from "react";
import { ArrowUpIcon, Plus, Camera, Upload, SendHorizonal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

type ChatMode = "Auto" | "Conversation" | "Syllabus" | "Quiz";

export default function ChatPromptInput() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("Auto");
  const [tokenUsage, setTokenUsage] = useState(0);
  const chatModes: ChatMode[] = ["Auto", "Conversation", "Syllabus", "Quiz"];

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Gửi yêu cầu:", input, "Chế độ:", mode);
    setTokenUsage((prev) => prev + Math.ceil(input.length / 4));
    setInput("");
  };

  const handleModeSelect = (selected: ChatMode) => {
    setMode(selected);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      console.log("Đã tải lên tệp:", e.target.files[0]);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera stream opened:", stream);
      // TODO: show preview modal or capture snapshot
      // Remember to stop stream when done
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Không thể truy cập camera:", err);
    }
  };

  return (
    <div className="grid w-full gap-4 mt-20 mx-auto">
      <div className="max-w-3xl w-full mx-auto">
        <InputGroup>
          {/* Chat Prompt Textarea */}
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
            {/* Upload File */}
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  onClick={handleUploadClick}
                  size={"sm"}
                >
                  <Upload className="w-4 h-4" />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Tải tệp lên</TooltipContent>
            </Tooltip>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {/* Camera Capture */}
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  onClick={handleCameraCapture}
                  size={"sm"}
                >
                  <Camera className="w-6 h-6" />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Mở camera</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton variant="ghost" size={"sm"}>
                  {mode}
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="[--radius:0.95rem] min-w-[140px]"
              >
                <DropdownMenuLabel className="px-3 py-2 text-sm text-gray-500">
                  Chọn chế độ
                </DropdownMenuLabel>

                {chatModes.map((m) => (
                  <DropdownMenuItem
                    key={m}
                    onClick={() => handleModeSelect(m)}
                    className="px-3 py-2"
                  >
                    {m}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Token Usage */}
            <InputGroupText className="ml-auto text-sm text-gray-500">
              {tokenUsage} tokens đã dùng
            </InputGroupText>
            <Separator orientation="vertical" className="!h-6" />
            {/* Send Button */}
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
  );
}
