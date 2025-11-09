"use client";
import { useRouter } from "next/navigation";
// 1. Import useEffect, useCallback và additional icons
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Loader2,
  School,
  Trophy, // Thêm icon cho màn hình kết quả
} from "lucide-react";
import VocabularyInfo from "@/components/VocabularyInfo";
import { useUserStore } from "@/store/useUserStore";

// (Các interface Vocabulary, BackendVocabularyItem, Lesson không đổi)
interface Vocabulary {
  title: string;
  description: string;
  videoUrl: string;
  imageUrl?: string | null;
  partOfSpeech?: string;
}

interface BackendVocabularyItem {
  id: number;
  word: string;
  description: string;
  video_url: string;
}

interface Question {
  id: number;
  question_text: string;
  video: string;
  type: "mcq" | "true_false";
  options: {
    id: number;
    option_text: string;
    is_correct: boolean;
  }[];
}
interface LessonQuizResponse {
  quiz_id: number | null;
  questions: Question[];
}
interface Lesson {
  id: number;
  title: string;
}

export default function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [vocabularyList, setVocabularyList] = useState<Vocabulary[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUserStore();
  const router = useRouter();
  // 1. THÊM "summary" VÀO STATE CỦA PHASE
  const [phase, setPhase] = useState<"introduction" | "quiz" | "summary">(
    "introduction"
  );

  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 2. THÊM STATE ĐỂ GIỮ ĐIỂM SỐ CUỐI CÙNG
  const [quizPoint, setQuizPoint] = useState(0);
  const [quizAttemptId, setQuizAttemptId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state loading cho việc nộp bài
  const fetchData = useCallback(async () => {
    if (!lesson.id) {
      setError("No lesson ID provided.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPhase("introduction");
    setCurrentVocabIndex(0);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizPoint(0); // Reset điểm khi tải data mới

    try {
      const [vocabResponse, quizResponse] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/vocabulary?lesson_id=${lesson.id}`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lesson-quiz?lesson_id=${lesson.id}`
        ),
      ]);

      if (!vocabResponse.ok) throw new Error("Failed to fetch vocabulary.");
      if (!quizResponse.ok) throw new Error("Failed to fetch quiz questions.");

      const vocabData: { vocabulary: BackendVocabularyItem[] } =
        await vocabResponse.json();
      const quizData: LessonQuizResponse = await quizResponse.json();
      const mappedVocabulary: Vocabulary[] = vocabData.vocabulary.map(
        (item) => ({
          title: item.word,
          description: item.description,
          videoUrl: item.video_url,
          imageUrl: null,
        })
      );
      console.log(quizData);
      const fetched_quiz_id = quizData.quiz_id;
      console.log(fetched_quiz_id);
      setQuizAttemptId(fetched_quiz_id); // Giả sử bạn đã đổi tên state này
      setVocabularyList(mappedVocabulary);
      setQuizQuestions(quizData.questions || []);
      setQuizAnswers(new Array(quizData.questions?.length || 0).fill(null));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [lesson.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentVocab = vocabularyList[currentVocabIndex];
  const currentQuestion = quizQuestions[currentQuizIndex];

  // Logic tính điểm đúng/sai cho câu hỏi HIỆN TẠI
  const correctAnswerIndex = currentQuestion
    ? currentQuestion.options.findIndex((opt) => opt.is_correct)
    : -1;
  const isQuizCorrect = quizAnswers[currentQuizIndex] === correctAnswerIndex;

  // Logic tính % thanh progress
  const introProgress =
    vocabularyList.length > 0
      ? ((currentVocabIndex + 1) / vocabularyList.length) * 100
      : 0;
  const quizProgress =
    quizQuestions.length > 0
      ? ((currentQuizIndex + 1) / quizQuestions.length) * 100
      : 0;

  // 3. SỬA: Cập nhật thanh progress cho cả 3 giai đoạn
  const currentProgress =
    phase === "introduction"
      ? introProgress
      : phase === "quiz"
      ? quizProgress
      : 100; // 100% khi ở màn hình summary

  const handleFinishIntroduction = () => {
    if (quizQuestions.length > 0) {
      setPhase("quiz");
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    } else {
      handleRestart();
    }
  };

  // (handleQuizGeneration không đổi)
  const handleQuizGeneration = async () => {
    setIsGenerating(true);
    setError(null);

    const vocabularyPayload = vocabularyList.map((v) => ({
      word: v.title,
      description: v.description,
      video: v.videoUrl,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/generate-quiz`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lesson_id: lesson.id,
            lesson_title: lesson.title,
            user_id: user?.id,
            vocabulary: vocabularyPayload,
            session_id: null,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Không thể tạo bài kiểm tra");
      }

      const data = await response.json();
      const agentResponse = JSON.parse(data.response);

      if (agentResponse.action === "create_quiz") {
        console.log("Quiz đã được tạo:", agentResponse.payload);
        await fetchData();
        setPhase("quiz");
      } else {
        throw new Error(agentResponse.payload || "Agent không thể tạo quiz");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = optionIndex;
    setQuizAnswers(newAnswers);
    setShowQuizResult(true);
  };

  // 4. SỬA: handleNextQuiz để tính điểm và chuyển sang "summary"
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      // Vẫn còn câu hỏi
      setCurrentQuizIndex(currentQuizIndex + 1);
      setShowQuizResult(false);
      setSelectedAnswer(null);
    } else {
      // Đây là câu hỏi cuối cùng -> Tính điểm và chuyển sang summary

      // 1. Tính điểm
      const pointPerQuestion =
        quizQuestions.length > 0 ? 100 / quizQuestions.length : 0;

      const correctAnswersCount = quizAnswers.filter(
        (selectedOptionIndex, questionIndex) => {
          const question = quizQuestions[questionIndex];
          if (!question || selectedOptionIndex === null) return false;

          const correctOptionIndex = question.options.findIndex(
            (opt) => opt.is_correct
          );
          return selectedOptionIndex === correctOptionIndex;
        }
      ).length;

      setQuizPoint(Math.round(correctAnswersCount * pointPerQuestion));

      // 2. Chuyển phase
      setPhase("summary");
    }
  };
  const handleCompleteQuiz = async () => {
    // Kiểm tra các ID cần thiết
    if (!quizAttemptId || !user?.id) {
      console.error(
        "Thiếu ID lượt làm bài hoặc ID người dùng. Không thể nộp điểm."
      );
      setError("Lỗi: Không thể nộp điểm. Vui lòng tải lại.");
      return; // Không làm gì cả nếu thiếu ID
    }

    setIsSubmitting(true);
    setError(null);
    console.log("Testing:", quizAttemptId, user.id, quizPoint, lesson.id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quiz/submit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quiz_id: quizAttemptId,
            user_id: parseInt(user.id), // Đảm bảo user ID là số
            score: quizPoint,
            lesson_id: lesson.id,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Lỗi khi nộp bài");
      }

      const result = await response.json();
      console.log("Nộp bài thành công:", result);
      // Bạn có thể thêm logic ở đây, ví dụ: cập nhật state của user...
      router.back();
    } catch (err: any) {
      console.error("Lỗi API nộp bài:", err);
      setError(err.message); // Hiển thị lỗi trên màn hình summary
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setShowQuizResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleNextVocab = () => {
    if (currentVocabIndex < vocabularyList.length - 1) {
      setCurrentVocabIndex(currentVocabIndex + 1);
    }
  };

  const handlePreviousVocab = () => {
    if (currentVocabIndex > 0) {
      setCurrentVocabIndex(currentVocabIndex - 1);
    }
  };

  // 5. SỬA: handleRestart để reset cả điểm
  const handleRestart = () => {
    setPhase("introduction");
    setCurrentVocabIndex(0);
    setCurrentQuizIndex(0);
    setQuizAnswers(new Array(quizQuestions.length).fill(null));
    setShowQuizResult(false);
    setSelectedAnswer(null);
    setQuizPoint(0); // <-- RESET ĐIỂM
  };

  // (Phần JSX cho loading, error, no-vocabulary không đổi)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#f66868]" />
        <p className="mt-3 text-lg">Đang tải bài học...</p>
      </div>
    );
  }

  if (error && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-600 bg-red-50 p-6 rounded-lg">
        <XCircle className="w-8 h-8" />
        <p className="mt-3 text-lg font-semibold">Lỗi khi tải bài học</p>
        <p className="text-sm">{error}</p>
        <Button onClick={fetchData} className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  if (vocabularyList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <p className="text-lg">Không tìm thấy từ vựng nào cho bài học này.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-[80%] mx-auto px-4 py-8">
      {/* (Header không đổi) */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#f66868] to-rose-400 bg-clip-text text-transparent">
          {phase === "introduction"
            ? "Học Từ Vựng Kí Hiệu"
            : phase === "quiz"
            ? "Kiểm Tra Kiến Thức"
            : "Tổng Kết Kết Quả"}
        </h2>
        {/* 6. SỬA: Ẩn đếm số câu/từ vựng khi ở màn hình summary */}
        {phase !== "summary" && (
          <p className="text-muted-foreground text-sm">
            {phase === "introduction"
              ? `Từ vựng ${currentVocabIndex + 1} / ${vocabularyList.length}`
              : `Câu hỏi ${currentQuizIndex + 1} / ${quizQuestions.length}`}
          </p>
        )}
      </div>

      {/* (Progress và Tip box không đổi) */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-foreground">Tiến độ</span>
          <span className="text-[#f66868]">{Math.round(currentProgress)}%</span>
        </div>
        <Progress
          value={currentProgress}
          className="h-2 bg-rose-100 [&>div]:bg-[#f66868]"
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="mt-1 w-fit rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-rose-100 p-4 text-center shadow-sm flex flex-row gap-x-4 items-center">
          <div className="text-xl">💡</div>
          <div className="flex flex-col gap-y-1">
            <p className="text-rose-700 font-medium text-lg">
              Mẹo nhỏ: Hãy bật camera để tự kiểm tra bản thân nhé!
            </p>
          </div>
        </div>
      </div>

      {/* === PHASE: INTRODUCTION === */}
      {phase === "introduction" && currentVocab && (
        <VocabularyInfo
          word={currentVocab.title}
          partOfSpeech={currentVocab.partOfSpeech}
          definition={currentVocab.description}
          videoUrl={currentVocab.videoUrl}
          imageUrl={currentVocab.imageUrl || undefined}
        />
      )}

      {/* === PHASE: QUIZ === */}
      {phase === "quiz" && currentQuestion && (
        <Card className="overflow-hidden border-2 shadow-sm hover:shadow-md transition-all scale-[0.98]">
          <CardHeader className="border-b-2 py-2 px-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {currentQuestion.question_text}
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Xem video và chọn đáp án đúng
                </CardDescription>
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
                <div className="absolute top-0 left-0 h-full w-16 bg-white z-10"></div>
                <div className="absolute top-0 right-0 h-full w-16 bg-white z-10"></div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showQuizResult}
                  className={`group rounded-lg overflow-hidden border transition-all duration-300 ${
                    selectedAnswer === index
                      ? option.is_correct
                        ? "border-green-500 ring-1 ring-green-300"
                        : "border-red-500 ring-1 ring-red-300"
                      : "hover:border-[#f66868]/70"
                  }`}
                >
                  <div className="relative">
                    {selectedAnswer === index && showQuizResult && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          option.is_correct
                            ? "bg-green-500/20"
                            : "bg-red-500/20"
                        }`}
                      >
                        {option.is_correct ? (
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white border-t text-sm font-medium text-center">
                    {option.option_text}
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
          </CardContent>
        </Card>
      )}

      {/* 7. THÊM: Giao diện cho màn hình SUMMARY */}
      {phase === "summary" && (
        <Card className="overflow-hidden border-2 border-rose-100 shadow-sm text-center">
          <CardHeader className="bg-gradient-to-br from-rose-50 to-white pb-4">
            <Trophy className="w-16 h-16 text-[#f66868] mx-auto" />
            <CardTitle className="text-3xl font-bold text-[#f66868] pt-2">
              Chúc Mừng Hoàn Thành!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Bạn đã hoàn thành bài kiểm tra.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="text-7xl font-bold text-gray-800">{quizPoint}</div>
            <p className="text-xl text-gray-600 -mt-4">/ 100 điểm</p>
            <div className="w-full max-w-xs mx-auto">
              <Progress
                value={quizPoint}
                className="h-3 bg-rose-100 [&>div]:bg-[#f66868]"
              />
            </div>
            <p className="text-gray-500">
              Bạn đã trả lời đúng{" "}
              <strong>
                {Math.round((quizPoint / 100) * quizQuestions.length)} /{" "}
                {quizQuestions.length}
              </strong>{" "}
              câu hỏi.
            </p>
          </CardContent>
        </Card>
      )}

      {/* NAVIGATION */}
      <div className="flex items-center justify-between">
        {/* 8. SỬA: Ẩn nút "Quay Lại" khi ở màn hình summary */}
        {phase !== "summary" ? (
          <Button
            variant="outline"
            onClick={
              phase === "introduction"
                ? handlePreviousVocab
                : handlePreviousQuiz
            }
            disabled={
              phase === "introduction"
                ? currentVocabIndex === 0
                : currentQuizIndex === 0
            }
            className="flex items-center gap-2 border-rose-200 text-[#f66868] hover:bg-rose-50"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại
          </Button>
        ) : (
          <div></div> // Placeholder để giữ nút bên phải ở đúng vị trí
        )}

        {/* 9. SỬA: Ẩn thanh progress dots khi ở màn hình summary */}
        {phase !== "summary" && (
          <div className="flex items-center gap-2">
            {(phase === "introduction" ? vocabularyList : quizQuestions).map(
              (_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    (phase === "introduction"
                      ? currentVocabIndex
                      : currentQuizIndex) === idx
                      ? "w-8 bg-[#f66868]"
                      : "w-2 bg-muted"
                  }`}
                />
              )
            )}
          </div>
        )}

        {/* 10. SỬA: Cập nhật logic nút chính cho cả 3 phase */}
        <div className="flex flex-row gap-x-1">
          <Button
            onClick={
              phase === "introduction"
                ? currentVocabIndex === vocabularyList.length - 1
                  ? handleFinishIntroduction
                  : handleNextVocab
                : phase === "quiz" // Thêm điều kiện check
                ? currentQuizIndex === quizQuestions.length - 1
                  ? handleNextQuiz // handleNextQuiz sẽ tự động chuyển sang summary
                  : handleNextQuiz
                : handleRestart // Nếu phase là "summary", nút này sẽ là "Restart"
            }
            disabled={(phase === "quiz" && !showQuizResult) || isGenerating}
            className="flex items-center gap-2 bg-[#f66868] hover:bg-[#f66868]/90 text-white shadow-md"
          >
            {phase === "introduction" ? (
              currentVocabIndex === vocabularyList.length - 1 ? (
                <>
                  {quizQuestions.length > 0 ? "Làm Kiểm Tra" : "Học lại"}
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Tiếp Tục <ChevronRight className="h-4 w-4" />
                </>
              )
            ) : phase === "quiz" ? ( // Thêm điều kiện check
              currentQuizIndex === quizQuestions.length - 1 ? (
                // Câu quiz cuối
                <>
                  Hoàn thành <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                // Vẫn còn câu quiz
                <>
                  Tiếp Tục <ChevronRight className="h-4 w-4" />
                </>
              )
            ) : (
              // Phase là "summary"
              <>
                <RotateCcw className="h-4 w-4" /> Bắt Đầu Lại
              </>
            )}
          </Button>
          {phase === "summary" && (
            <Button
              className="flex items-center gap-2 bg-[#f66868] hover:bg-[#f66868]/90 text-white shadow-md"
              onClick={handleCompleteQuiz}
            >
              Hoàn thành
            </Button>
          )}
          {/* Nút "Tạo Quiz" (Logic không đổi) */}
          {phase === "introduction" && quizQuestions.length === 0 && (
            <Button
              onClick={handleQuizGeneration}
              variant="outline"
              disabled={isGenerating}
              className="flex items-center gap-2 border-rose-200 text-[#f66868] hover:bg-rose-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <School className="h-4 w-4" /> Tạo Quiz
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
