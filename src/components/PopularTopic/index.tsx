interface PopularTopicProps {
  topics: string[];
}

export default function PopularTopic({ topics }: PopularTopicProps) {
  return (
    <div className="rounded-2xl border-2 text-left border-[#FF978E] bg-[#FFF0F0] p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
        Các chủ đề học tập phổ biến{" "}
        <span className="text-rose-500 text-2xl">🎓</span>
      </h3>

      {/* Topic Grid (max 5 per row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-3">
        {topics.map((topic) => (
          <span
            key={topic}
            className="text-center px-2 py-1 rounded-md border border-rose-300 bg-rose-100 text-rose-700 text-[10px] font-medium hover:bg-rose-200 transition"
          >
            {topic}
          </span>
        ))}
      </div>

      <a
        href="/study"
        className="text-red-700 text-left font-semibold hover:underline text-lg"
      >
        Tất cả chủ đề
      </a>
    </div>
  );
}
