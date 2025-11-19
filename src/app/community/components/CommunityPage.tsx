import { useEffect, useState } from "react";
import CommunityFeed from "./CommunityFeed";
import CommunitySidebar from "./CommunitySidebar";
import CreatePostDialog from "./CreatePostDialog";
import TrendingSection from "./TrendingSection";
import { Post, User } from "./types";
import { motion } from "motion/react";

// Mock current user
const currentUser: User = {
  id: "user-1",
  name: "Công Tước Hắc Ám",
  username: "congtuochacam",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  followers: 1234,
  following: 567,
  posts: 89,
  bio: "Đam mê học ngôn ngữ ký hiệu và chia sẻ kiến thức 🤟",
  isFollowing: false,
};

// Mock posts data
const initialPosts: Post[] = [
  {
    id: "post-1",
    author: currentUser,
    title: "Vì sao tôi chọn học ngôn ngữ ký hiệu",
    content:
      "Tôi vẫn nhớ rất rõ lần đầu tiên tôi nhìn thấy hai người giao tiếp bằng ngôn ngữ ký hiệu — không có âm thanh, chỉ có ánh mắt, bàn tay và những nụ cười. Dù không hiểu họ nói gì, tôi vẫn cảm nhận được sự kết nối mạnh mẽ trong từng cử chỉ. Và có lẽ, chính khoảnh khắc ấy đã gieo trong tôi ý định học ngôn ngữ ký hiệu.",
    category: "Tâm sự",
    tags: ["Động lực", "Ngôn ngữ", "Hoà nhập", "Chia sẻ"],
    likes: 245,
    comments: 32,
    shares: 18,
    views: 1250,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    bookmarked: false,
    isLiked: false,
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=400&fit=crop",
  },
  {
    id: "post-2",
    author: {
      id: "user-2",
      name: "Minh Anh",
      username: "minhanh_signlang",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      followers: 890,
      following: 234,
      posts: 45,
      bio: "Giáo viên ngôn ngữ ký hiệu | Sharing daily tips 📚",
      isFollowing: false,
    },
    title: "10 ký hiệu thông dụng nhất trong giao tiếp hàng ngày",
    content:
      "Hôm nay mình muốn chia sẻ với các bạn 10 ký hiệu mà mình thấy được sử dụng nhiều nhất trong cuộc sống hàng ngày. Đây là những ký hiệu cơ bản mà ai học ngôn ngữ ký hiệu cũng nên biết!",
    category: "Chia sẻ",
    tags: ["Học tập", "Cơ bản", "Hướng dẫn"],
    likes: 512,
    comments: 67,
    shares: 89,
    views: 3420,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    bookmarked: true,
    isLiked: true,
    image:
      "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?w=800&h=400&fit=crop",
  },
  {
    id: "post-3",
    author: {
      id: "user-3",
      name: "Tuấn Kiệt",
      username: "tuankiet_learning",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      followers: 456,
      following: 189,
      posts: 23,
      bio: "Learning journey 🎯",
      isFollowing: true,
    },
    title: "Bài Quiz: Các ký hiệu về gia đình",
    content:
      "Mình vừa tạo một bài quiz về các ký hiệu liên quan đến gia đình. Các bạn thử làm xem mình được bao nhiêu điểm nhé!",
    category: "Quiz",
    tags: ["Quiz", "Gia đình", "Thực hành"],
    quiz: {
      id: "quiz-1",
      title: "Bài Quiz: Các ký hiệu về gia đình",
      questionCount: 15,
      difficulty: "Trung bình",
    },
    likes: 189,
    comments: 45,
    shares: 23,
    views: 890,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    bookmarked: false,
    isLiked: false,
  },
  {
    id: "post-4",
    author: {
      id: "user-4",
      name: "Hương Lan",
      username: "huonglan_teach",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      followers: 2341,
      following: 345,
      posts: 156,
      bio: "Educator | Sign Language Expert 👐",
      isFollowing: false,
    },
    title: "Lộ trình học ngôn ngữ ký hiệu từ A-Z",
    content:
      "Sau nhiều yêu cầu từ các bạn, hôm nay mình chia sẻ toàn bộ lộ trình học của mình từ lúc mới bắt đầu cho đến khi có thể giao tiếp thành thạo. Hy vọng sẽ giúp ích cho những bạn mới!",
    category: "Syllabus",
    tags: ["Lộ trình", "Học tập", "Hướng dẫn"],
    syllabus: {
      id: "syllabus-1",
      title: "Lộ trình học ngôn ngữ ký hiệu từ A-Z",
      lessonCount: 24,
      duration: "3 tháng",
    },
    likes: 891,
    comments: 134,
    shares: 267,
    views: 5670,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    bookmarked: true,
    isLiked: false,
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=400&fit=crop",
  },
  {
    id: "post-5",
    author: {
      id: "user-5",
      name: "Phương Thảo",
      username: "phuongthao_tips",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      followers: 678,
      following: 423,
      posts: 67,
      bio: "Tips & Tricks enthusiast 💡",
      isFollowing: false,
    },
    title: "Mẹo nhớ nhanh các ký hiệu phức tạp",
    content:
      "Nhiều bạn hỏi mình làm sao để nhớ được những ký hiệu phức tạp. Hôm nay mình sẽ chia sẻ một số mẹo giúp các bạn nhớ lâu hơn và học hiệu quả hơn!",
    category: "Thủ thuật",
    tags: ["Mẹo học", "Ghi nhớ", "Hiệu quả"],
    likes: 423,
    comments: 56,
    shares: 78,
    views: 2340,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
    bookmarked: false,
    isLiked: false,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [createPostOpen, setCreatePostOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">(
    "recent"
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreatePost = async (
    newPostData: Omit<
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
  ) => {
    if (!user || !user.id) {
      console.log("Chờ currentUser, chưa tải bài viết...");
      setIsLoading(false); // Dừng tải nếu không có user
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-user-id": user.id.toString(),
          },
          // Gửi dữ liệu từ form (CreatePostDialog) làm body
          body: JSON.stringify(newPostData),
        }
      );

      if (!response.ok) throw new Error("Failed to create post");

      // API trả về bài viết đầy đủ (với author, ID, v.v.)
      const createdPost: Post = await response.json();

      // Thêm bài viết mới vào đầu danh sách
      setPosts([createdPost, ...posts]);
      setCreatePostOpen(false); // Đóng dialog
    } catch (error) {
      console.error("Error creating post:", error);
      // Tùy chọn: hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleToggleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const handleToggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleFollowUser = (userId: string) => {
    setPosts(
      posts.map((post) =>
        post.author.id === userId
          ? {
              ...post,
              author: {
                ...post.author,
                isFollowing: !post.author.isFollowing,
                followers: post.author.isFollowing
                  ? post.author.followers - 1
                  : post.author.followers + 1,
              },
            }
          : post
      )
    );
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  let filteredPosts = posts;

  // Filter by category
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category === selectedCategory
    );
  }

  // Filter by search query
  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by tags
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((tag) => selectedTags.includes(tag))
    );
  }

  // Sort posts
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "recent") {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "trending") {
      const aScore = a.likes + a.comments * 2 + a.shares * 3;
      const bScore = b.likes + b.comments * 2 + b.shares * 3;
      return bScore - aScore;
    }
    return 0;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-[28px] mt-10">
        <div className="flex gap-[32px]">
          {/* Main Feed */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CommunityFeed
              posts={filteredPosts}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onToggleBookmark={handleToggleBookmark}
              onToggleLike={handleToggleLike}
              onFollowUser={handleFollowUser}
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="w-[360px] shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex flex-col gap-[20px]">
              <CommunitySidebar user={currentUser} />
              <TrendingSection posts={posts} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* <CreatePostDialog
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        onCreatePost={handleCreatePost}
      /> */}
    </div>
  );
}
