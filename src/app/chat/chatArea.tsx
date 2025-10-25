import MarkdownRenderer from "@/components/MarkdownRender";
import { Message, useChatStore } from "@/store/useChatStore";
import React, { useEffect, useRef, useState } from "react";

// ----------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------

/**
 * Bubble component for the "typing" indicator.
 * It shows a pulse/bubble effect.
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
  const contentRef = useRef(content); // Store content to prevent re-runs on prop changes that shouldn't re-type

  useEffect(() => {
    // Only run the effect if the content prop changes
    if (contentRef.current !== content) {
      contentRef.current = content; // Update ref
      setDisplayedContent(""); // Reset displayed content
    }

    if (displayedContent.length < content.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedContent(content.substring(0, displayedContent.length + 1));
      }, 20); // Adjust speed here (20ms per character)

      return () => clearTimeout(timeoutId);
    }
  }, [content, displayedContent]);

  return displayedContent;
};

// ----------------------------------------------------------------
// Main Components
// ----------------------------------------------------------------

const MessageBubble: React.FC<Message & { isFinal: boolean }> = ({
  role,
  content,
  isFinal,
}) => {
  const isUser = role === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] p-3 rounded-xl shadow-md ${
          isUser
            ? "bg-[#C73B3B] text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        } whitespace-pre-wrap`}
      >
        {/* Render assistant message with typewriter effect only when it's the final message */}
        {isUser || isFinal ? (
          <MarkdownRenderer
            content={content}
            className={`${
              isUser
                ? "bg-[#C73B3B] text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            }`}
          />
        ) : (
          // Fallback for non-final assistant message (shouldn't happen with this logic, but good for safety)
          <MarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
};

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages = [] }) => {
  const { assistantTyping, assistantMessageContent } = useChatStore(); // Get state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Scroll to bottom whenever messages or the typing status changes
  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, [messages, assistantTyping, assistantMessageContent]); // Watch for content change to scroll during typing

  // The last message in the array is the one that needs the typewriter effect
  const lastIndex = messages.length - 1;

  return (
    <div className="flex flex-col h-[68vh] bg-white p-6">
      <div className="flex-grow overflow-y-auto pr-4">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {/* If it's the last assistant message and we're not currently typing a new message */}
            {message.role === "assistant" &&
            index === lastIndex &&
            !assistantTyping ? (
              <div className={`flex mb-4 justify-start`}>
                <div
                  className={`max-w-[90%] p-3 rounded-xl shadow-md bg-gray-100 text-gray-800 rounded-tl-none whitespace-pre-wrap`}
                >
                  <TypewriterEffect content={message.content} />
                </div>
              </div>
            ) : (
              // Use a standard bubble for all user messages and previous assistant messages
              <MessageBubble
                role={message.role}
                content={message.content}
                isFinal={false} // Prevents the MessageBubble from applying Typewriter logic inside
              />
            )}
          </React.Fragment>
        ))}

        {/* Render typing indicator bubble when assistantTyping is true */}
        {assistantTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
