"use client";

import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Check,
  Video,
  Image as ImageIcon,
  Sparkles,
  Camera,
  Loader2,
  CheckCircle2, // Added for success icon
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- MOCKS FOR PREVIEW (Uncomment real imports in your project) ---
// import { useUserStore } from "@/store/useUserStore";
// import MarkdownRenderer from "../MarkdownRender";

const useUserStore = () => ({
  user: { id: "guest-user", name: "Guest" },
});

const MarkdownRenderer = ({ content }: { content: string }) => (
  <div className="whitespace-pre-wrap">{content}</div>
);
// ------------------------------------------------------------------

// --- Cấu hình WebSocket ---
const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
  "ws://localhost:8001/ws/stream-predict2/";

// --- 30 FPS Configuration ---
const FRAME_INTERVAL_MS = 33;

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
  const [isCorrect, setIsCorrect] = useState(false); // New state for success
  const [error, setError] = useState<string | null>(null);
  const [framesCollected, setFramesCollected] = useState(0);
  const [framesNeeded, setFramesNeeded] = useState(30);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- SEND FRAME FUNCTION ---
  const sendFrame = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0 ||
      video.readyState < 2
    )
      return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get data URL and strip header
      const fullDataUrl = canvas.toDataURL("image/jpeg", 0.8);
      const base64Data = fullDataUrl.split(",")[1];

      wsRef.current.send(base64Data);
    } catch (err) {
      console.error("Error sending frame:", err);
    }
  };

  // --- CLEANUP FUNCTION ---
  const cleanupCamera = useCallback(() => {
    console.log("Cleaning up camera...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.close();
      wsRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsCameraActive((isActive) => {
      if (isActive) {
        setPrediction(null);
        setIsCorrect(false);
        setError(null);
        setFramesCollected(0);
      }
      return false;
    });
  }, []);

  // --- CAMERA & WEBSOCKET HANDLER ---
  const handleCameraAccess = useCallback(async () => {
    if (isCameraActive) {
      cleanupCamera();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;

        // --- FIX: Pass expected_word in URL ---
        const baseUrl = WEBSOCKET_URL.endsWith("/")
          ? WEBSOCKET_URL.slice(0, -1)
          : WEBSOCKET_URL;
        const wsUrl = `${baseUrl}/?expected_word=${encodeURIComponent(word)}`;

        console.log("Connecting to:", wsUrl);
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          console.log("WebSocket connected");
          setIsCameraActive(true);
          setError(null);
          setIsCorrect(false);
          intervalRef.current = setInterval(sendFrame, FRAME_INTERVAL_MS);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.status === "predicted") {
              setPrediction({
                label_text: data.label_text,
                confidence: data.confidence,
              });

              // --- FIX: Handle Success State ---
              if (data.is_correct) {
                setIsCorrect(true);
              } else {
                setIsCorrect(false);
              }

              setFramesCollected(0);
            } else if (data.status === "success") {
              setIsCorrect(true);
            } else if (data.status === "collecting") {
              setFramesCollected(data.frames_collected);
              setFramesNeeded(data.frames_needed);
            } else if (data.status === "error") {
              setError(data.message);
            }
          } catch (err) {
            console.error("Failed to parse message:", err);
          }
        };

        wsRef.current.onclose = (event) => {
          if (!event.wasClean) {
            cleanupCamera();
            setError("Mất kết nối máy chủ.");
          }
        };

        wsRef.current.onerror = (err) => {
          console.error("WebSocket error:", err);
          setError("Lỗi kết nối.");
        };
      } catch (err) {
        console.error("Camera error:", err);
        setError("Không thể truy cập camera.");
      }
    }
  }, [isCameraActive, cleanupCamera, word]);

  // --- EFFECTS ---

  useEffect(() => {
    if (bookmarked || isShare) {
      const timer = setTimeout(() => {
        setBookmarked(false);
        setIsShare(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookmarked, isShare]);

  useEffect(() => {
    setShowContext(false);
    setContextText("");
    setSessionId(null);
    setIsCorrect(false);
    cleanupCamera();
  }, [word, cleanupCamera]);

  useEffect(() => {
    return () => cleanupCamera();
  }, [cleanupCamera]);

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [isCameraActive]);

  const handleContextToggle = async () => {
    if (!showContext) {
      setIsLoadingContext(true);
      setContextText("");
      const prompt = `Khi nào sử dụng từ này: "${word}"`;
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
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        setContextText(data.response);
        setSessionId(data.session_id);
        setShowContext(true);
      } catch (error) {
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
      {/* Header */}
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
        </div>
      </div>

      <div className="p-6 space-y-6">
        {definition && (
          <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
            <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#C73B3B] rounded-full"></div>
              Cách thực hiện
            </h3>
            <p className="text-gray-700 text-base">{definition}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Media Column */}
          {(videoUrl || imageUrl) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#C73B3B] rounded-full"></div>
                  Hướng dẫn
                </h3>
                <div className="flex bg-rose-50 border border-rose-200 rounded-lg overflow-hidden">
                  {videoUrl && (
                    <button
                      onClick={() => setMediaMode("video")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
                        mediaMode === "video"
                          ? "bg-[#C73B3B] text-white"
                          : "text-[#C73B3B] hover:bg-rose-100"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" /> Video
                    </button>
                  )}
                  {imageUrl && (
                    <button
                      onClick={() => setMediaMode("image")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
                        mediaMode === "image"
                          ? "bg-[#C73B3B] text-white"
                          : "text-[#C73B3B] hover:bg-rose-100"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Hình ảnh
                    </button>
                  )}
                </div>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-md aspect-video bg-gray-100">
                {mediaMode === "video" && videoUrl ? (
                  <video
                    controls
                    className="w-full h-full object-contain"
                    src={videoUrl}
                  />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={word}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* Camera Column */}
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
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
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
                    {isCameraActive ? "Dừng luyện tập" : "Bắt đầu luyện tập"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {isCameraActive ? (
              <div className="space-y-4">
                <div
                  className={`relative w-full rounded-xl overflow-hidden border-4 shadow-lg aspect-video bg-black transition-colors duration-300 ${
                    isCorrect
                      ? "border-green-500 shadow-green-200"
                      : "border-[#f66868]"
                  }`}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>{" "}
                    REC
                  </div>
                  {/* Success Overlay */}
                  {isCorrect && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-lg mb-2" />
                      <span className="text-white font-bold text-xl drop-shadow-md">
                        Chính xác!
                      </span>
                    </div>
                  )}
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {prediction && (
                  <div
                    className={`p-4 border-2 rounded-xl transition-colors duration-500 ${
                      isCorrect
                        ? "bg-green-50 border-green-500"
                        : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs font-bold mb-1 ${
                            isCorrect ? "text-green-700" : "text-gray-500"
                          }`}
                        >
                          {isCorrect ? "KẾT QUẢ:" : "AI NHÌN THẤY:"}
                        </p>
                        <h4
                          className={`text-2xl font-bold ${
                            isCorrect ? "text-green-700" : "text-gray-800"
                          }`}
                        >
                          {isCorrect ? "Chính xác! 🎉" : prediction.label_text}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xs font-medium mb-1 ${
                            isCorrect ? "text-green-700" : "text-gray-500"
                          }`}
                        >
                          Độ tin cậy:
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isCorrect ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          {(prediction.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!isCorrect && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    {framesCollected > 0 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-blue-700 font-medium">
                          <span>Đang phân tích...</span>
                          <span>
                            {framesCollected}/{framesNeeded}
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                            style={{
                              width: `${
                                (framesCollected / framesNeeded) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-blue-700 flex items-center justify-center gap-2 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {prediction
                          ? "Hãy thực hiện lại..."
                          : "Đang khởi động AI..."}
                      </p>
                    )}
                  </div>
                )}

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
                  Nhấn nút "Bật camera" để bắt đầu
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleContextToggle}
            disabled={isLoadingContext}
            className="px-8 py-6 rounded-xl bg-gradient-to-r from-[#C73B3B] to-[#f66868] text-white font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 text-base flex items-center gap-3"
          >
            {isLoadingContext ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Đang tải...
              </>
            ) : showContext ? (
              <>
                <Sparkles className="w-5 h-5" /> Ẩn ngữ cảnh
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Xem ngữ cảnh
              </>
            )}
          </Button>
        </div>

        {showContext && (
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200 rounded-xl p-6 shadow-inner">
            <h3 className="text-sm font-bold text-[#C73B3B] uppercase tracking-wide mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Ngữ cảnh sử dụng
            </h3>
            {isLoadingContext ? (
              <div className="space-y-3">
                <div className="h-4 bg-rose-200 rounded animate-pulse"></div>
                <div className="h-4 bg-rose-200 rounded animate-pulse w-5/6"></div>
              </div>
            ) : contextText ? (
              <div className="prose prose-rose max-w-none">
                <MarkdownRenderer content={contextText} />
              </div>
            ) : (
              <p className="italic text-gray-500 text-center py-4">
                Không có ngữ cảnh.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
