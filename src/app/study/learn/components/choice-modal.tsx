"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";

interface ChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSyllabus: () => void;
  onSetupSchedule: () => void;
}

export default function ChoiceModal({
  isOpen,
  onClose,
  onCreateSyllabus,
  onSetupSchedule,
}: ChoiceModalProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] w-full p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#F66868] to-[#e25757] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Điều chỉnh thông tin
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base mt-2">
              Chọn hành động bạn muốn thực hiện
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Options Grid */}
        <div className="p-6 space-y-4">
          {/* Option 1: Create New Syllabus */}
          <button
            onClick={onCreateSyllabus}
            onMouseEnter={() => setHoveredOption("syllabus")}
            onMouseLeave={() => setHoveredOption(null)}
            className={`
              w-full p-6 rounded-2xl border-2 transition-all duration-300
              flex items-start gap-5 text-left group
              ${
                hoveredOption === "syllabus"
                  ? "border-[#F66868] bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-100 transform scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-[#F66868]/50 hover:shadow-md"
              }
            `}
          >
            {/* Icon Section */}
            <div
              className={`
              w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
              transition-all duration-300
              ${
                hoveredOption === "syllabus"
                  ? "bg-gradient-to-br from-[#F66868] to-[#e25757] shadow-lg"
                  : "bg-red-100 group-hover:bg-[#F66868]"
              }
            `}
            >
              <BookOpen
                className={`w-8 h-8 transition-colors duration-300 ${
                  hoveredOption === "syllabus"
                    ? "text-white"
                    : "text-[#F66868] group-hover:text-white"
                }`}
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                Tạo giáo trình mới
                <ArrowRight
                  className={`w-5 h-5 transition-all duration-300 ${
                    hoveredOption === "syllabus"
                      ? "text-[#F66868] translate-x-1"
                      : "text-transparent"
                  }`}
                />
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Tạo một giáo trình học tập hoàn toàn mới được cá nhân hóa dựa
                trên mục tiêu và trình độ của bạn
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  ✨ AI-Powered
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  🎯 Cá nhân hóa
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  📚 Học tập linh hoạt
                </span>
              </div>
            </div>
          </button>

          {/* Option 2: Setup Schedule */}
          <button
            onClick={onSetupSchedule}
            onMouseEnter={() => setHoveredOption("schedule")}
            onMouseLeave={() => setHoveredOption(null)}
            className={`
              w-full p-6 rounded-2xl border-2 transition-all duration-300
              flex items-start gap-5 text-left group
              ${
                hoveredOption === "schedule"
                  ? "border-[#F66868] bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100 transform scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-[#F66868]/50 hover:shadow-md"
              }
            `}
          >
            {/* Icon Section */}
            <div
              className={`
              w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
              transition-all duration-300
              ${
                hoveredOption === "schedule"
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
                  : "bg-blue-100 group-hover:bg-blue-500"
              }
            `}
            >
              <Calendar
                className={`w-8 h-8 transition-colors duration-300 ${
                  hoveredOption === "schedule"
                    ? "text-white"
                    : "text-blue-600 group-hover:text-white"
                }`}
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                Thiết lập lịch học
                <ArrowRight
                  className={`w-5 h-5 transition-all duration-300 ${
                    hoveredOption === "schedule"
                      ? "text-blue-600 translate-x-1"
                      : "text-transparent"
                  }`}
                />
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Cập nhật thông tin học tập và lên lịch cho các khóa học hiện có
                của bạn
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  ⏰ Quản lý thời gian
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                  📅 Lịch học linh hoạt
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  🎓 Tối ưu học tập
                </span>
              </div>
            </div>
          </button>

          {/* Cancel Button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-50 mt-4"
          >
            Hủy
          </Button>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Gợi ý:</strong> Nếu bạn muốn học một chủ đề mới, hãy tạo
            giáo trình mới. Nếu muốn điều chỉnh thời gian học, chọn thiết lập
            lịch.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example usage component
function ExampleUsage() {
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => setIsChoiceModalOpen(true)}
          className="bg-[#F66868] hover:bg-[#e25757] text-white px-6 py-3 text-lg"
        >
          Điều Chỉnh Thông Tin
        </Button>

        <ChoiceModal
          isOpen={isChoiceModalOpen}
          onClose={() => setIsChoiceModalOpen(false)}
          onCreateSyllabus={() => {
            setIsChoiceModalOpen(false);
            setIsCurriculumModalOpen(true);
            // Or call your existing curriculum modal
          }}
          onSetupSchedule={() => {
            setIsChoiceModalOpen(false);
            alert("Opening schedule setup...");
            // Open your schedule setup modal here
          }}
        />
      </div>
    </div>
  );
}
