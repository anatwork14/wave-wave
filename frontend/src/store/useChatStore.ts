// store/chatStore.ts
import { create } from "zustand";

export type Message = {
  role: "user" | "assistant";
  content: string;
  video?: string | null; // Must be optional
  quiz?: string | null; // Must be optional
  syllabus?: string | null; // Must be optional
};

export interface ChatSession {
  id: string;
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
  newestChat: boolean;
  // -------------------------------------
  setChatSessions: (sessions: ChatSession[]) => void;
  setCurrentChat: (chat: ChatSession | null) => void;
  setCurrentChatMessages: (chatId: string, messages: Message[]) => void;
  addMessage: (chatId: string, message: Message) => void;
  // --- New Actions for Typing/Streaming ---
  setAssistantTyping: (isTyping: boolean) => void;
  setAssistantMessageContent: (content: string) => void;
  setNewestChat: (isNewestChat: boolean) => void;
  // ----------------------------------------
}

export const useChatStore = create<ChatState>((set) => ({
  chatSessions: [],
  currentChat: undefined,
  // --- Initializing New State ---
  assistantTyping: false,
  assistantMessageContent: "",
  newestChat: false,
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
  setNewestChat: (isNewestChat) => set({ newestChat: isNewestChat }),
  // ----------------------------------
}));
