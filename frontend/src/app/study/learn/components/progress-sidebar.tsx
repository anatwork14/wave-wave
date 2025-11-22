"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Circle,
  SquarePen,
  GraduationCap,
  Sparkles,
  BookOpen,
  Trophy,
} from "lucide-react";
import { SyllabusInfo } from "../../map/page";
import { useEffect, useState } from "react"; // Import useEffect
import ChoiceModal from "./choice-modal";
import CurriculumModal from "@/components/curriculum-modal";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import ScheduleModal from "./schedule-modal";

type LessonStatus = "complete" | "in-progress" | "not_start";

interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabulary_count: number;
  lesson_status: LessonStatus;
  level: "Cơ bản";
}

// Define the shape of the data coming from FastAPI
export interface UserPreference {
  learning_goal?: string;
  available_time?: string;
  schedule?: string;
  expectations?: string;
  skill?: number;
}

interface ProgressSidebarProps {
  lessons: Lesson[];
  syllabus: SyllabusInfo | undefined;
  selectedLessonId?: number;
  onSelectLesson?: (id: number) => void;
}

export default function ProgressSidebar({
  lessons,
  syllabus,
  selectedLessonId,
  onSelectLesson,
}: ProgressSidebarProps) {
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // 🆕 State to store existing user preferences
  const [userPreferences, setUserPreferences] = useState<UserPreference | null>(
    null
  );

  // 🆕 Effect: Fetch existing preferences when user is available
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences?user_id=${user.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setUserPreferences(data);
        }
      } catch (error) {
        // It's okay if this fails (user might be new), just log it silently
        console.log("No existing preferences found or error fetching.");
      }
    };

    fetchPreferences();
  }, [user?.id]);

  const totalLessons = lessons.length;
  const completedCount = lessons.filter(
    (l) => l.lesson_status === "complete"
  ).length;

  const totalVocabulary = lessons.reduce(
    (acc, lesson) => acc + (lesson.vocabulary_count || 0),
    0
  );

  const vocabularyComplete = lessons.reduce(
    (acc, lesson) =>
      acc + (lesson.lesson_status === "complete" ? lesson.vocabulary_count : 0),
    0
  );
  const completionPercentage =
    totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const vocabPercentage =
    totalVocabulary > 0 ? (vocabularyComplete / totalVocabulary) * 100 : 0;

  const handleScheduleSubmit = async (formData: {
    freetime: string;
    schedule: string;
  }) => {
    setIsSubmitting(true);
    try {
      const aiQuery = `Dựa trên các yêu cầu sau, hãy tạo một giáo trình học cá nhân hoá phù hợp:
- Thời gian rảnh có thể học: ${formData.freetime}
- Lịch học mong muốn: ${formData.schedule}
- Số bài học: ${totalLessons}
- Số từ vựng: ${totalVocabulary}
Vui lòng đề xuất một thời gian biểu học tập thật hợp lí. Hãy tạo và không hỏi gì thêm`;
      const saveRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user?.id,
            // We only update time/schedule here, but the backend upsert handles partial updates if implemented,
            // otherwise you might need to pass existing values for other fields if your backend overwrites nulls.
            available_time: formData.freetime,
            schedule: formData.schedule,
            query: aiQuery,
          }),
        }
      );

      if (!saveRes.ok) throw new Error("Failed to save schedule");

      // 🆕 Update local state immediately so UI reflects changes without refresh
      setUserPreferences((prev) => ({
        ...prev,
        available_time: formData.freetime,
        schedule: formData.schedule,
      }));

      alert("✅ Lịch học đã được cập nhật thành công!");
      setIsScheduleModalOpen(false);
    } catch (err) {
      console.error("Error saving schedule:", err);
      alert("❌ Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCurriculumSubmit = async (formData: {
    target: string;
    freetime: string;
    schedule: string;
    hope: string;
    skill: number;
  }) => {
    setIsSubmitting(true);

    try {
      // 1️⃣ Step 1: Save user preferences
      const saveRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user?.id,
            learning_goal: formData.target,
            available_time: formData.freetime,
            schedule: formData.schedule,
            expectations: formData.hope,
            skill: formData.skill,
          }),
        }
      );

      if (!saveRes.ok)
        throw new Error("Failed to save user learning preference");

      // 🆕 Update local state
      const savedPrefs = await saveRes.json();
      setUserPreferences(savedPrefs);

      // 2️⃣ Step 2: Build AI Query (Vietnamese version)
      const aiQuery = `Dựa trên các yêu cầu sau, hãy tạo một giáo trình học cá nhân hoá phù hợp:
- Mục tiêu học tập: ${formData.target}
- Kỳ vọng khi hoàn thành khoá học: ${formData.hope}
- Trình độ kỹ năng hiện tại: ${formData.skill}

Vui lòng đề xuất một lộ trình học tập có cấu trúc rõ ràng. Hãy tạo và không hỏi gì thêm`;

      // 3️⃣ Step 3: Send to AI backend
      const aiRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/generate-curriculum`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: String(user?.id),
            query: aiQuery,
          }),
        }
      );

      if (!aiRes.ok) {
        throw new Error("Failed to generate AI curriculum");
      }

      const aiResult = await aiRes.json();

      // 4️⃣ Step 4: Extract SyllabusID from response
      const responseText = aiResult.response || "";
      const syllabusMatch = responseText.match(/\[SyllabusID:(\d+)\]/i);

      if (syllabusMatch && syllabusMatch[1]) {
        const syllabusId = syllabusMatch[1];
        setIsCurriculumModalOpen(false);
        alert("🎓 Giáo trình cá nhân hoá đã được tạo thành công!");
        router.push(`/study/learn/syllabus/${syllabusId}`);
      } else {
        alert("❌ Có lỗi xảy ra khi tạo giáo trình. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Error submitting curriculum form:", err);
      alert("❌ Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-4">
      {/* Progress Overview Card */}
      <Card className="border border-[#F66868]/30 bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-sm py-6">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F66868]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl -ml-12 -mb-12"></div>

        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-[#F66868]/10 rounded-xl">
                    <GraduationCap className="h-5 w-5 text-[#F66868]" />
                  </div>
                  <span className="text-xs font-bold text-[#F66868]/70 uppercase tracking-wider">
                    Giáo trình của bạn
                  </span>
                </div>
                {user && (
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-[#F66868] text-white transition-all duration-300 rounded-sm shadow-sm hover:bg-[#F66868]/60 hover:text-white"
                    onClick={() => setIsChoiceModalOpen(true)}
                  >
                    <SquarePen className="h-4 w-4 mr-1" />
                    Điều chỉnh
                  </Button>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-[#F66868]">
                {syllabus?.title || "Chọn giáo trình"}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 relative z-10">
          {/* Syllabus Description */}
          {syllabus?.description && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-rose-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                {syllabus.description}
              </p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Lessons Stat */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#F66868]/10 rounded-lg">
                  <BookOpen className="h-4 w-4 text-[#F66868]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {completedCount}
                <span className="text-lg text-gray-400">/{totalLessons}</span>
              </div>
              <div className="text-xs text-gray-600 mt-1 font-medium">
                Bài học
              </div>
            </div>

            {/* Vocabulary Stat */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {vocabularyComplete}
                <span className="text-lg text-gray-400">
                  /{totalVocabulary}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1 font-medium">
                Từ vựng
              </div>
            </div>
          </div>

          {/* Vocabulary Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-semibold">
                Tiến độ từ vựng
              </span>
              <span className="font-bold text-emerald-600 text-base">
                {Math.round(vocabPercentage)}%
              </span>
            </div>
            <div className="relative h-3 bg-emerald-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 transition-all duration-700 ease-out rounded-full relative"
                style={{ width: `${vocabPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          {completionPercentage === 100 && (
            <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-[#F66868]/40 p-5 text-center shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F66868]/20 via-[#F66868]/15 to-[#F66868]/25 animate-pulse"></div>
              <div className="relative z-10">
                <Trophy className="h-10 w-10 text-[#F66868] mx-auto mb-2 drop-shadow-sm" />
                <p className="text-[#F66868] font-bold text-base">
                  Hoàn thành xuất sắc! 🎉
                </p>
                <p className="text-[#F66868]/80 text-sm mt-1">
                  Bạn đã chinh phục giáo trình này
                </p>
              </div>
            </div>
          )}
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
      lesson.lesson_status === "complete"
        ? "border-green-400 bg-green-50 hover:bg-green-100"
        : "hover:bg-rose-50 hover:border-[#F66868] "
    }          
    ${
      selectedLessonId === lesson.id
        ? "border-[#F66868] bg-[#F66868]/10 shadow-[0_0_8px_#F66868]/30"
        : ""
    }
    
  `}
          >
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 mt-0.5">
                {lesson.lesson_status === "complete" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {lesson.lesson_status === "in-progress" && (
                  <Circle className="h-5 w-5 text-[#F66868] fill-[#F66868]/40 animate-pulse" />
                )}
                {lesson.lesson_status === "not_start" && (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </div>

              <div className="flex w-full flex-row justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      lesson.lesson_status === "complete"
                        ? "text-green-700"
                        : "text-gray-900"
                    }`}
                  >
                    {lesson.title}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      lesson.lesson_status === "complete"
                        ? "text-green-600/70"
                        : "text-gray-500"
                    }`}
                  >
                    {lesson.vocabulary_count} từ vựng
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChoiceModal
        isOpen={isChoiceModalOpen}
        onClose={() => setIsChoiceModalOpen(false)}
        onCreateSyllabus={() => {
          setIsChoiceModalOpen(false);
          setIsCurriculumModalOpen(true);
        }}
        onSetupSchedule={() => {
          setIsChoiceModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
      />
      <CurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onSubmit={handleCurriculumSubmit}
        isLoading={isSubmitting}
        // 🆕 PASS DATA HERE
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleSubmit}
        isLoading={isSubmitting}
        userId={user?.id}
        totalLessons={totalLessons}
        totalVocabulary={totalVocabulary}
        // 🆕 PASS DATA HERE
        initialData={userPreferences}
      />
    </div>
  );
}
