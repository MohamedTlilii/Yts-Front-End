import "./Navbar.scss";
import { IoIosStats } from "react-icons/io";
import { CiViewList, CiLogin, CiSearch,CiLogout } from "react-icons/ci";
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
  Input,
  FormControl,
  FormLabel,
  Stack,
  Button
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
  // { id: 'log-regis', href: '', label: 'Login',icon: CiLogin, iconOnly: true },
  // { id: 'log-regis', href: '', label: 'Register',  },
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


  const toggleSearch = () => {
    setStore({ ...store, showNavbar: !store.showNavbar });
  };

 


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setShowLoginForm(true);
    }
  };

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };
  const handleRegister = () => {
  // Hide login form if visible
  setShowLoginForm(true);
  // Implement your register logic here
  setShowRegisterForm(false);

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


  //
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
                {/*  */}
              {item.icon && item.iconOnly && (
                <Link href={item.href}>
                  <Icon as={item.icon} className='icon' ml={2} />
                </Link>
              )}
              {/*  */}
              {item.icon && !item.iconOnly && (
                <Icon as={item.icon} className='icon' ml={2} />
              )}
            </React.Fragment>
          ))}


{isLoggedIn ? (
  <React.Fragment>
    {/* <Link id='logout' href="#" onClick={handleLoginLogout}
    //  className="logout-link"
    >
      Logout
    </Link> */}
    <Icon as={CiLogout} className='icon' ml={2} onClick={handleLoginLogout} />
  </React.Fragment>
) : (
  <React.Fragment>
    <Link id='login' href="#" onClick={() => setShowLoginForm(true)}>
      Login
    </Link>
    {/* nbadlo links btag nrl */}
    <Link id='register' href="#" onClick={() => setShowRegisterForm(true)}>
      Register
    </Link>
    {/* <Icon as={CiLogin} className='icon' ml={2} /> */}
  </React.Fragment>
)}

          <Box as="nav" p={4}>
            <BtnTheme />
          </Box>
        </UnorderedList>
      </Box>
      {showLoginForm && (
        <Box className="login-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={4} mt={4}>
              <Button colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="outline" onClick={() => setShowLoginForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )}
      {showRegisterForm && (
        <Box className="register-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form>
            <FormControl id="register-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="register-password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="confirm-password" mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={4} mt={4}>
              <Button colorScheme="teal" onClick={handleRegister}>
                Register
              </Button>
              <Button variant="outline" onClick={() => setShowRegisterForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;