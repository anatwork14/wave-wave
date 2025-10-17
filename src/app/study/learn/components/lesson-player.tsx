"use client";

import { useState } from "react";
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
} from "lucide-react";
import VocabularyInfo from "./VocabularyInfo";

interface Vocabulary {
  id: number;
  word: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  explanation: string;
}

interface Question {
  id: number;
  videoUrl: string;
  correctAnswer: number;
  options: {
    id: number;
    imageUrl: string;
    label: string;
  }[];
}

const vocabularyList: Vocabulary[] = [
  {
    id: 1,
    word: "Trái Dừa",
    description: "Kí hiệu cho trái dừa",
    videoUrl: "/sign-language-letter-a.jpg",
    imageUrl: "/sign-language-letter-a.jpg",
    explanation:
      "Nắm tay thành nắm đấm với ngón cái ngoài cùng, sau đó xoay tay.",
  },
  {
    id: 2,
    word: "Chuối",
    description: "Kí hiệu cho chuối",
    videoUrl: "/sign-language-letter-b.jpg",
    imageUrl: "/sign-language-letter-b.jpg",
    explanation: "Mở rộng tất cả các ngón tay với lòng bàn tay hướng ra ngoài.",
  },
  {
    id: 3,
    word: "Cam",
    description: "Kí hiệu cho cam",
    videoUrl: "/sign-language-letter-c.jpg",
    imageUrl: "/sign-language-letter-c.jpg",
    explanation: "Uốn cong tất cả các ngón tay như hình chữ C.",
  },
  {
    id: 4,
    word: "Dâu Tây",
    description: "Kí hiệu cho dâu tây",
    videoUrl: "/sign-language-letter-a.jpg",
    imageUrl: "/sign-language-letter-a.jpg",
    explanation: "Chỉ ngón trỏ và ngón giữa lên trên, các ngón khác gập xuống.",
  },
  {
    id: 5,
    word: "Nho",
    description: "Kí hiệu cho nho",
    videoUrl: "/sign-language-letter-b.jpg",
    imageUrl: "/sign-language-letter-b.jpg",
    explanation: "Nắm tay lại và di chuyển từ trên xuống dưới.",
  },
];

const quizQuestions: Question[] = [
  {
    id: 1,
    videoUrl: "/sign-language-letter-a.jpg",
    correctAnswer: 0,
    options: [
      { id: 1, imageUrl: "/sign-language-letter-a.jpg", label: "Trái Dừa" },
      { id: 2, imageUrl: "/sign-language-letter-b.jpg", label: "Chuối" },
      { id: 3, imageUrl: "/sign-language-letter-c.jpg", label: "Cam" },
      { id: 4, imageUrl: "/sign-language-letter-a.jpg", label: "Dâu Tây" },
    ],
  },
  {
    id: 2,
    videoUrl: "/sign-language-letter-b.jpg",
    correctAnswer: 1,
    options: [
      { id: 1, imageUrl: "/sign-language-letter-a.jpg", label: "Trái Dừa" },
      { id: 2, imageUrl: "/sign-language-letter-b.jpg", label: "Chuối" },
      { id: 3, imageUrl: "/sign-language-letter-c.jpg", label: "Cam" },
      { id: 4, imageUrl: "/sign-language-letter-a.jpg", label: "Nho" },
    ],
  },
  {
    id: 3,
    videoUrl: "/sign-language-letter-c.jpg",
    correctAnswer: 2,
    options: [
      { id: 1, imageUrl: "/sign-language-letter-a.jpg", label: "Trái Dừa" },
      { id: 2, imageUrl: "/sign-language-letter-b.jpg", label: "Chuối" },
      { id: 3, imageUrl: "/sign-language-letter-c.jpg", label: "Cam" },
      { id: 4, imageUrl: "/sign-language-letter-a.jpg", label: "Dâu Tây" },
    ],
  },
  {
    id: 4,
    videoUrl: "/sign-language-letter-a.jpg",
    correctAnswer: 3,
    options: [
      { id: 1, imageUrl: "/sign-language-letter-a.jpg", label: "Trái Dừa" },
      { id: 2, imageUrl: "/sign-language-letter-b.jpg", label: "Chuối" },
      { id: 3, imageUrl: "/sign-language-letter-c.jpg", label: "Cam" },
      { id: 4, imageUrl: "/sign-language-letter-a.jpg", label: "Dâu Tây" },
    ],
  },
  {
    id: 5,
    videoUrl: "/sign-language-letter-b.jpg",
    correctAnswer: 4,
    options: [
      { id: 1, imageUrl: "/sign-language-letter-a.jpg", label: "Trái Dừa" },
      { id: 2, imageUrl: "/sign-language-letter-b.jpg", label: "Chuối" },
      { id: 3, imageUrl: "/sign-language-letter-c.jpg", label: "Cam" },
      { id: 4, imageUrl: "/sign-language-letter-a.jpg", label: "Nho" },
    ],
  },
];

export default function LessonPlayer() {
  const [phase, setPhase] = useState<"introduction" | "quiz">("introduction");
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentVocab = vocabularyList[currentVocabIndex];
  const currentQuestion = quizQuestions[currentQuizIndex];

  const introProgress = ((currentVocabIndex + 1) / vocabularyList.length) * 100;
  const quizProgress = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
  const currentProgress =
    phase === "introduction" ? introProgress : quizProgress;

  const isQuizAnswered = quizAnswers[currentQuizIndex] !== null;
  const isQuizCorrect =
    quizAnswers[currentQuizIndex] === currentQuestion.correctAnswer;

  const handleFinishIntroduction = () => {
    setPhase("quiz");
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = optionIndex;
    setQuizAnswers(newAnswers);
    setShowQuizResult(true);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setShowQuizResult(false);
      setSelectedAnswer(null);
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

  const handleRestart = () => {
    setPhase("introduction");
    setCurrentVocabIndex(0);
    setCurrentQuizIndex(0);
    setQuizAnswers(new Array(quizQuestions.length).fill(null));
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

  const correctCount = quizAnswers.filter(
    (ans, idx) => ans === quizQuestions[idx].correctAnswer
  ).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#f66868] to-rose-400 bg-clip-text text-transparent">
          {phase === "introduction"
            ? "Học Từ Vựng Kí Hiệu"
            : "Kiểm Tra Kiến Thức"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {phase === "introduction"
            ? `Từ vựng ${currentVocabIndex + 1} / ${vocabularyList.length}`
            : `Câu hỏi ${currentQuizIndex + 1} / ${quizQuestions.length}`}
        </p>
      </div>

      {/* PROGRESS */}
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

      {/* === PHASE: INTRODUCTION === */}
      {phase === "introduction" && <VocabularyInfo />}

      {/* === PHASE: QUIZ === */}
      {phase === "quiz" && (
        <Card className="overflow-hidden border border-rose-200 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 border-b border-rose-200">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Kí Hiệu Này Là Gì?
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Xem video và chọn đáp án đúng
                </CardDescription>
              </div>
              <Badge className="bg-[#f66868]/10 text-[#f66868] border border-[#f66868]/30">
                Kiểm Tra
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* VIDEO */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-rose-50 shadow-inner">
              <img
                src={currentQuestion.videoUrl}
                alt="Câu hỏi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="w-16 h-16 rounded-full flex items-center justify-center bg-[#f66868] hover:bg-[#f66868]/90 transition">
                  <Volume2 className="text-white w-8 h-8" />
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showQuizResult}
                  className={`group rounded-xl overflow-hidden border transition-all duration-300 ${
                    selectedAnswer === index
                      ? isQuizCorrect
                        ? "border-green-500 ring-2 ring-green-300"
                        : "border-red-500 ring-2 ring-red-300"
                      : "hover:border-[#f66868]/70"
                  }`}
                >
                  <div className="relative aspect-square">
                    <img
                      src={option.imageUrl}
                      alt={option.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {selectedAnswer === index && showQuizResult && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          isQuizCorrect ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {isQuizCorrect ? (
                          <CheckCircle2 className="w-10 h-10 text-green-600" />
                        ) : (
                          <XCircle className="w-10 h-10 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-white border-t text-sm font-medium text-center">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* RESULT */}
            {showQuizResult && (
              <div
                className={`p-4 rounded-lg border ${
                  isQuizCorrect
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="font-semibold mb-1">
                  {isQuizCorrect ? "Tuyệt vời!" : "Chưa đúng"}
                </p>
                <p className="text-sm">
                  {isQuizCorrect
                    ? `Đúng rồi! Đây là kí hiệu cho "${
                        currentQuestion.options[currentQuestion.correctAnswer]
                          .label
                      }".`
                    : `Đáp án đúng là "${
                        currentQuestion.options[currentQuestion.correctAnswer]
                          .label
                      }". Hãy thử lại nhé!`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* NAVIGATION */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={
            phase === "introduction" ? handlePreviousVocab : handlePreviousQuiz
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

        <Button
          onClick={
            phase === "introduction"
              ? currentVocabIndex === vocabularyList.length - 1
                ? handleFinishIntroduction
                : handleNextVocab
              : currentQuizIndex === quizQuestions.length - 1
              ? handleRestart
              : handleNextQuiz
          }
          disabled={phase === "quiz" && !showQuizResult}
          className="flex items-center gap-2 bg-[#f66868] hover:bg-[#f66868]/90 text-white shadow-md"
        >
          {phase === "quiz" && currentQuizIndex === quizQuestions.length - 1 ? (
            <>
              <RotateCcw className="h-4 w-4" /> Bắt Đầu Lại
            </>
          ) : (
            <>
              Tiếp Tục <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
