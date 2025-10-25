// store/chatStore.ts
import { create } from "zustand";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

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
  setChatSessions: (sessions: ChatSession[]) => void;
  setCurrentChat: (chat: ChatSession | null) => void;
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
          ? {
              ...chat,
              // 🎯 FIX: Use the OR operator (||) to ensure messages is an array
              messages: [...(chat.messages || []), message],
            }
          : chat
      ),
      // ... (logic to update currentChat if applicable, as in previous versions)
    })),
}));
