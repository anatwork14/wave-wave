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
import { useUserStore } from "@/store/useUserStore";
import { Loader2, AlertCircle } from "lucide-react";

// 1. Define the type for the data we expect from the API
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
  isLoading?: boolean; // This is for the SUBMIT loading
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
}: CurriculumModalProps) {
  const [formData, setFormData] = useState<CurriculumFormData>({
    target: "",
    freetime: "",
    schedule: "",
    hope: "",
    skill: 1,
  });
  const { user } = useUserStore();

  // 2. Add local state for fetching data
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 3. Fix the useEffect hook
  useEffect(() => {
    // Don't fetch if the modal isn't open or user isn't loaded
    if (!isOpen || !user) {
      return;
    }

    const fetchUserPreference = async () => {
      setIsFetching(true);
      setFetchError(null);
      try {
        const response = await fetch(
          // This GET endpoint needs to return the user's *single* preference object
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences?user_id=${user.id}`
        );

        // If user has no preferences yet, API might return 404, which is OK.
        if (response.status === 404) {
          // User is new, just use the default empty form
          setFormData({
            target: "",
            freetime: "",
            schedule: "",
            hope: "",
            skill: 1,
          });
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user preferences");
        }

        const data: LearningPreferenceData = await response.json();

        // Populate the form with data from the server
        setFormData({
          target: data.learning_goal || "",
          freetime: data.available_time || "",
          schedule: data.schedule || "",
          hope: data.expectations || "",
          skill: data.skill || 1,
        });
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPreference();
  }, [user, isOpen]); // Re-run when the user is loaded OR the modal is opened

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

  // This function is called by the "Tạo giáo trình" button
  const handleSubmit = () => {
    // The onSubmit prop will be a function passed from the parent component
    // that knows how to call the POST /api/user/preferences endpoint
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#F66868] flex items-center gap-2">
            <span className="text-3xl">🤖</span>
            <span>Tạo giáo trình cá nhân hoá</span>
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 leading-relaxed">
            Điền thông tin dưới đây để AI tạo ra một giáo trình học tập phù hợp
            với bạn
          </DialogDescription>
        </DialogHeader>

        {/* 4. Handle Fetching and Error states */}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2">
            <Loader2 className="animate-spin text-[#F66868]" size={32} />
            <p className="text-gray-600">Đang tải dữ liệu của bạn...</p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="text-red-500" size={32} />
            <p className="text-red-700 font-semibold">Lỗi khi tải dữ liệu</p>
            <p className="text-red-600 text-sm">{fetchError}</p>
          </div>
        ) : (
          // 5. Form Content (only shows if not fetching and no error)
          <div className="space-y-6 pt-2">
            {/* Proficiency Level */}
            <fieldset
              className="space-y-4 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100"
              disabled={isFetching || isLoading}
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
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center transform hover:scale-105 disabled:opacity-50 ${
                      formData.skill === level
                        ? "border-[#F66868] bg-gradient-to-br from-[#F66868] to-[#e25757] text-white shadow-lg shadow-red-200"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#F66868] hover:shadow-md"
                    }`}
                  >
                    <div className="font-bold text-lg">{level}</div>
                    <div className="text-xs mt-1 leading-tight font-medium">
                      {label.split(" ")[0]}
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
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
              <Label
                htmlFor="target"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">🎯</span>
                Mục tiêu học tập và các chủ đề muốn học
              </Label>
              <Input
                id="target"
                name="target"
                placeholder="Ví dụ: Thành thạo Ngôn ngữ Kí hiệu cơ bản về chủ đề động vật trong 3 tháng"
                value={formData.target}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Freetime Field */}
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
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
                placeholder="Ví dụ: 1-2 giờ mỗi ngày, 5 ngày một tuần"
                value={formData.freetime}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Schedule Field */}
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
              <Label
                htmlFor="schedule"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">📅</span>
                Lịch trình học tập
              </Label>
              <Input
                id="schedule"
                name="schedule"
                placeholder="Ví dụ: Sáng 8-9 giờ và chiều 5-6 giờ"
                value={formData.schedule}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all disabled:opacity-50"
              />
            </fieldset>

            {/* Hope/Expectations Field */}
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
              <Label
                htmlFor="hope"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <span className="text-xl">💭</span>
                Kỳ vọng & Mong muốn
              </Label>
              <Textarea
                id="hope"
                name="hope"
                placeholder="Ví dụ: Muốn giao tiếp cơ bản, học từ vựng y tế, tăng tốc độ học nhanh..."
                value={formData.hope}
                onChange={handleInputChange}
                required
                className="text-base resize-none border-2 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/20 transition-all min-h-[120px] disabled:opacity-50"
                rows={4}
              />
            </fieldset>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 text-base h-12 border-2 hover:bg-gray-50 font-semibold"
                disabled={isLoading || isFetching}
              >
                Hủy
              </Button>
              <Button
                // 6. Fix the onClick handler
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-[#F66868] to-[#e25757] hover:from-[#e25757] hover:to-[#d04646] text-white text-base h-12 font-semibold shadow-lg shadow-red-200 hover:shadow-xl transition-all duration-200"
                disabled={isLoading || isFetching}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> {/* Changed icon */}
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
