import React from "react";
import NavBar from "./components/header/NavBar";
import MovieList from "./components/main/MovieList";
import Modal from "./components/main/Modal";
import Loader from "./components/addons/Loader";
import MovieDetails from "./components/main/MovieDetails";
import FilterBox from "./components/header/FilterBox";
import GlobalStyle from "./styles/GlobalStyles";
import useStore from "./store";

const App: React.FC = () => {
  const { isLoading, isModalOpen, movieDetails } = useStore();

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <FilterBox />
      {isModalOpen ? (
        <Modal onClick={() => useStore.setState({ isModalOpen: false })}>
          {isLoading ? <Loader /> : movieDetails ? <MovieDetails /> : `No movie details found.`}
        </Modal>
      ) : (
        <MovieList />
      )}
    </>
  );
};

export default App;