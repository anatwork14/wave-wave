import { useState, useEffect } from "react";
import { Bookmark, Check, ArrowRight } from "lucide-react";

interface DictionaryCardProps {
  title: string;
  tag: string;
  imageUrl: string;
  dictionaryUrl: string;
  isDictionaryPage?: boolean;
}

export default function DictionaryCard({
  title,
  tag,
  imageUrl,
  dictionaryUrl,
  isDictionaryPage = true,
}: DictionaryCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  // ⏱️ Automatically revert after 3 seconds
  useEffect(() => {
    if (bookmarked) {
      const timer = setTimeout(() => setBookmarked(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [bookmarked]);

  return (
    <div className="rounded-2xl border-2 border-[#FF978E] bg-[#FFF0F0] p-6 shadow-sm flex flex-col gap-5 relative">
      {/* Bookmark icon */}
      <button
        onClick={() => setBookmarked(true)}
        className={`absolute top-4 right-4 p-1 rounded-lg transition duration-500 cursor-pointer ${
          bookmarked
            ? "bg-[#C73B3B] text-white"
            : "bg-[#FFE4E4] text-rose-400 hover:text-rose-500"
        }`}
      >
        {bookmarked ? (
          <Check className="w-7 h-7 transition-transform duration-200 scale-110" />
        ) : (
          <Bookmark className="w-7 h-7" />
        )}
      </button>

      {/* Title + Tag */}
      <div className="text-left">
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
        <span className="inline-block mt-2 rounded-lg bg-[#F9A5A5] border-2 border-[#C55454] text-[#C73B3B] text-sm px-2 py-1 font-medium">
          {tag}
        </span>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full max-w-[300px] mx-auto rounded-lg"
      />

      {/* Button */}
      {isDictionaryPage ? (
        <a
          href={dictionaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-between bg-[#C73B3B] text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-900 transition"
        >
          <div className="flex items-center gap-2 text-lg">
            <span>Đến Từ điển</span>
          </div>
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <a
          href={`/dictionary/${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-[#C73B3B] text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-900 transition"
        >
          <div className="flex items-center gap-2 text-lg">
            <span>Tìm từ vựng này</span>
          </div>
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
