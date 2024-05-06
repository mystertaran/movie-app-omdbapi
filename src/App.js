import React, { useEffect } from "react";
import NavBar from "./components/header/NavBar";
import MovieList from "./components/main/MovieList";
import Modal from "./components/main/Modal";
import Loader from "./components/addons/Loader";
import MovieDetails from "./components/main/MovieDetails";
import FilterBox from "./components/header/FilterBox";
import GlobalStyle from "./styles/GlobalStyles";
import useStore from "./store";
import { fetchMovieDetails, fetchAllPages } from "./utils/api";

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

  useEffect(() => {
    if (selectedMovie) {
      setIsLoading(true);
      fetchMovieDetails(selectedMovie.imdbID).then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
    }
  }, [selectedMovie, setMovieDetails, setIsLoading]);


  return (
    <>
      <GlobalStyle />
      <NavBar setSearchQuery={setSearchQuery} />
      <FilterBox setSearchYear={setSearchYear} setSearchType={setSearchType} />
      {isModalOpen ? (
        <Modal
          onClick={() => {
            setIsModalOpen(false);
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
