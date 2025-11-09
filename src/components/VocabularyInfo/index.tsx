"use client";

import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Check,
  Share,
  Video,
  Image as ImageIcon,
  Sparkles,
  Camera,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/useUserStore";
import MarkdownRenderer from "../MarkdownRender";
interface VocabularyInfoProps {
  word: string;
  partOfSpeech?: string;
  definition?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export default function VocabularyInfo({
  word,
  partOfSpeech,
  definition,
  videoUrl,
  imageUrl,
}: VocabularyInfoProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [mediaMode, setMediaMode] = useState<"video" | "image">(
    videoUrl ? "video" : "image"
  );
  const [showContext, setShowContext] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(false);
  const [contextText, setContextText] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { user } = useUserStore();
  const handleCameraAccess = () => {
    setIsCameraActive((prev) => !prev);
    // later you can add actual camera access logic
  };
  // Reset feedback animations
  useEffect(() => {
    if (bookmarked || isShare) {
      const timer = setTimeout(() => {
        setBookmarked(false);
        setIsShare(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (word) {
      setShowContext(false);
      setContextText("");
      setSessionId(null);
    }
  }, [bookmarked, isShare, word]);

  // Handle context toggle
  const handleContextToggle = async () => {
    // --- If we are about to SHOW the context ---
    if (!showContext) {
      setIsLoadingContext(true);
      setContextText(""); // Clear old text

      // 1. Construct the prompt
      const prompt = `Khi nào sử dụng từ này, trong trường hợp, hoàn cảnh nào: "${word}"`;
      const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

      try {
        // 2. Call the API
        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            user_id: user?.id || "guest-user", // Send user ID or a fallback
            session_id: sessionId, // Send null or the existing session ID
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch context from API");
        }

        // 3. Get the response
        const data = await response.json();
        // Your API returns: { user_id, session_id, response }

        // 4. Update state with the new data
        setContextText(data.response); // Save the text
        setSessionId(data.session_id); // Save the new session ID
        setShowContext(true); // Toggle to show the text
      } catch (error) {
        console.error("Failed to fetch context:", error);
        setContextText("Lỗi: Không thể tải ngữ cảnh."); // Show an error
        setShowContext(true); // Still toggle to show the error message
      } finally {
        setIsLoadingContext(false);
      }
    } else {
      // --- If context is already showing, just toggle it off ---
      setShowContext(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-[#FF978E] relative">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-baloo text-[#f66868]">{word}</h1>
          {partOfSpeech && (
            <div className="text-gray-500 italic text-lg">{partOfSpeech}</div>
          )}
        </div>

        {/* Action Buttons */}
        <TooltipProvider>
          <div className="flex gap-3 text-rose-500 justify-center items-center">
            {/* Share */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsShare(!isShare)}
                  className={`p-2 rounded-xl transition-all duration-300 transform flex items-center justify-center shadow-sm
                ${
                  isShare
                    ? "bg-[#f66868] text-white scale-105 shadow-lg"
                    : "bg-rose-100 text-[#f66868] hover:bg-rose-200 hover:text-rose-600"
                }`}
                >
                  {isShare ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Share className="w-6 h-6" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-medium rounded-md">
                Chia sẻ bài học
              </TooltipContent>
            </Tooltip> */}

            {/* Bookmark */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-xl transition-all duration-300 transform flex items-center justify-center shadow-sm
                ${
                  bookmarked
                    ? "bg-[#f66868] text-white scale-105 shadow-lg"
                    : "bg-rose-100 text-[#f66868] hover:bg-rose-200 hover:text-rose-600"
                }`}
                >
                  {bookmarked ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-medium rounded-md">
                Lưu vào danh sách
              </TooltipContent>
            </Tooltip> */}

            {/* Camera */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCameraAccess}
                  className={`p-2 rounded-xl transition-all duration-300 transform flex items-center justify-center shadow-sm
                ${
                  isCameraActive
                    ? "bg-[#f66868] text-white scale-105 shadow-lg"
                    : "bg-rose-100 text-[#f66868] hover:bg-rose-200 hover:text-rose-600"
                }`}
                >
                  <Camera className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-medium rounded-md">
                Mở camera luyện tập
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Definition Section */}
      {definition && (
        <div className="space-y-2 mb-6">
          <div className="text-lg text-gray-500 uppercase">Cách thực hiện</div>
          <p className="text-gray-700 text-sm">{definition}</p>
        </div>
      )}

      {/* Media Toggle */}
      {(videoUrl || imageUrl) && (
        <div className="flex justify-end mb-3">
          <div className="flex bg-rose-50 border border-rose-200 rounded-lg overflow-hidden">
            {videoUrl && (
              <button
                onClick={() => setMediaMode("video")}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors cursor-pointer
                  ${
                    mediaMode === "video"
                      ? "bg-[#C73B3B]  text-white"
                      : "text-[#C73B3B] hover:bg-rose-100"
                  }`}
              >
                <Video className="w-4 h-4" /> Video hướng dẫn
              </button>
            )}
            {imageUrl && (
              <button
                onClick={() => setMediaMode("image")}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors cursor-pointer
                  ${
                    mediaMode === "image"
                      ? "bg-[#C73B3B]  text-white"
                      : "text-[#C73B3B] hover:bg-rose-100"
                  }`}
              >
                <ImageIcon className="w-4 h-4" /> Hình ảnh về từ
              </button>
            )}
          </div>
        </div>
      )}

      {/* Media Display */}
      {(videoUrl || imageUrl) && (
        <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-video cursor-pointer">
          {mediaMode === "video" && videoUrl ? (
            <video
              controls
              className="w-full h-full object-cover rounded-lg"
              src={videoUrl}
            />
          ) : (
            imageUrl && (
              <img
                src={imageUrl}
                alt={`${word} illustration`}
                className="w-full h-full rounded-lg p-4"
                loading="lazy"
              />
            )
          )}
        </div>
      )}

      {/* Get Context Button */}
      <div className="mt-6 flex justify-center">
        <Button
          size={"lg"}
          onClick={handleContextToggle}
          // Vô hiệu hóa button khi đang tải
          disabled={isLoadingContext}
          className="px-6 py-2 rounded-lg bg-[#C73B3B] text-white font-medium hover:bg-[#e85b5b] transition-colors text-lg flex items-center gap-2"
        >
          {/* * Hiển thị icon loading nếu đang tải,
           * ngược lại hiển thị icon Sparkles
           */}
          {isLoadingContext ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}

          {/* * Hiển thị văn bản "Đang tải..." nếu đang loading,
           * ngược lại hiển thị văn bản dựa trên 'showContext'
           */}
          {isLoadingContext
            ? "Đang tải..."
            : showContext
            ? "Không xem ngữ cảnh"
            : "Thêm ngữ cảnh"}
        </Button>
      </div>

      {/* Context Section */}
      {showContext && (
        <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-4 text-gray-700 text-base">
          {isLoadingContext ? (
            <div className="animate-pulse text-gray-400">
              Đang tải ngữ cảnh...
            </div>
          ) : contextText ? (
            <MarkdownRenderer content={contextText}></MarkdownRenderer>
          ) : (
            <p className="italic text-gray-500">
              Không có ngữ cảnh cho từ này.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
