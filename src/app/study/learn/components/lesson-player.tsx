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
import { Vocabulary } from "@/app/dictionary/page";
import VocabularyInfo from "@/components/VocabularyInfo";

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
    title: "Trái Dừa",
    videoUrl: "https://www.youtube.com/watch?v=JZjjnSTYbRc", // Handspeak coconut video
    imageUrl: "https://www.lifeprint.com/asl101/gifs/c/coconut.gif", // Lifeprint coconut gif
    description:
      "Nắm hai bàn tay thành nắm, đặt cách nhau khoảng không, rồi xoay nhẹ để mô phỏng cùi dừa lật — giống động tác lắc dừa.",
  },
  {
    title: "Chuối",
    videoUrl: "https://www.youtube.com/watch?v=JLd8dRl4_3o", // Signing Savvy banana video
    imageUrl: "https://www.signingsavvy.com/media_sign/banana/2237.png", // Signing Savvy banana image
    description:
      "Duỗi ngón trỏ, sau đó dùng bàn tay kia 'lột' ngón trỏ như đang bóc vỏ chuối — động tác 'peel' chuối.",
  },
  {
    title: "Cam",
    videoUrl: "https://www.youtube.com/watch?v=5E5i2XH1eX8", // ASL Meredith orange video
    imageUrl: "https://aslmeredith.com/images/posts/orange_sign.png", // ASL Meredith orange image
    description:
      "Đặt bàn tay lên má, sau đó xoay nhẹ như đang vắt cam — biểu tượng cho việc vắt nước cam.",
  },
  {
    title: "Dâu Tây",
    videoUrl: "https://www.youtube.com/watch?v=5E5i2XH1eX8", // ASL Meredith strawberry video
    imageUrl: "https://aslmeredith.com/images/posts/strawberry_sign.png", // ASL Meredith strawberry image
    description:
      "Đặt đầu ngón trỏ và giữa lên môi, sau đó xoay nhẹ — biểu tượng như đang 've vẩy' dâu tây.",
  },
  {
    title: "Nho",
    videoUrl: "https://www.youtube.com/watch?v=9b9ZxIeB2_c", // Grapes ASL video
    imageUrl: "https://www.signingsavvy.com/media_sign/grape/2245.png", // Signing Savvy grapes image
    description:
      "Nắm nhẹ các ngón tay lại rồi chuyển động giống như đang nắm chùm nho nhỏ — mô phỏng việc hái nho.",
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
      {phase === "introduction" && (
        <VocabularyInfo
          word={currentVocab.title}
          partOfSpeech={currentVocab.partOfSpeech}
          definition={currentVocab.description}
          videoUrl={currentVocab.videoUrl}
          imageUrl={currentVocab.imageUrl}
        />
      )}

      {/* === PHASE: QUIZ === */}
      {phase === "quiz" && (
        <Card className="overflow-hidden border-2 shadow-sm hover:shadow-md transition-all scale-[0.98]">
          <CardHeader className="border-b-2 py-2 px-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Kí Hiệu Này Là Gì?
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
            {/* VIDEO */}
            <div className="relative rounded-lg overflow-hidden aspect-video bg-rose-50 shadow-inner">
              <img
                src={currentQuestion.videoUrl}
                alt="Câu hỏi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f66868] hover:bg-[#f66868]/90 transition">
                  <Volume2 className="text-white w-6 h-6" />
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showQuizResult}
                  className={`group rounded-lg overflow-hidden border transition-all duration-300 ${
                    selectedAnswer === index
                      ? isQuizCorrect
                        ? "border-green-500 ring-1 ring-green-300"
                        : "border-red-500 ring-1 ring-red-300"
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
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-1.5 bg-white border-t text-xs font-medium text-center">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* RESULT */}
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
