import { useEffect } from 'react';
import useStore, {Movie} from '../store';
import { fetchMovieDetails } from '../utils/api';

const useMovieDetails = () => {
  const {
    selectedMovie,
    setSelectedMovie,
    movieDetails,
    setMovieDetails,
    isModalOpen,
    setIsModalOpen,
    setIsLoading,
    resetMovieDetails,
  } = useStore();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedMovie && isModalOpen) {
      setIsLoading(true);
      fetchMovieDetails(selectedMovie.imdbID)
        .then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
          setIsLoading(false);
        });
    }
  }, [selectedMovie, isModalOpen, setMovieDetails, setIsLoading]);

  useEffect(() => {
    if (!isModalOpen) {
      resetMovieDetails();
    }
  }, [isModalOpen, resetMovieDetails]);

  return { movieDetails, handleMovieClick };
};

export default useMovieDetails;