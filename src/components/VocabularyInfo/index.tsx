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
// --- THÊM useCallback ---
import { useEffect, useState, useRef, useCallback } from "react";
// ---
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/useUserStore";
import MarkdownRenderer from "../MarkdownRender";

// --- Cấu hình WebSocket ---
const WEBSOCKET_URL = "ws://localhost:8001/ws/predict-stream/";
const FRAME_INTERVAL_MS = 100;
// ---

interface VocabularyInfoProps {
  word: string;
  partOfSpeech?: string;
  definition?: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface SignPrediction {
  label_text: string;
  confidence: number;
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

  const [prediction, setPrediction] = useState<SignPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [framesCollected, setFramesCollected] = useState(0);
  const [framesNeeded, setFramesNeeded] = useState(30);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- HÀM GỬI KHUNG HÌNH (ĐÃ SỬA LỖI KHUNG HÌNH RỖNG) ---
  const sendFrame = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log("WebSocket not ready, state:", wsRef.current?.readyState);
      return;
    }

    if (!videoRef.current || !canvasRef.current) {
      console.log("Video or canvas ref not ready");
      return;
    }

    const video = videoRef.current;

    // Check if video is ready
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0 ||
      video.readyState < 2
    ) {
      console.log("Video not ready yet:", {
        width: video.videoWidth,
        height: video.videoHeight,
        readyState: video.readyState,
      });
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      console.log("Canvas context not available");
      return;
    }

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frameData = canvas.toDataURL("image/jpeg", 0.8);

      console.log("Sending frame, size:", frameData.length);
      wsRef.current.send(frameData);
    } catch (err) {
      console.error("Error sending frame:", err);
    }
  };
  // ---

  // --- BẮT ĐẦU SỬA LỖI VÒNG LẶP ---

  // 1. Tạo một hàm dọn dẹp (cleanup) ổn định
  // Hàm này KHÔNG có dependency (mảng rỗng []), vì vậy nó sẽ không bao giờ
  // thay đổi và an toàn để sử dụng trong useEffect.
  const cleanupCamera = useCallback(() => {
    console.log("Đang chạy dọn dẹp camera...");

    // Dừng gửi khung hình (an toàn khi gọi dù là null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Đóng WebSocket (an toàn khi gọi dù là null)
    if (wsRef.current) {
      wsRef.current.onclose = null; // Vô hiệu hóa trình xử lý
      wsRef.current.onerror = null;
      wsRef.current.close();
      wsRef.current = null;
    }
    // Dừng stream camera (an toàn khi gọi dù là null)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Dọn dẹp state - Sử dụng "functional update"
    // Bằng cách này, hàm không cần `isCameraActive` làm dependency
    setIsCameraActive((isActive) => {
      // Chỉ cập nhật các state khác NẾU camera thực sự đang BẬT
      if (isActive) {
        setPrediction(null);
        setError(null);
        // setFramesCollected(0); // Bất kỳ state nào khác bạn có
      }
      return false; // Luôn đảm bảo state cuối cùng là false
    });
  }, []);
  // 2. Sửa đổi handleCameraAccess
  // Nó vẫn cần `isCameraActive` để quyết định MỞ hay TẮT.
  const handleCameraAccess = useCallback(async () => {
    if (isCameraActive) {
      // --- Logic TẮT (GIỮ NGUYÊN) ---
      console.log("Đang TẮT camera (do người dùng nhấp)...");
      cleanupCamera(); // <-- Chỉ cần gọi hàm dọn dẹp
    } else {
      // --- Logic MỞ (ĐÃ SỬA) ---
      console.log("Đang MỞ camera...");
      try {
        // 1. Lấy stream video
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        // 2. LƯU stream vào ref
        streamRef.current = stream;

        // 3. Cập nhật state để re-render VÀ HIỂN THỊ <video>
        setIsCameraActive(true);
        setError(null);
      } catch (err) {
        console.error("Lỗi truy cập camera:", err);
        setError("Không thể truy cập camera. Vui lòng kiểm tra quyền.");
      }
    }
  }, [isCameraActive, cleanupCamera]);

  // 3. Sửa đổi các useEffect

  // useEffect này CHỈ xử lý bookmark/share
  useEffect(() => {
    if (bookmarked || isShare) {
      const timer = setTimeout(() => {
        setBookmarked(false);
        setIsShare(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookmarked, isShare]);

  // useEffect này CHỈ xử lý khi `word` thay đổi
  useEffect(() => {
    console.log("Từ đã thay đổi, dọn dẹp context...");
    setShowContext(false);
    setContextText("");
    setSessionId(null);

    console.log("Từ đã thay đổi, dọn dẹp camera...");
    cleanupCamera();
  }, [word]); // <-- CHỈ phụ thuộc vào `word`.
  // (Vì cleanupCamera giờ đã ổn định, bạn không cần thêm nó nữa,
  // nhưng nếu thêm [word, cleanupCamera] thì vẫn ổn)

  // useEffect này CHỈ dọn dẹp khi component unmount
  useEffect(() => {
    // Trả về hàm dọn dẹp
    return () => {
      console.log("Component unmount, đang dọn dẹp camera...");
      cleanupCamera();
    };
  }, []);
  useEffect(() => {
    // Chỉ chạy nếu camera BẬT, videoRef tồn tại, và stream tồn tại
    if (isCameraActive && videoRef.current && streamRef.current) {
      console.log("Đang gán stream vào video element...");
      // 4. GÁN stream vào phần tử <video>
      videoRef.current.srcObject = streamRef.current;

      // 5. Chủ động YÊU CẦU video phát
      videoRef.current.play().catch((err) => {
        // Bắt lỗi nếu trình duyệt chặn auto-play
        console.error("Video play() bị lỗi:", err);
      });
    }
  }, [isCameraActive]);

  // --- KẾT THÚC SỬA LỖI VÒNG LẶP ---

  // Handle context toggle
  const handleContextToggle = async () => {
    // ... (Logic xử lý context của bạn - không thay đổi) ...
    if (!showContext) {
      setIsLoadingContext(true);
      setContextText("");
      const prompt = `Khi nào sử dụng từ này, trong trường hợp, hoàn cảnh nào: "${word}"`;
      const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            user_id: user?.id || "guest-user",
            session_id: sessionId,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch context from API");
        }
        const data = await response.json();
        setContextText(data.response);
        setSessionId(data.session_id);
        setShowContext(true);
      } catch (error) {
        console.error("Failed to fetch context:", error);
        setContextText("Lỗi: Không thể tải ngữ cảnh.");
        setShowContext(true);
      } finally {
        setIsLoadingContext(false);
      }
    } else {
      setShowContext(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-[#FF978E] overflow-hidden">
      {/* Header Section with Actions */}
      <div className="bg-gradient-to-r from-[#f66868] to-[#FF978E] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              {word}
            </h1>
            {partOfSpeech && (
              <div className="text-white/90 italic text-xl font-medium bg-white/20 px-3 py-1 rounded-full">
                {partOfSpeech}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setIsShare(true);
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    {isShare ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Share className="w-6 h-6 text-white" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isShare ? "Đã sao chép liên kết!" : "Chia sẻ"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <Bookmark
                      className={`w-6 h-6 ${
                        bookmarked ? "fill-white text-white" : "text-white"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {bookmarked ? "Đã lưu" : "Lưu từ"}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Definition Section */}
        {definition && (
          <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
            <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#C73B3B] rounded-full"></div>
              Cách thực hiện
            </h3>
            <p className="text-gray-700 text-base">{definition}</p>
          </div>
        )}

        {/* Two Column Layout: Video/Image + Camera */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Instructional Media */}
          {(videoUrl || imageUrl) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#C73B3B] rounded-full"></div>
                  Hướng dẫn
                </h3>

                {/* Media Toggle */}
                <div className="flex bg-rose-50 border border-rose-200 rounded-lg overflow-hidden">
                  {videoUrl && (
                    <button
                      onClick={() => setMediaMode("video")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                        ${
                          mediaMode === "video"
                            ? "bg-[#C73B3B] text-white shadow-sm"
                            : "text-[#C73B3B] hover:bg-rose-100"
                        }`}
                    >
                      <Video className="w-3.5 h-3.5" /> Video
                    </button>
                  )}
                  {imageUrl && (
                    <button
                      onClick={() => setMediaMode("image")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                        ${
                          mediaMode === "image"
                            ? "bg-[#C73B3B] text-white shadow-sm"
                            : "text-[#C73B3B] hover:bg-rose-100"
                        }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Hình ảnh
                    </button>
                  )}
                </div>
              </div>

              {/* Media Display */}
              <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-md aspect-video bg-gray-100">
                {mediaMode === "video" && videoUrl ? (
                  <video
                    controls
                    className="w-full h-full object-contain"
                    src={videoUrl}
                  />
                ) : (
                  imageUrl && (
                    <img
                      src={imageUrl}
                      alt={`${word} illustration`}
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* Right Column: Practice Camera */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-[#C73B3B] rounded-full"></div>
                Luyện tập
              </h3>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCameraAccess}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform flex items-center gap-2 text-sm
                        ${
                          isCameraActive
                            ? "bg-[#f66868] text-white shadow-lg scale-105"
                            : "bg-rose-100 text-[#f66868] hover:bg-rose-200"
                        }`}
                    >
                      <Camera className="w-4 h-4" />
                      {isCameraActive ? "Tắt camera" : "Bật camera"}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isCameraActive
                      ? "Dừng luyện tập"
                      : "Bắt đầu luyện tập với camera"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Camera Display */}
            {isCameraActive ? (
              <div className="space-y-4">
                <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#f66868] shadow-lg aspect-video bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Recording Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    REC
                  </div>
                </div>

                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Prediction Results */}
                {prediction && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-green-600 font-medium mb-1">
                          Nhận diện được:
                        </p>
                        <h4 className="text-2xl font-bold text-green-800">
                          {prediction.label_text}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-600 font-medium mb-1">
                          Độ chính xác:
                        </p>
                        <p className="text-3xl font-bold text-green-700">
                          {(prediction.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collection Progress */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  {framesCollected > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-blue-700 font-medium">
                        <span>Đang thu thập khung hình...</span>
                        <span>
                          {framesCollected}/{framesNeeded}
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${(framesCollected / framesNeeded) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-blue-700 flex items-center justify-center gap-2 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {prediction
                        ? "Sẵn sàng nhận diện tiếp..."
                        : "Đang khởi động AI..."}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                <Camera className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium mb-1">
                  Camera chưa được bật
                </p>
                <p className="text-gray-400 text-sm">
                  Nhấn nút "Bật camera" để bắt đầu luyện tập
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Context Button */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleContextToggle}
            disabled={isLoadingContext}
            className="px-8 py-6 rounded-xl bg-gradient-to-r from-[#C73B3B] to-[#f66868] text-white font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 text-base flex items-center gap-3"
          >
            {isLoadingContext ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tải ngữ cảnh...
              </>
            ) : showContext ? (
              <>
                <Sparkles className="w-5 h-5" />
                Ẩn ngữ cảnh
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Xem ngữ cảnh sử dụng
              </>
            )}
          </Button>
        </div>

        {/* Context Section */}
        {showContext && (
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200 rounded-xl p-6 shadow-inner">
            <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Ngữ cảnh sử dụng
            </h3>
            {isLoadingContext ? (
              <div className="space-y-3">
                <div className="h-4 bg-rose-200 rounded animate-pulse"></div>
                <div className="h-4 bg-rose-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-rose-200 rounded animate-pulse w-4/6"></div>
              </div>
            ) : contextText ? (
              <div className="prose prose-rose max-w-none">
                <MarkdownRenderer content={contextText} />
              </div>
            ) : (
              <p className="italic text-gray-500 text-center py-4">
                Không có ngữ cảnh cho từ này.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
