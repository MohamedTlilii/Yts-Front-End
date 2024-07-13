import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SingleMovie.scss';
import { useParams } from 'react-router-dom';
import { CiSaveDown2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';

function SingleMovie() {
  const [movie, setMovie] = useState();
  console.log(movie);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`);
        setMovie(response.data.data.movie); // Correctly access the movie data
        // console.log(id);
        // console.log(movie);

      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }


  return (
    <div className='SingleMovie'>
      
      <div className='MoviePoster'>

<div className='cover'>
           <img  src={movie.large_cover_image} alt={movie.title} />
<button className='download'><CiSaveDown2 />Download </button>
<button className='watch_now'>Watch Now </button>
</div>
<div className="MovieDetails">
<h2>{movie.title}</h2>
        <p className='year'> {movie.year}</p>
        <p className='genresss'> {movie.genres.join(" / ")}</p>
        <p className='available'><strong>Available in:</strong> <button className='BTN-1'>720p.WEB</button> <button className='BTN-2'>1080p.WEB</button></p>
        {/* <h1 className='web-quality'>WEB: same quality as BluRay</h1> */}
        <button className='download-sub'> <storage><CiSaveDown2 className='BtnC_cisav'/></storage> Download Subtitles  </button>
        <div className="like_count">
        <FaHeart className='heart-icon' color='#6ac045' />
<p className='like_count_count'> {movie.like_count
}</p> 
</div>
<div className="review">
<img   src='https://yts.mx/assets/images/website/rt-certified-fresh.svg' alt="" />
<p className='reviw_'> {movie.like_count
}</p> 
<p>TOMATOMETER .</p>
</div>
<div className="audience">
<img  src='https://yts.mx/assets/images/website/rt-upright.svg' alt="" />
<p className='audience_'> {movie.like_count
}</p> 
<p>AUDIENCE ·</p>
</div>
<div className="imdh">
<img  src='https://yts.mx/assets/images/website/logo-imdb.svg' alt="" />
<p>{movie.rating}/10</p>
<FaStar className='faster' color='#6ac045' />
<p className='audience_'>{movie.like_count}</p> 
</div>
</div>
<div className="similar_movie">
<p>Similar Movies</p>
<div className='same_four_movies'>
  <img src="" alt="azea" />
  <img src="" alt="azea" />
  <img src="" alt="azea" />
  <img src="" alt="azea" />
</div>
</div>
     
      </div>
    </div>
  );
}

export default SingleMovie;
