import { create } from "zustand";

const keywords = [
  "star wars",
  "inception",
  "avengers",
  "matrix",
  "batman",
  "superman",
];

const useStore = create((set) => ({
  searchQuery: keywords[Math.floor(Math.random() * keywords.length)],
  searchYear: "",
  searchType: "",
  movies: { data: [], query: "" },
  selectedMovie: null,
  movieDetails: null,
  isModalOpen: false,
  isLoading: false,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchYear: (year) => set({ searchYear: year }),
  setSearchType: (type) => set({ searchType: type }),
  setMovies: (movies) => set({ movies }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  setMovieDetails: (details) => set({ movieDetails: details }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;
