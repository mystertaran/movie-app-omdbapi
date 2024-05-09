import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PaginationButtons from "./PaginationButtons";
import Loader from "../addons/Loader";
import useStore from "../../store";

interface MovieContainerProps {
  isGrid: boolean;
}

interface MovieImageContainerProps {
  poster: string;
}

const MovieContainer = styled.div<MovieContainerProps>`
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
  margin: 40px 0;
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
  min-height: 200px;
  max-height: 486px;
  max-width: 420px;
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

const MovieImageContainer = styled.div<MovieImageContainerProps>`
  width: 100%;
  min-height: 200px;
  max-height: 486px;
  max-width: 420px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const MovieTitle = styled.h2`
  display: block;
  cursor: pointer;
  position: absolute;
  color: black;
  text-align: center;
  padding: 10px;
  text-wrap: wrap;
  width: 300px;
  max-height: 300px;
  white-space: pre-line;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  transform: scaleY(1.6);

  @media (max-width: 768px) {
    width: 140px;
    font-size: 18px;
    max-height: 150px;
  }
`;

interface MovieProps {
  movie: Movie;
  setSelectedMovie: (movie: Movie) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Movie: React.FC<MovieProps> = ({
  movie,
  setSelectedMovie,
  setIsModalOpen,
}) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <MovieImageContainer poster={movie.Poster}>
      <MovieImage
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : process.env.PUBLIC_URL + "/No-Image-Placeholder.png"
        }
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = process.env.PUBLIC_URL + "/No-Image-Placeholder.png";
          setHasImageError(true);
        }}
        onClick={() => {
          setSelectedMovie(movie);
          setIsModalOpen(true);
        }}
      />
      {(movie.Poster === "N/A" || hasImageError) && (
        <MovieTitle onClick={() => {
          setSelectedMovie(movie);
          setIsModalOpen(true);
        }}>{movie.Title}</MovieTitle>
      )}
    </MovieImageContainer>
  );
};

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

interface MovieListProps {
  searchQueryProp: string;
  moviesProp: Movie[];
  setSelectedMovieProp: (movie: Movie) => void;
  setIsModalOpenProp: (isOpen: boolean) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  searchQueryProp,
  moviesProp,
  setSelectedMovieProp,
  setIsModalOpenProp,
}) => {
  const movies = useStore((state) => state.movies.data);
  const isLoading = useStore((state) => state.isLoading);
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const moviesPerPage = 8;
  const numberOfPages = Math.ceil(movies.length / moviesPerPage);
  const moviesToShow = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const searchQuery = useStore((state) => state.searchQuery);
  const setSelectedMovie = useStore((state) => state.setSelectedMovie);
  const setIsModalOpen = useStore((state) => state.setIsModalOpen);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  useEffect(() => {
    if (searchQuery !== prevSearchQuery) {
      setCurrentPage(1);
      setPrevSearchQuery(searchQuery);
    }
  }, [searchQuery, prevSearchQuery, setCurrentPage]);

  return (
    <>
      {!isLoading && (
        <PaginationButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          disabled={moviesToShow.length === 0}
        />
      )}
      <MovieContainer isGrid={moviesToShow.length > 0}>
        {isLoading ? (
          <Loader centered color="white" />
        ) : moviesToShow.length === 0 ? (
          <NoResultsMessage>
            Sorry, no results found. Please try another search.
          </NoResultsMessage>
        ) : (
          moviesToShow.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              setSelectedMovie={setSelectedMovie}
              setIsModalOpen={setIsModalOpen}
            />
          ))
        )}
      </MovieContainer>
      {!isLoading && (
        <PaginationButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          disabled={moviesToShow.length === 0}
        />
      )}
    </>
  );
};

export default MovieList;
