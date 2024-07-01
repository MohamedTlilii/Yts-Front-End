import React, { useEffect, useState } from 'react';
import "./Movies.scss";
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
        console.log('API Response:', response.data); // Log the entire response for debugging
        if (response.data && response.data.data && response.data.data.movie_parental_guides) {
          setMovies(response.data.data.movie_parental_guides); // Adjust this line based on actual API response
        } else {
          setError('Unexpected API response structure');
          console.error('Unexpected API response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies">
      <SearchMovies />
      <Box className='movies-list'>
        {loading && <Spinner />}
        {error && <p>{error}</p>}
        {!loading && !error && movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className='movie-item'>
              <h3>{movie.movie_title}</h3> {/* Adjust property based on actual data */}
              <p>{movie.parental_guide_text}</p> {/* Adjust property based on actual data */}
            </div>
          ))
        ) : (
          !loading && <p>No movies found</p>
        )}
      </Box>
    </div>
  );
}

export default Movies;
