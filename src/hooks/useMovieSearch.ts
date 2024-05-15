import { useEffect } from "react";
import useStore from "../store";
import { fetchAllPages } from "../utils/api";
import { fetchPageData } from "../utils/api";

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
    isLoading,
    setIsLoading,
    currentPage,
    setHasNextPage,
  } = useStore();

  useEffect(() => {
    if (searchQuery || searchYear || searchType) {
      console.log(`Fetching movies with search query: ${searchQuery}, year: ${searchYear}, type: ${searchType}`)
      setIsLoading(true);
      fetchPageData(searchQuery, currentPage, searchYear, searchType)
        .then(({ movies, hasNextPage }) => {
          console.log('Movies fetched:', movies);
          setMovies({ data: movies, query: searchQuery });
          setHasNextPage(hasNextPage);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching new page data: ", error);
          setIsLoading(false);
        });
    }
  }, [searchQuery, searchYear, searchType, currentPage, setMovies, setHasNextPage, setIsLoading]);
  return {
    searchQuery,
    setSearchQuery,
    searchYear,
    setSearchYear,
    searchType,
    setSearchType,
    movies,
    isLoading
  };
};

export default useMovieSearch;
