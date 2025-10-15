"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DefinitionsList from "./components/DefinitionsList";
import VerbSection from "./components/VocabularyInfo";
import DictionaryCard from "@/components/DictionaryCard";
import SameTopicSection from "./components/SameTopicSection";
import VocabularyInfo from "./components/WordHeader";

export default function DictionaryPage() {
  const synonyms = [
    { word: "Map", link: true },
    { word: "Occasion", link: true },
    { word: "Office", link: true },
    { word: "Part", link: true },
    { word: "Procedure", link: true },
    { word: "Purpose", link: true },
    { word: "Role", link: true },
    { word: "Routine", link: true },
    { word: "Use", link: true },
    { word: "Part", link: true },
    { word: "Procedure", link: true },
    { word: "Purpose", link: true },
    { word: "Role", link: true },
    { word: "Routine", link: true },
    { word: "Use", link: true },
  ];

  const currentVocabulary = {
    title: "Trái dừa",
    partOfSpeech: "Danh từ",
    videoUrl: "https://qipedc.moet.gov.vn/videos/W02732N.mp4?autoplay=true",
  };

  return (
    <div className="mt-20">
      <div className="w-full mx-auto h-full bg-white px-6">
        <div className="max-w-5xl mb-7 mx-auto">
          <SearchBar placeholder="Nhập để tìm từ vựng..." />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VocabularyInfo
              word={currentVocabulary.title}
              partOfSpeech={currentVocabulary.partOfSpeech}
              definition="work or operate in a proper or particular way"
              videoUrl={currentVocabulary.videoUrl}
              imageUrl="/logo.svg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <DictionaryCard
              title="Trái Dừa"
              tag="Danh từ"
              imageUrl="dictionary/coconut.svg"
              dictionaryUrl="/dictionary"
              isDictionaryPage={false}
            />
            <SameTopicSection sameTopicWord={synonyms} />
          </div>
        </div>
      </div>
    </div>
  );
}
