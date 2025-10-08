"use client";

import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // TODO: Replace with your login logic later
    console.log("Google login triggered");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex cursor-pointer items-center justify-center w-full md:w-auto gap-3 px-2 md:px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
    >
      <FcGoogle size={20} />
      <span className="font-medium hidden md:flex text-sm 2xl:text-lg">
        Đăng nhập
      </span>
    </button>
  );
}
