"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// Removed the external store import to prevent compilation errors
import { Loader2, AlertCircle, Sparkles } from "lucide-react";

// --- Types ---

// Data structure coming from the Backend (FastAPI)
interface LearningPreferenceData {
  id: number;
  user_id: number;
  learning_goal: string | null;
  available_time: string | null;
  schedule: string | null;
  expectations: string | null;
  skill: number | null;
  created_at: string;
  updated_at: string;
}

// Data structure used in the Frontend Form
export interface CurriculumFormData {
  target: string;
  freetime: string;
  schedule: string;
  hope: string;
  skill: number;
}

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CurriculumFormData) => void;
  isLoading?: boolean;
  userId?: number; // Added userId as a prop to replace the store dependency
}

const PROFICIENCY_LEVELS = [
  {
    level: 1,
    label: "Hoàn toàn mới bắt đầu",
    description: "Người mới hoàn toàn",
  },
  { level: 2, label: "Sơ cấp", description: "Biết một số cơ bản" },
  { level: 3, label: "Trung cấp", description: "Có kiến thức nhất định" },
  { level: 4, label: "Nâng cao", description: "Khá thành thạo" },
  { level: 5, label: "Chuyên gia", description: "Rất thành thạo" },
];

export default function CurriculumModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  userId, // Receive userId from parent
}: CurriculumModalProps) {
  // Form State
  const [formData, setFormData] = useState<CurriculumFormData>({
    target: "",
    freetime: "",
    schedule: "",
    hope: "",
    skill: 1,
  });

  // Data Fetching State
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // --- Effect: Fetch Preferences on Open ---
  useEffect(() => {
    // Only fetch if modal is open and we have a valid userId
    if (!isOpen || !userId) {
      return;
    }

    const fetchUserPreference = async () => {
      setIsFetching(true);
      setFetchError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences?user_id=${userId}`
        );

        // Case 1: User exists but has no preferences yet (404)
        // We treat this as success but keep the form empty.
        if (response.status === 404) {
          setFormData({
            target: "",
            freetime: "",
            schedule: "",
            hope: "",
            skill: 1,
          });
          return;
        }

        // Case 2: Actual Server Error
        if (!response.ok) {
          throw new Error("Failed to fetch user preferences");
        }

        // Case 3: Success - Pre-fill the form
        const data: LearningPreferenceData = await response.json();

        setFormData({
          target: data.learning_goal || "",
          freetime: data.available_time || "",
          schedule: data.schedule || "",
          hope: data.expectations || "",
          skill: data.skill || 1,
        });
      } catch (err: any) {
        console.error("Error fetching preferences:", err);
        setFetchError("Không thể tải thông tin cũ. Vui lòng nhập mới.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPreference();
  }, [isOpen, userId]);

  // --- Handlers ---

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProficiencyChange = (level: number) => {
    setFormData((prev) => ({
      ...prev,
      skill: level,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // --- Render ---

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#F66868] flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span>Tạo giáo trình cá nhân hoá</span>
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 leading-relaxed">
            Điền thông tin dưới đây để AI thiết kế lộ trình học tập phù hợp nhất
            với bạn.
          </DialogDescription>
        </DialogHeader>

        {/* --- State 1: Loading Data --- */}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Loader2 className="animate-spin text-[#F66868]" size={40} />
            <p className="text-gray-500 font-medium">
              Đang tải thông tin cá nhân...
            </p>
          </div>
        ) : (
          /* --- State 2: Form Content (Show if loaded or error) --- */
          <div className="space-y-6 pt-2">
            {/* Error Banner (Non-blocking, just informative) */}
            {fetchError && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{fetchError}</p>
              </div>
            )}

            {/* Proficiency Level Selector */}
            <fieldset
              className="space-y-4 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100"
              disabled={isLoading}
            >
              <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-xl">🎓</span>
                Trình độ Ngôn ngữ Kí hiệu hiện tại
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {PROFICIENCY_LEVELS.map(({ level, label, description }) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleProficiencyChange(level)}
                    className={`p-2 rounded-xl border-2 transition-all duration-200 text-center transform hover:scale-105 disabled:opacity-50 ${
                      formData.skill === level
                        ? "border-[#F66868] bg-gradient-to-br from-[#F66868] to-[#e25757] text-white shadow-lg shadow-red-200"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#F66868] hover:shadow-md"
                    }`}
                  >
                    <div className="font-bold text-lg">{level}</div>
                    <div className="text-[10px] mt-1 leading-tight font-medium line-clamp-2">
                      {label}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-2 p-3 bg-white/80 rounded-lg border border-red-100">
                <span className="text-base">💡</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#F66868]">
                    Mức độ {formData.skill}:
                  </span>{" "}
                  {PROFICIENCY_LEVELS[formData.skill - 1].description}
                </p>
              </div>
            </fieldset>

            {/* Target Field */}
            <fieldset className="space-y-3" disabled={isLoading}>
              <Label
                htmlFor="target"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">🎯</span>
                Mục tiêu học tập
              </Label>
              <Input
                id="target"
                name="target"
                placeholder="Ví dụ: Giao tiếp cơ bản, thi chứng chỉ, học từ vựng y tế..."
                value={formData.target}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Freetime Field */}
            <fieldset className="space-y-3" disabled={isLoading}>
              <Label
                htmlFor="freetime"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">⏰</span>
                Thời gian rảnh có sẵn
              </Label>
              <Input
                id="freetime"
                name="freetime"
                placeholder="Ví dụ: 30 phút mỗi ngày, 2 giờ cuối tuần..."
                value={formData.freetime}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Schedule Field */}
            <fieldset className="space-y-3" disabled={isLoading}>
              <Label
                htmlFor="schedule"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">📅</span>
                Lịch trình học tập mong muốn
              </Label>
              <Input
                id="schedule"
                name="schedule"
                placeholder="Ví dụ: Tối thứ 2-4-6 lúc 8h, Sáng chủ nhật..."
                value={formData.schedule}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Expectations Field */}
            <fieldset className="space-y-3" disabled={isLoading}>
              <Label
                htmlFor="hope"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">💭</span>
                Kỳ vọng chi tiết
              </Label>
              <Textarea
                id="hope"
                name="hope"
                placeholder="Ví dụ: Tôi muốn học chậm chắc, tập trung nhiều vào thực hành ngón tay..."
                value={formData.hope}
                onChange={handleInputChange}
                required
                className="text-base resize-none border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all min-h-[100px] disabled:opacity-50"
              />
            </fieldset>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2 border-t border-gray-100 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 text-base h-12 border-2 hover:bg-gray-50 font-semibold"
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-[#F66868] to-[#e25757] hover:from-[#e25757] hover:to-[#d04646] text-white text-base h-12 font-semibold shadow-lg shadow-red-200 hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Đang tạo...
                  </span>
                ) : (
                  "Tạo giáo trình"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
