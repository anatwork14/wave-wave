import MarkdownRenderer from "@/components/MarkdownRender";
import { Message } from "@/store/useChatStore";
import React, { useEffect, useRef } from "react";

interface ChatAreaProps {
  messages: Message[];
}

const MessageBubble: React.FC<Message> = ({ role, content }) => {
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
        <MarkdownRenderer
          className={`${
            isUser
              ? "bg-[#C73B3B] text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-tl-none"
          }`}
          content={content}
        />
      </div>
    </div>
  );
};

const ChatArea: React.FC<ChatAreaProps> = ({ messages = [] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex flex-col h-[68vh] bg-white p-6">
      <div className="flex-grow overflow-y-auto pr-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
