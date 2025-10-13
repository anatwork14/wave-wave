"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X } from "lucide-react"; // npm install lucide-react
import Image from "next/image";
import GoogleLoginButton from "../Login";
import { useUserStore } from "@/store/useUserStore";

type NavLink = {
  name: string;
  href: string;
  actualLink: string;
};

function NavigationItem({ name, href, actualLink }: NavLink) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname.startsWith(href) && href !== "/");
  return (
    <Link
      href={actualLink}
      className={`text-sm 2xl:text-lg px-3 py-1 rounded-xl border transition-all duration-500 ease-in-out
        ${
          isActive
            ? "text-black dark:text-white font-semibold border-black"
            : "text-[#E2E2E2] border-transparent hover:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
    >
      {name}
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const pathname = usePathname();

  // 👇 global user from Zustand
  const { user } = useUserStore();

  const navLinks: NavLink[] = [
    { name: "Trang chủ", href: "/", actualLink: "/" },
    { name: "Học tập", href: "/study", actualLink: "/study/map" },
    { name: "Cộng đồng", href: "/community", actualLink: "/community" },
    { name: "Từ điển", href: "/dictionary", actualLink: "/dictionary" },
    { name: "Chat Wave", href: "/chat", actualLink: "/chat" },
  ];

  if (pathname.startsWith("/chat")) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50">
      <div className="mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <Link
            href="/"
            className="flex flex-row gap-x-2 text-2xl font-bold text-gray-800"
          >
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
            <p className="font-bold">Wave Wave</p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex space-x-1">
            {navLinks.map((link) => (
              <NavigationItem key={link.name} {...link} />
            ))}
          </div>

          {/* Right section */}
          <div className="hidden xl:flex flex-row gap-x-3 items-center justify-center">
            <Bell
              size={36}
              className="text-black hover:text-white hover:bg-[#F66868]/60 cursor-pointer transition-all duration-300 ease-in-out p-2 rounded-full "
            />

            {/* 👇 If user logged in → show avatar, else → Google login */}
            {user ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <GoogleLoginButton />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex flex-row items-center justify-between gap-x-3">
            {/* Left section: notification + avatar/login */}
            <div className="flex flex-row items-center gap-x-3">
              <button
                className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-800 dark:text-gray-200 
                 hover:text-white hover:bg-[#F66868]/80 rounded-full transition-all duration-300"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>

              {/* 👇 If user logged in → show avatar, else → Google login */}
              {user ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <GoogleLoginButton />
              )}
            </div>

            {/* Right section: mobile menu button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-colors ${
                    isActive
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
