import { useEffect, useState } from "react";
import { BookOpen, Clock, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LearningSummary() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    expectedHours: 0,
    averageScore: 0,
    totalLearners: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalCourses: 10,
        expectedHours: 24,
        averageScore: 8.7,
        totalLearners: 200,
      });
    }, 1000);
  }, []);

  return (
    <div className="w-full mb-10">
      <Card className="w-full bg-[#FFF5F5] border border-[#F66868]/20 h-fit rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
        <h2 className="text-2xl font-extrabold text-[#F66868] mb-8 text-center">
          Hành Trình Học Tập
        </h2>

        {/* Grid thông tin */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Tổng số khóa học */}
          <div className="flex flex-col items-center justify-center bg-white/20 cursor-pointer border border-[#F66868]/20 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
            <div className="bg-[#FFD9D9] p-4 rounded-full mb-3 shadow-sm">
              <BookOpen className="w-8 h-8 text-[#F66868]" />
            </div>
            <p className="text-3xl font-extrabold text-[#F66868] animate-pop">
              {stats.totalCourses}
            </p>
            <p className="text-sm font-medium text-gray-600">Chủ đề</p>
          </div>

          {/* Thời gian dự kiến */}
          <div className="flex flex-col items-center justify-center bg-white/20 cursor-pointer border border-[#F66868]/20 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
            <div className="bg-[#FFD9D9] p-4 rounded-full mb-3 shadow-sm">
              <Clock className="w-8 h-8 text-[#F66868]" />
            </div>
            <p className="text-3xl font-extrabold text-[#F66868] animate-pop">
              {stats.expectedHours}h
            </p>
            <p className="text-sm font-medium text-gray-600">Thời gian học</p>
          </div>

          {/* Điểm trung bình */}
          <div className="flex flex-col items-center justify-center bg-white/20 cursor-pointer border border-[#F66868]/20 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
            <div className="bg-[#FFD9D9] p-4 rounded-full mb-3 shadow-sm">
              <Award className="w-8 h-8 text-[#F66868]" />
            </div>
            <p className="text-3xl font-extrabold text-[#F66868] animate-pop">
              {stats.averageScore.toFixed(1)}
            </p>
            <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
          </div>

          {/* Tổng người học */}
          <div className="flex flex-col items-center justify-center bg-white/20 cursor-pointer border border-[#F66868]/20 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
            <div className="bg-[#FFD9D9] p-4 rounded-full mb-3 shadow-sm">
              <Users className="w-8 h-8 text-[#F66868]" />
            </div>
            <p className="text-3xl font-extrabold text-[#F66868] animate-pop">
              {stats.totalLearners.toLocaleString()}+
            </p>
            <p className="text-sm font-medium text-gray-600">Từ vựng</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
