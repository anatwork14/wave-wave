"use client";
import MarkdownRenderer from "@/components/MarkdownRender";
import { Message, useChatStore } from "@/store/useChatStore";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

// ----------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------

/**
 * Bubble component for the "typing" indicator.
 */
const TypingIndicator: React.FC = () => (
  <div className="flex mb-4 justify-start">
    <div className="max-w-[90%] p-3 rounded-xl shadow-md bg-gray-100 text-gray-800 rounded-tl-none flex items-center space-x-2">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-0" />
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-100" />
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200" />
    </div>
  </div>
);

/**
 * Handles the character-by-character display effect.
 */
const TypewriterEffect: React.FC<{ content: string }> = ({ content }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const contentRef = useRef(content);

  useEffect(() => {
    if (contentRef.current !== content) {
      contentRef.current = content;
      setDisplayedContent("");
    }

    if (displayedContent.length < content.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedContent(content.substring(0, displayedContent.length + 1));
      }, 20);

      return () => clearTimeout(timeoutId);
    }
  }, [content, displayedContent]);

  return <>{displayedContent}</>;
  {
    /* Use Fragment to avoid layout shifts */
  }
};

// ----------------------------------------------------------------
// Main Components
// ----------------------------------------------------------------

/**
 * Renders a single message bubble with content, video, and action buttons.
 */
const MessageBubble: React.FC<Message & { isFinal: boolean }> = ({
  role,
  content,
  video,
  quiz,
  syllabus,
  isFinal,
}) => {
  const isUser = role === "user";
  const router = useRouter(); // ⭐️ Hook for navigation
  const { user } = useUserStore(); // 👈 Get the logged-in user
  const [isNavigating, setIsNavigating] = useState(false); // 👈 Add loading state
  // ⭐️ Handlers for button clicks
  const handleQuizClick = (quizId: string) => {
    // Example navigation route, update as needed
    router.push(`/quiz/${quizId}`);
    console.log("Navigating to quiz:", quizId);
  };

  const handleSyllabusClick = async (syllabusId: string) => {
    // Prevent double-clicks while the API call is in progress
    if (isNavigating) return;

    // Make sure we have a user to enroll
    if (!user || !user.id) {
      console.error("User not found, cannot enroll.");
      // Optionally show an error toast to the user
      return;
    }

    setIsNavigating(true);

    try {
      // 1. Call your new API endpoint to enroll the user
      // (This also syncs the user_lesson table)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/enroll-syllabus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id, // Get user_id from your store
            syllabus_id: parseInt(syllabusId, 10), // Send the clicked syllabusId
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to enroll:", errorData.detail);
        throw new Error(errorData.detail || "Failed to enroll in syllabus");
      }

      const result = await response.json();
      console.log(result.message); // e.g., "User 1 successfully enrolled..."

      // 2. If the API call is successful, navigate the user
      console.log("Navigating to syllabus:", syllabusId);
      router.push(`/study/learn/syllabus/${syllabusId}`);
    } catch (error) {
      console.error("Syllabus enrollment failed:", error);
      // TODO: Show an error toast to the user
    } finally {
      setIsNavigating(false); // Re-enable the button
    }
  };

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] p-3 rounded-xl shadow-md ${
          isUser
            ? "bg-[#C73B3B] text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        } whitespace-pre-wrap`}
      >
        {/* Nội dung tin nhắn */}
        {isUser || isFinal ? (
          <div
            className={`${
              isUser ? "bg-[#C73B3B] text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {content}
          </div>
        ) : (
          <div>{content}</div>
        )}

        {/* 🎬 Nếu có video thì hiển thị ở dưới */}
        {video && (
          <div className="mt-3">
            <video
              controls
              className="rounded-lg shadow-md w-full max-w-md"
              preload="metadata"
            >
              <source src={video} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        )}

        {/* ⭐️⭐️ MỚI: Nút Quiz và Syllabus ⭐️⭐️ */}
        <div className="mt-3 flex flex-col space-y-2">
          {quiz && (
            <button
              onClick={() => handleQuizClick(quiz)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow font-semibold hover:bg-blue-600 transition-colors"
            >
              Làm bài Quiz
            </button>
          )}
          {syllabus && (
            <button
              onClick={() => handleSyllabusClick(syllabus)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow font-semibold hover:bg-green-600 transition-colors"
            >
              Xem Giáo Trình
            </button>
          )}
        </div>
        {/* ⭐️⭐️ Kết thúc phần mới ⭐️⭐️ */}
      </div>
    </div>
  );
};

/**
 * Manages the display of all messages, scrolling, and typing indicators.
 */
interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages = [] }) => {
  const { assistantTyping, assistantMessageContent } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // ⭐️ Hook for navigation
  const { user } = useUserStore(); // 👈 Get the logged-in user
  const [isNavigating, setIsNavigating] = useState(false); // 👈 Add loading state
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // ⭐️ Handlers for button clicks (needed for the special last-message render)
  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const handleSyllabusClick = async (syllabusId: string) => {
    if (isNavigating) return;

    // Make sure we have a user to enroll
    if (!user || !user.id) {
      console.error("User not found, cannot enroll.");
      // Optionally show an error toast to the user
      return;
    }

    setIsNavigating(true);

    try {
      // 1. Call your new API endpoint to enroll the user
      // (This also syncs the user_lesson table)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/enroll-syllabus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id, // Get user_id from your store
            syllabus_id: parseInt(syllabusId, 10), // Send the clicked syllabusId
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to enroll:", errorData.detail);
        throw new Error(errorData.detail || "Failed to enroll in syllabus");
      }

      const result = await response.json();
      console.log(result.message); // e.g., "User 1 successfully enrolled..."

      // 2. If the API call is successful, navigate the user
      console.log("Navigating to syllabus:", syllabusId);
      router.push(`/study/learn/syllabus/${syllabusId}`);
    } catch (error) {
      console.error("Syllabus enrollment failed:", error);
      // TODO: Show an error toast to the user
    } finally {
      setIsNavigating(false); // Re-enable the button
    }
  };

  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, [messages, assistantTyping, assistantMessageContent]);

  const lastIndex = messages.length - 1;

  return (
    <div className="flex flex-col h-[68vh] bg-white p-6">
      <div className="flex-grow overflow-y-auto pr-4">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {/* Special case: Render the LAST assistant message with Typewriter.
              This block is only active when the assistant is DONE typing.
            */}
            {message.role === "assistant" &&
            index === lastIndex &&
            !assistantTyping ? (
              <div className={`flex mb-4 justify-start`}>
                <div
                  className={`max-w-[90%] p-3 rounded-xl shadow-md bg-gray-100 text-gray-800 rounded-tl-none whitespace-pre-wrap`}
                >
                  {/* Content */}
                  <TypewriterEffect content={message.content} />

                  {/* Video */}
                  {message.video && (
                    <video
                      controls
                      className="rounded-lg shadow-md w-full max-w-lg"
                      preload="metadata"
                    >
                      <source src={message.video} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                  )}

                  {/* ⭐️⭐️ MỚI: Nút Quiz và Syllabus (cho tin nhắn cuối) ⭐️⭐️ */}
                  <div className="mt-3 flex flex-col space-y-2">
                    {message.quiz && (
                      <button
                        onClick={() => handleQuizClick(message.quiz!)}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Làm bài Quiz
                      </button>
                    )}
                    {message.syllabus && (
                      <button
                        onClick={() => handleSyllabusClick(message.syllabus!)}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow font-semibold hover:bg-green-600 transition-colors"
                      >
                        Xem Giáo Trình
                      </button>
                    )}
                  </div>
                  {/* ⭐️⭐️ Kết thúc phần mới ⭐️⭐️ */}
                </div>
              </div>
            ) : (
              /* Render all user messages AND all previous (non-last)
                assistant messages using the standard MessageBubble.
              */
              <MessageBubble
                {...message} // ⭐️⭐️ SỬA: Dùng spread (...) để pass tất cả props (quiz, syllabus, etc.)
                isFinal={false}
              />
            )}
          </React.Fragment>
        ))}

        {/* Render typing indicator bubble */}
        {assistantTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
