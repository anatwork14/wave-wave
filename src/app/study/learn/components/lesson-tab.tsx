"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Play, CheckCircle2 } from "lucide-react";
import LessonPlayer from "./lesson-player";
import ProgressSidebar from "./progress-sidebar";

const lessons = [
  {
    id: 1,
    title: "Bảng Chữ Cái A-F",
    description: "Học các kí hiệu từ A đến F",
    level: "Cơ bản",
    progress: 100,
    status: "completed",
    duration: "15 phút",
  },
  {
    id: 2,
    title: "Bảng Chữ Cái G-L",
    description: "Học các kí hiệu từ G đến L",
    level: "Cơ bản",
    progress: 100,
    status: "completed",
    duration: "15 phút",
  },
  {
    id: 3,
    title: "Bảng Chữ Cái M-R",
    description: "Học các kí hiệu từ M đến R",
    level: "Cơ bản",
    progress: 65,
    status: "in-progress",
    duration: "15 phút",
  },
  {
    id: 4,
    title: "Bảng Chữ Cái S-Z",
    description: "Học các kí hiệu từ S đến Z",
    level: "Cơ bản",
    progress: 0,
    status: "locked",
    duration: "15 phút",
  },
  {
    id: 5,
    title: "Số Từ 0-5",
    description: "Kí hiệu cho các con số 0-5",
    level: "Cơ bản",
    progress: 0,
    status: "locked",
    duration: "12 phút",
  },
  {
    id: 6,
    title: "Số Từ 6-10",
    description: "Kí hiệu cho các con số 6-10",
    level: "Cơ bản",
    progress: 0,
    status: "locked",
    duration: "12 phút",
  },
  {
    id: 7,
    title: "Lời Chào Cơ Bản",
    description: "Cách chào hỏi bằng kí hiệu",
    level: "Nâng cao",
    progress: 0,
    status: "locked",
    duration: "18 phút",
  },
  {
    id: 8,
    title: "Cảm Xúc",
    description: "Biểu đạt cảm xúc qua kí hiệu",
    level: "Nâng cao",
    progress: 0,
    status: "locked",
    duration: "20 phút",
  },
  {
    id: 9,
    title: "Gia Đình",
    description: "Kí hiệu cho các thành viên gia đình",
    level: "Nâng cao",
    progress: 0,
    status: "locked",
    duration: "22 phút",
  },
  {
    id: 10,
    title: "Hoạt Động Hàng Ngày",
    description: "Kí hiệu cho các hoạt động thường ngày",
    level: "Nâng cao",
    progress: 0,
    status: "locked",
    duration: "25 phút",
  },
];

export default function LessonTab() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (selectedLesson !== null) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedLesson(null)}
          className="mb-4 border border-[#f66868] text-[#f66868] hover:text-[#f66868] hover:bg-rose-100"
        >
          ← Quay Lại Danh Sách
        </Button>
        <LessonPlayer />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[#f66868] mb-2">Bài Học</h2>
          <p className="text-[#f66868]">Học bài theo cách lộ trình của bạn</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`overflow-hidden transition-all duration-500 rounded-2xl border border-rose-100 hover:border-[#F66868]/60 hover:shadow-[0_0_12px_#F66868]/20 ${
                lesson.status === "locked"
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {/* Header */}
              <CardHeader className="">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-lg font-semibold ${
                        lesson.level == "Cơ bản"
                          ? "text-[#f66868]"
                          : lesson.level == "Nâng cao"
                          ? "text-yellow-500"
                          : ""
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

                  {lesson.status === "completed" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  {lesson.status === "locked" && (
                    <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
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
                    {lesson.level}
                  </span>
                  <span className="text-sm text-gray-500">
                    {lesson.duration}
                  </span>
                </div>

                {/* Progress */}
                {lesson.status !== "locked" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tiến độ</span>
                      <span className="font-semibold text-[#F66868]">
                        {lesson.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F66868] transition-all duration-500"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className={`w-full text-sm font-semibold transition-all duration-300 rounded-xl
            ${
              lesson.status === "completed"
                ? "border border-[#F66868]/60 text-white hover:bg-[#F66868]/10 hover:text-[#f66868]"
                : lesson.status === "in-progress"
                ? "bg-[#F66868] hover:bg-[#F66868]/90 text-white"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
            }`}
                  disabled={lesson.status === "locked"}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  {lesson.status === "locked" && (
                    <Lock className="h-4 w-4 mr-2" />
                  )}
                  {lesson.status === "completed" && "Ôn Tập"}
                  {lesson.status === "in-progress" && (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Tiếp Tục
                    </>
                  )}
                  {lesson.status === "locked" && "Bị Khóa"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <ProgressSidebar
            selectedLessonId={selectedLesson ?? undefined}
            onSelectLesson={setSelectedLesson}
          />
        </div>
      </div>
    </div>
  );
}
