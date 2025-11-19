"use client";

import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, SearchCheckIcon } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

export default function SearchBar({
  placeholder = "Type to search...",
  onSearch,
  className = "",
}: {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}) {
  const { query, setQuery, type, setType } = useSearchStore(); // Zustand state

  const handleSearch = () => {
    setType("vocabulary");
    if (onSearch) onSearch(query);
    console.log("Searching for:", query);
  };

  return (
    <div className={`grid w-full gap-4 ${className}`}>
      <InputGroup
        className="rounded-lg bg-white border-2 border-[#FF978E]
               h-15"
      >
        <InputGroupAddon align="inline-start">
          <Search className="w-6 h-6 mr-2" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:text-[#f66868]/50 bg-transparent focus-visible:ring-0 
                 focus-visible:outline-none text-lg px-4"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size={"sm"}
            variant="secondary"
            onClick={handleSearch}
            className="bg-[#f66868] hover:bg-[#f66868]/80 text-white font-semibold 
                   transition-all text-sm px-3 py-4 rounded-lg flex items-center"
          >
            Tìm kiếm
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
