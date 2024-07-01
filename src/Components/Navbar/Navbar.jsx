import "./Navbar.scss";
import { IoIosStats } from "react-icons/io";
import { CiViewList, CiLogin, CiSearch } from "react-icons/ci";
import BtnTheme from '../Theme/BtnTheme';
import {
  Box,
  UnorderedList,
  // ListItem,
  Text,
  Icon,
  Image,
  useColorModeValue,
  Link,
  Input
} from '@chakra-ui/react';
import { useContext, useEffect, useState,useRef  } from 'react';
import { StoreContext } from '../../StoreContext';
import React from 'react';
import axios from 'axios';
import MovieItem from "../MovieItem/MovieItem";

const NAV_ITEMS = [
  { id: 'log-regis', href: '/', label: 'Home' },
  { id: 'four-K', href: '/forK', label: '4K' },
  { id: 'log-regis', href: '/trending', label: 'Trending', icon: IoIosStats, iconOnly: true },
  { id: 'log-regis', href: '/movies', label: 'Movies', icon: CiViewList, iconOnly: true },
  { id: 'log-regis', href: '/login', label: 'Login',icon: CiLogin, iconOnly: true },
  { id: 'log-regis', href: '/register', label: 'Register',  },
];

function Navbar() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const [store, setStore] = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const moviesBoxRef = useRef(null);


  const toggleSearch = () => {
    setStore({ ...store, showNavbar: !store.showNavbar });
  };

 


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

 
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchQuery}`);
          const filteredMovies = response.data.data.movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setMovies(filteredMovies);
          console.log(filteredMovies); // You can remove this line if you don't want to log the results
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setMovies([]);
      }
    };

    fetchData();
  }, [searchQuery]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moviesBoxRef.current && !moviesBoxRef.current.contains(event.target)) {
        setMovies([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box as="header" className='navbar ' bg={bgColor} color={color}>
      <Box className='navbar-logo'>
        <Link href="https://yts.mx/">
          <Image src="/assets/Navbar/logo-YTS.svg" alt="YTS" id='Image' />
        </Link>
        <Text className="navbar-slogan">HD movies at the smallest file size.</Text>
      </Box>
      <Box className='navbar-search'>
        <Icon as={CiSearch} className='fa-search' />
        <Input
          type="text"
          placeholder="Quick search"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ textTransform: 'capitalize' }}/>






{movies.length > 0 && (
          <Box ref={moviesBoxRef} className="Movies-items" bg={bgColor} color={color} mt={2} p={2} borderRadius="md" boxShadow="md" maxH="400px" overflowY="auto">
            {movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Box>
        )}





         <UnorderedList className='navbar-list'>
        <Icon as={CiSearch} className='fa-search-x' onClick={toggleSearch} />
          {NAV_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
                <Link id={item.id} bg={bgColor} color={color} href={item.href}>
                  {item.label}
                </Link>
              {item.icon && item.iconOnly && (
                <Link href={item.href}>
                  <Icon as={item.icon} className='icon' ml={2} />
                </Link>
              )}
              {item.icon && !item.iconOnly && (
                <Icon as={item.icon} className='icon' ml={2} />
              )}
            </React.Fragment>
          ))}
        <Box as="nav" p={4}>
          <BtnTheme />
        </Box>
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default Navbar;





// import "./Navbar.scss";
// import { IoIosStats } from "react-icons/io";
// import { CiViewList, CiLogin, CiSearch } from "react-icons/ci";
// import BtnTheme from '../Theme/BtnTheme';
// import {
//   Box,
//   UnorderedList,
//   ListItem,
//   Text,
//   Icon,
//   Image,
//   useColorModeValue,
//   Link
// } from '@chakra-ui/react';
// import { useContext } from 'react';
// import { StoreContext } from '../../StoreContext'

// function Navbar() {
//   const bgColor = useColorModeValue('white', 'black');
//   const color = useColorModeValue('black', 'white');
//   const [ store, setStore ] = useContext(StoreContext)
// const toggleSearch = () => {
//   setStore({...store , showNavbar: !store.showNavbar})
//   };
//   return (
//     <Box as="header" className='navbar ' bg={bgColor} color={color}>
//       <Box className='navbar-logo' >

//         <Link href="https://yts.mx/">
//           <Image src="/assets/Navbar/logo-YTS.svg" alt="YTS" id='Image' />
//         </Link>
//         <Text className="navbar-slogan"  >HD movies at the smallest file size.</Text>
//       </Box>
//       <Box className='navbar-search'>
//          <Icon as={CiSearch} className='fa-search'/>
//       <Icon as={CiSearch} className='fa-search-x' 
//       onClick={toggleSearch}/>    
//           <input type="text" placeholder="Quick search"  />
//         <UnorderedList className='navbar-list' >
//           <ListItem  >
//             <Link id='log-regis'  bg={bgColor} color={color}  href="/">Home</Link>
//           </ListItem>

//           <ListItem  >
//             <Link id='four-K' bg={bgColor} color={color} href="/forK">4K</Link>
//           </ListItem>

//           <ListItem >
//             <Link id='log-regis' bg={bgColor} color={color} href="/trending">Trending</Link>
//           </ListItem>
//           <Link  href="/trending" >
//           <Icon as={IoIosStats} className='icon' ml={2} />
//           </Link>
//           <ListItem >
//             <Link id='log-regis' bg={bgColor} color={color} href="/movies">Movies</Link>
//           </ListItem>
//           <Link  href="/movies" >
//           <Icon as={CiViewList} className='icon' ml={2} />
//           </Link>

//           <ListItem >
//             <Link id='log-regis' href="/login">Login</Link>
//           </ListItem>
//           <ListItem >
//             <Link id='log-regis' href="/register">Register</Link>
//           </ListItem>

//           <Icon as={CiLogin} className='icon' ml={2} />
//         </UnorderedList>
//         <Box as="nav" p={4} >
//           <BtnTheme />
//         </Box>
//       </Box>

//     </Box>
//   );
// }

// export default Navbar;