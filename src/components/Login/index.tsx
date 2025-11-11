// components/GoogleLoginButton.js
"use client";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore"; // Make sure this path is correct
import { ClassDictionary } from "clsx";

export default function GoogleLoginButton() {
  const router = useRouter();
  const { setUser } = useUserStore(); // Get the setUser function from your store

  const handleSuccess = async (tokenResponse: ClassDictionary) => {
    const accessToken = tokenResponse.access_token;
    console.log("Got Access Token from Google:", accessToken);

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/google/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: accessToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend login failed");
      }

      // userData is what comes from your Python backend (e.g., { id: 1, name: "...", ... })
      const userData = await response.json();
      console.log("Successfully logged in to our app:", userData);

      // --- 💡 FIX 1: Map Backend Data to Frontend Store ---
      // Your store wants { id: "1", avatar: "..." }
      // Your backend sends { id: 1, user_image: "..." }
      const formattedUser = {
        id: String(userData.id), // Convert number to string
        name: userData.name,
        email: userData.email,
        avatar: userData.user_image, // Map user_image to avatar
      };

      // Set the *formatted* user in the global store
      setUser(formattedUser);

      // --- 💡 FIX 2: Change the Redirect Path ---
      router.push("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <button
      onClick={() => login()}
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
