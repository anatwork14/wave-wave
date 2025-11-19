import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Post, UserQuizDetails } from "./types";
import { Image, FileText, BookOpen, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useUserStore } from "@/store/useUserStore";
import { SyllabusInfo } from "@/app/study/map/page";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePost: (
    post: Omit<
      Post,
      | "id"
      | "author"
      | "likes"
      | "comments"
      | "shares"
      | "timestamp"
      | "bookmarked"
      | "isLiked"
      | "views"
    >
  ) => void;
}

export default function CreatePostDialog({
  open,
  onOpenChange,
  onCreatePost,
}: CreatePostDialogProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Blog");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shareQuiz, setShareQuiz] = useState(false);
  const [shareSyllabus, setShareSyllabus] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState("Dễ");
  const [syllabusTitle, setSyllabusTitle] = useState("");
  const [syllabusLessons, setSyllabusLessons] = useState("");
  const [syllabusDuration, setSyllabusDuration] = useState("");

  const { user } = useUserStore();
  // State cho Quiz
  const [userQuizzes, setUserQuizzes] = useState<UserQuizDetails[]>([]); // <-- SỬA 4: State cho danh sách quiz
  const [selectedQuizId, setSelectedQuizId] = useState<string>(""); // <-- SỬA 5: State cho quiz được chọn

  // State cho Syllabus
  const [userSyllabuses, setUserSyllabuses] = useState<SyllabusInfo[]>([]); // <-- SỬA 4
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string>(""); // <-- SỬA 5

  // SỬA 6: Thêm useEffect để tải dữ liệu khi dialog mở
  useEffect(() => {
    // Chỉ tải nếu dialog mở và chúng ta chưa có dữ liệu
    if (open && user?.id) {
      // Tải Quizzes
      if (userQuizzes.length === 0) {
        const fetchQuizzes = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quizzes?user_id=${user.id}`
            );
            if (!response.ok) throw new Error("Failed to fetch quizzes");
            const data: { quizzes: UserQuizDetails[] } = await response.json();
            setUserQuizzes(data.quizzes);
          } catch (error) {
            console.error("Error fetching user quizzes:", error);
          }
        };
        fetchQuizzes();
      }

      // Tải Syllabuses
      if (userSyllabuses.length === 0) {
        const fetchSyllabuses = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/syllabuses?user_id=${user.id}`
            );
            if (!response.ok) throw new Error("Failed to fetch syllabuses");
            const data: { syllabuses: SyllabusInfo[] } = await response.json();
            setUserSyllabuses(data.syllabuses);
          } catch (error) {
            console.error("Error fetching user syllabuses:", error);
          }
        };
        fetchSyllabuses();
      }
    }
  }, [open, user, userQuizzes.length, userSyllabuses.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const newPost: Omit<
      Post,
      | "id"
      | "author"
      | "likes"
      | "comments"
      | "shares"
      | "timestamp"
      | "bookmarked"
      | "isLiked"
      | "views"
    > = {
      title,
      content,
      category,
      tags: tagArray,
      image: imageUrl || undefined,
      quiz: shareQuiz
        ? {
            id: `quiz-${Date.now()}`,
            title: quizTitle,
            questionCount: parseInt(quizQuestions) || 0,
            difficulty: quizDifficulty,
          }
        : undefined,
      syllabus: shareSyllabus
        ? {
            id: `syllabus-${Date.now()}`,
            title: syllabusTitle,
            lessonCount: parseInt(syllabusLessons) || 0,
            duration: syllabusDuration,
          }
        : undefined,
    };

    onCreatePost(newPost);

    // Reset form
    setTitle("");
    setContent("");
    setCategory("Blog");
    setTags("");
    setImageUrl("");
    setShareQuiz(false);
    setShareSyllabus(false);
    setQuizTitle("");
    setQuizQuestions("");
    setQuizDifficulty("Dễ");
    setSyllabusTitle("");
    setSyllabusLessons("");
    setSyllabusDuration("");
    setActiveTab("basic");
  };

  const categories = [
    { value: "Blog", icon: "✍️", color: "from-blue-400 to-blue-600" },
    { value: "Chia sẻ", icon: "📢", color: "from-green-400 to-green-600" },
    { value: "Thủ thuật", icon: "💡", color: "from-yellow-400 to-yellow-600" },
    { value: "Tâm sự", icon: "💭", color: "from-purple-400 to-purple-600" },
    { value: "Khác", icon: "🌟", color: "from-pink-400 to-pink-600" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-white to-[#fff8f8]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="px-[28px] pt-[28px] pb-[20px] border-b-2 border-[#ff978e]/20">
            <div className="flex items-center gap-[12px]">
              <div className="bg-gradient-to-r from-[#f66868] to-[#e14640] p-[10px] rounded-[14px] shadow-lg">
                <Sparkles className="size-[24px] text-white" />
              </div>
              <div>
                <DialogTitle className="font-baloo font-bold text-[28px] text-[#c73b3b]">
                  Tạo bài viết mới
                </DialogTitle>
                <p className="font-baloo text-[13px] text-[#b1acac]">
                  Chia sẻ kiến thức và kinh nghiệm của bạn
                </p>
              </div>
            </div>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-180px)]"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-[28px] pt-[20px] pb-[12px] bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-[4px] rounded-[12px] border border-[#ff978e]/20">
                  <TabsTrigger
                    value="basic"
                    className="font-baloo data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f66868] data-[state=active]:to-[#e14640] data-[state=active]:text-white rounded-[10px]"
                  >
                    📝 Cơ bản
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="font-baloo data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f66868] data-[state=active]:to-[#e14640] data-[state=active]:text-white rounded-[10px]"
                  >
                    🖼️ Media
                  </TabsTrigger>
                  <TabsTrigger
                    value="extra"
                    className="font-baloo data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f66868] data-[state=active]:to-[#e14640] data-[state=active]:text-white rounded-[10px]"
                  >
                    ⚡ Nâng cao
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="px-[28px] pb-[24px]">
                <TabsContent value="basic" className="mt-[20px] space-y-[20px]">
                  {/* Title */}
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Label
                      htmlFor="title"
                      className="font-baloo font-semibold text-[15px] text-black"
                    >
                      Tiêu đề *
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                      required
                      className="font-baloo border-2 border-[#ff978e]/40 focus:border-[#f66868] rounded-[12px] px-[16px] py-[12px] h-auto"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <Label
                      htmlFor="content"
                      className="font-baloo font-semibold text-[15px] text-black"
                    >
                      Nội dung *
                    </Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Chia sẻ suy nghĩ và kiến thức của bạn..."
                      required
                      rows={8}
                      className="font-baloo border-2 border-[#ff978e]/40 focus:border-[#f66868] resize-none rounded-[12px] px-[16px] py-[12px]"
                    />
                    <div className="flex items-center justify-between">
                      <p className="font-baloo text-[11px] text-[#b1acac]">
                        {content.length} ký tự
                      </p>
                      {content.length > 500 && (
                        <span className="font-baloo text-[11px] text-green-600">
                          ✓ Nội dung chi tiết
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Category */}
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label
                      htmlFor="category"
                      className="font-baloo font-semibold text-[15px] text-black"
                    >
                      Loại bài viết *
                    </Label>
                    <div className="grid grid-cols-5 gap-[10px]">
                      {categories.map((cat) => (
                        <motion.button
                          key={cat.value}
                          type="button"
                          onClick={() => setCategory(cat.value)}
                          className={`flex flex-col items-center gap-[6px] p-[12px] rounded-[14px] border-2 transition-all ${
                            category === cat.value
                              ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                              : "bg-white/60 border-[#e2e2e2] hover:border-[#f66868]"
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-[24px]">{cat.icon}</span>
                          <span
                            className={`font-baloo text-[11px] ${
                              category === cat.value
                                ? "text-white"
                                : "text-[#5b5858]"
                            }`}
                          >
                            {cat.value}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Label
                      htmlFor="tags"
                      className="font-baloo font-semibold text-[15px] text-black"
                    >
                      Thẻ (Tags)
                    </Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Học tập, Ghi nhớ, Mẹo hay..."
                      className="font-baloo border-2 border-[#ff978e]/40 focus:border-[#f66868] rounded-[12px] px-[16px] py-[12px] h-auto"
                    />
                    <p className="font-baloo text-[11px] text-[#b1acac]">
                      Phân cách bằng dấu phẩy (,)
                    </p>
                  </motion.div>
                </TabsContent>

                <TabsContent value="media" className="mt-[20px] space-y-[20px]">
                  {/* Image URL */}
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Label
                      htmlFor="image"
                      className="font-baloo font-semibold text-[15px] text-black"
                    >
                      Hình ảnh
                    </Label>
                    <div className="relative">
                      <Input
                        id="image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Nhập URL hình ảnh..."
                        className="font-baloo border-2 border-[#ff978e]/40 focus:border-[#f66868] rounded-[12px] px-[16px] py-[12px] h-auto pr-[40px]"
                      />
                      {imageUrl && (
                        <button
                          type="button"
                          onClick={() => setImageUrl("")}
                          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#b1acac] hover:text-[#f66868]"
                        >
                          <X className="size-[18px]" />
                        </button>
                      )}
                    </div>
                    {imageUrl && (
                      <motion.div
                        className="relative w-full h-[200px] rounded-[12px] overflow-hidden border-2 border-[#ff978e]/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                          }}
                        />
                      </motion.div>
                    )}
                    <div className="flex items-center gap-[8px] p-[12px] bg-blue-50 rounded-[10px] border border-blue-200">
                      <span className="text-[16px]">💡</span>
                      <p className="font-baloo text-[11px] text-blue-600">
                        Hình ảnh giúp bài viết của bạn nổi bật và thu hút hơn!
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="extra" className="mt-[20px] space-y-[20px]">
                  {/* Share Quiz Option */}
                  <motion.div
                    className="flex flex-col gap-[16px] p-[20px] bg-gradient-to-br from-[#fff0f0] to-[#ffe4e4] rounded-[16px] border-2 border-[#ff978e]/40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[12px]">
                        <div className="bg-gradient-to-r from-[#f66868] to-[#e14640] p-[10px] rounded-[12px]">
                          <FileText className="size-[20px] text-white" />
                        </div>
                        <div>
                          <Label
                            htmlFor="share-quiz"
                            className="font-baloo font-semibold text-[15px] text-black cursor-pointer"
                          >
                            Chia sẻ Quiz
                          </Label>
                          <p className="font-baloo text-[11px] text-[#b1acac]">
                            Tạo bài kiểm tra kiến thức
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="share-quiz"
                        checked={shareQuiz}
                        onCheckedChange={(checked) => {
                          setShareQuiz(checked);
                          if (checked) setShareSyllabus(false);
                        }}
                      />
                    </div>

                    <AnimatePresence>
                      {shareQuiz && (
                        <motion.div
                          className="flex flex-col gap-[12px] pt-[12px] border-t-2 border-[#ffc4c4]/50"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <Input
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="Tên quiz"
                            required={shareQuiz}
                            className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]"
                          />
                          <div className="flex gap-[12px]">
                            <Input
                              type="number"
                              value={quizQuestions}
                              onChange={(e) => setQuizQuestions(e.target.value)}
                              placeholder="Số câu hỏi"
                              required={shareQuiz}
                              className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]"
                            />
                            <Select
                              value={quizDifficulty}
                              onValueChange={setQuizDifficulty}
                            >
                              <SelectTrigger className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Dễ" className="font-baloo">
                                  🟢 Dễ
                                </SelectItem>
                                <SelectItem
                                  value="Trung bình"
                                  className="font-baloo"
                                >
                                  🟡 Trung bình
                                </SelectItem>
                                <SelectItem value="Khó" className="font-baloo">
                                  🔴 Khó
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Attach Syllabus */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Đính kèm giáo trình
                      </label>
                      <Select
                        value={selectedSyllabus}
                        onValueChange={setSelectedSyllabus}
                      >
                        <SelectTrigger className="w-full h-12 rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                          <SelectValue placeholder="Chọn giáo trình của bạn" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Giáo trình của bạn</SelectLabel>
                            {USER_SYLLABUSES.map((syllabus) => (
                              <SelectItem key={syllabus.id} value={syllabus.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {syllabus.title}
                                  </span>
                                  <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(
                                      syllabus.createdDate
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {selectedSyllabus && (
                        <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-start gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {
                                USER_SYLLABUSES.find(
                                  (s) => s.id === selectedSyllabus
                                )?.title
                              }
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(
                                USER_SYLLABUSES.find(
                                  (s) => s.id === selectedSyllabus
                                )?.createdDate || ""
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedSyllabus("")}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Share Syllabus Option */}
                  <motion.div
                    className="flex flex-col gap-[16px] p-[20px] bg-gradient-to-br from-[#fff0f0] to-[#ffe4e4] rounded-[16px] border-2 border-[#ff978e]/40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[12px]">
                        <div className="bg-gradient-to-r from-[#f66868] to-[#e14640] p-[10px] rounded-[12px]">
                          <BookOpen className="size-[20px] text-white" />
                        </div>
                        <div>
                          <Label
                            htmlFor="share-syllabus"
                            className="font-baloo font-semibold text-[15px] text-black cursor-pointer"
                          >
                            Chia sẻ Lộ trình học
                          </Label>
                          <p className="font-baloo text-[11px] text-[#b1acac]">
                            Tạo chương trình học tập
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="share-syllabus"
                        checked={shareSyllabus}
                        onCheckedChange={(checked) => {
                          setShareSyllabus(checked);
                          if (checked) setShareQuiz(false);
                        }}
                      />
                    </div>

                    <AnimatePresence>
                      {shareSyllabus && (
                        <motion.div
                          className="flex flex-col gap-[12px] pt-[12px] border-t-2 border-[#ffc4c4]/50"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <Input
                            value={syllabusTitle}
                            onChange={(e) => setSyllabusTitle(e.target.value)}
                            placeholder="Tên lộ trình"
                            required={shareSyllabus}
                            className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]"
                          />
                          <div className="flex gap-[12px]">
                            <Input
                              type="number"
                              value={syllabusLessons}
                              onChange={(e) =>
                                setSyllabusLessons(e.target.value)
                              }
                              placeholder="Số bài học"
                              required={shareSyllabus}
                              className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]"
                            />
                            <Input
                              value={syllabusDuration}
                              onChange={(e) =>
                                setSyllabusDuration(e.target.value)
                              }
                              placeholder="Thời lượng (vd: 3 tháng)"
                              required={shareSyllabus}
                              className="font-baloo border-2 border-[#ff978e]/40 rounded-[10px]"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </form>

          {/* Submit Buttons */}
          <div className="flex gap-[12px] justify-end px-[28px] pb-[24px] pt-[16px] border-t-2 border-[#ff978e]/20 bg-white/50 backdrop-blur-sm">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="font-baloo font-semibold border-2 border-[#ff978e]/40 text-[#c73b3b] hover:bg-[#fff0f0] px-[24px] py-[12px] h-auto rounded-[12px]"
              >
                Hủy
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] font-baloo font-bold px-[32px] py-[12px] h-auto rounded-[12px] shadow-lg shadow-[#f66868]/30"
              >
                Đăng bài
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
