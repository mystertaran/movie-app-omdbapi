import React from "react";
import styled from "styled-components";
import useStore from "../../store";
import Loader from "../addons/Loader";
import useMovieDetails from "../../hooks/useMovieDetails";

const MovieDetailsContainer = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
`;

const ContentColumn = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 768px) {
    p {
      font-size: 12px;
    }
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 70%;
    display: block;
    margin: auto;
    object-fit: contain;
    margin-bottom: 20px;
`;

const MovieTitle = styled.h2`
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const MovieDetailsButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px;
  background-color: #282c34;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d1e20;
  }

  @media (max-width: 768px) {
    display: block;
    margin: auto;
    text-align: center;
    width: 70%;
  }
`;

const MovieDetails: React.FC = () => {
  const { isLoading } = useStore();
  const { movieDetails } = useMovieDetails();

  if (isLoading) {
    return <Loader centered />;
  }

  if (!movieDetails) {
    return <Loader centered/>
  }

  return (
    
    <MovieDetailsContainer key={movieDetails.imdbID}>
      <ImageColumn>
        <MovieImage
          src={
            movieDetails.Poster !== "N/A"
              ? movieDetails.Poster
              : process.env.PUBLIC_URL + "/No-Image-Placeholder.png"
          }
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = process.env.PUBLIC_URL + "/No-Image-Placeholder.png";
          }}
          alt={movieDetails.Title}
        />
      </ImageColumn>
      <ContentColumn>
        <MovieTitle>{movieDetails.Title}</MovieTitle>
        <p>Production year: {movieDetails.Year}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Language: {movieDetails.Language}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Short plot:</p>
        <p>{movieDetails.Plot}</p>
        <MovieDetailsButton
          href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          More details
        </MovieDetailsButton>
      </ContentColumn>
    </MovieDetailsContainer>
  );
};

export default MovieDetails;
