"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  CheckCircle2,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import LessonPlayer from "./lesson-player";
import ProgressSidebar from "./progress-sidebar";
import { useUserStore } from "@/store/useUserStore";
import { SyllabusInfo } from "../../map/page";

type LessonStatus = "complete" | "in-progress" | "not_start";

interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabularyCount: number;
  lesson_status: LessonStatus;
  level: "Cơ bản";
}

export default function LessonTab({
  syllabus,
}: {
  syllabus: SyllabusInfo | undefined;
}) {
  const { user } = useUserStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  useEffect(() => {
    if (!syllabus?.id || !user?.id) {
      setLessons([]);
      setIsLoading(false);
      return;
    }

    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses/${syllabus.id}/lessons?user_id=${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch lessons");
        const data: { lessons: Lesson[] } = await res.json();
        setLessons(data.lessons || []);
      } catch (e) {
        console.error(e);
        setLessons([]);
      } finally {
        setIsLoading(false);
        setSelectedLesson(null);
      }
    };

    fetchLessons();
  }, [syllabus?.id, user?.id]);

  const lessonToPlay = lessons.find((l) => l.id === selectedLesson);

  if (selectedLesson && lessonToPlay) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedLesson(null)}
          className="mb-4 border-2 border-[#f66868] text-[#f66868] hover:text-white hover:bg-[#f66868] transition-all duration-300 font-semibold shadow-sm"
        >
          ← Quay Lại Danh Sách
        </Button>
        <LessonPlayer lesson={lessonToPlay} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-[#f66868] rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#f66868]" />
        </div>
        <p className="mt-6 text-gray-600 font-medium text-lg">
          Đang tải bài học...
        </p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12 text-center max-w-md">
          <BookOpen className="h-16 w-16 text-[#f66868]/60 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Chưa có bài học
          </h3>
          <p className="text-gray-600">
            Không tìm thấy bài học nào cho chủ đề này.
          </p>
        </div>
      </div>
    );
  }

  const completed = lessons.filter(
    (l) => l.lesson_status === "complete"
  ).length;
  const progress = (completed / lessons.length) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Progress Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f66868] via-[#ff7b7b] to-[#ff8f8f] p-8 text-white shadow-xl">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold mb-3">Bài Học</h2>
                <p className="text-white/90 text-lg font-medium">
                  Học bài theo cách lộ trình của bạn
                </p>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center border border-white/30">
                <div className="text-3xl font-bold">
                  {completed}/{lessons.length}
                </div>
                <div className="text-sm text-white/90 mt-1">Hoàn thành</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white/90">
                  Tiến độ học tập
                </span>
                <span className="text-sm font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {lessons.map((lesson, index) => {
            const isComplete = lesson.lesson_status === "complete";
            const isPlayable =
              lesson.lesson_status === "in-progress" ||
              lesson.lesson_status === "not_start";

            return (
              <Card
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] cursor-pointer 
                  ${
                    isComplete
                      ? "border-emerald-200 hover:border-emerald-400 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)]"
                      : "border-rose-100 hover:border-[#F66868] hover:shadow-[0_8px_30px_rgba(246,104,104,0.15)]"
                  }`}
              >
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isComplete
                      ? "bg-gradient-to-br from-emerald-50/50 to-green-50/50"
                      : "bg-gradient-to-br from-rose-50/50 to-pink-50/50"
                  }`}
                />

                <CardHeader className="pt-6 pb-4 relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                          isComplete
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-[#f66868]"
                        }`}
                      >
                        <span>Bài {index + 1}</span>
                        {lesson.lesson_status === "in-progress" && (
                          <TrendingUp className="h-3 w-3" />
                        )}
                      </div>

                      <CardTitle
                        className={`text-xl font-bold leading-snug transition-colors ${
                          isComplete
                            ? "text-emerald-600 group-hover:text-emerald-700"
                            : "text-gray-800 group-hover:text-[#f66868]"
                        }`}
                      >
                        {lesson.title}
                      </CardTitle>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>

                    {isComplete && (
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 drop-shadow-sm" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pb-6 relative z-10">
                  <Button
                    className={`w-full h-12 rounded-xl text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300
                      ${
                        isComplete
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                          : isPlayable
                          ? "bg-gradient-to-r from-[#F66868] to-[#ff7b7b] hover:from-[#f55555] hover:to-[#F66868] text-white"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLesson(lesson.id);
                    }}
                  >
                    {isComplete && (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Ôn Tập
                      </>
                    )}
                    {lesson.lesson_status === "in-progress" && (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Tiếp Tục
                      </>
                    )}
                    {lesson.lesson_status === "not_start" && (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Bắt Đầu
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <ProgressSidebar
            syllabus={syllabus}
            lessons={lessons}
            selectedLessonId={selectedLesson ?? undefined}
            onSelectLesson={setSelectedLesson}
          />
        </div>
      </div>
    </div>
  );
}
