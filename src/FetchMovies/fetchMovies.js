// // fetchData.js

// import axios from 'axios';

// const fetchMovies = async (searchQuery, filters, currentPage, moviesPerPage, setMovies, setTotalMovies, setError, setLoading) => {
//   setLoading(true);
//   try {
//     // const queryParams = new URLSearchParams({
//     //   query_term: searchQuery,
//     //   quality: filters.quality || '',
//     //   minimum_rating: filters.rating || '',
//     //   genre: filters.genre || '',
//     //   sort_by: filters.orderBy || '',
//     //   limit: moviesPerPage,
//     //   page: currentPage
//     // });
//     const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`);
//     if (response.data?.data?.movies) {
//       setMovies(response.data.data.movies);
//       setTotalMovies(response.data.data.movie_count); // Update total movies count
//       if (response.data.data.movies.length === 0) {
//         setError(`Your search - ${searchQuery} - did not match any movies.`);
//       } else  {
//         setError(null); // Clear any previous errors
//       }
//     } else  {
//       console.error('Unexpected API response structure:', response.data);
//       setError('Unexpected API response structure');
//     }
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     setError('Failed to fetch movies');
//   } finally {
//     setLoading(false);
//   }
// };

// export default fetchMovies;



// useEffect(() => {
//   fetchMovies(searchQuery, filters, currentPage, moviesPerPage, setMovies, setTotalMovies, setError, setLoading);
// }, [searchQuery, filters, currentPage, moviesPerPage]);
