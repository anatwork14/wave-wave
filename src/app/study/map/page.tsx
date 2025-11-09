"use client";

import { useEffect, useState } from "react";
import {
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Users,
  BookOpen,
  Trophy,
  Star,
  Sparkles,
  SquareDashed,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import LearningSummary from "@/components/LearningSummary";
import MedicalTerminologyCard from "@/components/MedicalTerminologyCard";

type LessonStatus = "completed" | "in-progress" | "upcoming" | "locked";

export interface MappedSyllabus {
  id: string;
  title: string;
  description: string;
  status: LessonStatus;
  progress: number; // percentage from 0 to 100
  lesson_count: number;
  color: string;
  icon: React.ReactNode;
  link: string;
}

// ADDITION: This interface matches the data from your FastAPI backend
export interface SyllabusInfo {
  id: number; // Assuming ID is a number from the database
  title: string;
  description: string;
  progress: number;
  status: string;
  lesson_count: number;
}

// MODIFICATION: The hardcoded 'lessons' array is removed.
// We will fetch this data from the API.

// These are the static icons and colors your hardcoded array used.
// We can use them to style the data we get from the backend.
const ICONS = [
  <Star className="w-5 h-5 text-white" />,
  <CheckCircle2 className="w-5 h-5 text-white" />,
  <Play className="w-5 h-5 text-white" />,
  <Users className="w-5 h-5 text-white" />,
  <BookOpen className="w-5 h-5 text-white" />,
  <Lock className="w-5 h-5 text-white" />,
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
  useEffect(() => {
    const fetchSyllabuses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses/?user_id=${user?.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }

        const data: { syllabuses: SyllabusInfo[] } = await response.json();

        // --- ADD THIS LINE ---
        // Sort the array by 'id' (ascending) before you map it
        const sortedSyllabuses = data.syllabuses.sort((a, b) => a.id - b.id);
        // ---------------------

        // Now, map the *sorted* array
        const mapped_syllabus: MappedSyllabus[] = sortedSyllabuses.map(
          (syllabus, index) => {
            // ... (rest of your mapping logic)
            return {
              id: syllabus.id.toString(),
              title: syllabus.title,
              description: syllabus.description,
              progress: syllabus.progress,
              status: syllabus.status as LessonStatus,
              color: COLORS[index % COLORS.length],
              lesson_count: syllabus.lesson_count,
              icon: ICONS[index % ICONS.length],
              link: `/study/learn/syllabus/${syllabus.id}`,
            };
          }
        );

        setSyllabuses(mapped_syllabus);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // ... (rest of your useEffect, assuming you have a user check)
    if (user?.id) {
      fetchSyllabuses();
    }
  }, [user?.id]); // Make sure to add user.id as a dependency
  const completedCount = syllabuses.filter(
    (l) => l.status === "completed"
  ).length;
  const totalCount = syllabuses.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="flex flex-col gap-y-16 xl:flex-row w-[90%] justify-between mx-auto mt-20">
      {/* LEFT SECTION (60%) - Learning Path */}
      <div className="xl:w-[65%] max-w-5xl mx-auto">
        <LearningSummary />
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
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                    {syllabus.status === "in-progress" && (
                      <Play className="w-4 h-4 text-white" />
                    )}
                    {syllabus.status === "upcoming" && (
                      <SquareDashed className="w-4 h-4 text-white" />
                    )}
                    {syllabus.status === "locked" && (
                      <Lock className="w-3 h-3 text-white" />
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

            <div className="flex justify-center mt-1">
              <Button
                size="lg"
                className="bg-[#F66868] text-xl hover:bg-[#e25757] text-white px-5 py-2 rounded-xl shadow-md transition-all"
              >
                🤖 Gợi ý giáo trình cá nhân hoá
              </Button>
            </div>
          </Card>

          {/* Tiến độ học tập */}
          <Card className="p-6 rounded-2xl bg-white border border-[#F66868]/20">
            <h2 className="text-2xl font-semibold text-[#F66868] mb-5 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F66868]" />
              Tiến độ học tập
            </h2>

            {user ? (
              <>
                {/* Thanh tiến độ */}
                <div className="relative mb-3">
                  <Progress
                    value={progressPercentage}
                    className="h-4 bg-[#fde3e3] rounded-full overflow-hidden"
                  />
                  <div className="absolute inset-0 flex justify-center items-center text-xs font-medium text-gray-800/60">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="flex flex-row  items-center justify-between">
                  <p className="text-sm text-gray-700 text-center">
                    🎯 <span className="font-semibold">{completedCount}</span> /{" "}
                    <span className="font-semibold">{totalCount}</span>
                  </p>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="border-[#F66868]/40 text-[#F66868] hover:bg-[#F66868] hover:text-white transition-all duration-300"
                    >
                      Xem lộ trình chi tiết
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-gray-600">
                <Lock className="w-8 h-8 text-[#F66868]/70 mb-3" />
                <p className="text-lg mb-4">
                  Vui lòng đăng nhập để xem tiến độ học tập của bạn.
                </p>
                <Button className="bg-[#F66868] text-lg hover:bg-[#e25757] text-white px-5">
                  Đăng nhập ngay
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
