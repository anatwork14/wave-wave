"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const tabs = [
  { name: "Bản đồ học tập", href: "/study/map" },
  { name: "Tiến độ của tôi", href: "/study/me" },
  { name: "Khu học tập", href: "/study/learn" },
];

export default function StudyLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="">
      {/* Header */}
      <div className="relative overflow-hidden pt-10">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-purple-50/20 to-transparent pointer-events-none" />

        {/* Decorative circles */}
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-pink-200/20 rounded-full blur-2xl" />
        <div className="absolute top-32 right-1/3 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl" />
        <div className="absolute top-20 left-1/2 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl" />

        {/* Left decorations */}
        <div className="absolute xl:left-20 top-40 pointer-events-none hidden xl:block">
          <div className="relative">
            {/* Capybara image with effects */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/20 to-[#F66868]/60 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
              <Image
                src={"/dracula.webp"}
                alt="decoration_item"
                width={80}
                height={80}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 2xl:hidden xl:block"
              />
              <Image
                src={"/dracula.webp"}
                alt="decoration_item"
                width={120}
                height={120}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 xl:hidden 2xl:block"
              />
            </div>
          </div>
        </div>
        {/* Right decorations */}
        <div className="absolute xl:right-10 top-40 pointer-events-none hidden xl:block">
          <div className="relative">
            {/* Capybara image with effects */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/20 to-[#F66868]/30 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
              <Image
                src={"/ghost.svg"}
                alt="decoration_item"
                width={80}
                height={80}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 2xl:hidden xl:block"
              />
              <Image
                src={"/ghost.svg"}
                alt="decoration_item"
                width={100}
                height={100}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 xl:hidden 2xl:block"
              />
            </div>

            {/* Decorative elements around capybara */}
            <div className="absolute top-4 -left-4 w-10 h-10 bg-blue-300 rounded-full opacity-50 animate-pulse" />
            <div className="absolute -bottom-2 right-0 w-12 h-12 bg-green-300 rounded-full opacity-40 animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center border-gray-200 mt-28 relative z-10 px-4">
          <div className="inline-block relative">
            {/* Title with enhanced styling */}
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent">
                Hành trình học tập ngôn ngữ ký hiệu tại
              </span>{" "}
              <span className="relative inline-block group">
                <span className="text-[#F66868] relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Wave Wave
                </span>
                {/* Wavy underline with gradient */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                >
                  <defs>
                    <linearGradient
                      id="waveGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#F66868" />
                      <stop offset="50%" stopColor="#FF8E8E" />
                      <stop offset="100%" stopColor="#F66868" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,4 Q5,0 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4"
                    stroke="url(#waveGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-[#F66868] blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              </span>
            </h1>
          </div>

          <p className="text-gray-500 text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
            Khám phá, theo dõi tiến độ và tiếp tục hành trình học của bạn
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300" />
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <nav className="flex justify-center my-6 relative z-10 px-4">
          <div className="relative group">
            {/* Glow effect behind tabs */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl shadow-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

            <div className="relative flex space-x-4 bg-white border-2 border-gray-100 rounded-2xl px-6 py-3">
              {tabs.map((tab, index) => {
                const isActive =
                  pathname === tab.href ||
                  (pathname.startsWith(tab.href) && tab.href !== "/study");
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? "bg-gradient-to-r from-[#F66868] to-[#FF8E8E] text-white shadow-pink-300/50"
                        : "text-gray-600 hover:text-[#F66868] hover:bg-pink-50"
                    }`}
                  >
                    <span className="relative z-10">{tab.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
      <hr className="my-4 w-[96%] mx-auto border-0 h-[2.5px] bg-gray-300/50 rounded-full mb-10" />

      {/* Page content */}
      {children}
    </div>
  );
}
