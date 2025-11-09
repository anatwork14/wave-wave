"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Lock, Circle, SquarePen } from "lucide-react";

type LessonStatus = "complete" | "in-progress" | "not_start";

interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabulary_count: number;
  lesson_status: LessonStatus;
  level: "Cơ bản";
}

// 2. DELETE the hardcoded 'lessons' array.
// const lessons: Lesson[] = [ ... ]; // <-- DELETE THIS

// 3. UPDATE the props to accept the 'lessons' array
interface ProgressSidebarProps {
  lessons: Lesson[]; // <-- ADD THIS
  syllabusId: string;
  selectedLessonId?: number;
  onSelectLesson?: (id: number) => void;
}

export default function ProgressSidebar({
  lessons, // <-- 4. ACCEPT the 'lessons' prop
  syllabusId,
  selectedLessonId,
  onSelectLesson,
}: ProgressSidebarProps) {
  // 5. CALCULATE progress dynamically from the 'lessons' prop
  const totalLessons = lessons.length;
  const completedCount = lessons.filter(
    (l) => l.lesson_status === "complete"
  ).length;
  console.log(lessons);
  // More accurate vocabulary calculation
  const totalVocabulary = lessons.reduce(
    (acc, lesson) => acc + (lesson.vocabulary_count || 0),
    0
  );

  const vocabularyComplete = lessons.reduce(
    (acc, lesson) =>
      acc + (lesson.lesson_status === "complete" ? lesson.vocabulary_count : 0),
    0
  );
  return (
    <div className="space-y-4">
      {/* Progress Overview Card */}
      <Card className="border border-[#F66868]/30 bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-sm">
        <CardHeader className="pb-3 flex flex-row justify-between">
          <CardTitle className="text-lg font-semibold text-[#F66868] tracking-wide">
            Giáo trình của bạn
          </CardTitle>
          {Number(syllabusId) > 11 && (
            <Button>
              <SquarePen />
              Điều chỉnh
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Bài Hoàn Thành</span>
            <span className="font-semibold text-[#F66868]">
              {completedCount}/{totalLessons}
            </span>
          </div>

          {/* Main progress bar */}
          <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F66868] transition-all duration-500"
              style={{ width: `${(completedCount / totalLessons) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-gray-500">Từ Vựng Học</span>
            <span className="font-semibold text-[#F66868]">
              {vocabularyComplete}/{totalVocabulary}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Lesson List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => onSelectLesson?.(lesson.id)}
            className={`p-3 rounded-xl border text-sm transition-all cursor-pointer backdrop-blur-sm
              ${
                selectedLessonId === lesson.id
                  ? "border-[#F66868] bg-[#F66868]/10 shadow-[0_0_8px_#F66868]/30"
                  : "border-rose-100 hover:border-[#F66868]/50 hover:bg-rose-50/60"
              }
              ${
                lesson.lesson_status == "complete" &&
                "border-green-200 hover:border-green-300 hover:bg-green-400"
              }
            `}
          >
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 mt-0.5">
                {lesson.lesson_status === "complete" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 items-center" />
                )}
                {lesson.lesson_status === "in-progress" && (
                  <Circle className="h-5 w-5 text-[#F66868] fill-[#F66868]/40 animate-pulse" />
                )}
              </div>
              <div className="flex w-full flex-row justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {lesson.vocabulary_count} từ vựng
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
