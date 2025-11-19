export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  posts: number;
  bio?: string;
  isFollowing?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questionCount: number;
  difficulty: string;
}

export interface Syllabus {
  id: string;
  title: string;
  lessonCount: number;
  duration: string;
}

export interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  timestamp: Date;
  bookmarked: boolean;
  isLiked: boolean;
  quiz?: Quiz;
  syllabus?: Syllabus;
  image?: string;
}

export interface UserQuizDetails {
  quiz_id: number;
  title: string;
  description: string | null;
  lesson_id: number;
  user_quiz_id: number; // Đây là 'id' từ bảng quiz_user
  score: number | null; // decimal.Decimal trở thành number
  status: string;
  started_at: string; // datetime trở thành string (chuỗi ISO)
  submitted_at: string | null; // Optional datetime
}
