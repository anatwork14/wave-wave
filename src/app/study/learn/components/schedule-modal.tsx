"use client";

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
import {
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { freetime: string; schedule: string }) => void;
  isLoading?: boolean;
  userId?: number | string;
  totalLessons: number;
  totalVocabulary: number;
}

interface UserPreference {
  available_time: string | null;
  schedule: string | null;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  userId,
  totalLessons,
  totalVocabulary,
}: ScheduleModalProps) {
  const [formData, setFormData] = useState({
    freetime: "",
    schedule: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch user preferences when modal opens
  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchUserPreference = async () => {
      setIsFetching(true);
      setFetchError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/preferences?user_id=${userId}`
        );

        if (response.status === 404) {
          // User has no preferences yet, use defaults
          setFormData({
            freetime: "",
            schedule: "",
          });
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user preferences");
        }

        const data: UserPreference = await response.json();

        setFormData({
          freetime: data.available_time || "",
          schedule: data.schedule || "",
        });
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPreference();
  }, [userId, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // Calculate estimated study time
  const calculateEstimatedTime = () => {
    // Assume 5 minutes per vocab and 10 minutes per lesson for practice
    const vocabTime = totalVocabulary * 5;
    const lessonTime = totalLessons * 10;
    const totalMinutes = vocabTime + lessonTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes, totalMinutes };
  };

  const estimatedTime = calculateEstimatedTime();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto 
             scrollbar-thin scrollbar-thumb-rounded-lg 
             scrollbar-thumb-blue-300 scrollbar-track-blue-50 
             hover:scrollbar-thumb-blue-400 transition-all duration-200"
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #dbeafe;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #60a5fa;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #3b82f6;
          }
        `}</style>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 -mx-6 -mt-6 px-6 py-6 mb-6 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              Thiết lập lịch học
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base mt-2">
              Cập nhật thời gian và lịch trình học tập của bạn
            </DialogDescription>
          </DialogHeader>
        </div>

        {isFetching ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 p-6 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="text-red-500" size={40} />
            <p className="text-red-700 font-semibold text-lg">
              Lỗi khi tải dữ liệu
            </p>
            <p className="text-red-600 text-sm">{fetchError}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Course Stats Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border-2 border-indigo-200">
              <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5" />
                Thông tin giáo trình
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalLessons}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Bài học</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalVocabulary}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Từ vựng</p>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Thời gian học ước tính
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {estimatedTime.hours > 0 && `${estimatedTime.hours}h `}
                      {estimatedTime.minutes}m
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Dựa trên {totalLessons} bài học và {totalVocabulary} từ
                      vựng
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Freetime Input */}
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
              <Label
                htmlFor="freetime"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                Thời gian rảnh có sẵn
              </Label>
              <Input
                id="freetime"
                name="freetime"
                placeholder="Ví dụ: 1-2 giờ mỗi ngày, 5 ngày một tuần"
                value={formData.freetime}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <span>💡</span>
                <span>
                  Với{" "}
                  <strong>
                    {estimatedTime.hours}h {estimatedTime.minutes}m
                  </strong>{" "}
                  nội dung, bạn nên dành ít nhất{" "}
                  <strong>30 phút mỗi ngày</strong> để học hiệu quả
                </span>
              </p>
            </fieldset>

            {/* Schedule Input */}
            <fieldset className="space-y-3" disabled={isFetching || isLoading}>
              <Label
                htmlFor="schedule"
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                Lịch trình học tập
              </Label>
              <Input
                id="schedule"
                name="schedule"
                placeholder="Ví dụ: Sáng 8-9 giờ và chiều 5-6 giờ"
                value={formData.schedule}
                onChange={handleInputChange}
                required
                className="text-base h-12 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <span>📅</span>
                  <span>
                    Học đều đặn mỗi ngày sẽ giúp bạn ghi nhớ tốt hơn. Nên chia
                    nhỏ thời gian học thành nhiều buổi ngắn.
                  </span>
                </p>
              </div>
            </fieldset>

            {/* Quick Suggestions */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Gợi ý lịch học
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      freetime: "30 phút mỗi ngày",
                      schedule: "Tối 7-7:30 giờ",
                    })
                  }
                  className="w-full text-left px-4 py-2 bg-white hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors text-sm"
                  disabled={isLoading}
                >
                  <strong>Nhanh:</strong> 30 phút/ngày (tối 7-7:30)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      freetime: "1 giờ mỗi ngày",
                      schedule: "Sáng 8-9 giờ",
                    })
                  }
                  className="w-full text-left px-4 py-2 bg-white hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors text-sm"
                  disabled={isLoading}
                >
                  <strong>Trung bình:</strong> 1 giờ/ngày (sáng 8-9)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      freetime: "2 giờ mỗi ngày, 5 ngày một tuần",
                      schedule: "Sáng 8-10 giờ hoặc chiều 2-4 giờ",
                    })
                  }
                  className="w-full text-left px-4 py-2 bg-white hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors text-sm"
                  disabled={isLoading}
                >
                  <strong>Chuyên sâu:</strong> 2 giờ/ngày (sáng hoặc chiều)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
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
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-base h-12 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200"
                disabled={
                  isLoading ||
                  isFetching ||
                  !formData.freetime ||
                  !formData.schedule
                }
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Đang lưu...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Lưu lịch học
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
