import { create } from "zustand";

const keywords = [
  "star wars",
  "inception",
  "avengers",
  "matrix",
  "batman",
  "superman",
];

interface Movie {
  Poster: string;
  Title: string;
  imdbID: string;
  Year: string;
  Director?: string;
  Language?: string;
  Genre?: string;
  Plot?: string;
}

interface State {
  searchQuery: string;
  searchYear: string;
  searchType: string;
  movies: { data: Movie[]; query: string };
  selectedMovie: Movie | null;
  movieDetails: Movie | null;
  isModalOpen: boolean;
  isLoading: boolean;
  currentPage: number;

  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSearchYear: (year: string) => void;
  setSearchType: (type: string) => void;
  setMovies: (movies: { data: Movie[]; query: string }) => void;
  setSelectedMovie: (movie: Movie) => void;
  setMovieDetails: (details: Movie) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useStore = create<State>((set) => ({
  searchQuery: keywords[Math.floor(Math.random() * keywords.length)],
  searchYear: "",
  searchType: "",
  movies: { data: [], query: "" },
  selectedMovie: null,
  movieDetails: null,
  isModalOpen: false,
  isLoading: false,
  currentPage: 1,
  hasImageError: false,
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
