import React, { useEffect, useState } from 'react';
import "./Trending.scss";
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { FaStar,FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function Trending() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20); // Adjust to display 17 movies per page
  const [totalMovies, setTotalMovies] = useState(0); // State to hold total movies count
  const [favorites, setFavorites] = useState({}); 

  const userId = localStorage.getItem('id'); 

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
      }).toString();

      const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams}`);

      if (response.data?.data?.movies) {
        console.log(response.data);
        setMovies(response.data.data.movies);
        setTotalMovies(response.data.data.movie_count); // Update total movies count
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
  }, [searchQuery, filters, currentPage, moviesPerPage]);

  const handleSearch = (query, newFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
    setCurrentPage(1); // Reset page to 1 when performing a new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to truncate title to specified number of characters
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength) + '...';
  };
    // Generate pagination links
    const renderPagination = () => {
      const totalPages = Math.ceil(totalMovies / moviesPerPage);
      const pagesToShow = 8;
      const halfPagesToShow = Math.floor(pagesToShow / 2);
      let startPage = Math.max(1, currentPage - halfPagesToShow);
      let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  
      if (endPage - startPage + 1 < pagesToShow) {
        startPage = Math.max(1, endPage - pagesToShow + 1);
      }
  
      const paginationItems = [];
  
      if (currentPage > 1) {
        paginationItems.push(
          <span key="prev" className="trending-page-link" onClick={() => handlePageChange(currentPage - 1)}>
            « Previous
          </span>
        );
      }
  
      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <span
            key={i}
            className={`trending-page-link ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
  
      if (currentPage < totalPages) {
        paginationItems.push(
          <span key="next" className="trending-page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next »
          </span>
        );
      }
  
      return paginationItems;
    };
    // Function to add a movie to favorites
    const addFavorite = async (movie) => {

      const movieData = {
        movieId: movie.id,
        title: movie.title,
        large_cover_image: movie.large_cover_image
      };
    
      axios.post(`https://yts-back-end.onrender.com/api/favorite/addFavorite/${userId}`, movieData)
        .then((res) => {
          console.log('Favorite added successfully:', res.data);
  
          setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [movie.id]: true, 
          }));
        })
        .catch((error) => {
          console.error('Error adding favorite:', error);
          console.log('Failed to add favorite, please try again later.' , error);
  
        });
    };
    
    
  
    // Function to remove a movie from favorites
    const removeFavorite = async (movie) => {
      try {
        const response = await axios.delete(`https://yts-back-end.onrender.com/api/favorite/removeFavorite/${userId}/${movie.id}`);
        if (response.data.status) {
          setFavorites(prevFavs => ({ ...prevFavs, [movie.id]: false }));
          console.log('Movie removed from favorites:', response.data.message);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error removing from favorites:', error.response ? error.response.data : error.message);
      }
    };
  
    // Handle toggling of favorite status
    const handleFavoriteToggle = (movie) => {
      if (favorites[movie.id]) {
        removeFavorite(movie);
      } else {
        addFavorite(movie);
      }
    };

  return (
    <Box className="trending">
            <SearchMovies onSearch={handleSearch} />

      <div className="trending-pagination">
        <h3>24h YIFY Trending Movies</h3>
        {renderPagination()}

      </div>
      <Box className='trending-movies-listt'>
        {loading && <Spinner size='xl' className="trending-loading-css" />}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && movies.length > 0 ? (
          movies.map((movie) => (
            <div className='trending-movie-item' key={movie.id}>
              <img src={movie.large_cover_image} alt={movie.title} id='trending-movie-poster' />
              <div className='trending-details-hover'>
                <FaStar className='faster' color='#6ac045' />
                <h2>{movie.rating}/10</h2>
                <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>
                {/* Conditional rendering based on favorite status */}
 <Button onClick={() => handleFavoriteToggle(movie)}>
                  <FaHeart className="heart-icon" color={favorites[movie.id] ? 'red' : 'white'} />
                </Button>
               
               
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
          !loading && <p className='trending-loading-css'>Your search - {searchQuery} - did not match any movies.</p>
        )}

      </Box>
      <div className="trending-pagination-last">
        {renderPagination()}
      </div>
    </Box>
  );
}

export default Trending;
