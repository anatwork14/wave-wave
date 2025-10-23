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
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface VocabularyInfoProps {
  word: string;
  partOfSpeech?: string;
  definition?: string;
  videoUrl?: string;
  imageUrl?: string;
  contextResult?: string; // ⚡ optional: text shown when context is fetched
  onGetContext?: () => Promise<string> | void; // ⚡ optional async callback
}

export default function VocabularyInfo({
  word,
  partOfSpeech,
  definition,
  videoUrl,
  imageUrl,
  contextResult,
  onGetContext,
}: VocabularyInfoProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [mediaMode, setMediaMode] = useState<"video" | "image">(
    videoUrl ? "video" : "image"
  );
  const [showContext, setShowContext] = useState(false);
  const [context, setContext] = useState<string | null>(contextResult ?? null);
  const [loadingContext, setLoadingContext] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

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
  }, [bookmarked, isShare]);

  // Handle context toggle
  const handleContextToggle = async () => {
    if (showContext) {
      // Hide context
      setShowContext(false);
      return;
    }

    // Show context (fetch if necessary)
    setShowContext(true);
    if (!context && onGetContext) {
      setLoadingContext(true);
      try {
        const result = await onGetContext();
        if (typeof result === "string") setContext(result);
      } catch (error) {
        console.error("Failed to get context:", error);
      } finally {
        setLoadingContext(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-[#FF978E] relative">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-serif text-[#f66868]">{word}</h1>
          {partOfSpeech && (
            <div className="text-gray-500 italic text-lg">{partOfSpeech}</div>
          )}
        </div>

        {/* Action Buttons */}
        <TooltipProvider>
          <div className="flex gap-3 text-rose-500 justify-center items-center">
            {/* Share */}
            <Tooltip>
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
            </Tooltip>

            {/* Bookmark */}
            <Tooltip>
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
            </Tooltip>

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
          className="px-6 py-2 rounded-lg bg-[#C73B3B] text-white font-medium hover:bg-[#e85b5b] transition-colors text-lg flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {showContext ? "Không xem ngữ cảnh" : "Thêm ngữ cảnh"}
        </Button>
      </div>

      {/* Context Section */}
      {showContext && (
        <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-4 text-gray-700 text-base">
          {loadingContext ? (
            <div className="animate-pulse text-gray-400">
              Đang tải ngữ cảnh...
            </div>
          ) : context ? (
            <p>{context}</p>
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
