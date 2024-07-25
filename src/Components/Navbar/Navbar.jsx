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
  // Stack,
  // FormControl,
  // FormLabel,
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
  // const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

  const moviesBoxRef = useRef(null);
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
          style={{ textTransform: 'capitalize' }}
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
      {/* {showPasswordResetForm && (
        <Box className="password-reset-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form>
            <FormLabel style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>Reset Password</FormLabel>
            <h1 style={{ textAlign: "center", padding: "10px", fontSize: ".7em" }}>If you have forgotten your password, just type in your email address and YTS will send you a link to reset your password.</h1>
            <FormControl id="reset-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="E-Mail" />
            </FormControl>
            <Stack spacing={4} mt={4}>
              <Button className="btn-r-" colorScheme="teal">
                Reset Password
              </Button>
              <Button className="btn-c-" variant="outline" onClick={() => setShowPasswordResetForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )} */}
    </Box>
  );
}

export default Navbar;
