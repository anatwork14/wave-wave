"use client";

import { useState } from "react";
import { X } from "lucide-react";
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

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    category: string;
  }) => void;
}

const CATEGORIES = ["Tâm sự", "Tips học tập", "Câu chuyện", "Blog", "Khác"];

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Chọn chủ đề");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung.");
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit({ title, content, category });
      setTitle("");
      setContent("");
      setCategory("Công nghệ");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in-0 duration-300">
      {/* Modal */}
      <div className="w-full sm:max-w-2xl max-h-[70vh] lg:max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-rose-200/40 bg-white shadow-lg transform transition-all animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 sm:p-5 border-b border-rose-100 bg-rose-50/60 backdrop-blur-sm">
          <h2 className="text-lg sm:text-xl font-bold text-rose-700">
            ✍️ Tạo bài viết mới
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X size={22} className="text-rose-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Image
              src="/avatar.png"
              alt="Profile"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
              width={48}
              height={48}
            />
            <div>
              <p className="font-semibold text-black text-sm sm:text-base">
                Bạn
              </p>
              <p className="text-xs sm:text-sm text-black/80">@nguoidung</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 text-black">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bạn đang nghĩ gì hôm nay?"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-gray-800 placeholder:text-gray-500 text-sm sm:text-base focus:ring-2 focus:ring-rose-300 outline-none transition-all"
              maxLength={200}
            />
            <p className="text-xs text-black mt-2">{title.length}/200</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 text-black">
              Danh mục
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[300px] text-sm sm:text-base">
                <SelectValue placeholder="Chọn chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chọn chủ đề</SelectLabel>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-base">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 text-black">
              Nội dung
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ suy nghĩ, kiến thức, hoặc câu hỏi của bạn..."
              className="w-full px-3 sm:px-4 py-2.5 border rounded-lg text-gray-800 placeholder:text-gray-500 resize-none text-sm sm:text-base focus:ring-2 focus:ring-rose-300 outline-none transition-all"
              rows={6}
              maxLength={5000}
            />
            <p className="text-xs text-black mt-1">{content.length}/5000</p>
          </div>

          {/* Tips */}
          <div className="p-3 sm:p-4 bg-rose-50/70 rounded-lg border border-rose-100">
            <p className="text-sm font-semibold text-rose-700 mb-2">
              🌸 Mẹo để viết bài hay:
            </p>
            <ul className="text-xs sm:text-sm text-rose-600 space-y-1">
              <li>• Viết tiêu đề ngắn gọn, rõ ràng.</li>
              <li>• Giải thích đầy đủ nội dung hoặc bối cảnh.</li>
              <li>• Trình bày dễ đọc, ngắn gọn.</li>
              <li>• Chọn đúng danh mục phù hợp.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-5 border-t border-rose-100 bg-rose-50/60 backdrop-blur-sm">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-rose-300 text-rose-600 hover:bg-rose-100 text-sm sm:text-base"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-sm text-sm sm:text-base"
          >
            {isSubmitting ? "Đang đăng..." : "Đăng bài viết"}
          </Button>
        </div>
      </div>
    </div>
  );
}
