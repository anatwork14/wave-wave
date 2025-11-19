"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Search,
  ChevronLeft,
  ChevronRight,
  Target,
  Trophy,
  Filter,
  X,
  Loader2,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import QuizPlayer from "./quiz-player";

// 1. Define the type for the API response data
type PracticeItemStatus = "in_progress" | "completed";

// --- 2. EXPORT TYPE ĐỂ QUIZPLAYER CÓ THỂ SỬ DỤNG ---
export interface PracticeItem {
  quiz_id: number;
  title: string;
  description: string | null;
  lesson_id: number;
  total_points: number;
  user_quiz_id: number;
  score: number;
  status: PracticeItemStatus;
  started_at: string;
  submitted_at: string | null;
}

// ... (const statusOptions, ITEMS_PER_PAGE)
const statusOptions: { value: PracticeItemStatus; label: string }[] = [
  { value: "in_progress", label: "Đang làm" },
  { value: "completed", label: "Đã hoàn thành" },
];
// ------------------------------

const ITEMS_PER_PAGE = 4;
export default function PracticeTab() {
  // --- State for API data ---
  const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  // --- 3. THÊM STATE ĐỂ CHỌN QUIZ ---
  const [selectedQuiz, setSelectedQuiz] = useState<PracticeItem | null>(null);

  // --- State for filters and pagination ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectStatus, setSelectStatus] = useState<PracticeItemStatus | null>(
    null
  );
  const fetchPracticeItems = async () => {
    if (!user) {
      setIsLoading(false);
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    setIsLoading(true); // Luôn đặt loading khi fetch
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quizzes?user_id=${user.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: { quizzes: PracticeItem[] } = await response.json();
      const transformedData = data.quizzes.map((item) => ({
        ...item,
        score: Number(item.score),
      }));
      setPracticeItems(transformedData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch practice items.");
    } finally {
      setIsLoading(false);
    }
  };
  // ... (useEffect fetchPracticeItems - không thay đổi)
  useEffect(() => {
    if (user) {
      fetchPracticeItems();
    } else {
      // Xử lý nếu không có user
      setIsLoading(false);
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
    }
  }, [user]);

  // ... (filteredItems, totalPages, startIndex, paginatedItems, handlers - không thay đổi)
  const filteredItems = useMemo(() => {
    return practiceItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = !selectStatus || item.status === selectStatus;

      return matchesSearch && matchesStatus;
    });
  }, [practiceItems, searchQuery, selectStatus]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: PracticeItemStatus) => {
    setSelectStatus(selectStatus === status ? null : status);
    setCurrentPage(1);
  };

  // ... (averageScore, totalCompleted - không thay đổi)
  const completedQuizzes = practiceItems.filter(
    (item) => item.status === "completed"
  );

  const totalCompleted = completedQuizzes.length;

  const averageScore = useMemo(() => {
    if (completedQuizzes.length === 0) {
      return 0;
    }
    const totalScore = completedQuizzes.reduce(
      (acc, item) => acc + item.score,
      0
    );
    return totalScore / completedQuizzes.length;
  }, [completedQuizzes]);

  // --- 4. CẬP NHẬT RENDER LOGIC ---

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-12 w-12 animate-spin text-[#F66868]" />
      </div>
    );
  }

  if (error) {
    // ... (error UI - không thay đổi)
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12 text-center max-w-md">
          <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Đã xảy ra lỗi
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // --- 5. LOGIC RENDER MỚI (giống hệt LessonTab) ---
  if (selectedQuiz) {
    return (
      <QuizPlayer
        quiz={selectedQuiz}
        onBack={(shouldRefetch: boolean) => {
          setSelectedQuiz(null); // 1. Luôn quay lại danh sách
          if (shouldRefetch) {
            // 2. Chỉ fetch lại nếu được yêu cầu (quiz đã hoàn thành)
            fetchPracticeItems();
          }
        }}
      />
    );
  }

  // --- 6. Đây là UI danh sách quiz (return mặc định) ---
  return (
    <div className="space-y-8">
      {/* --- HEADER: Updated Stats Grid --- */}
      {/* ... (Code header không thay đổi) ... */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f66868] via-[#ff7b7b] to-[#ff8f8f] p-8 text-white shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-3 tracking-tight">
                Luyện Tập
              </h2>
              <p className="text-white/90 text-lg font-medium">
                Cải thiện kỹ năng với các bài tập tương tác thú vị
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center border border-white/30">
                <Target className="h-5 w-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{totalCompleted}</div>
                <div className="text-xs text-white/90">Hoàn thành</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center border border-white/30">
                <Trophy className="h-5 w-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">
                  {averageScore.toFixed(0)}
                </div>
                <div className="text-xs text-white/90">Điểm TB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
      </div>

      {/* Search and Filters */}
      {/* ... (Code search/filter không thay đổi) ... */}
      <div className="space-y-4">
        {/* Search Bar (no change) */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm bài tập theo tên hoặc mô tả..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-12 h-14 rounded-2xl border-2 border-rose-100 focus:border-[#F66868] text-base shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* --- CHANGED: Status Filters --- */}
        <div className="bg-gradient-to-r from-rose-50/50 to-pink-50/50 rounded-2xl p-5 border-2 border-rose-100/60 shadow-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 text-sm font-bold text-gray-800 bg-white px-4 py-2 rounded-xl shadow-sm border border-rose-100">
              <Filter className="h-4 w-4 text-[#F66868]" />
              Trạng thái:
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {statusOptions.map((status) => (
                <Button
                  key={status.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusFilter(status.value)}
                  className={`rounded-xl font-semibold transition-all duration-300 border-2 shadow-sm hover:scale-105 hover:shadow-md cursor-pointer ${
                    selectStatus === status.value
                      ? status.value === "completed"
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400 hover:from-emerald-600 hover:to-green-600 ring-2 ring-emerald-200"
                        : "bg-[#F66868] text-white hover:bg-[#F66868]/80 ring-2 ring-[#F66868]"
                      : "border-rose-200 bg-white text-gray-700 hover:border-[#F66868] hover:bg-rose-50 hover:text-[#F66868]"
                  }`}
                >
                  {status.label}
                </Button>
              ))}
            </div>

            {selectStatus && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectStatus(null)}
                className="ml-auto text-gray-500 hover:text-[#F66868] hover:bg-rose-50 rounded-xl font-semibold transition-all duration-300 border-2 border-transparent hover:border-rose-200 cursor-pointer"
              >
                <X className="h-4 w-4 mr-1" />
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        {/* Results count (no change) */}
        <div className="text-sm text-gray-600">
          Tìm thấy{" "}
          <span className="font-bold text-[#F66868]">
            {filteredItems.length}
          </span>{" "}
          bài tập
        </div>
      </div>

      {/* 7. Cards Grid (Updated with API data) */}
      {paginatedItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {paginatedItems.map((item) => {
            const isComplete = item.status === "completed";
            const progress =
              100 > 0 ? (item.score / 100) * 100 : isComplete ? 100 : 0;
            const clampedProgress = Math.min(100, Math.max(0, progress));

            return (
              <Card
                key={item.user_quiz_id}
                // --- 7. THAY ĐỔI NHỎ: BỎ CLICK Ở ĐÂY ---
                // onClick={() => setSelectedQuiz(item)} // Chúng ta sẽ đặt click vào Button
                className={`group overflow-hidden border-2 rounded-3xl bg-gradient-to-br transition-all duration-500 py-6 ${
                  isComplete
                    ? "from-emerald-50 to-green-50/50 border-emerald-200"
                    : "from-white to-rose-50/40 border-rose-100"
                }
                // --- Xóa hover effect ở card ngoài ---
                // hover:scale-[1.02] cursor-pointer 
                // hover:border-emerald-400 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)]
                // hover:border-[#F66868] hover:shadow-[0_8px_30px_rgba(246,104,104,0.15)]
                `}
              >
                {/* ... (CardHeader, CardContent - không thay đổi) ... */}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle
                        className={`text-xl font-bold mb-2 transition-colors ${
                          isComplete ? "text-emerald-600" : "text-gray-900" // Xóa group-hover
                        }`}
                      >
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 leading-relaxed">
                        {item.description ||
                          "Hoàn thành bài tập này để củng cố kiến thức của bạn."}
                      </CardDescription>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold shadow-sm ${
                        isComplete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-[#F66868]"
                      }`}
                    >
                      <Zap
                        className={`h-4 w-4 ${
                          isComplete ? "fill-emerald-400" : "fill-[#F66868]/40"
                        }`}
                      />
                      {item.score}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress (using score and total_points) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Điểm</span>
                      <span
                        className={`font-bold ${
                          isComplete ? "text-emerald-600" : "text-[#F66868]"
                        }`}
                      >
                        {item.score.toFixed(0)} / {100}
                      </span>
                    </div>
                    <div
                      className={`h-3 rounded-full overflow-hidden shadow-inner ${
                        isComplete ? "bg-emerald-100" : "bg-rose-100"
                      }`}
                    >
                      <div
                        className={`h-full transition-all duration-700 rounded-full relative ${
                          isComplete
                            ? "bg-gradient-to-r from-emerald-500 to-green-500"
                            : "bg-gradient-to-r from-[#F66868] to-[#ff7b7b]"
                        }`}
                        style={{ width: `${clampedProgress}%` }}
                      >
                        {clampedProgress > 0 && clampedProgress < 100 && (
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* --- 8. ĐẶT ONCLICK VÀO ĐÂY --- */}
                  <Button
                    onClick={() => setSelectedQuiz(item)} // <--- THAY ĐỔI QUAN TRỌNG
                    className={`w-full h-12 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] ${
                      isComplete
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                        : item.status === "in_progress"
                        ? "bg-gradient-to-r from-[#F66868] to-[#ff7b7b] hover:from-[#f55555] hover:to-[#F66868] text-white"
                        : "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 hover:from-rose-200 hover:to-pink-200"
                    }`}
                  >
                    {isComplete
                      ? "🎉 Ôn Luyện Lại"
                      : item.status === "in_progress"
                      ? "Tiếp Tục Luyện Tập →"
                      : "Bắt Đầu Luyện Tập"}
                  </Button>
                </CardContent>

                <div
                  className={`absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 ${
                    isComplete ? "bg-emerald-400" : "bg-[#F66868]"
                  }`}
                ></div>
              </Card>
            );
          })}
        </div>
      ) : (
        // ... (No Results Found - không thay đổi)
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12 text-center max-w-md">
            <Search className="h-16 w-16 text-[#f66868]/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Không tìm thấy bài tập
            </h3>
            <p className="text-gray-600">
              Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn
            </p>
          </div>
        </div>
      )}

      {/* Pagination (no changes) */}
      {/* ... (Code Pagination không thay đổi) ... */}
      {filteredItems.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-xl disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Trước
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[#F66868] text-white hover:bg-[#F66868]/90 shadow-md"
                    : "border-2 border-rose-200 text-gray-700 hover:border-[#F66868] hover:bg-rose-50"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-xl disabled:cursor-not-allowed"
          >
            Sau
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* --- 9. XÓA BỎ HOÀN TOÀN KHỐI CODE QUIZ UI Ở ĐÂY --- */}
      {/* {phase === "quiz" && ... } <--- TOÀN BỘ KHỐI NÀY ĐÃ ĐƯỢC CHUYỂN SANG QUIZPLAYER.TSX */}
    </div>
  );
}
