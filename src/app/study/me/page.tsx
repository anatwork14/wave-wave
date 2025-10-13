"use client";

import RequireLogin from "@/components/RequireLogin";
import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";

export default function UserProfileStudyPage() {
  const { user } = useUserStore();
  const pathname = usePathname();

  if (pathname.includes("/study/me") && !user) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <RequireLogin />
      </div>
    );
  }
  return <div className="w-full bg-black h-full">alo</div>;
}
