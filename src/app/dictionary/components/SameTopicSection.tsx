"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface WordItem {
  word: string;
  link?: boolean;
}

interface SameTopicSectionProps {
  sameTopicWord: WordItem[];
  itemsPerPage?: number; // allow customizing items per page
  activeTab?: "sameTopic";
}

export default function SameTopicSection({
  sameTopicWord,
  itemsPerPage = 9,
  activeTab = "sameTopic",
}: SameTopicSectionProps) {
  const [page, setPage] = useState(1);

  // Merge words depending on active tab
  const words = activeTab === "sameTopic" ? sameTopicWord : [...sameTopicWord];

  const totalPages = Math.ceil(words.length / itemsPerPage);

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = words.slice(startIndex, startIndex + itemsPerPage);

  // Split into 3 columns
  const perCol = Math.ceil(currentItems.length / 3);
  const groups = [
    currentItems.slice(0, perCol),
    currentItems.slice(perCol, perCol * 2),
    currentItems.slice(perCol * 2),
  ];

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#FF978E]">
      {/* Tabs */}
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

      {/* Word Groups */}
      <div className="grid grid-cols-3 gap-8">
        {groups.map((group, i) => (
          <div key={i}>
            {group.map((item, idx) => (
              <a
                key={idx}
                href={item.link ? `/${item.word}` : "#"}
                className="block text-gray-400 hover:underline mb-2 transition-colors"
              >
                {item.word}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {`${startIndex + 1}–${Math.min(
            startIndex + itemsPerPage,
            words.length
          )} of ${words.length} results`}
        </span>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={clsx(
              "p-2 rounded transition-colors",
              page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
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
    </div>
  );
}
