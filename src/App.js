import React, { useEffect, useCallback } from "react";
import NavBar from "./components/header/NavBar";
import MovieList from "./components/main/MovieList";
import Modal from "./components/main/Modal";
import Loader from "./components/addons/Loader";
import MovieDetails from "./components/main/MovieDetails";
import FilterBox from "./components/header/FilterBox";
import GlobalStyle from "./styles/GlobalStyles";
import useStore from "./store";


function App() {
  const {
    searchQuery,
    setSearchQuery,
    searchYear,
    setSearchYear,
    searchType,
    setSearchType,
    movies,
    setMovies,
    selectedMovie,
    setSelectedMovie,
    movieDetails,
    setMovieDetails,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    setIsLoading,
  } = useStore();


  const fetchMovieDetails = useCallback((id) => {
    setIsLoading(true);
    fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [setIsLoading, setMovieDetails]);

  useEffect(() => {
    if (searchQuery || searchYear || searchType) {
      const fetchPage = async (page) => {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchQuery}${
            searchYear ? `&y=${searchYear}` : ""
          }${searchType ? `&type=${searchType}` : ""}&page=${page}&apikey=${
            process.env.REACT_APP_OMDB_API_KEY
          }`
        );
        const data = await response.json();
        return data.Search;
      };

      const fetchAllPages = async () => {
        let allMovies = [];
        for (let page = 1; page <= 3; page++) {
          const movies = await fetchPage(page);
          if (movies) {
            allMovies = [...allMovies, ...movies];
          }
        }
        setMovies({ data: allMovies, query: searchQuery });
        setIsLoading(false);
      };

      fetchAllPages();
    } else {
      setMovies({ data: [], query: searchQuery });
    }
  }, [searchQuery, searchYear, searchType, setMovies, setIsLoading]);

  useEffect(() => {
    if (selectedMovie) {
      fetchMovieDetails(selectedMovie.imdbID);
    }
  }, [selectedMovie, fetchMovieDetails]);

  return (
    <>
      <GlobalStyle />
      <NavBar setSearchQuery={setSearchQuery} />
      <FilterBox setSearchYear={setSearchYear} setSearchType={setSearchType} />
      {isModalOpen ? (
        <Modal
          onClick={() => {
            setIsModalOpen(false);
            setSearchQuery(movies.query);
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            movieDetails && (
              <MovieDetails
                movie={movieDetails}
                onBack={() => setIsModalOpen(false)}
              />
            )
          )}
        </Modal>
      ) : (
        <MovieList
          searchQuery={searchQuery}
          movies={movies.data}
          setSelectedMovie={setSelectedMovie}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default App;
