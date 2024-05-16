import React from "react";
import NavBar from "./components/header/NavBar";
import MovieList from "./components/main/MovieList";
import Modal from "./components/main/Modal";
import MovieDetails from "./components/main/MovieDetails";
import FilterBox from "./components/header/FilterBox";
import GlobalStyle from "./styles/GlobalStyles";
import useStore from "./store";
import useMovieDetails from "./hooks/useMovieDetails";

const App: React.FC = () => {
  const { isModalOpen } = useStore();
  const { movieDetails } = useMovieDetails();

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <FilterBox />
      {isModalOpen && (
        <Modal onClick={() => useStore.setState({ isModalOpen: false })}>
          {movieDetails ? <MovieDetails /> : null}
        </Modal>
      )}
      <MovieList />
    </>
  );
};

export default App;
