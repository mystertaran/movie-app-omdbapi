import axios, { AxiosResponse } from "axios";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Director: string;
}

export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response: AxiosResponse<Movie> = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    throw error;
  }
};

export const fetchNumberOfPages = async (
  searchQuery: string,
  searchYear?: string,
  searchType?: string
): Promise<number> => {
  const response: AxiosResponse<{ totalResults: string }> = await axios.get(
    `https://www.omdbapi.com/?s=${searchQuery}${
      searchYear ? `&y=${searchYear}` : ""
    }${searchType ? `&type=${searchType}` : ""}&apikey=${
      process.env.REACT_APP_OMDB_API_KEY
    }`
  );
  return Math.ceil(parseInt(response.data.totalResults) / 8);
};

export const fetchAllPages = async (
  searchQuery: string,
  searchYear?: string,
  searchType?: string
): Promise<Movie[]> => {
  const numberOfPages = await fetchNumberOfPages(
    searchQuery,
    searchYear,
    searchType
  );
  let allMovies: Movie[] = [];
  try {
    for (let page = 1; page <= numberOfPages; page++) {
      const response: AxiosResponse<{ Search: Movie[] }> = await axios.get(
        `https://www.omdbapi.com/?s=${searchQuery}${
          searchYear ? `&y=${searchYear}` : ""
        }${searchType ? `&type=${searchType}` : ""}&page=${page}&apikey=${
          process.env.REACT_APP_OMDB_API_KEY
        }`
      );
      if (response.data.Search) {
        allMovies = [...allMovies, ...response.data.Search];
      }
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching all pages: ", error);
    throw error;
  }
};

export const fetchPageData = async (
  searchQuery: string,
  page: number,
  searchYear?: string,
  searchType?: string
): Promise<{ movies: Movie[]; hasNextPage: boolean }> => {
  try {
    console.log("Fetching movies...");
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&page=${page}${
        searchYear ? `&y=${searchYear}` : ""
      }${searchType ? `&type=${searchType}` : ""}&apikey=${
        process.env.REACT_APP_OMDB_API_KEY
      }`
    );
    const movies = response.data.Search || [];
    const hasNextPage = movies.length === 10;
    return { movies, hasNextPage };
  } catch (error) {
    console.error("Error fetching page data: ", error);
    return { movies: [], hasNextPage: false };
  }
};
