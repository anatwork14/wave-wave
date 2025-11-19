import { create } from "zustand";

type SearchType = "vocabulary" | "post";

interface SearchState {
  query: string;
  setQuery: (value: string) => void;
  type: SearchType;
  setType: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
  type: "vocabulary",
  setType: (value) => set({ type: value as SearchType }),
}));
