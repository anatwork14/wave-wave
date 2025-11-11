"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, XCircle, CheckCircle2, Trophy } from "lucide-react";
import { PracticeItem } from "./practice-tab";
import { useUserStore } from "@/store/useUserStore";

// --- Types for Question API ---
interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  question_text: string;
  video: string;
  type: "mcq" | "true_false";
  options: Option[];
}

interface LessonQuizResponse {
  quiz_id: number | null;
  questions: Question[];
}

interface QuizPlayerProps {
  quiz: PracticeItem;
  onBack: (shouldRefetch: boolean) => void; // <-- SỬA 1: Thêm tham số boolean
}

export default function QuizPlayer({ quiz, onBack }: QuizPlayerProps) {
  // --- State cho việc tải câu hỏi ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State cho quá trình làm quiz ---
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUserStore();

  // --- 1. Tải câu hỏi ---
  useEffect(() => {
    if (!quiz.lesson_id) {
      setIsLoading(false);
      setError("Bài quiz này không liên kết với bài học nào.");
      return;
    }

    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lesson-quiz?lesson_id=${quiz.lesson_id}`
        );
        if (!res.ok) throw new Error("Không thể tải câu hỏi.");
        const data: LessonQuizResponse = await res.json();
        if (!data.questions || data.questions.length === 0) {
          throw new Error("Bài quiz này chưa có câu hỏi.");
        }
        setQuestions(data.questions);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [quiz.lesson_id]);

  // --- 2. Logic xử lý quiz ---
  if (questions.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12 text-center max-w-md">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Đã xảy ra lỗi
          </h3>
          <p className="text-gray-600">{error || "Không có câu hỏi."}</p>
          <Button
            onClick={() => onBack(false)} // <-- SỬA 2: Gửi 'false'
            variant="outline"
            className="mt-4"
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-12 w-12 animate-spin text-[#F66868]" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex =
    currentQuestion?.options.findIndex((opt) => opt.is_correct) ?? -1;

  const handleQuizAnswer = (selectedIndex: number) => {
    if (showQuizResult) return;
    const correctOption = currentQuestion.options.find((opt) => opt.is_correct);
    const selectedOption = currentQuestion.options[selectedIndex];
    const isCorrect = correctOption?.id === selectedOption?.id;

    setSelectedAnswer(selectedIndex);
    setIsQuizCorrect(isCorrect);
    setShowQuizResult(true);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 100 / questions.length);
    }
  };

  const handleNextQuestion = () => {
    if (!showQuizResult) return;
    setShowQuizResult(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleQuizEnd = async () => {
    if (!quiz.user_quiz_id || !user?.id) {
      console.error(
        "Thiếu ID lượt làm bài (user_quiz_id) hoặc ID người dùng. Không thể nộp điểm."
      );
      setError("Lỗi: Không thể nộp điểm. Vui lòng tải lại.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const finalScore = Math.round(score);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quiz/submit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quiz_id: quiz.user_quiz_id,
            user_id: parseInt(user.id),
            score: finalScore,
            lesson_id: quiz.lesson_id,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Lỗi khi nộp bài");
      }

      await response.json();
      setPhase("results");
    } catch (err: any) {
      console.error("Lỗi API nộp bài:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. Render các trạng thái ---

  if (error && !isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12 text-center max-w-md">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Đã xảy ra lỗi
          </h3>
          <p className="text-gray-600">{error}</p>
          <Button
            onClick={() => onBack(false)} // <-- SỬA 3: Gửi 'false'
            variant="outline"
            className="mt-4"
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  // --- Màn hình KẾT QUẢ ---
  if (phase === "results") {
    return (
      <div className="max-w-3xl mx-auto p-4 py-12">
        <Card className="overflow-hidden rounded-3xl shadow-xl">
          <CardHeader className="text-center bg-gradient-to-br from-[#f66868] to-[#ff8f8f] text-white p-8">
            <Trophy className="h-20 w-20 mx-auto" />
            <CardTitle className="text-4xl font-bold mt-4">
              Hoàn thành!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="text-7xl font-bold text-[#F66868]">
              {score.toFixed(0)}
              <span className="text-4xl text-gray-500 ml-2">điểm</span>
            </div>
            <p className="text-lg text-gray-600 mt-4">
              Cảm ơn bạn đã hoàn thành bài luyện tập.
            </p>
            <Button
              onClick={() => onBack(true)} // <-- SỬA 4: Gửi 'true'
              className="w-full h-12 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg mt-10 bg-[#F66868] hover:bg-[#F66868]/90"
            >
              Quay về trang Luyện tập
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Màn hình LÀM QUIZ ---
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button
        variant="outline"
        onClick={() => onBack(false)} // <-- SỬA 5: Gửi 'false'
        className="border-2 border-[#f66868] text-[#f66868] hover:text-white hover:bg-[#f66868] transition-all duration-300 font-semibold shadow-sm"
      >
        ← Quay Lại Danh Sách
      </Button>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>{quiz.title}</span>
          <span>
            Câu {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-3 rounded-full bg-rose-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F66868] to-[#ff7b7b] transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* UI Làm Quiz */}
      <Card className="overflow-hidden border-2 shadow-sm">
        {/* ... (Phần còn lại của CardHeader và CardContent không đổi) ... */}
        <CardHeader className="border-b-2 py-2 px-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {currentQuestion.question_text}
              </CardTitle>
              {currentQuestion.video && (
                <CardDescription className="text-xs mt-0.5">
                  Xem video và chọn đáp án đúng
                </CardDescription>
              )}
            </div>
            <Badge className="bg-[#f66868]/10 text-[#f66868] border border-[#f66868]/30 text-[11px] py-0.5 px-2">
              Kiểm Tra
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 px-4 pb-4">
          {currentQuestion.video && (
            <div className="relative rounded-lg overflow-hidden aspect-video bg-rose-50 shadow-inner">
              <video
                key={currentQuestion.id}
                src={currentQuestion.video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
              <div className="absolute top-0 left-0 h-full w-48 bg-white z-10"></div>
              <div className="absolute top-0 right-0 h-full w-48 bg-white z-10"></div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleQuizAnswer(index)}
                disabled={showQuizResult}
                className={`group w-full rounded-lg overflow-hidden border transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                  showQuizResult && selectedAnswer === index
                    ? option.is_correct
                      ? "border-green-500 ring-2 ring-green-500/50"
                      : "border-red-500 ring-2 ring-red-500/50"
                    : !showQuizResult && selectedAnswer === index
                    ? "border-[#f66868] ring-2 ring-[#f66868]/50"
                    : "border-gray-200 hover:border-[#f66868]/70"
                }`}
              >
                <div
                  className={`p-3 bg-white border-t text-sm font-medium text-center transition-all duration-300 ${
                    showQuizResult && selectedAnswer === index
                      ? option.is_correct
                        ? "text-green-700 font-bold"
                        : "text-red-700 font-bold"
                      : !showQuizResult && selectedAnswer === index
                      ? "text-[#f66868] font-bold"
                      : "text-gray-700 group-hover:text-[#f66868]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showQuizResult && selectedAnswer === index && (
                      <>
                        {option.is_correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </>
                    )}
                    <span>{option.option_text}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {showQuizResult && (
            <div
              className={`p-3 rounded-md border text-sm ${
                isQuizCorrect
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <p className="font-semibold mb-0.5">
                {isQuizCorrect ? "Tuyệt vời!" : "Chưa đúng"}
              </p>
              <p className="text-xs leading-snug">
                {isQuizCorrect
                  ? `Đúng rồi! Đây là kí hiệu cho "${currentQuestion.options[correctAnswerIndex]?.option_text}".`
                  : `Đáp án đúng là "${currentQuestion.options[correctAnswerIndex]?.option_text}". Hãy thử lại nhé!`}
              </p>
            </div>
          )}

          {error && isSubmitting && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {showQuizResult && (
            <Button
              onClick={
                currentQuestionIndex === questions.length - 1
                  ? handleQuizEnd
                  : handleNextQuestion
              }
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg ${
                isQuizCorrect
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? (
                isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Hoàn thành Quiz"
                )
              ) : (
                "Câu tiếp theo"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
