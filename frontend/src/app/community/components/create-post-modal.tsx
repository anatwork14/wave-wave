"use client";

import { useState } from "react";
import { X, FileText, BookOpen, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/useUserStore";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    category: string;
    attachedQuiz?: { id: string; title: string; createdDate: string };
    attachedSyllabus?: { id: string; title: string; createdDate: string };
  }) => void;
}

const CATEGORIES = ["Tâm sự", "Tips học tập", "Câu chuyện", "Blog", "Khác"];

// Mock data - replace with real data from your API
const USER_QUIZZES = [
  {
    id: "quiz_1",
    title: "Bài kiểm tra ngôn ngữ kí hiệu chủ đề động vật trong nhà",
    createdDate: "2025-11-22",
  },
  {
    id: "quiz_2",
    title: "Bài tập ngôn ngữ kí hiệu nâng cao",
    createdDate: "2025-11-01",
  },
  {
    id: "quiz_3",
    title: "Ôn tập 10 nội dung cơ bản",
    createdDate: "2025-11-15",
  },
];

const USER_SYLLABUSES = [
  {
    id: "syl_1",
    title: "Lộ trình học Python cơ bản",
    createdDate: "2024-01-10",
  },
  {
    id: "syl_2",
    title: "Kế hoạch ôn thi THPT Quốc gia",
    createdDate: "2024-01-18",
  },
  { id: "syl_3", title: "Chương trình học Toán 12", createdDate: "2024-01-22" },
];

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Chọn chủ đề");
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedSyllabus, setSelectedSyllabus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUserStore();
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung.");
      return;
    }

    setIsSubmitting(true);
    try {
      const postData: any = { title, content, category };

      if (selectedQuiz) {
        const quiz = USER_QUIZZES.find((q) => q.id === selectedQuiz);
        if (quiz) postData.attachedQuiz = quiz;
      }

      if (selectedSyllabus) {
        const syllabus = USER_SYLLABUSES.find((s) => s.id === selectedSyllabus);
        if (syllabus) postData.attachedSyllabus = syllabus;
      }

      onSubmit(postData);
      setTitle("");
      setContent("");
      setCategory("Chọn chủ đề");
      setSelectedQuiz("");
      setSelectedSyllabus("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in-0 duration-300">
      {/* Modal */}
      <div
        className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl transform transition-all animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-[#f66868]/10 via-[#ff8585]/10 to-[#f66868]/10 dark:from-[#f66868]/20 dark:via-[#ff8585]/20 dark:to-[#f66868]/20 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#f66868] to-[#ff5252] rounded-xl shadow-lg shadow-[#f66868]/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f66868] to-[#ff5252] bg-clip-text text-transparent">
              Tạo bài viết mới
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group"
            aria-label="Đóng"
          >
            <X
              size={22}
              className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* User Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="relative">
              <Image
                src={user?.avatar}
                alt="Profile"
                className="h-12 w-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                width={48}
                height={48}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Bạn</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user?.email?.split("@")[0]}
              </p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bạn đang nghĩ gì hôm nay?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-[#f66868] focus:border-transparent outline-none transition-all"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {title.length}/200 ký tự
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Chọn chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chọn chủ đề</SelectLabel>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ suy nghĩ, kiến thức, hoặc câu hỏi của bạn..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-[#f66868] focus:border-transparent outline-none transition-all scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db transparent",
              }}
              rows={6}
              maxLength={5000}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {content.length}/5000 ký tự
            </p>
          </div>

          {/* Attachments Section */}
          <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-blue-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Đính kèm nội dung (tùy chọn)
            </h3>

            {/* Attach Quiz */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Đính kèm bài quiz
              </label>
              <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                <SelectTrigger className="w-full h-12 rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Chọn bài quiz của bạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Bài quiz của bạn</SelectLabel>
                    {USER_QUIZZES.map((quiz) => (
                      <SelectItem key={quiz.id} value={quiz.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{quiz.title}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(quiz.createdDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectedQuiz && (
                <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {USER_QUIZZES.find((q) => q.id === selectedQuiz)?.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(
                        USER_QUIZZES.find((q) => q.id === selectedQuiz)
                          ?.createdDate || ""
                      ).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedQuiz("")}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Attach Syllabus */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Đính kèm giáo trình
              </label>
              <Select
                value={selectedSyllabus}
                onValueChange={setSelectedSyllabus}
              >
                <SelectTrigger className="w-full h-12 rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Chọn giáo trình của bạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Giáo trình của bạn</SelectLabel>
                    {USER_SYLLABUSES.map((syllabus) => (
                      <SelectItem key={syllabus.id} value={syllabus.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{syllabus.title}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(syllabus.createdDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectedSyllabus && (
                <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {
                        USER_SYLLABUSES.find((s) => s.id === selectedSyllabus)
                          ?.title
                      }
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(
                        USER_SYLLABUSES.find((s) => s.id === selectedSyllabus)
                          ?.createdDate || ""
                      ).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSyllabus("")}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-gradient-to-br from-[#f66868]/10 to-[#ff8585]/10 dark:from-[#f66868]/20 dark:to-[#ff8585]/20 rounded-xl border border-[#f66868]/20 dark:border-[#f66868]/30">
            <p className="text-sm font-semibold text-[#f66868] dark:text-[#ff8585] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Mẹo để viết bài hay:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-[#f66868] mt-1">•</span>
                <span>Viết tiêu đề ngắn gọn, rõ ràng và thu hút</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f66868] mt-1">•</span>
                <span>Giải thích đầy đủ nội dung và bối cảnh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f66868] mt-1">•</span>
                <span>Trình bày dễ đọc, chia đoạn hợp lý</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f66868] mt-1">•</span>
                <span>Đính kèm quiz/giáo trình để tăng giá trị bài viết</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 p-5 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl h-11 px-6"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="bg-gradient-to-r from-[#f66868] to-[#ff5252] hover:from-[#e45a5a] hover:to-[#e44545] text-white shadow-lg shadow-[#f66868]/30 hover:shadow-xl hover:shadow-[#f66868]/40 rounded-xl h-11 px-6 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Đang đăng..." : "Đăng bài viết"}
          </Button>
        </div>
      </div>
    </div>
  );
}
