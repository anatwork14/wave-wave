"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import DictionaryCard from "@/components/DictionaryCard";
import SameTopicSection from "./components/SameTopicSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import VocabularyInfo from "@/components/VocabularyInfo";

// --- 1. CẬP NHẬT TYPES ĐỂ KHỚP VỚI API BACKEND ---
export type FullVocabularyItem = {
  id: number;
  original_id: string | null;
  topic_id: number | null;
  word: string;
  instruction: string;
  video: string | null;
  partOfSpeech?: string;
};

type SearchWordTopicResponse = {
  search_result: FullVocabularyItem;
  related_words: FullVocabularyItem[];
};

// Khai báo hằng số cho số lượng từ vựng hiển thị trên mỗi trang
const VOCABULARY_PER_PAGE = 100;

export default function DictionaryPage() {
  const [showNoResult, setShowNoResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [definition, setDefinition] = useState<FullVocabularyItem | null>(null);
  const [sameTopicVocab, setSameTopicVocab] = useState<FullVocabularyItem[]>(
    []
  );
  const [allVocab, setAllVocab] = useState<FullVocabularyItem[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [allError, setAllError] = useState<string | null>(null);

  // ⭐ NEW: State cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all vocabulary on mount so we can display the list and allow clicking
  useEffect(() => {
    const fetchAllWords = async () => {
      setLoadingAll(true);
      setAllError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vocabulary/all`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        let items: FullVocabularyItem[] = [];
        if (Array.isArray(data.vocabulary)) items = data.vocabulary;
        else if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.words)) items = data.words;
        else if (Array.isArray(data.items)) items = data.items;

        setAllVocab(items);
      } catch (err: any) {
        console.error("Failed to fetch all vocabulary:", err);
        setAllError(err?.message || "Failed to fetch all words");
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAllWords();
  }, []);

  // --- HÀM ĐÃ SỬA LỖI ---
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setDefinition(null);
    setSameTopicVocab([]);
    setShowNoResult(false);
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/vocabulary/search?word_query=${encodeURIComponent(query.trim())}`
      );

      if (res.status === 404) {
        setShowNoResult(true);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: SearchWordTopicResponse = await res.json();
      if (data && data.search_result) {
        const result = {
          ...data.search_result,
          partOfSpeech: data.search_result.partOfSpeech || "Chưa xác định",
        };
        setDefinition(result);
        const relatedWords = (data.related_words || []).map((item) => ({
          ...item,
          partOfSpeech: item.partOfSpeech || "Chưa xác định",
        }));
        setSameTopicVocab(relatedWords);
      } else {
        setShowNoResult(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setShowNoResult(true);
    }
  };

  const handleAskMiniWave = () => {
    alert(`Mini Wave is analyzing your query: "${searchQuery}"`);
    setShowNoResult(false);
  };

  // ⭐ NEW: Logic phân trang
  const totalPages = Math.ceil(allVocab.length / VOCABULARY_PER_PAGE);
  const startIndex = (currentPage - 1) * VOCABULARY_PER_PAGE;
  const endIndex = startIndex + VOCABULARY_PER_PAGE;
  const vocabToDisplay = allVocab.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-28">
      <div className="w-full mx-auto h-full bg-white px-6">
        <Dialog open={showNoResult} onOpenChange={setShowNoResult}>
          <DialogContent className="sm:max-w-md border border-[#f66868]/40 bg-gradient-to-br from-white to-[#fff7f7] rounded-2xl p-6 transition-all duration-300">
            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-2xl font-semibold text-[#f66868]">
                Không tìm thấy kết quả 😕
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-base leading-relaxed">
                Không có từ nào trùng với{" "}
                <span className="font-medium text-[#f66868]">
                  “{searchQuery}”
                </span>
                . Bạn có muốn nhờ{" "}
                <span className="font-semibold text-[#f66868]">Mini Wave</span>{" "}
                giúp kiểm tra lại không?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-center gap-4 mt-2">
              <Button
                variant="outline"
                onClick={() => setShowNoResult(false)}
                className="border-[#f66868]/50 text-[#f66868] hover:bg-[#f66868]/10 transition-all duration-200 rounded-xl px-5 py-2"
              >
                Đóng
              </Button>
              <Button
                onClick={handleAskMiniWave}
                className="bg-[#f66868] hover:bg-[#e55757] text-white rounded-xl px-5 py-2 font-medium transition-all duration-200"
              >
                Hỏi Mini Wave 💬
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="max-w-5xl mb-7 mx-auto">
          {/* Header Content */}
          <div className="space-y-6 relative z-10 text-center mb-10">
            {/* Title with decorative ornaments */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#f66868]" />
                <h1 className="text-6xl  font-black text-[#f66868]">
                  Từ điển Wave Wave
                </h1>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#f66868]" />
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                Khám phá nghĩa, ví dụ và video minh họa cho từng từ vựng bạn
                muốn học
              </p>
              <p className="text-gray-600 text-base">
                Cùng <span className="font-bold text-[#f66868]">Mini Wave</span>{" "}
                mở rộng vốn từ mỗi ngày
              </p>
            </div>
          </div>
          <SearchBar
            placeholder="Nhập để tìm từ vựng..."
            onSearch={handleSearch}
          />
          {/* All words list: click to search */}
          <div className="max-w-5xl mx-auto mt-4" id="vocab-list-container">
            {loadingAll ? (
              <p className="text-sm text-gray-500">Đang tải danh sách từ...</p>
            ) : allError ? (
              <p className="text-sm text-red-500">Lỗi: {allError}</p>
            ) : allVocab && allVocab.length > 0 ? (
              <div>
                <h3 className="text-sm text-gray-600 mb-2">
                  Tất cả từ vựng ({allVocab.length} từ | Trang {currentPage}/
                  {totalPages})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vocabToDisplay
                    .filter((w) => !(definition && definition.word === w.word))
                    .map((w) => (
                      <button
                        key={w.id}
                        onClick={() => handleSearch(w.word)}
                        className={`px-3 py-1 rounded-lg border transition-all duration-150 text-sm bg-white text-gray-700 border-gray-200 hover:bg-gray-50`}
                      >
                        {w.word}
                      </button>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="text-sm"
                  >
                    Trang trước
                  </Button>

                  <p className="text-sm text-gray-500">
                    Đang hiển thị {startIndex + 1} -{" "}
                    {Math.min(endIndex, allVocab.length)}
                  </p>

                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="text-sm"
                  >
                    Trang sau
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Không có từ nào để hiển thị.
              </p>
            )}
          </div>
        </div>

        <div
          className={`max-w-7xl mx-auto mt-10 grid grid-cols-1 ${
            definition ? "xl:grid-cols-3" : ""
          } gap-6`}
        >
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {definition ? (
              <VocabularyInfo
                word={definition.word}
                partOfSpeech={definition.partOfSpeech}
                definition={definition.instruction}
                videoUrl={definition.video || undefined}
                imageUrl="/logo.svg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                <div className="relative">
                  <div className="absolute -inset-6 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
                  <Image
                    src="/note.svg"
                    alt="note_hero_section"
                    height={420}
                    width={420}
                    className="relative z-10 opacity-95 hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_0_20px_#2563EB]/40"
                  />
                </div>

                <p className="mt-10 text-2xl font-semibold text-blue-600 tracking-tight leading-snug">
                  Hãy nhập để khám phá kho từ vựng <br />
                  <span className="text-gray-800">hơn 4000 từ của </span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                    Wave Wave
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          {definition && (
            <div className="flex flex-col gap-y-3">
              <SameTopicSection
                sameTopicWord={sameTopicVocab}
                onClickWord={handleSearch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
