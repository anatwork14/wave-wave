// store/chatStore.ts
import { create } from "zustand";

export type Message = {
  role: "user" | "assistant";
  content: string;
  video?: string | null; // Must be optional
  quiz?: string | null; // Must be optional
  syllabus?: string | null; // Must be optional
};

interface ChatSession {
  id: number;
  title: string;
  actor: string;
  time: string;
  messages: Message[];
}

interface ChatState {
  chatSessions: ChatSession[];
  currentChat?: ChatSession | null;
  // --- New State for Typing/Streaming ---
  assistantTyping: boolean;
  assistantMessageContent: string;
  // -------------------------------------
  setChatSessions: (sessions: ChatSession[]) => void;
  setCurrentChat: (chat: ChatSession | null) => void;
  setCurrentChatMessages: (chatId: number, messages: Message[]) => void;
  addMessage: (chatId: number, message: Message) => void;
  // --- New Actions for Typing/Streaming ---
  setAssistantTyping: (isTyping: boolean) => void;
  setAssistantMessageContent: (content: string) => void;
  // ----------------------------------------
}

export const useChatStore = create<ChatState>((set) => ({
  chatSessions: [],
  currentChat: undefined,
  // --- Initializing New State ---
  assistantTyping: false,
  assistantMessageContent: "",
  // ------------------------------
  setChatSessions: (sessions) => set({ chatSessions: sessions }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chatSessions: state.chatSessions.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...(chat.messages || []), message],
            }
          : chat
      ),
      // Update currentChat if it matches the session being updated
      currentChat:
        state.currentChat?.id === chatId
          ? {
              ...state.currentChat,
              messages: [...(state.currentChat.messages || []), message],
            }
          : state.currentChat,
    })),
  // --- New Action Implementations ---
  setAssistantTyping: (isTyping) => set({ assistantTyping: isTyping }),
  setAssistantMessageContent: (content) =>
    set({ assistantMessageContent: content }),
  setCurrentChatMessages: (chatId, messages) =>
    set((state) => ({
      chatSessions: state.chatSessions.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: messages, // Replace all messages
            }
          : chat
      ),
      currentChat:
        state.currentChat?.id === chatId
          ? {
              ...state.currentChat,
              messages: messages, // Update the currentChat object directly
            }
          : state.currentChat,
    })),
  // ----------------------------------
}));
