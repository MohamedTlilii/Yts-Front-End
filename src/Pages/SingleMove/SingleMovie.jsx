import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SingleMovie.scss';
import { Link, useParams } from 'react-router-dom';
import { CiSaveDown2 } from "react-icons/ci";
import { FaHeart, FaPlay, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Box,useColorModeValue } from '@chakra-ui/react';


function SingleMovie() {
  const bgColor = useColorModeValue('white', 'black');

  const color = useColorModeValue('black', 'white');

  const [movie, setMovie] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [imageIndex, setImageIndex] = useState(0); // State for current image index

  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`);
        // console.log('movie details:', response.data.data.movie);
        setMovie(response.data.data.movie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`);
        // console.log('Movie Suggestions:', response.data.data.movies);
        setSuggestions(response.data.data.movies);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchMovie();
    fetchSuggestions();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const images = [
    movie.large_screenshot_image1,
    movie.large_screenshot_image2,
    movie.large_screenshot_image3
];

  const trailerUrl = `https://www.youtube.com/embed/${movie.yt_trailer_code}`;
  const handleVideoClick = () => {
    setIsVideoVisible(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVideoVisible(false);
    }
  };

  const handleCloseClick = () => {
    setIsVideoVisible(false);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };
  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(imageIndex + 1) % images.length]);
};

const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedImage(images[(imageIndex - 1 + images.length) % images.length]);
};







  return (
    <Box className='SingleMovie'  >
      <div className='MoviePoster'>
        <div className='cover'>
          <img className='IMG' src={movie.large_cover_image} alt={movie.title} />
          <button className='download'
           ><CiSaveDown2 id='ciSavasown'  />Download</button>
          <button className='watch_now' 
          >Watch Now</button>
        </div>
        <div className="MovieDetails">
          <h2>{movie.title}</h2>
          <p className='year'>{movie.year}</p>
          <p className='genresss'>{movie.genres.join(" / ")}</p>
          <p className='available'><strong>Available in:</strong>
            {movie.torrents && movie.torrents.map((torrent, index) => (
              <button bg={bgColor} color={color} key={index} className={`BTN-${index + 1}`}>{torrent.quality}.{torrent.type.toUpperCase()}</button>
            ))}
          </p>
          <button className='download-sub'><CiSaveDown2 className='BtnC_cisav' /> Download Subtitles</button>
          <div className="like_count">
            <FaHeart className='heart-icon' color='#6ac045' />
            <p className='like_count_count'>{movie.like_count}</p>
          </div>
          <div className="review">
            <img src='https://yts.mx/assets/images/website/rt-certified-fresh.svg' alt="" />
            <p className='reviw_'>FIX % TOMATOMETER.</p>
          </div>
          <div className="audience">
            <img src='https://yts.mx/assets/images/website/rt-upright.svg' alt="" />
            <p className='audience_'>FIX % AUDIENCE.</p>
          </div>
          <div className="imdh">
            <img src='https://yts.mx/assets/images/website/logo-imdb.svg' alt="" />
            <p>{movie.rating}/10</p>
            {/* <FaStar  style={{color:'#6ac045'}}/> 167.7K */}
          </div>
        </div>
        <div className="similar_movie">
          <p>Similar Movies</p>
          <div className='same_four_movies'>
            {suggestions.map(suggestion => (
              <Link style={{ color: color }} key={suggestion.id} to={`/singlemovie/${suggestion.id}`}>
                <img
                  src={suggestion.medium_cover_image}
                  alt={suggestion.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='moviegenres'>
        {/* <div className="tags">
          {movie.genres.map((genre, index) => (
            <div key={index}  bg={bgColor} color={color} className="tag">{genre}</div>
          ))}
        </div> */}
        <div className="vpn-warning">
          <p>
            Please enable your VPN when downloading torrents<br />
            <span>If you torrent without a VPN, your ISP can see that you're torrenting and may throttle your connection and get fined by legal action!</span>
          </p>
          <button className="vpn-button">Get Hide VPN</button>
        </div>
      </div>
      <div className='movie-trailer'>
        <div className="images-container">
          <div className="image-container">
            <img src={movie.large_screenshot_image1} alt="Screenshot 1" onClick={() => handleImageClick(movie.large_screenshot_image1,0)}  />
            <button className="play-button" onClick={handleVideoClick}>
              <FaPlay />
            </button>
          </div>
          <img src={movie.large_screenshot_image2} alt="Screenshot 2" onClick={() => handleImageClick(movie.large_screenshot_image2,1)} />
          <img src={movie.large_screenshot_image3} alt="Screenshot 3" onClick={() => handleImageClick(movie.large_screenshot_image3,2)} />
        </div>

        {isVideoVisible && (
          <div className="video-overlay" onClick={handleOverlayClick}>
            <div className="video-container">
              <button className="close-button" onClick={handleCloseClick}>
                <FaTimes  /> 
              </button>
              <iframe
                className="video-player"
                src={trailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}


        {/* Modal for displaying selected image */}
        {selectedImage && (
                    <div className="image-overlay">
                        <div className="image-container">
                            <button className="close-button-img" onClick={handleCloseImage}>
                                <FaTimes />
                            </button>
                            <button className="prev-button" onClick={handlePrevImage}>
                                <FaArrowLeft  />
                            </button>
                            <img
                                className="image-player"
                                src={selectedImage}
                                alt="Selected"
                            />
                            <button className="next-button" onClick={handleNextImage}>
                                <FaArrowRight color='white' />
                            </button>
                        </div>
                    </div>
                )}
      </div>
      <div className='plot-section'>
  <div className='plot-container'>
    <h2 className='plot-title'>Plot Summary</h2>
    <p className='plot-descritption'>
      {movie.description_full}
    </p>

    {/* Uploaded Info */}
    {/* {movie.uploader && ( */}
  <div className='uploaded-info'>
    <p className='uploaded-info--'>Uploaded by: {movie.uploader}</p>
    <p className='date-info--'>{new Date(movie.date_uploaded).toLocaleString()}</p>
  </div>
{/* )} */}
  </div>
  
  <div className='director-cast'>
  {/* {movie.director && ( */}
  <div className='director-section'>
    <h2 className='dirctor-title'>Director</h2>
    <div className='director-info'>
      <img className='director-img' src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="Director" />
      <h3 className='directror-name'>{movie.director}xxx</h3>
    </div>
  </div>
{/* )} */}

    <div className='cast-section'>
      <h2 className='top-cast-title'>Top cast</h2>
      {movie.cast && movie.cast.map((member, index) => (
        <div className='cast-info' key={index}>
          <img className='img-cast' src={member.url_small_image} alt="" />
          <h3 className='cast-name'>{member.name}</h3>
          <h3 className='cast-name-inmovie'>as {member.character_name}</h3>
        </div>
      ))}
    </div>
  </div>
</div>


            

          
       </Box>
  );
}

export default SingleMovie;
