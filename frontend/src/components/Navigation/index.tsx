"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import GoogleLoginButton from "../Login";
import { useUserStore } from "@/store/useUserStore";
import { googleLogout } from "@react-oauth/google";

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
      className={`relative text-sm 2xl:text-base font-medium px-4 py-2 rounded-full transition-all duration-300 ease-out group
        ${isActive ? "text-[#f66868]" : "text-gray-700 hover:text-[#f66868]"}`}
    >
      {name}
      {/* Active indicator */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#f66868] transition-all duration-300 ${
          isActive ? "w-6" : "w-0 group-hover:w-6"
        }`}
      />
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const pathname = usePathname();
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [isClient, setIsClient] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    // Scroll effect for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setIsProfileMenuOpen(false);
    router.push("/");
  };

  const navLinks: NavLink[] = [
    { name: "Trang chủ", href: "/", actualLink: "/" },
    { name: "Học tập", href: "/study/map", actualLink: "/study/map" },
    // { name: "Cộng đồng", href: "/community", actualLink: "/community" },
    { name: "Từ điển", href: "/dictionary", actualLink: "/dictionary" },
    { name: "Chat Wave", href: "/chat", actualLink: "/chat" },
  ];

  if (pathname.startsWith("/chat")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      }`}
    >
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 2xl:h-20">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-x-2.5 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="logo"
                width={32}
                height={32}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl 2xl:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Wave Wave
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1.5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            {navLinks.map((link) => (
              <NavigationItem key={link.name} {...link} />
            ))}
          </div>

          {/* Right section */}
          <div className="hidden xl:flex items-center gap-x-4">
            {isClient ? (
              user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <Image
                        src={user.avatar as string}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 transition-all duration-300"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                        isProfileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut size={18} />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <GoogleLoginButton />
              )
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-x-3">
            {isClient ? (
              user ? (
                <div className="relative">
                  <Image
                    src={user.avatar as string}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700 cursor-pointer hover:ring-red-400 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
              ) : (
                <GoogleLoginButton />
              )
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}

            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.actualLink}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-red-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {isClient && user && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-3" />
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
