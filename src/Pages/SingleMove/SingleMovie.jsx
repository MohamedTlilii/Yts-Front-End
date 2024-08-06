import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SingleMovie.scss';
import { Link, useParams } from 'react-router-dom';
import { CiSaveDown2 } from "react-icons/ci";
import { FaHeart, FaPlay, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Box, Spinner,useColorModeValue } from '@chakra-ui/react';


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
        console.log('movie details:', response.data.data.movie);
        setMovie(response.data.data.movie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`);
        console.log('Movie Suggestions:', response.data.data.movies);
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
          <button className='download'><CiSaveDown2 id='ciSavasown' />Download</button>
          <button className='watch_now'>Watch Now</button>
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
        <div className="tags">
          {movie.genres.map((genre, index) => (
            <div key={index}  bg={bgColor} color={color} className="tag">{genre}</div>
          ))}
        </div>
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
                    During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.
                </p>

                {/* Uploaded Info */}
            <div className='uploaded-info'>
                <p className='uploaded-info--'>Uploaded by: FREEMAN</p>
                <p className='date-info--'>January 26, 2020 at 06:34 AM</p>
            </div>
            </div>
            <div className='director-cast'>
            <div className='director-section'>
                <h2 className='dirctor-title'>Director</h2>
                <div className='director-info'>
                  <img className='director-img' src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="" />
                <h3 className='directror-name'>Todd Phillips</h3>
                </div>
                </div>
              <div className='cast-section'>
              <h2 className='top-cast-title'>Top cast</h2>
              <div className='cast-info'>
                  <img className='img-cast'  src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="" />
                <h3 className='cast-name'>Robert De Niro </h3>  <h3 className='cast-name-inmovie'> as Murray Franklin</h3>
                </div>
              <div className='cast-info'>
                  <img className='img-cast'  src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="" />
                <h3 className='cast-name'>Joaquin Phoenix </h3>
                 <h3 className='cast-name-inmovie'>as Arthur Fleck</h3>
                </div>
              <div className='cast-info'>
                  <img className='img-cast'  src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="" />
                <h3 className='cast-name'>Zazie Beetz  </h3>  <h3 className='cast-name-inmovie'>as Sophie Dumond</h3>
                </div>
              <div className='cast-info'>
                  <img  className='img-cast'  src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="" />
                <h3 className='cast-name'>Shea Whigham </h3> <h3 className='cast-name-inmovie'>as Detective Burke</h3>
                </div>
              </div>
            </div>
      </div>

            

          
       </Box>
  );
}

export default SingleMovie;
