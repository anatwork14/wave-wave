"use client";

import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { Feed } from "./components/feed";
import { CreatePostModal } from "./components/create-post-modal";
import { ToastContainer } from "./components/toast-notification";
import { PlusCircle, TrendingUp, Sparkles } from "lucide-react";
import CommunityPage from "./components/CommunityPage";

export default function CommunityPageHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Nguyễn Minh Anh",
      avatar: "/professional-woman-diverse.png",
      timestamp: "2 giờ trước",
      title: "Tips học tập hiệu quả cho sinh viên",
      content:
        "Sau 4 năm đại học với GPA 3.8, mình muốn chia sẻ những phương pháp học tập đã giúp mình thành công. Từ việc tạo lịch trình hợp lý đến kỹ thuật ghi chú Cornell, tất cả đều có trong bài viết này...",
      category: "Tips học tập",
      upvotes: 234,
      downvotes: 12,
      comments: 45,
      shares: 28,
      saved: false,
      userVote: null,
      attachedQuiz: {
        id: "quiz_001",
        title: "Kiểm tra kiến thức Toán học lớp 10",
        createdDate: "2024-01-15",
      },
    },
    {
      id: 2,
      author: "Trần Văn Hùng",
      avatar: "/professional-man.jpg",
      timestamp: "4 giờ trước",
      title: "Hành trình từ zero đến hero trong lập trình",
      content:
        "Một năm trước mình chưa biết code là gì, giờ đây mình đã có việc làm với mức lương khá. Trong bài này, mình sẽ chia sẻ lộ trình học từng bước và những nguồn tài nguyên miễn phí mà mình đã sử dụng...",
      category: "Blog",
      upvotes: 512,
      downvotes: 8,
      comments: 89,
      shares: 156,
      saved: false,
      userVote: null,
      attachedSyllabus: {
        id: "syl_001",
        title: "Lộ trình học lập trình Full-stack từ cơ bản",
        createdDate: "2024-01-18",
      },
    },
    {
      id: 3,
      author: "Lê Thị Hương",
      avatar: "/professional-woman-glasses.png",
      timestamp: "6 giờ trước",
      title: "Vượt qua khó khăn trong kỳ thi THPT",
      content:
        "Năm ngoái mình đã trải qua kỳ thi THPT với rất nhiều áp lực. Nhưng nhờ có sự chuẩn bị kỹ lưỡng và mindset đúng đắn, mình đã đạt được kết quả mong muốn. Đây là những điều mình học được...",
      category: "Tâm sự",
      upvotes: 189,
      downvotes: 5,
      comments: 32,
      shares: 67,
      saved: false,
      userVote: null,
    },
    {
      id: 4,
      author: "Phạm Quốc Việt",
      avatar: "/professional-man.jpg",
      timestamp: "8 giờ trước",
      title: "Bí quyết học Tiếng Anh giao tiếp hiệu quả",
      content:
        "Từng mất 2 năm học Tiếng Anh nhưng vẫn không nói được, mình đã thay đổi phương pháp và chỉ sau 6 tháng đã có thể giao tiếp tự tin. Phương pháp shadowing và immersion đã thay đổi cuộc chơi...",
      category: "Tips học tập",
      upvotes: 421,
      downvotes: 15,
      comments: 67,
      shares: 93,
      saved: true,
      userVote: "up",
      attachedQuiz: {
        id: "quiz_002",
        title: "Test trình độ Tiếng Anh giao tiếp",
        createdDate: "2024-01-20",
      },
      attachedSyllabus: {
        id: "syl_002",
        title: "Lộ trình 6 tháng chinh phục Tiếng Anh giao tiếp",
        createdDate: "2024-01-22",
      },
    },
    {
      id: 5,
      author: "Đặng Thu Hà",
      avatar: "/professional-woman-diverse.png",
      timestamp: "1 ngày trước",
      title: "Câu chuyện về việc chuyển ngành sang IT",
      content:
        "Từ một cử nhân Kinh tế, mình đã quyết định chuyển sang học IT ở tuổi 25. Nhiều người nói mình điên, nhưng giờ đây mình không hối hận về quyết định đó. Đây là hành trình đầy thử thách nhưng đáng giá...",
      category: "Câu chuyện",
      upvotes: 678,
      downvotes: 23,
      comments: 124,
      shares: 201,
      saved: false,
      userVote: null,
    },
    {
      id: 6,
      author: "Hoàng Minh Tuấn",
      avatar: "/professional-man.jpg",
      timestamp: "1 ngày trước",
      title: "Ôn thi Đại học môn Vật Lý: Phương pháp và tài liệu",
      content:
        "Vật Lý là môn khiến nhiều bạn đau đầu trong kỳ thi THPT. Mình đã từng gặp khó khăn tương tự, nhưng sau khi áp dụng phương pháp học có hệ thống và luyện đề đúng cách, điểm số đã cải thiện đáng kể...",
      category: "Tips học tập",
      upvotes: 345,
      downvotes: 18,
      comments: 56,
      shares: 78,
      saved: false,
      userVote: "up",
      attachedQuiz: {
        id: "quiz_003",
        title: "Đề thi thử Vật Lý THPT 2024",
        createdDate: "2024-01-25",
      },
    },
    {
      id: 7,
      author: "Vũ Khánh Linh",
      avatar: "/professional-woman-glasses.png",
      timestamp: "2 ngày trước",
      title: "Làm thế nào để cân bằng học tập và sức khỏe tinh thần",
      content:
        "Trong quá trình chuẩn bị thi cử, nhiều bạn quên mất việc chăm sóc sức khỏe tinh thần của mình. Mình đã từng burnout và phải nghỉ học một thời gian. Đây là những bài học mình rút ra được về việc tìm sự cân bằng...",
      category: "Tâm sự",
      upvotes: 289,
      downvotes: 7,
      comments: 41,
      shares: 52,
      saved: true,
      userVote: null,
    },
    {
      id: 8,
      author: "Bùi Đức Anh",
      avatar: "/professional-man.jpg",
      timestamp: "3 ngày trước",
      title: "Review khóa học lập trình Python cho người mới",
      content:
        "Vừa hoàn thành khóa học Python 6 tháng, mình muốn chia sẻ trải nghiệm cũng như đánh giá về chất lượng giảng dạy, nội dung bài học và độ thực tế của các dự án. Hy vọng sẽ giúp các bạn đưa ra quyết định đúng đắn...",
      category: "Blog",
      upvotes: 156,
      downvotes: 12,
      comments: 28,
      shares: 34,
      saved: false,
      userVote: "down",
      attachedSyllabus: {
        id: "syl_003",
        title: "Giáo trình Python từ cơ bản đến nâng cao",
        createdDate: "2024-01-10",
      },
    },
    {
      id: 9,
      author: "Ngô Mai Phương",
      avatar: "/professional-woman-diverse.png",
      timestamp: "4 ngày trước",
      title: "Những điều ước gì biết trước khi vào đại học",
      content:
        "Năm cuối đại học nhìn lại, mình nhận ra có rất nhiều điều mà nếu biết từ năm nhất thì con đường sẽ thuận lợi hơn nhiều. Từ việc chọn môn tự chọn đến networking và thực tập, đây là những lời khuyên chân thành nhất...",
      category: "Khác",
      upvotes: 412,
      downvotes: 9,
      comments: 73,
      shares: 98,
      saved: false,
      userVote: null,
    },
    {
      id: 10,
      author: "Đinh Công Minh",
      avatar: "/professional-man.jpg",
      timestamp: "5 ngày trước",
      title: "Chinh phục kỳ thi IELTS 7.5 trong 3 tháng",
      content:
        "Nhiều người nghĩ 3 tháng là không đủ để đạt IELTS 7.5, nhưng với kế hoạch học chi tiết và phương pháp đúng đắn, điều này hoàn toàn khả thi. Mình đã làm được và bây giờ sẽ chia sẻ toàn bộ lộ trình...",
      category: "Tips học tập",
      upvotes: 892,
      downvotes: 31,
      comments: 156,
      shares: 243,
      saved: true,
      userVote: "up",
      attachedQuiz: {
        id: "quiz_004",
        title: "IELTS Practice Test - Reading & Listening",
        createdDate: "2024-01-12",
      },
      attachedSyllabus: {
        id: "syl_004",
        title: "Lộ trình 3 tháng chinh phục IELTS 7.5+",
        createdDate: "2024-01-14",
      },
    },
  ]);

  const handleVote = (postId: number, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newPost = { ...post };
          if (post.userVote === voteType) {
            newPost.userVote = null;
            if (voteType === "up") newPost.upvotes--;
            else newPost.downvotes--;
          } else {
            if (post.userVote === "up") newPost.upvotes--;
            if (post.userVote === "down") newPost.downvotes--;
            newPost.userVote = voteType;
            if (voteType === "up") newPost.upvotes++;
            else newPost.downvotes++;
          }
          return newPost;
        }
        return post;
      })
    );
  };

  const handleSave = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  const handleCreatePost = (newPost: {
    title: string;
    content: string;
    category: string;
  }) => {
    const post = {
      id: posts.length + 1,
      author: "You",
      avatar: "/diverse-user-avatars.png",
      timestamp: "now",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      shares: 0,
      saved: false,
      userVote: null,
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Modals & Toasts */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
      <ToastContainer />

      {/* Hero Header Section */}
      <div className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 mt-16 2xl:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Title & Description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-[#F66868] to-[#ff8a80] rounded-xl shadow-lg shadow-[#F66868]/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F66868] via-[#ff7a7a] to-[#ff9a8f] bg-clip-text text-transparent">
                  Cộng đồng Wave Wave
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
                Kết nối, chia sẻ kiến thức và cùng nhau phát triển. Tham gia
                thảo luận với hàng nghìn thành viên đam mê học tập.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    1.2k
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    đang online
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    342
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    bài viết hôm nay
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Create Post Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#F66868] to-[#ff8a80] hover:scale-110 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-[#F66868]/40 hover:shadow-[#F66868]/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Tạo bài viết</span>
            </button>
          </div>
        </div>
      </div>

      <CommunityPage />

      {/* Floating Action Button (Mobile Only) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 p-4 bg-gradient-to-r from-[#F66868] to-[#ff8a80] text-white rounded-full shadow-2xl shadow-[#F66868]/40 hover:shadow-[#F66868]/60 hover:scale-110 active:scale-95 transition-all duration-300 z-40 group"
        aria-label="Create post"
      >
        <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
}
