"use client";
import { BookOpen, Grid3x3, List } from "lucide-react";
import { useState } from "react";

const TopicLevels = {
  daily: [
    {
      id: 1,
      title: "Hoạt động thường ngày",
      definition: "Từ vựng mô tả các hoạt động hằng ngày",
      topic: "daily",
    },
    {
      id: 2,
      title: "Gia đình và vật dụng",
      definition: "Các từ vựng nói về thành viên gia đình",
      topic: "daily",
    },
    {
      id: 3,
      title: "Số",
      definition: "Các từ vựng chỉ số đếm",
      topic: "daily",
    },
  ],
  advance: [
    {
      id: 5,
      title: "Trường học",
      definition: "Từ vựng liên quan đến trường, lớp, thầy cô, bạn bè",
      topic: "advance",
    },
    {
      id: 6,
      title: "Động vật",
      definition: "Các từ chỉ động vật",
      topic: "advance",
    },
    {
      id: 7,
      title: "Nghề nghiệp",
      definition: "Các từ mô tả các chức danh nghề nghiệp",
      topic: "advance",
    },
  ],
  basic: [
    {
      id: 9,
      title: "Commute",
      partOfSpeech: "verb",
      definition: "Travel some distance regularly to and from work",
      topic: "basic",
    },
    {
      id: 10,
      title: "Errand",
      partOfSpeech: "noun",
      definition: "A short journey undertaken to accomplish a task",
      topic: "basic",
    },
    {
      id: 11,
      title: "Routine",
      partOfSpeech: "noun",
      definition: "A sequence of actions regularly followed",
      topic: "basic",
    },
  ],
};

const allVocabulary = Object.values(TopicLevels).flat();
export default function TopicShowcase() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-[#f66868]" size={32} />
            <h2 className="text-4xl font-bold text-gray-800">
              Từ vựng theo chủ đề
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Khám phá bộ sưu tập từ vựng của chúng tôi được tổ chức theo các chủ
            đề khác nhau
          </p>
        </div>

        {/* Topic Sections */}
        {Object.entries(TopicLevels).map(([topicKey, vocabs]) => (
          <div key={topicKey} className="mb-12">
            <div className="flex items-center gap-3 mb-6 bg-[#F68688]/5">
              <div className="w-1 h-12 bg-[#f66868] rounded-full" />
              <h3 className="text-2xl font-bold text-gray-800 capitalize">
                {topicKey === "basic"
                  ? "💼 Cơ bản"
                  : topicKey === "technology"
                  ? "💻 Nâng cao"
                  : "🌟 Hằng ngày"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vocabs.map((vocab) => (
                <div
                  key={vocab.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer p-5 border border-gray-100 hover:border-[#f66868]/50"
                >
                  <div className="flex flex-col h-full">
                    <h4 className="text-lg font-bold text-[#f66868] mb-2">
                      {vocab.title}
                    </h4>
                    <p className="text-sm text-gray-500 italic mb-3">
                      {vocab.partOfSpeech}
                    </p>
                    <p className="text-gray-700 text-sm flex-grow">
                      {vocab.definition}
                    </p>
                    <button className="mt-4 w-full py-2 bg-[#f66868]/10 text-[#f66868] font-semibold rounded-lg hover:bg-[#f66868] hover:text-white transition-all">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#f66868]/10 to-[#ff9999]/10 rounded-xl p-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-[#f66868]">
                {allVocabulary.length}
              </p>
              <p className="text-gray-600 mt-2">Tổng từ vựng</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f66868]">
                {Object.keys(TopicLevels).length}
              </p>
              <p className="text-gray-600 mt-2">Chủ đề</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f66868]">100%</p>
              <p className="text-gray-600 mt-2">Hoàn thành</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f66868]">⭐</p>
              <p className="text-gray-600 mt-2">Được yêu thích</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
