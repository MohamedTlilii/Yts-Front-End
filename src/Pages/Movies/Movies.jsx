import React, { useEffect, useState } from 'react';
import "./Movies.scss";
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Box, Spinner,useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Movies() {
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
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        query_term: searchQuery,
        quality: filters.quality || '',
        minimum_rating: filters.minimum_rating || '',
        genre: filters.genre || '',
        order_by	: filters.order_by || '',
        limit: moviesPerPage,
        page: currentPage,
        with_cast : true
      });
      const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`);

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
  // Function to truncate title to specified number of words
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
          <span bg={bgColor} color={color} key="prev" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            « Previous
          </span>
        );
      }
  
      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <span
            key={i}
            className={`page-link ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
  
      if (currentPage < totalPages) {
        paginationItems.push(
          <span key="next" className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next »
          </span>
        );
      }
  
      return paginationItems;
    };
  
  return (
    <Box className="movies"  >
      <SearchMovies onSearch={handleSearch} />
      <div className="pagination">
      <h3>YIFY Movies - page {currentPage}</h3>
      {renderPagination()}

      </div>
      <Box className='movies-listt'>
        
        {loading && <Spinner size='xl'  className="loading-css" /> }
        {/* {error && <p>{error}</p>} */}
        {!loading && !error && movies.length > 0 ? (
          movies.map((movie, index) => (
<div className='movie-item'>
  <img src={movie.large_cover_image} alt={movie.title} id='movie-poster' />
  
  <div className='movie-details-hover'>
    <FaStar className='faster' color='#6ac045' />
    <h2 >{movie.rating}/10</h2>
    {/* <h4>{movie.genres }</h4> */}
    <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>

    <Link to={`/singlemovie/${movie.id}`}>      <button>View Details</button>
    </Link>
  </div>

  <div className='movie-details'>
    <h3>[{movie.language}]</h3>
    <Link to={`/singlemovie/${movie.id}`}>
      <Box bg={bgColor} color={color}><h3>{truncateTitle(movie.title, 15)}</h3></Box >
    </Link>
  </div>

  <h3 className='movie-yers'>{movie.year}</h3>
</div>
          ))
        ) : (
          !loading && <p className='loading-css'>Your search - {searchQuery} - did not match any movies.</p>
        )}
      </Box>
      <div className="pagination">
      {renderPagination()}

      </div>
    </Box>
  );
}

export default Movies;
