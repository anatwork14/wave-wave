"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Vocabulary } from "../page";

interface SameTopicSectionProps {
  sameTopicWord?: Vocabulary[];
  itemsPerPage?: number;
  activeTab?: "sameTopic";
}

export default function SameTopicSection({
  sameTopicWord = [],
  itemsPerPage = 9,
  activeTab = "sameTopic",
}: SameTopicSectionProps) {
  const [page, setPage] = useState(1);

  // Derived data
  const totalPages = Math.ceil(sameTopicWord.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sameTopicWord.slice(start, start + itemsPerPage);
  }, [page, sameTopicWord, itemsPerPage]);

  // Divide into 3 columns
  const columns = useMemo(() => {
    const perCol = Math.ceil(currentItems.length / 3);
    return [
      currentItems.slice(0, perCol),
      currentItems.slice(perCol, perCol * 2),
      currentItems.slice(perCol * 2),
    ];
  }, [currentItems]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#FF978E] transition-all">
      {/* Header / Tab */}
      <div className="flex gap-6 border-b mb-4">
        <button
          className={clsx(
            "pb-2 font-medium capitalize transition-colors",
            activeTab === "sameTopic"
              ? "text-[#f66868] border-b-2 border-[#f66868]"
              : "text-gray-500 hover:text-[#f66868]"
          )}
        >
          Cùng chủ đề
        </button>
      </div>

      {/* ✅ Content Area */}
      {sameTopicWord.length === 0 ? (
        // 🩶 Graceful Empty State
        <div className="py-8 text-center text-gray-400 italic">
          Không có từ nào cùng chủ đề.
        </div>
      ) : (
        <>
          {/* Word Columns */}
          <div className="grid grid-cols-3 gap-8">
            {columns.map((group, i) => (
              <div key={i}>
                {group.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link ? `/${item.title}` : "#"}
                    className="block text-gray-600 hover:text-[#f66868] hover:underline mb-2 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">
                {`${(page - 1) * itemsPerPage + 1}–${Math.min(
                  page * itemsPerPage,
                  sameTopicWord.length
                )} trong ${sameTopicWord.length} từ`}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className={clsx(
                    "p-2 rounded transition-colors",
                    page === 1
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-100"
                  )}
                >
                  <ChevronLeft className="w-4 h-4 text-[#f66868]" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className={clsx(
                    "p-2 rounded transition-colors",
                    page === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-100"
                  )}
                >
                  <ChevronRight className="w-4 h-4 text-[#f66868]" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
