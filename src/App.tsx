import React, { useEffect } from "react";
import NavBar from "./components/header/NavBar";
import MovieList from "./components/main/MovieList";
import Modal from "./components/main/Modal";
import Loader from "./components/addons/Loader";
import MovieDetails from "./components/main/MovieDetails";
import FilterBox from "./components/header/FilterBox";
import GlobalStyle from "./styles/GlobalStyles";
import useStore from "./store";
import useMovieDetails from "./hooks/useMovieDetails";
import useMovieSearch from "./hooks/useMovieSearch";

const App: React.FC = () => {
  const { isLoading } = useStore();

  const {
    searchQuery,
    setSearchQuery,
    searchYear,
    setSearchYear,
    searchType,
    setSearchType,
    movies,
  } = useMovieSearch();
  const {
    selectedMovie,
    setSelectedMovie,
    movieDetails,
    isModalOpen,
    setIsModalOpen,
  } = useMovieDetails();

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
          searchQueryProp={searchQuery}
          moviesProp={movies.data}
          setSelectedMovieProp={setSelectedMovie}
          setIsModalOpenProp={setIsModalOpen}
        />
      )}
    </>
  );
};

export default App;
