import { create } from "zustand";

// Define type
interface SearchQuery {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

// create searchQuery stores
const useSearchQuery = create<SearchQuery>((set) => ({
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),
}));

export default useSearchQuery;
