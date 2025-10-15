"use client";

import DictionaryCard from "@/components/DictionaryCard";
import MarkdownRenderer from "@/components/MarkdownRender";
import PopularTopic from "@/components/PopularTopic";
import TopPost from "@/components/TopPost";
import { usePromptStore } from "@/store/useUserPrompt";
import {
  BookOpen,
  Brain,
  Database,
  Globe2,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { prompt, setPrompt } = usePromptStore();
  const sampleMarkdown = `
# Vì sao tôi chọn học ngôn ngữ ký hiệu

Tôi vẫn nhớ rất rõ lần đầu tiên tôi nhìn thấy hai người giao tiếp bằng ngôn ngữ ký hiệu — không có âm thanh, chỉ có ánh mắt, bàn tay và những nụ cười. Dù không hiểu họ nói gì, tôi vẫn cảm nhận được sự kết nối mạnh mẽ trong từng cử chỉ. Và có lẽ, chính khoảnh khắc ấy đã gieo trong tôi ý định học ngôn ngữ ký hiệu.
## 1. Tôi muốn hiểu và được hiểu

Tôi từng có một người bạn khiếm thính ở trường đại học. Cậu ấy rất thân thiện nhưng giao tiếp với mọi người thường gặp khó khăn. Nhiều lần tôi chỉ biết mỉm cười vì không biết nói gì hơn. Cảm giác bất lực ấy khiến tôi tự hỏi: “Tại sao mình không thử học để hiểu bạn ấy hơn?” Khi bắt đầu học những ký hiệu đầu tiên, tôi nhận ra — chỉ cần một chút nỗ lực, ta có thể phá bỏ rào cản im lặng mà lâu nay chúng ta thường bỏ qua.
## 2. Ngôn ngữ ký hiệu không chỉ là ký hiệu

Nhiều người nghĩ học ký hiệu là học *“tay làm gì để nói chữ gì”*. Nhưng thực ra, đó là một cách nhìn mới về ngôn ngữ và cảm xúc.
Tôi học được cách lắng nghe bằng mắt, diễn đạt bằng gương mặt, và đồng cảm bằng cả cơ thể. Nó không chỉ giúp tôi hiểu người khiếm thính, mà còn khiến tôi giao tiếp sâu sắc hơn với tất cả mọi người.
`;
  const handleSubmit = () => {
    console.log("User prompt:", prompt);
    // You can later connect this to Gemini / FastAPI call
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col gap-y-10 xl:flex-row items-center xl:gap-x-16 2xl:gap-x-24 px-6 md:px-12 xl:px-20 py-28 overflow-hidden">
        {/* Left Text Section */}
        <div className="flex flex-col gap-y-6 z-10 text-left">
          <h1 className="text-6xl font-extrabold leading-tight">
            <span className="text-[#F66868]">Học thông minh</span>{" "}
            <br className="" />
            <span className="text-black dark:text-white">Vui như chơi!</span>
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
            Nền tảng học tập thông minh giúp bạn khám phá ngôn ngữ ký hiệu theo
            cách thú vị và đặc biệt nhất.
          </p>

          {/* Search Bar */}
          <div className="flex w-full gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F66868]" />
              <input
                placeholder="Bạn muốn học gì hôm nay?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full rounded-xl text-lg pl-12 pr-4 py-3 border border-[#F66868]/50 focus:border-[#F66868] focus:ring-2 focus:ring-[#F66868]/30 outline-none text-gray-800 dark:text-white bg-white dark:bg-neutral-800 shadow-sm transition-all duration-200"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-[#F66868] hover:bg-[#e14640] transition-colors duration-500 text-white px-4 flex items-center justify-center shadow-md hover:cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Image Section */}

        <Image
          src="/hero_section.svg"
          alt="Hero section"
          width={720}
          height={700}
        />
        <div className="hidden xl:flex flex-col gap-y-10">
          {[
            { id: "01", color: "#FF6060", text: "Hơn 4000 từ vựng" },
            { id: "02", color: "#2B4BB3", text: "Học cùng với AI" },
            { id: "03", color: "#32AAA0", text: "Lộ trình học riêng" },
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-row gap-x-7 items-center whitespace-nowrap"
            >
              <div
                className="flex flex-col w-fit text-2xl font-bold"
                style={{ color: item.color }}
              >
                <div>{item.id}</div>
                <hr
                  className="border-t-2 mt-1"
                  style={{ borderColor: item.color }}
                />
              </div>
              <div className="text-lg text-gray-800 dark:text-gray-200">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Introduction Section  */}
      <section className="relative bg-[#F66868] w-[95%] rounded-[20px] text-white mt-20 mx-auto px-8 py-16 shadow-lg overflow-hidden">
        {/* Floating decorators */}
        <div className="absolute -top-13 -left-13 animate-float-slow">
          <Image
            src="/decorator_circle.svg"
            alt="decorator"
            width={120}
            height={120}
          />
        </div>

        <div className="absolute -top-13 -right-13 animate-float-slower">
          <Image
            src="/decorator_circle.svg"
            alt="decorator"
            width={120}
            height={120}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center gap-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl tracking-tight">
            Chỉ có tại <br />
            <span className="text-6xl font-bold">Wave Wave!</span>
          </h2>
          <p className="text-white/90 max-w-3xl text-lg">
            Là nền tảng học ngôn ngữ ký hiệu thông minh dành cho mọi lứa tuổi.
            Với AI đồng hành, bạn có thể học, luyện tập và giao tiếp bằng ký
            hiệu một cách dễ dàng, sinh động và vui nhộn mỗi ngày!
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 relative z-10">
          {[
            {
              icon: <BookOpen size={48} />,
              title: "Học tập",
              desc: "Khám phá thế giới ngôn ngữ ký hiệu qua video minh hoạ, trò chơi tương tác và bài luyện cùng AI. Học vui, nhớ lâu và thực hành ngay trên từng cử chỉ! ",
              link: "/study/map",
            },
            {
              icon: <Globe2 size={48} />,
              title: "Cộng đồng",
              desc: "Nơi kết nối những người yêu ngôn ngữ ký hiệu! Cùng chia sẻ trải nghiệm, luyện tập cùng bạn bè và lan toả giao tiếp không rào cản.",
              link: "/community",
            },
            {
              icon: <Database size={48} />,
              title: "Kho từ vựng",
              desc: "Tổng hợp hơn 4000+ ký hiệu sinh động với video, hình ảnh và hướng dẫn chi tiết. Dễ tra cứu, dễ hiểu, giúp bạn tự tin sử dụng ngôn ngữ ký hiệu mỗi ngày.",
              link: "/dictionary",
            },
          ].map((tool, idx) => (
            <Link
              key={idx}
              href={tool.link}
              className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4 text-white">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-white/90 text-base">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Content Section */}
      <section className="mt-24 mx-auto w-[95%] text-left px-4">
        <h1 className="text-4xl font-bold text-[#C73B3B] mb-8">
          Thông tin nổi bật
        </h1>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-3">
          {/* Left Column */}
          <div className="flex-1">
            <TopPost
              authorName="Công Tước Hắc Ám"
              authorHandle="congtuochacam"
              authorAvatar="/avatar.png"
              title="Vì sao tôi chọn học ngôn ngữ ký hiệu"
              tags={["Tâm sự", "Động lực", "Ngôn ngữ", "Hòa nhập", "Chia sẻ"]}
              content={sampleMarkdown}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col lg:w-[480px] w-full gap-3">
            <DictionaryCard
              title="Trái Dừa"
              tag="Danh từ"
              imageUrl="dictionary/coconut.svg"
              dictionaryUrl="/dictionary"
            />
            <PopularTopic
              topics={[
                "Lễ hội",
                "Mua sắm",
                "Tết",
                "Ăn uống",
                "Địa điểm",
                "Nghề nghiệp",
                "Cảm xúc",
                "Gia đình",
                "Thời tiết",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
