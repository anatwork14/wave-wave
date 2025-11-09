"use client";

import RequireLogin from "@/components/RequireLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, useUserStore } from "@/store/useUserStore";
import { BookOpen, Hand, Zap } from "lucide-react";
import { useEffect, useState, use } from "react";
import PracticeTab from "../../components/practice-tab";
import LessonTab from "../../components/lesson-tab";
import { removeBrackets } from "@/lib/utils";
import { SyllabusInfo } from "../../../map/page";

const tempUser: User = {
  id: "1",
  name: "Khanh An",
  email: "iamyasou00@gmail.com",
  avatar: "/avatar.png",
};

// --- 1. CHANGE COMPONENT SIGNATURE ---
// Accept 'params' which contains the { id: "2" } from the URL
export default function StudyPage({
  params,
}: {
  params: Promise<{ id: string }>; // 1. Update the type to be a Promise
}) {
  // --- 2. GET THE ID FROM PARAMS ---
  const resolvedParams = use(params); // 2. Unwrap the promise
  const urlSyllabusId = resolvedParams.id; // 3. Access the id
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("lessons");
  const [syllabuses, setSyllabuses] = useState<SyllabusInfo[]>([]);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string | null>(
    urlSyllabusId
  );
  const [isLoadingSyllabus, setIsLoadingSyllabus] = useState(true);
  console.log("Selected Syllabus ID:", selectedSyllabusId);
  // This effect sets the user
  useEffect(() => {
    setUser(tempUser);
    setSelectedSyllabusId(urlSyllabusId);
  }, [setUser, urlSyllabusId]);

  // This effect fetches data and sets the selected ID
  useEffect(() => {
    if (!user?.id) return;

    const fetchSyllabuses = async () => {
      try {
        setIsLoadingSyllabus(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses?user_id=${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch syllabuses");
        }

        const data: { syllabuses: SyllabusInfo[] } = await response.json();
        const sortedSyllabuses = data.syllabuses.sort((a, b) => a.id - b.id);

        // --- 3. FIX: SET ALL SYLLABUSES FOR THE DROPDOWN ---
        // Do not filter the list, just set the full sorted list
        setSyllabuses(sortedSyllabuses);

        // --- 4. NEW SELECTION LOGIC (PRIORITIZED) ---

        // Check if the ID from the URL is valid
        const isValidUrlId = sortedSyllabuses.some(
          (s) => s.id.toString() === urlSyllabusId
        );

        if (isValidUrlId) {
          // Priority 1: Set ID from URL
          setSelectedSyllabusId(urlSyllabusId);
        } else {
          // Priority 2: Find "in-progress"
          const inProgressSyllabus = sortedSyllabuses.find(
            (s) => s.status === "in-progress"
          );
          if (inProgressSyllabus) {
            setSelectedSyllabusId(inProgressSyllabus.id.toString());
          } else if (sortedSyllabuses.length > 0) {
            // Priority 3: Default to the first syllabus
            setSelectedSyllabusId(sortedSyllabuses[0].id.toString());
          }
        }
      } catch (error) {
        console.error("Error fetching syllabuses:", error);
      } finally {
        setIsLoadingSyllabus(false);
      }
    };

    fetchSyllabuses();

    // --- 5. ADD 'urlSyllabusId' TO DEPENDENCY ARRAY ---
    // This ensures the component reacts if the URL ID changes
  }, [user, urlSyllabusId]);

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
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-fit text-3xl"
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
            </Tabs>
            {/* --- SYLLABUS PICKING UI --- */}
            <div>
              {isLoadingSyllabus ? (
                <div className="h-10 w-[280px] animate-pulse rounded-full bg-gray-200" />
              ) : (
                <Select
                  value={selectedSyllabusId || ""}
                  onValueChange={setSelectedSyllabusId}
                >
                  <SelectTrigger
                    className="w-[280px] gap-2 rounded-full border-2 
                                       border-rose-200/60 bg-rose-50/70 text-rose-600 shadow-inner 
                                       hover:bg-rose-100 focus:ring-rose-500"
                  >
                    <SelectValue placeholder="Chọn chủ đề" />
                  </SelectTrigger>
                  <SelectContent>
                    {syllabuses.map((syllabus) => (
                      <SelectItem
                        key={syllabus.id}
                        value={syllabus.id.toString()}
                        disabled={syllabus.status === "locked"}
                        className={`${syllabus.id} >= 12 ? 'bg-yellow-50/70 text-yellow-600' : ''}`}
                      >
                        {removeBrackets(syllabus.title)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
          <TabsContent value="lessons" className="space-y-6">
            <LessonTab syllabusId={selectedSyllabusId} />
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <PracticeTab syllabusId={selectedSyllabusId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
