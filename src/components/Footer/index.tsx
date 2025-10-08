"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/chat")) return null;
  return (
    <footer className="bg-[#C33D3D] bottom-0 text-white py-20 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3 px-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-10 text-lg font-medium">
          <Link
            href="/"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Trang chủ
          </Link>
          <Link
            href="/study"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Học tập
          </Link>
          <Link
            href="/community"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Cộng đồng
          </Link>
          <Link
            href="/dictionary"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Từ điển
          </Link>
        </div>

        {/* Social Icons */}
        {/* <div className="flex flex-row gap-x-6 text-white">
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200"
          >
            <Twitter size={24} />
          </a>
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200"
          >
            <Youtube size={24} />
          </a>
        </div> */}

        {/* Copyright */}
        <p className="text-lg text-white/80 mt-4">
          © Copyright 2025 – <span className="font-medium">Wave Wave</span>
        </p>
      </div>
    </footer>
  );
}
