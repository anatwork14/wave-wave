"use client";

// 1. Import useEffect and define the Lesson type
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Play, CheckCircle2 } from "lucide-react";
import LessonPlayer from "./lesson-player";
import ProgressSidebar from "./progress-sidebar";
import { useUserStore } from "@/store/useUserStore";

// 2. Define the Lesson type based on your hardcoded data
// (This should match what your API returns)
type LessonStatus = "complete" | "in-progress" | "not_start";

interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabularyCount: number;
  lesson_status: LessonStatus;
  level: "Cơ bản";
}

// 3. Fix the props signature
// It must be ({ syllabusId }: { ... })
export default function LessonTab({
  syllabusId,
}: {
  syllabusId: string | null;
}) {
  // 4. Add state for fetched lessons and loading
  const { user } = useUserStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  // 5. Add useEffect to fetch lessons when syllabusId changes
  useEffect(() => {
    // Don't fetch if no syllabus is selected
    if (!syllabusId) {
      setIsLoading(false);
      setLessons([]); // Clear any previous lessons
      return;
    }

    const fetchLessons = async () => {
      setIsLoading(true);
      setSelectedLesson(null); // Clear selection when changing syllabus
      try {
        // Fetch lessons for the specific syllabus
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses/${syllabusId}/lessons?user_id=${user?.id}` // <-- TEMP user_id=1 for testing
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }
        // Assuming API returns { lessons: [...] }
        const data: { lessons: Lesson[] } = await response.json();
        setLessons(data.lessons || []);
      } catch (error) {
        console.error(error);
        setLessons([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [syllabusId]); // The crucial dependency

  // 6. Find the lesson object to pass to the player
  const lessonToPlay = lessons.find((l) => l.id === selectedLesson);

  if (selectedLesson !== null && lessonToPlay) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedLesson(null)}
          className="mb-4 border border-[#f66868] text-[#f66868] hover:text-[#f66868] hover:bg-rose-100"
        >
          ← Quay Lại Danh Sách
        </Button>
        {/* 7. Pass the selected lesson object to the player */}
        <LessonPlayer lesson={lessonToPlay} />
      </div>
    );
  }

  // 8. Add Loading and Empty States
  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">Đang tải bài học...</div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Không tìm thấy bài học nào cho chủ đề này.
      </div>
    );
  }

  // --- Main Return (Lesson List) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[#f66868] mb-2">Bài Học</h2>
          <p className="text-[#f66868]">Học bài theo cách lộ trình của bạn</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {/* 9. Map over the 'lessons' state variable (not the hardcoded one) */}
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`overflow-hidden transition-all duration-500 rounded-2xl border border-rose-100 hover:border-[#F66868]/60 ${
                lesson.lesson_status == "complete" &&
                "border-green-200 hover:border-green-300"
              } hover:shadow-[0_0_12px_#F66868]/20`}
            >
              {/* Header */}
              <CardHeader className="">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-lg font-semibold text-[#f66868] ${
                        lesson.lesson_status == "complete" && "text-green-500"
                      }`}
                    >
                      {lesson.title}
                    </CardTitle>
                    <p
                      className={`text-sm ${
                        lesson.level == "Cơ bản"
                          ? "text-[#f66868]"
                          : lesson.level == "Nâng cao"
                          ? "text-yellow-500"
                          : ""
                      } mt-1`}
                    >
                      {lesson.description}
                    </p>
                  </div>

                  {lesson.lesson_status === "complete" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="space-y-4">
                {/* Level + Duration */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      lesson.level === "Cơ bản"
                        ? "bg-[#F66868]/10 text-[#F66868]"
                        : "bg-yellow-200 text-yellow-500"
                    }`}
                  >
                    Cơ bản
                  </span>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full text-sm font-semibold transition-all duration-300 rounded-xl
    ${
      lesson.lesson_status === "complete"
        ? "text-white bg-green-500 hover:bg-green-600" // "Ôn Tập" style
        : lesson.lesson_status === "in-progress" ||
          lesson.lesson_status === "not_start"
        ? "bg-[#F66868] hover:bg-[#F66868]/90 text-white" // "Tiếp Tục" and "Bắt đầu" style
        : "bg-gray-100 text-gray-500 cursor-not-allowed" // "locked" style
    }`}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  {/* Ôn Tập */}
                  {lesson.lesson_status === "complete" && "Ôn Tập"}

                  {/* Tiếp Tục */}
                  {lesson.lesson_status === "in-progress" && (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Tiếp Tục
                    </>
                  )}

                  {/* Bắt đầu */}
                  {lesson.lesson_status === "not_start" && (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Bắt đầu
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          {/* 10. Pass the fetched lessons to the sidebar */}
          <ProgressSidebar
            syllabusId={syllabusId as string}
            lessons={lessons}
            selectedLessonId={selectedLesson ?? undefined}
            onSelectLesson={setSelectedLesson}
          />
        </div>
      </div>
    </div>
  );
}
