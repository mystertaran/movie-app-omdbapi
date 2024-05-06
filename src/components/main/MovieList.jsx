import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PaginationButtons from "./PaginationButtons";
import  useStore  from "../../store";

const MovieContainer = styled.div`
  display: ${(props) => (props.isGrid ? "grid" : "flex")};
  ${(props) =>
    props.isGrid
      ? css`
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 0px;
          padding: 0px;

          @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          }
        `
      : css`
          justify-content: center;
          align-items: center;
          height: 140px;
        `}
`;

const NoResultsMessage = styled.div`
  font-size: 20px;
  color: #fff;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: block;
    margin: auto;
    text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 80%;
  padding-top: 20px;
  object-fit: contain;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    filter: brightness(1.4);
  }

  @media (max-width: 768px) {
    height: 70%;
  }
`;

const MovieList = () => {

  const movies = useStore((state) => state.movies.data);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });
  const moviesPerPage = 8;
  const numberOfPages = Math.ceil(movies.length / moviesPerPage);
  const moviesToShow = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const searchQuery = useStore((state) => state.searchQuery);
  
  const setSelectedMovie = useStore((state) => state.setSelectedMovie);
  const setIsModalOpen = useStore((state) => state.setIsModalOpen);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  return (
    <>
      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        disabled={moviesToShow.length === 0}
      />
      <MovieContainer isGrid={moviesToShow.length > 0}>
        {moviesToShow.length === 0 ? (
          <NoResultsMessage>
            Sorry, no results found. Please try another search.
          </NoResultsMessage>
        ) : (
          moviesToShow.map((movie) => (
            <MovieImage
              src={movie.Poster}
              key={movie.imdbID}
              onClick={() => {
                setSelectedMovie(movie);
                setIsModalOpen(true);
              }}
            />
          ))
        )}
      </MovieContainer>
      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        disabled={moviesToShow.length === 0}
      />
    </>
  );
};

export default MovieList;
