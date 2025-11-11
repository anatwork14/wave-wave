"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, X, LogOut } from "lucide-react"; // 1. Import LogOut icon
import Image from "next/image";
import GoogleLoginButton from "../Login";
import { useUserStore } from "@/store/useUserStore";
import { googleLogout } from "@react-oauth/google"; // 2. Import googleLogout

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
  const router = useRouter(); // 3. Initialize router

  // 👇 global user from Zustand
  const { user, setUser } = useUserStore(); // 4. Get setUser function
  const [isClient, setIsClient] = useState(false);

  // State and ref for desktop profile menu
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    // 5. Click-outside listener to close the profile menu
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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 6. Create the main logout logic
  const handleLogout = () => {
    googleLogout(); // Log out from Google's side
    setUser(null); // Clear the user from Zustand (this updates localStorage)
    setIsProfileMenuOpen(false); // Close the dropdown
    router.push("/"); // Redirect to the homepage
  };

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
            {isClient ? (
              user ? (
                // 7. Desktop profile menu wrapper
                <div className="relative" ref={profileMenuRef}>
                  <button onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
                    <Image
                      src={user.avatar as string}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </button>

                  {/* 8. Desktop profile dropdown menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 border dark:border-gray-700">
                      <div className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // User is logged out
                <GoogleLoginButton />
              )
            ) : (
              // Placeholder for hydration
              <div style={{ width: "36px", height: "36px" }} />
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
              {isClient ? (
                user ? (
                  <Image
                    src={user.avatar as string}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <GoogleLoginButton />
                )
              ) : (
                <div style={{ width: "40px", height: "40px" }} />
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

            {/* 9. Add Logout Button to Mobile Menu */}
            {isClient && user && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false); // Also close the menu
                  }}
                  className="w-full text-left flex items-center gap-2 px-0 py-2 text-sm text-red-600 dark:text-red-400"
                >
                  <LogOut size={16} />
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
