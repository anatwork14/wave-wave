"use client";

import { useState } from "react";
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

export interface Lesson {
  id: string;
  title: string;
  description: string;
  status: LessonStatus;
  duration?: string;
  participants?: number;
  color: string;
  icon: React.ReactNode;
  link: string;
}

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Greetings",
    description: "Learn essential sign language greetings and introductions.",
    status: "completed",
    duration: "15 min",
    participants: 234,
    color: "bg-emerald-100 border-emerald-300",
    icon: <Star className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
  {
    id: "2",
    title: "Common Phrases",
    description: "Master everyday phrases for effective communication.",
    status: "completed",
    duration: "20 min",
    participants: 189,
    color: "bg-emerald-100 border-emerald-300",
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
  {
    id: "3",
    title: "Numbers and Counting",
    description: "Learn to express numbers and quantities in sign language.",
    status: "in-progress",
    duration: "25 min",
    participants: 156,
    color: "bg-purple-100 border-purple-300",
    icon: <Play className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
  {
    id: "4",
    title: "Family and Relations",
    description: "Understand signs for family members and relationships.",
    status: "upcoming",
    duration: "18 min",
    color: "bg-blue-50 border-blue-200",
    icon: <Users className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
  {
    id: "5",
    title: "Food and Dining",
    description: "Express food preferences and dining experiences.",
    status: "upcoming",
    duration: "22 min",
    color: "bg-amber-50 border-amber-200",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
  {
    id: "6",
    title: "Emotions and Feelings",
    description: "Communicate your emotions and understand others' feelings.",
    status: "locked",
    duration: "20 min",
    color: "bg-gray-100 border-gray-300",
    icon: <Lock className="w-5 h-5 text-white" />,
    link: "/study/learn/topic/1",
  },
];

export default function MapPage() {
  const { user } = useUserStore();

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const totalCount = lessons.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="flex flex-col gap-y-16 xl:flex-row w-[90%] justify-between mx-auto mt-20">
      {/* LEFT SECTION (60%) - Learning Path */}
      <div className="xl:w-[65%] max-w-5xl mx-auto">
        <LearningSummary />

        <div className="relative mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-6 bottom-0 w-1 -ml-0.5 bg-gradient-to-b from-[#F66868]/20 to-[#F66868]/80" />

          <div className="space-y-8">
            {lessons.map((lesson, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={lesson.id} className="relative">
                  {/* Node on line */}
                  <div
                    className={`absolute left-1/2 top-6 -ml-4 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 bg-[#F66868]`}
                  >
                    {lesson.status === "completed" && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                    {lesson.status === "in-progress" && (
                      <Play className="w-4 h-4 text-white" />
                    )}
                    {lesson.status === "upcoming" && (
                      <SquareDashed className="w-4 h-4 text-white" />
                    )}
                    {lesson.status === "locked" && (
                      <Lock className="w-3 h-3 text-white" />
                    )}
                  </div>

                  {/* Alternating Cards */}
                  <div className="grid grid-cols-2 gap-8">
                    {isLeft ? (
                      <>
                        <div className="pr-8">
                          <MedicalTerminologyCard lesson={lesson} />
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="pl-8">
                          <MedicalTerminologyCard lesson={lesson} />
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
      <div className="xl:w-[30%] bg-[#FFF5F5] border border-[#F66868]/20 p-4 h-fit rounded-2xl shadow-sm relative">
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
