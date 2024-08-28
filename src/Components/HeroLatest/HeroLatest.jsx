import './HeroLatest.scss'
import React, { useEffect, useState } from 'react'
import { Box, Spinner,useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';



function HeroLatest() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bg = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const [favorites, setFavorites] = useState({}); 

  const userId = localStorage.getItem('id'); 
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
             
             {/* Conditional rendering based on favorite status */}
 <Button onClick={() => handleFavoriteToggle(movie)}>
                  <FaHeart className="heart-icon" color={favorites[movie.id] ? 'red' : 'white'} />
                </Button>
             
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
