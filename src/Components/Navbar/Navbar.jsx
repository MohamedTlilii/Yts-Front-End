import "./Navbar.scss";
import { IoIosStats } from "react-icons/io";
import { CiViewList, CiSearch, CiLogout } from "react-icons/ci";
import BtnTheme from '../Theme/BtnTheme';
import {
  Box,
  UnorderedList,
  Text,
  Icon,
  Image,
  useColorModeValue,
  Link,
  Input,
} from '@chakra-ui/react';

import { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../../StoreContext';
import React from 'react';
import axios from "axios";
import MovieItem from "../MovieItem/MovieItem";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'nav_items', href: '/', label: 'Home' },
  { id: 'four-K', href: '/forK', label: '4K' },
  { id: 'nav_items', href: '/trending', label: 'Trending', icon: IoIosStats, iconOnly: true },
  { id: 'nav_items', href: '/movies', label: 'Movies', icon: CiViewList, iconOnly: true },
];

function Navbar() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const [store, setStore] = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  const moviesBoxRef = useRef(null);
  const searchInputRef = useRef(null); // Reference for the search input
  const navigate = useNavigate();

  const toggleSearch = () => {
    setStore({ ...store, showNavbar: !store.showNavbar });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (movieId) => {
    navigate(`/singlemovie/${movieId}`);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("isUser");
      localStorage.removeItem("isBanned");
      localStorage.removeItem("id");
      setIsLoggedIn(false);
    } else {
      setShowLoginForm(true);
      setShowRegisterForm(false); // Close register form when opening login form
    }
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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setMovies([]);
      }
    };
    fetchData();

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [searchQuery]);

  // Close movie suggestions when clicking outside of the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moviesBoxRef.current && !moviesBoxRef.current.contains(event.target) && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setMovies([]); // Close suggestions
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show suggestions again when the input is focused
  const handleFocus = () => {
    if (searchQuery) {
      setMovies(movies); // Show suggestions again
    }
  };

  return (
    <Box as="header" className='navbar ' bg={bgColor} color={color}>
      <Box className='navbar-logo'>
        <Link href="/">
          <Image src="/assets/Navbar/logo-YTS.svg" alt="YTS" id='Image' />
        </Link>
        <Text className="navbar-slogan">HD movies at the smallest file size.</Text>
      </Box>
      <Box className='navbar-search'>
        <Icon as={CiSearch} className='fa-search' />
        <Input
          ref={searchInputRef} // Assign the ref to the input
          type="text"
          placeholder="Quick search"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus} // Show suggestions when focused
          style={{ textTransform: 'capitalize' }}
          // color={color}
        />
        {movies.length > 0 && (
          <Box ref={moviesBoxRef} className="Movies-items" bg={bgColor} color={color} mt={2} p={2} borderRadius="md" boxShadow="md" maxH="400px" overflowY="auto">
            {movies.map(movie => (
              <div key={movie.id} onClick={() => handleNavigation(movie.id)} style={{ cursor: 'pointer' }}>
                <MovieItem movie={movie} />
              </div>
            ))}
          </Box>
        )}
        <UnorderedList className='navbar-list'>
          <Icon as={CiSearch} className='fa-search-x'
           onClick={toggleSearch}
            />
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
          {isLoggedIn ? (
            <Icon as={CiLogout} className='iconn' ml={2} onClick={handleLoginLogout} />
          ) : (
            <>
              <Link className='login_register_' href="#" onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>
                Login
              </Link>
              |
              <Link className='login_register_' href="#" onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); }}>
                Register
              </Link>
            </>
          )}
          <Box as="nav" p={4}>
            <BtnTheme />
          </Box>
        </UnorderedList>
      </Box>
      <Login showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} setIsLoggedIn={setIsLoggedIn} />
      <Register showRegisterForm={showRegisterForm} setShowRegisterForm={setShowRegisterForm} setShowLoginForm={setShowLoginForm} />
    </Box>
  );
}

export default Navbar;
