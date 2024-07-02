import React, { useEffect, useState } from 'react';
import "./Movies.scss";
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12); // Adjust as needed
  const [totalMovies, setTotalMovies] = useState(0); // State to hold total movies count

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          query_term: searchQuery,
          quality: filters.quality || '',
          minimum_rating: filters.rating || '',
          genre: filters.genre || '',
          sort_by: filters.orderBy || '',
          limit: moviesPerPage,
          page: currentPage
        });
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`);
        if (response.data?.data?.movies) {
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
          <span key="prev" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
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
    <div className="movies">
      <SearchMovies onSearch={handleSearch} />
      <div className="pagination">
      <h3>YIFY Movies - page {currentPage}</h3>
      {renderPagination()}

      </div>
      <Box className='movies-listt'>
        
        {loading && <Spinner />}
        {error && <p>{error}</p>}
        {!loading && !error && movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className='movie-item'>
              <img src={movie.large_cover_image} alt={movie.title} id='movie-poster' />
              <div className='movie-details'>
                <h3>[{movie.language}]</h3>
                <h3>{truncateTitle(movie.title, 15)}</h3>
              </div>
                <h3 className='movie-yers'>{movie.year}</h3>
            </div>
          ))
        ) : (
          !loading && <p></p>
        )}
      </Box>
      <div className="pagination">
      {renderPagination()}

      </div>
    </div>
  );
}

export default Movies;
