// store/chatStore.ts
import { create } from "zustand";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: number;
  title: string;
  summary: string;
  time: string;
  messages: Message[];
}

interface ChatState {
  chatSessions: ChatSession[];
  currentChat?: ChatSession;
  setChatSessions: (sessions: ChatSession[]) => void;
  setCurrentChat: (chat: ChatSession) => void;
  addMessage: (chatId: number, message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatSessions: [],
  currentChat: undefined,
  setChatSessions: (sessions) => set({ chatSessions: sessions }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chatSessions: state.chatSessions.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),
}));
