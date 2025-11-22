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
import { removeBrackets } from "@/lib/utils";
import { MappedSyllabus } from "@/app/study/map/page";

type MedicalTerminologyCardProps = {
  lesson: MappedSyllabus;
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
  lesson.title = removeBrackets(lesson.title);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {lesson.title.split(" ").slice(0, 3).join(" ")}
          <br />
          {lesson.title.split(" ").slice(3, 6).join(" ")}
          <br />
          {lesson.title.split(" ").slice(6, 9).join(" ")}
          <br />
          {lesson.title.split(" ").slice(9).join(" ")}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          {lesson.description}
        </p>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          {/* Status Badge */}
          <div className="flex flex-row gap-x-2">
            <div
              className={`flex items-center gap-2 ${color} px-4 py-2.5 rounded-full`}
            >
              <span className={`${text} font-medium text-sm`}>{label}</span>
              <span className="text-xl">{icon}</span>
            </div>
            <div
              className={`flex items-center gap-2 ${color} px-4 py-2.5 rounded-full`}
            >
              <span className={`${text} font-medium text-sm`}>
                {lesson.lesson_count} Bài học
              </span>
            </div>
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
      </div>
    </div>
  );
}
