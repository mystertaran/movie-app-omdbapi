import axios from "axios";

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    throw error;
  }
};

export const fetchNumberOfPages = async (
  searchQuery,
  searchYear,
  searchType
) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?s=${searchQuery}${
      searchYear ? `&y=${searchYear}` : ""
    }${searchType ? `&type=${searchType}` : ""}&apikey=${
      process.env.REACT_APP_OMDB_API_KEY
    }`
  );
  return Math.ceil(response.data.totalResults / 8);
};

export const fetchAllPages = async (searchQuery, searchYear, searchType) => {
  const numberOfPages = await fetchNumberOfPages(
    searchQuery,
    searchYear,
    searchType
  );
  let allMovies = [];
  try {
    for (let page = 1; page <= numberOfPages; page++) {
      const response = await axios.get(
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
