import React, { useEffect, useState } from 'react';
import "./Trending.scss";
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Trending() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moviesPerPage] = useState(20); // Adjust to display 20 movies per page
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
  const [filters, setFilters] = useState({}); // Initialize filters
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        query_term: searchQuery,
        quality: filters.quality || '',
        minimum_rating: filters.minimum_rating || '',
        genre: filters.genre || '',
        order_by: filters.order_by || '',
        limit: moviesPerPage,
        page: currentPage,
        with_cast: true
      });

      const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`);

      if (response.data?.data?.movies) {
        console.log(response.data);
        setMovies(response.data.data.movies);
        if (response.data.data.movies.length === 0) {
          setError(`Your search - ${searchQuery} - did not match any movies.`);
        } else {
          setError(null); // Clear any previous errors
        }
      } else {
        console.error('Unexpected API response structure:', response.data);
        setError('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, filters, currentPage]); // Depend on searchQuery, filters, and currentPage

  // Function to truncate title to specified number of characters
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength) + '...';
  };

  return (
    <Box className="trending">
      <div className="trending-pagination">
        <h3>24h YIFY Trending Movies</h3>
      </div>
      <Box className='trending-movies-listt'>
        {loading && <Spinner size='xl' className="loading-css" />}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && movies.length > 0 ? (
          movies.map((movie) => (
            <div className='trending-movie-item' key={movie.id}>
              <img src={movie.large_cover_image} alt={movie.title} id='trending-movie-poster' />
              <div className='trending-details-hover'>
                <FaStar className='faster' color='#6ac045' />
                <h2>{movie.rating}/10</h2>
                <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>
                <Link to={`/singlemovie/${movie.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
              <div className='trending-movie-details'>
                <h3>[{movie.language}]</h3>
                <Link to={`/singlemovie/${movie.id}`}>
                  <Box bg={bgColor} color={color}>
                    <h3>{truncateTitle(movie.title, 15)}</h3>
                  </Box>
                </Link>
              </div>
              <h3 className='trending-movie-yers'>{movie.year}</h3>
            </div>
          ))
        ) : (
          !loading && <p className='loading-css'>Your search - {searchQuery} - did not match any movies.</p>
        )}
      </Box>
    </Box>
  );
}

export default Trending;
