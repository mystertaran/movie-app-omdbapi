import { useEffect } from "react";
import useStore from "../store";
import { fetchAllPages } from "../utils/api";

const useMovieSearch = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchYear,
    setSearchYear,
    searchType,
    setSearchType,
    movies,
    setMovies,
    setIsLoading,
  } = useStore();

  useEffect(() => {
    if (searchQuery || searchYear || searchType) {
      setIsLoading(true);
      fetchAllPages(searchQuery, searchYear, searchType).then((allMovies) => {
        setMovies({ data: allMovies, query: searchQuery });
        setIsLoading(false);
      });
    } else {
      setMovies({ data: [], query: searchQuery });
    }
  }, [searchQuery, searchYear, searchType, setMovies, setIsLoading]);

  return { searchQuery, setSearchQuery, searchYear, setSearchYear, searchType, setSearchType, movies };
};

export default useMovieSearch;
