import './HeroLatest.scss'
import React, { useEffect, useState } from 'react'
import { Box, Spinner,useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';



function HeroLatest() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bg = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          limit: 8,
          page: Math.floor(Math.random() * 100) + 1, // Random page to get different movies on refresh
        });
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`);

        if (response.data?.data?.movies) {
          setMovies(response.data.data.movies);
          setError(null);
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
  }, []);
  const truncateTitle = (title, maxLength) => {
    return title.length <= maxLength ? title : title.slice(0, maxLength) + '...';
  };


  return (
    <Box className='hero-latest-container' bg={bg} color={color}   >
      <Box className='hero-latest-tittle' >
        <h2>Latest YIFY Movies Torrents</h2>
        <Link to={`/movies`}  style={{ color: color }}>
          <h3  >Browse All</h3>
        </Link>
      </Box>
      <Box className='hero-latest-movies'>
      {loading && <Spinner size='xl'  />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && movies.length > 0 && (
        movies.map((movie) => (
          <div className='hero-latest-movies-item' key={movie.id}>
            <img src={movie.large_cover_image} alt={movie.title} id='movie-latest-poster' />
            <div className='movie-details-latest-hover'>
              <FaStar className='faster'  />
              <h2>{movie.rating}/10</h2>
              <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>
              <Link to={`/singlemovie/${movie.id}`}  style={{ color: color }}>
                <button>View Details</button>
              </Link>
            </div>
            <div className='movie-details-latest'>
              <h2>[{movie.language}]</h2>
              <Link
  to={`/singlemovie/${movie.id}`}
  style={{ color: color }}
>
  <Box>
    <h3>{truncateTitle(movie.title, 15)}</h3>
  </Box>
</Link>
            </div>
            <h3 className='movie-year-latest'>{movie.year}</h3>
            
          </div>
        ))
      )}
      </Box>
    </Box>
  );
}

export default HeroLatest;
