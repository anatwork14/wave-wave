"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Play,
  CheckCircle2,
  Lock,
  Users,
  BookOpen,
  Trophy,
  Star,
  SquareDashedBottom as SquareDashed,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import LearningSummary from "@/components/LearningSummary";
import MedicalTerminologyCard from "@/components/MedicalTerminologyCard";
import CurriculumModal from "@/components/curriculum-modal";
import { useRouter } from "next/navigation";

type LessonStatus = "completed" | "in-progress" | "upcoming" | "locked";

export interface MappedSyllabus {
  id: string;
  title: string;
  description: string;
  status: LessonStatus;
  progress: number;
  lesson_count: number;
  color: string;
  icon: React.ReactNode;
  link: string;
}

export interface SyllabusInfo {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  lesson_count: number;
}

const ICONS = [
  <Star key="star" className="w-5 h-5 text-white" />,
  <CheckCircle2 key="check-circle" className="w-5 h-5 text-white" />,
  <Play key="play" className="w-5 h-5 text-white" />,
  <Users key="users" className="w-5 h-5 text-white" />,
  <BookOpen key="book-open" className="w-5 h-5 text-white" />,
  <Lock key="lock" className="w-5 h-5 text-white" />,
];

const COLORS = [
  "bg-emerald-100 border-emerald-300",
  "bg-emerald-100 border-emerald-300",
  "bg-purple-100 border-purple-300",
  "bg-blue-50 border-blue-200",
  "bg-amber-50 border-amber-200",
  "bg-gray-100 border-gray-300",
];

export default function MapPage() {
  const { user } = useUserStore();
  const [syllabuses, setSyllabuses] = useState<MappedSyllabus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSyllabuses = async () => {
      let isCurriculumSet = false;
      try {
        setIsLoading(true);
        // 1. Fetch Syllabuses
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses/?user_id=${user?.id}`
        );
        if (!response.ok) {
          // If the status is 404/204 or an expected "no content"
          // We assume no syllabuses yet, which is the trigger state.
          // For simplicity, we'll check the fetched data length.
          const text = await response.text();
          console.warn("Syllabus fetch not OK:", response.status, text);
          if (response.status === 404 || response.status === 204) {
            // Treat this as no syllabuses found, don't throw, just move to check preference
          } else {
            throw new Error("Failed to fetch syllabuses from server");
          }
        } else {
          const data: { syllabuses: SyllabusInfo[] } = await response.json();
          if (data.syllabuses && data.syllabuses.length > 0) {
            const sortedSyllabuses = data.syllabuses.sort(
              (a, b) => a.id - b.id
            );

            const mapped_syllabus: MappedSyllabus[] = sortedSyllabuses.map(
              (syllabus, index) => ({
                id: syllabus.id.toString(),
                title: syllabus.title,
                description: syllabus.description,
                progress: syllabus.progress,
                status: syllabus.status as LessonStatus,
                color: COLORS[index % COLORS.length],
                lesson_count: syllabus.lesson_count,
                icon: ICONS[index % ICONS.length],
                link: `/study/learn/syllabus/${syllabus.id}`,
              })
            );

            setSyllabuses(mapped_syllabus);
            isCurriculumSet = true;
          } else {
            setSyllabuses([]);
            isCurriculumSet = false;
          }
        }

        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }

      // 2. Check and Open Modal if No Curriculum is Set
      // This is the core fix: if there are no syllabuses after the fetch,
      // it means the user hasn't generated a curriculum, so we open the modal.
      if (!isCurriculumSet) {
        setIsModalOpen(true);
      }
    };

    // The old fetchUserPreference is now redundant if we check syllabus existence,
    // as syllabus existence is a good proxy for whether a preference-based
    // curriculum has been generated.

    if (user?.id) {
      fetchSyllabuses();
      // We removed fetchUserPreference as fetchSyllabuses now includes the logic to check
      // if a syllabus exists and open the modal if it doesn't.
    }
  }, [user?.id]); // Depend on user?.id

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

      // 2️⃣ Step 2: Build AI Query (Vietnamese version)
      const queryParts = [
        "Hãy tạo một giáo trình học cá nhân hoá phù hợp dựa trên:",
        formData.target && `- Mục tiêu học tập: ${formData.target}`, // Chỉ thêm nếu formData.target có giá trị
        formData.hope && `- Kỳ vọng khi hoàn thành khoá học: ${formData.hope}`, // Chỉ thêm nếu formData.hope có giá trị
        `- Trình độ kỹ năng hiện tại: ${formData.skill}.`,
        "Không hỏi gì thêm và hãy tạo",
      ];

      const aiQuery = queryParts.filter(Boolean).join("\n");
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
      console.log("🎯 AI Curriculum:", aiResult);

      // 4️⃣ Step 4: Extract SyllabusID from response
      const responseText = aiResult.response || "";
      const syllabusMatch = responseText.match(/\[SyllabusID:(\d+)\]/i);

      if (syllabusMatch && syllabusMatch[1]) {
        const syllabusId = syllabusMatch[1];
        console.log(`✅ Extracted SyllabusID: ${syllabusId}`);

        setIsModalOpen(false);
        alert("🎓 Giáo trình cá nhân hoá đã được tạo thành công!");
        // Force reload the syllabuses after creation
        router.push(`/study/learn/syllabus/${syllabusId}`);
        // Consider a small delay and a soft-reload here or use the router.push
      } else {
        console.warn(
          "⚠️ Không tìm thấy SyllabusID trong phản hồi AI:",
          responseText
        );
        alert("❌ Có lỗi xảy ra khi tạo giáo trình. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Error submitting curriculum form:", err);
      alert("❌ Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completedCount = syllabuses.filter(
    (l) => l.status === "completed"
  ).length;
  const totalCount = syllabuses.length;
  // const progressPercentage = (completedCount / totalCount) * 100; // Unused for now

  return (
    <div className="flex flex-col gap-y-16 xl:flex-row w-[90%] justify-between mx-auto mt-20">
      {/* LEFT SECTION (60%) - Learning Path */}
      <div className="xl:w-[65%] max-w-5xl mx-auto">
        <LearningSummary />
        {/* If no syllabus found (and not loading), show a friendly CTA */}
        {!isLoading && syllabuses.length === 0 && (
          <div className="mt-8">
            <Card className="p-6 border border-rose-100 bg-white rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-[#F66868]">
                Bạn chưa có giáo trình
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Hãy tạo giáo trình cá nhân hoá để bắt đầu lộ trình học tập phù
                hợp với bạn.
              </p>
              <div className="mt-4">
                <Button
                  size="lg"
                  className="bg-[#F66868] text-white hover:bg-[#e25757] px-4 py-2 rounded-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  🤖 Tạo giáo trình cá nhân hoá
                </Button>
              </div>
            </Card>
          </div>
        )}
        {isLoading && (
          <div className="text-center text-lg mt-10">
            Loading learning path...
          </div>
        )}{" "}
        {error && (
          <div className="text-center text-lg mt-10 text-red-500">
            Error: {error}{" "}
          </div>
        )}
        <div className="relative mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-6 bottom-0 w-1 -ml-0.5 bg-gradient-to-b from-[#F66868]/20 to-[#F66868]/80" />

          <div className="space-y-8">
            {syllabuses.map((syllabus, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={syllabus.id} className="relative">
                  {/* Node on line */}
                  <div
                    className={`absolute left-1/2 top-6 -ml-4 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 bg-[#F66868]`}
                  >
                    {syllabus.status === "completed" && (
                      <CheckCircle2
                        key="completed"
                        className="w-4 h-4 text-white"
                      />
                    )}
                    {syllabus.status === "in-progress" && (
                      <Play key="in-progress" className="w-4 h-4 text-white" />
                    )}
                    {syllabus.status === "upcoming" && (
                      <SquareDashed
                        key="upcoming"
                        className="w-4 h-4 text-white"
                      />
                    )}
                    {syllabus.status === "locked" && (
                      <Lock key="locked" className="w-3 h-3 text-white" />
                    )}
                  </div>

                  {/* Alternating Cards */}
                  <div className="grid grid-cols-2 gap-8 items-center justify-center">
                    {isLeft ? (
                      <>
                        {/* Left Card */}
                        <div className="pr-8">
                          <MedicalTerminologyCard lesson={syllabus} />
                        </div>

                        {/* Right Image */}
                        <div className="relative flex w-fit mx-auto justify-center">
                          <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                          <Image
                            src="/hulk.svg"
                            alt="lesson_decoration"
                            width={140}
                            height={140}
                            className="relative z-10 mx-auto animate-float"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left Image */}
                        <div className="relative flex w-fit mx-auto justify-center">
                          <div className="absolute inset-0 bg-[#F66868] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                          <Image
                            src="/bat.svg"
                            alt="lesson_decoration"
                            width={140}
                            height={140}
                            className="relative z-10 mx-auto animate-float"
                          />
                        </div>

                        {/* Right Card */}
                        <div className="pl-8">
                          <MedicalTerminologyCard lesson={syllabus} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (30%) - Giới thiệu hệ thống & Tiến độ */}
      <div className="xl:w-[33%] bg-[#FFF5F5] border border-[#F66868]/20 p-4 h-fit rounded-2xl shadow-sm relative">
        <div className="absolute -top-10 -right-4">
          <Image
            src="/capybara_book.svg"
            alt="capybara_image"
            height={120}
            width={120}
          />
        </div>
        <div className="space-y-4">
          {/* Tổng quan hệ thống học */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-[#F66868]">
              Giới thiệu hệ thống học tập
            </h2>
            <p className="text-lg text-gray-700">
              Wave Wave là nền tảng học Ngôn ngữ Kí hiệu được thiết kế để giúp
              bạn học một cách dễ dàng, sinh động và có định hướng rõ ràng. Bạn
              có thể:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>
                Theo lộ trình học tập được <strong>xây dựng sẵn</strong> với các
                cấp độ từ cơ bản đến nâng cao.
              </li>
              <li>
                Hoặc tạo <strong>giáo trình cá nhân hoá</strong> phù hợp với mục
                tiêu và tốc độ riêng của bạn.
              </li>
            </ul>

            <div className="flex justify-center mt-4">
              <Button
                size="lg"
                className="bg-[#F66868] text-xl hover:bg-[#e25757] text-white px-5 py-2 rounded-xl shadow-md transition-all"
                onClick={() => setIsModalOpen(true)}
              >
                🤖 Tạo giáo trình cá nhân hoá
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <CurriculumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCurriculumSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
