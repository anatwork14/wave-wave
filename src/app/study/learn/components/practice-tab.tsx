"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const practiceItems = [
  {
    id: 1,
    title: "Nhận Diện Kí Hiệu",
    description: "Xem video kí hiệu và chọn đáp án đúng",
    difficulty: "Dễ",
    points: 10,
    completed: 8,
    total: 10,
  },
  {
    id: 2,
    title: "Tái Tạo Kí Hiệu",
    description: "Sao chép kí hiệu được hiển thị",
    difficulty: "Trung Bình",
    points: 15,
    completed: 5,
    total: 10,
  },
  {
    id: 3,
    title: "Nghe và Kí Hiệu",
    description: "Nghe từ và thực hiện kí hiệu tương ứng",
    difficulty: "Trung Bình",
    points: 15,
    completed: 3,
    total: 10,
  },
  {
    id: 4,
    title: "Xây Dựng Câu",
    description: "Sắp xếp các kí hiệu thành câu hoàn chỉnh",
    difficulty: "Khó",
    points: 20,
    completed: 0,
    total: 10,
  },
];

export default function PracticeTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#F66868] mb-2 tracking-tight">
          Luyện Tập
        </h2>
        <p className="text-[#f66868]">
          Cải thiện kỹ năng của bạn với các bài tập tương tác thú vị
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {practiceItems.map((item) => {
          const progress = (item.completed / item.total) * 100;
          return (
            <Card
              key={item.id}
              className="overflow-hidden border border-rose-100 rounded-2xl bg-gradient-to-br from-white to-rose-50/40 transition-all duration-500 hover:border-[#F66868]/50 hover:shadow-[0_0_12px_#F66868]/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-[#f66868]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-[#f66868]/60">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Difficulty + Points */}
                <div className="flex items-center justify-between">
                  <Badge
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.difficulty === "Dễ"
                        ? "bg-[#F66868]/10 text-[#F66868]"
                        : item.difficulty === "Trung Bình"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-rose-200 text-rose-800"
                    }`}
                  >
                    {item.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 font-semibold text-[#F66868]">
                    <Zap className="h-4 w-4 fill-[#F66868]/40" />
                    {item.points}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Hoàn Thành</span>
                    <span className="font-semibold text-[#F66868]">
                      {item.completed}/{item.total}
                    </span>
                  </div>
                  <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F66868] transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Button */}
                <Button
                  className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                    progress === 100
                      ? "border border-[#F66868]/60 text-[#F66868] bg-transparent hover:bg-[#F66868]/10"
                      : progress > 0
                      ? "bg-[#F66868] hover:bg-[#F66868]/90 text-white"
                      : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                  }`}
                >
                  {progress === 100
                    ? "Ôn Luyện Lại"
                    : progress > 0
                    ? "Tiếp Tục Luyện Tập"
                    : "Bắt Đầu Luyện Tập"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
