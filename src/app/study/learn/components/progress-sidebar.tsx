"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Lock, Circle, SquarePen } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  vocabularyCount: number;
  status: "completed" | "in-progress" | "locked";
  progress: number;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Bảng Chữ Cái A-F",
    vocabularyCount: 4,
    status: "completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Bảng Chữ Cái G-L",
    vocabularyCount: 4,
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    title: "Bảng Chữ Cái M-R",
    vocabularyCount: 4,
    status: "in-progress",
    progress: 65,
  },
  {
    id: 4,
    title: "Bảng Chữ Cái S-Z",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 5,
    title: "Số Từ 0-5",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 6,
    title: "Số Từ 6-10",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 7,
    title: "Lời Chào Cơ Bản",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 8,
    title: "Cảm Xúc",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 9,
    title: "Gia Đình",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
  {
    id: 10,
    title: "Hoạt Động Hàng Ngày",
    vocabularyCount: 4,
    status: "locked",
    progress: 0,
  },
];

interface ProgressSidebarProps {
  selectedLessonId?: number;
  onSelectLesson?: (id: number) => void;
}

export default function ProgressSidebar({
  selectedLessonId,
  onSelectLesson,
}: ProgressSidebarProps) {
  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const totalVocabulary = lessons.length * 4;

  return (
    <div className="space-y-4">
      {/* Progress Overview Card */}
      <Card className="border border-[#F66868]/30 bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-sm">
        <CardHeader className="pb-3 flex flex-row justify-between">
          <CardTitle className="text-lg font-semibold text-[#F66868] tracking-wide">
            Giáo trình của bạn
          </CardTitle>
          <Button>
            <SquarePen />
            Điều chỉnh
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Bài Hoàn Thành</span>
            <span className="font-semibold text-[#F66868]">
              {completedCount}/10
            </span>
          </div>

          {/* Main progress bar */}
          <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F66868] transition-all duration-500"
              style={{ width: `${(completedCount / 10) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-gray-500">Từ Vựng Học</span>
            <span className="font-semibold text-[#F66868]">
              {completedCount * 4}/{totalVocabulary}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Lesson List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() =>
              lesson.status !== "locked" && onSelectLesson?.(lesson.id)
            }
            className={`p-3 rounded-xl border text-sm transition-all cursor-pointer backdrop-blur-sm
              ${
                selectedLessonId === lesson.id
                  ? "border-[#F66868] bg-[#F66868]/10 shadow-[0_0_8px_#F66868]/30"
                  : "border-rose-100 hover:border-[#F66868]/50 hover:bg-rose-50/60"
              }
              ${
                lesson.status === "locked"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {lesson.status === "completed" && (
                  <CheckCircle2 className="h-5 w-5 text-[#F66868]" />
                )}
                {lesson.status === "in-progress" && (
                  <Circle className="h-5 w-5 text-[#F66868] fill-[#F66868]/40 animate-pulse" />
                )}
                {lesson.status === "locked" && (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {lesson.vocabularyCount} từ vựng
                </p>

                {lesson.status === "in-progress" && (
                  <div className="mt-2 h-1.5 bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F66868] transition-all duration-500"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
