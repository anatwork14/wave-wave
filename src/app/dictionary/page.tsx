"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DictionaryCard from "@/components/DictionaryCard";
import SameTopicSection from "./components/SameTopicSection";
import VocabularyInfo from "./components/WordHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Grid3x3, List } from "lucide-react";
import TopicShowcase from "./components/TopicShowcase";

const synonyms = [
  { title: "Map", link: true },
  { title: "Occasion", link: true },
  { title: "Office", link: true },
  { title: "Part", link: true },
  { title: "Procedure", link: true },
  { title: "Purpose", link: true },
  { title: "Role", link: true },
  { title: "Routine", link: true },
  { title: "Use", link: true },
  { title: "Part", link: true },
  { title: "Procedure", link: true },
  { title: "Purpose", link: true },
  { title: "Role", link: true },
  { title: "Routine", link: true },
  { title: "Use", link: true },
];

const currentVocabulary = {
  title: "Trái dừa",
  partOfSpeech: "Danh từ",
  videoUrl: "https://qipedc.moet.gov.vn/videos/W02732N.mp4?autoplay=true",
};

export type Vocabulary = {
  title: string;
  partOfSpeech?: string;
  videoUrl?: string;
  link?: string;
};

export default function DictionaryPage() {
  const [showNoResult, setShowNoResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [definition, setDefinition] = useState<Vocabulary | null>(null);
  const [sameTopicVocab, setSameTopicVocab] = useState<Vocabulary[]>([]); // ✅ fixed type

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    try {
      // Example: call your dictionary API
      // const res = await fetch(
      //   `/api/dictionary?word=${encodeURIComponent(query)}`
      // );
      // const data = await res.json();

      // if (data && data.definition && data.definition) {
      //   setDefinition(data.definition);
      // } else {
      //   // No results found

      // }
      // const data = { definition: currentVocabulary };
      const data = null;
      if (data && data.definition) {
        setDefinition(data.definition);
        setSameTopicVocab(data.synonyms || []);
        setShowNoResult(false); // ✅ Hide the dialog if we found something
      } else {
        setDefinition(null);
        setSameTopicVocab([]);
        setShowNoResult(true); // ✅ Only show the popup if no result
      }
    } catch (error) {
      console.error("Search failed:", error);
      setShowNoResult(true);
    }
  };

  const handleAskMiniWave = () => {
    // You can navigate, open a chat window, or trigger a Mini Wave modal here
    alert(`Mini Wave is analyzing your query: "${searchQuery}"`);
    setShowNoResult(false);
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
            {/* Emoji Icon with decorative elements */}

            {/* Title with decorative ornaments */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#f66868]" />
                <h1 className="text-6xl  font-black text-[#f66868]">
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
        </div>

        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {definition ? (
              <VocabularyInfo
                word={currentVocabulary.title}
                partOfSpeech={currentVocabulary.partOfSpeech}
                definition="work or operate in a proper or particular way"
                videoUrl={currentVocabulary.videoUrl}
                imageUrl="/logo.svg"
              />
            ) : (
              <TopicShowcase />
            )}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-y-3">
            <DictionaryCard
              title="Trái Dừa"
              tag="Danh từ"
              imageUrl="dictionary/coconut.svg"
              dictionaryUrl="/dictionary"
              isDictionaryPage={false}
            />
            <SameTopicSection sameTopicWord={sameTopicVocab} />
          </div>
        </div>
      </div>
    </div>
  );
}
