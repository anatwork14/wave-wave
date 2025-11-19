"use client";

import React, { useState } from "react";
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

const synonyms: Vocabulary[] = [
  { title: "Map", link: "/dictionary" },
  { title: "Occasion", link: "/dictionary" },
  { title: "Office", link: "/dictionary" },
  { title: "Part", link: "/dictionary" },
  { title: "Procedure", link: "/dictionary" },
  { title: "Purpose", link: "/dictionary" },
  { title: "Role", link: "/dictionary" },
  { title: "Routine", link: "/dictionary" },
  { title: "Use", link: "/dictionary" },
  { title: "Part", link: "/dictionary" },
  { title: "Procedure", link: "/dictionary" },
  { title: "Purpose", link: "/dictionary" },
  { title: "Role", link: "/dictionary" },
  { title: "Routine", link: "/dictionary" },
  { title: "Use", link: "/dictionary" },
];

const currentVocabulary = {
  title: "Trái dừa",
  partOfSpeech: "Danh từ",
  description: "Mô tả hành động trái dừa",
  videoUrl: "https://qipedc.moet.gov.vn/videos/W02732N.mp4?autoplay=true",
};

export type Vocabulary = {
  title: string;
  partOfSpeech?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
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
      const data = {
        definition: currentVocabulary,
        synonyms: synonyms,
      };
      // const data = null;
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

        <div
          className={`max-w-7xl mx-auto mt-10 grid grid-cols-1 ${
            definition && "xl:grid-cols-3"
          }  gap-6`}
        >
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {definition ? (
              <VocabularyInfo
                word={currentVocabulary.title}
                partOfSpeech={currentVocabulary.partOfSpeech}
                definition={currentVocabulary.description}
                videoUrl={currentVocabulary.videoUrl}
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
              <DictionaryCard
                title="Trái Dừa"
                tag="Danh từ"
                imageUrl="dictionary/coconut.svg"
                dictionaryUrl="/dictionary"
                isDictionaryPage={false}
              />
              <SameTopicSection sameTopicWord={sameTopicVocab} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
