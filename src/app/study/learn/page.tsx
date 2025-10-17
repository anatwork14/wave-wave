"use client";

import RequireLogin from "@/components/RequireLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, useUserStore } from "@/store/useUserStore";
import { BookOpen, Hand, Trophy, User2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import PracticeTab from "./components/practice-tab";
import LessonTab from "./components/lesson-tab";

const tempUser: User = {
  id: "1",
  name: "Khanh An",
  email: "iamyasou00@gmail.com",
  avatar: "/avatar.png",
};

export default function StudyPage() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("lessons");
  const [userStats, setUserStats] = useState({
    streak: 7,
    totalPoints: 2450,
    level: 12,
    lessonsCompleted: 45,
  });

  useEffect(() => {
    setUser(tempUser);
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <RequireLogin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f66868] text-primary-foreground">
                <Hand className="h-6 w-6" />
              </div>
              <h1 className="text-2xl text-[#f66868] font-bold">Học Kí Hiệu</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10">
                <Zap className="h-5 w-5 text-[#f66868]" />
                <span className="font-semibold text-[#f66868]">
                  {userStats.streak}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f66868]">
                <Trophy className="h-5 w-5 text-white" />
                <span className="font-semibold text-white">
                  {userStats.totalPoints}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full text-3xl"
        >
          <TabsList className="grid w-fit grid-cols-2 lg:inline-grid gap-4 mx-auto p-1.5 rounded-full shadow-inner h-fit bg-rose-50/70 border-2 border-rose-200/60">
            <TabsTrigger
              value="lessons"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 rounded-full transition-all duration-300 hover:bg-[#F66868]/10 data-[state=active]:bg-[#F66868] data-[state=active]:text-white data-[state=active]:shadow-[0_0_8px_#F66868] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline ">Bài Học</span>
            </TabsTrigger>

            <TabsTrigger
              value="practice"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 rounded-full transition-all duration-300 hover:bg-[#F66868]/10 data-[state=active]:bg-[#F66868] data-[state=active]:text-white data-[state=active]:shadow-[0_0_8px_#F66868] cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Luyện Tập</span>
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <LessonTab />
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <PracticeTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
