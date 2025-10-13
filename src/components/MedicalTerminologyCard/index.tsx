import React, { useState } from "react";
import {
  MoreHorizontal,
  CheckCircle,
  PlayCircle,
  Clock,
  Lock,
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  SkipForward,
} from "lucide-react";
import { Lesson } from "@/app/study/map/page";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type MedicalTerminologyCardProps = {
  lesson: Lesson;
};

const statusMapping = (status: string) => {
  switch (status) {
    case "completed":
      return {
        label: "Hoàn thành",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        color: "bg-green-100",
        text: "text-green-500",
      };
    case "in-progress":
      return {
        label: "Đang học",
        icon: <PlayCircle className="w-5 h-5 text-blue-500 animate-pulse" />,
        color: "bg-blue-100",
        text: "text-blue-500",
      };
    case "upcoming":
      return {
        label: "Sắp mở",
        icon: <Clock className="w-5 h-5 text-yellow-500" />,
        color: "bg-yellow-100",
        text: "text-yellow-500",
      };
    default:
      return {
        label: "Khoá",
        icon: <Lock className="w-5 h-5 text-gray-400" />,
        color: "bg-gray-100",
        text: "text-gray-500",
      };
  }
};

export default function MedicalTerminologyCard({
  lesson,
}: MedicalTerminologyCardProps) {
  const [hasTakenTest, setHasTakenTest] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { label, icon, color, text } = statusMapping(lesson.status);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white rounded-3xl border p-6">
        {/* Add Button */}
        <button
          className={`absolute top-6 right-6 w-14 h-14 bg-[#F66868] rounded-full flex items-center justify-center hover:bg-[#F66868]/60 cursor-pointer transition-colors`}
        >
          {lesson.icon}
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {lesson.title.split(" ").slice(0, 1).join(" ")}
          <br />
          {lesson.title.split(" ").slice(1).join(" ")}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          {lesson.description.split(" ").slice(0, 6).join(" ")}
          <br />
          {lesson.description.split(" ").slice(6).join(" ")}
        </p>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          {/* Status Badge */}
          <div
            className={`flex items-center gap-2 ${color} px-4 py-2.5 rounded-full`}
          >
            <span className={`${text} font-medium text-sm`}>{label}</span>
            <span className="text-xl">{icon}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <TooltipProvider delayDuration={150}>
              <Popover>
                <PopoverTrigger className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </PopoverTrigger>

                <PopoverContent className="w-56 p-2">
                  <div className="flex flex-col">
                    {/* Option 1 */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/chat"
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span>Hỏi Mini Wave</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Trao đổi với Mini Wave về chủ đề này.</p>
                      </TooltipContent>
                    </Tooltip>

                    <Separator className="my-1" />

                    {/* Option 2 */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/study/learn/test/topic"
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setHasTakenTest(true)}
                        >
                          <ClipboardCheck className="w-4 h-4 text-green-500" />
                          <span>Làm kiểm tra</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Thực hiện bài kiểm tra để mở khóa tùy chọn bỏ qua.
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Option 3 (Skip) */}
                    {lesson.status != "completed" && (
                      <>
                        <Separator className="my-1" />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={`flex items-center gap-2 px-2 py-2 rounded-md justify-start w-full text-left ${
                                hasTakenTest
                                  ? "text-gray-700 hover:bg-gray-50"
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                              onClick={() =>
                                hasTakenTest && console.log("Bỏ qua chủ đề")
                              }
                              disabled={!hasTakenTest}
                            >
                              <SkipForward className="w-4 h-4 text-orange-500" />
                              <span>Bỏ qua chủ đề này</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {hasTakenTest
                                ? "Bỏ qua chủ đề này và tiếp tục bài học tiếp theo."
                                : "Bạn cần làm kiểm tra trước khi có thể bỏ qua."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipProvider>

            {lesson.status != "locked" && (
              <>
                {/* Check Button */}
                <Link
                  href={lesson.link || "#"}
                  aria-label={`Đi tới bài học: ${lesson.title}`}
                  className="w-11 h-11 flex items-center justify-center rounded-full 
             bg-[#F66868] text-white 
             hover:bg-[#F66868]/70 
             transition-all duration-300 
             shadow-md hover:shadow-lg"
                >
                  <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Decorative Dotted Line */}
        <div className="absolute right-[23px] top-24 bottom-24 w-px border-r-2 border-dotted border-[#F66868]"></div>
        <div className="absolute right-5 top-24 w-2 h-2 bg-[#F66868] rounded-full"></div>
        <div className="absolute right-5 bottom-24 w-2 h-2 bg-[#F66868] rounded-full"></div>
      </div>
    </div>
  );
}
