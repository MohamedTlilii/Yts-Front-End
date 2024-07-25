import './HeroUpcoming.scss'
import React, { useEffect, useState } from 'react'
import { Box, Spinner,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';



function HeroUpcoming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?quality=3D`);
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
  if (loading) {
    return (
      <Box className='hero-latest-movies'>
        <Spinner  size='xl' className="loading-css" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className='hero-latest-movies'>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }
  return (
    <Box className='hero-upcoming-container'>
      <Box className='hero-upcoming-tittle'>
        <h2>Upcoming YIFY Movies</h2>
        {/* <Link to={`/movies`}>
          <h3>Browse All</h3>
        </Link> */}
      </Box>
      <Box className='hero-upcoming-movies'>
        {movies.slice(0, 4).map(movie => (
          <Box key={movie.id} className='movie'>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <h4>{movie.title}</h4>   
            <h3 className='movie-year'>{movie.year}</h3>
            <div className='movie-details-hover'>
              <FaStar className='fa-star' />
              <h2>{movie.rating}/10</h2>
              <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>
              <Link to={`/singlemovie/${movie.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HeroUpcoming;
