import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Spinner,  useColorModeValue,
} from '@chakra-ui/react';
import { FaStar,FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./HeroRow.scss";
import { IoDownload } from "react-icons/io5";
import { Button } from 'semantic-ui-react';
// import { urlFav } from "../../utils/url";

function HeroRow() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');


  const [movies, setMovies] = useState([]);
  // console.log(movies);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({}); 

  const userId = localStorage.getItem('id'); 


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          limit: 4,
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
      large_cover_image: movie.large_cover_image,
      rating: movie.rating, // Add this line
    genres: movie.genres, // Add this line
      
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
    <Box className='hero-row-m-container'  bg={bgColor} color={color} >
    <Box className='hero-Row-movies'>
      {loading && <Spinner size='xl'  />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && movies.length > 0 && (
        movies.map((movie) => (
          <div className='hero-row-movies-item' key={movie.id}>
            <img src={movie.large_cover_image} alt={movie.title} id='movie-poster' />
            <div className='movie-details-hover'>
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
            <div className='movie-details'>
              <h2>[{movie.language}]</h2>
              <Link to={`/singlemovie/${movie.id}`}  style={{ color: color }}>
                <Box><h3>{truncateTitle(movie.title, 15)}</h3></Box>
              </Link>
            </div>
            <h3 className='movie-year'>{movie.year}</h3>
            
          </div>
        ))
      )}
<div>
</div>   
 </Box>
 <Box className='warning-hero-row'>
  <h1>Warning!‌‌‌ <span>Download only with VPΝ... </span></h1>
  <p className='dw'>Downloading torrents is risky for you: your IP and leaked private data being actively tracked by your ISP and Government Agencies Protect yourself from expensive lawsuits and fines NOW! You must use a VPΝ like Private. It is the only way to download torrents fully anonymous by encrypting all traffic with zero logs.

  </p>
  <p className='paragh-red-white' >
   Personal data disclosing your real identity: your IP address
    <span > 102.158.110.123  </span>
is exposed, which points directly to your location in 
<span >Tunis, TUNISIA   </span> 
. You are browsing with 
<span >Chrome 126.0.0.0 (Windows 10)</span>
, resolution 
<span >1920x1080px</span>, 
<span >  6-cores CPU 
</span>.
  </p>
  <p class="paragh-blue">
<span >″Do not risk it! Protect yourself right now by downloading Private VPN″</span> - William
</p>
<button className="dw-vpn">
<IoDownload className='iodwnload' />

      Download Private VPN
    </button>


    <p className='not-vpn-using'>If you are not using a VPΝ already: Accessing and Playing Torrents on a Smartphone is risky and dangerous. You may be in  <span>Tozeur, TUNISIA</span>  and using:  <span>Chrome 126.0.0.0 (Windows 10)</span> . Your IP is  <span>197.31.169.30</span> . We strongly recommend all users protecting their device with a VPΝ.</p>
<button className="dw-vpn-surf">
<IoDownload className='iodwnloadd' />

GET Surf   
 </button>
  </Box>
 

</Box>
  );
}

export default HeroRow;
