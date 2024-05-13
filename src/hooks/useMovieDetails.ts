import { useEffect } from "react";
import useStore from "../store";
import { fetchMovieDetails } from "../utils/api";

const useMovieDetails = () => {
    const {
      selectedMovie,
      setSelectedMovie,
      movieDetails,
      setMovieDetails,
      isModalOpen,
      setIsModalOpen,
      setIsLoading,
    } = useStore();
  
    useEffect(() => {
      if (selectedMovie) {
        setIsLoading(true);
        fetchMovieDetails(selectedMovie.imdbID).then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        });
      }
    }, [selectedMovie, setMovieDetails, setIsLoading]);
  
    return { selectedMovie, setSelectedMovie, movieDetails, isModalOpen, setIsModalOpen };
  };

  export default useMovieDetails;
