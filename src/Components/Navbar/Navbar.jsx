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
  Button,
  Checkbox
} from '@chakra-ui/react';
import { useContext, useEffect, useState,useRef  } from 'react';
import { StoreContext } from '../../StoreContext';
import React from 'react';
import axios from "axios";
import MovieItem from "../MovieItem/MovieItem";

const NAV_ITEMS = [
  { id: 'nav_items', href: '/', label: 'Home' },
  { id: 'four-K', href: '/forK', label: '4K' },
  { id: 'nav_items', href: '/trending', label: 'Trending', icon: IoIosStats, iconOnly: true },
  { id: 'nav_items', href: '/movies', label: 'Movies', icon: CiViewList, iconOnly: true },
  // { id: 'nav_items', href: '', label: 'Login',icon: CiLogin, iconOnly: true },
  // { id: 'nav_items', href: '', label: 'Register',  },
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
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [registerData, setRegisterData] = useState({});
console.log(registerData);
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
    setIsLoggedIn(true);
    setShowLoginForm(false);
   
    
  }; 

  const handleRegister = () => {
    axios.post("http://localhost:5000/api/user/register", registerData)
      .then((res) => {
        if (res.data.status) {
          // Hide login form if visible
          setShowLoginForm(true);
          // Hide register form
          setShowRegisterForm(false);
          console.log(res.data.message);
        } else {
          console.error("Registration failed:", res.data.message);
        }
      }).catch((err) => {
        console.dir(err);
        if (err.response) {
          if (err.response.status === 409) {
            console.error("Conflict: ", err.response.data.message);
          } else if (err.response.status === 400) {
            console.error("Bad Request: ", err.response.data.message);
          } else {
            console.error("An error occurred: ", err.response.data.message);
          }
        } else {
          console.error("An error occurred: ", err.message);
        }
      });
  };  
const handlePasswordReset = () => {
  // Implement your password reset logic here
  setShowPasswordResetForm(true);
  setShowLoginForm(false); // Hide the login form
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





{/* search movies */}
{movies.length > 0 && (
          <Box ref={moviesBoxRef} className="Movies-items" bg={bgColor} color={color} mt={2} p={2} borderRadius="md" boxShadow="md" maxH="400px" overflowY="auto">
            {movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Box>
        )}




{/* responsve icon navbar  */}
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
  <React.Fragment >
    {/* <Link id='logout' href="#" onClick={handleLoginLogout}
    //  className="logout-link"
    >
      Logout
    </Link> */}
    <Icon as={CiLogout} className='iconn' ml={2} onClick={handleLoginLogout} />
  </React.Fragment>
) : (
  <React.Fragment >
    <Link className='login_register_' href="#" onClick={() => setShowLoginForm(true)}>
      Login 
    </Link>
    |
    {/* nbadlo links btag nrl */}
    <Link className='login_register_' href="#" onClick={() => setShowRegisterForm(true)}>
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
          <form
        //     onChange={(e) => {
        //   setLoginData({ ...loginData, [e.target.name]: e.target.value })
        //   console.log(loginData);;
        // }}
        >
          <FormLabel style={{ textAlign: "center",padding:"10px",fontWeight:"700",fontSize:"1.2em",color:"#6ac045" }}>Login</FormLabel>

            <FormControl id="email">

              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Username or Email"
              />
            </FormControl>
            <FormControl id="password" mt={4}>
  <FormLabel>Password</FormLabel>
  <Input type={showPass ? "text" : "password"} placeholder="Password" />

</FormControl>

            <FormLabel className="chek-and-forget-btn">
     
            <Checkbox
    className="check-box"
    isChecked={showPass}
    onChange={() => setShowPass(!showPass)} // Toggle the showPass state
  >
  </Checkbox>
              <button className="h1" onClick={handlePasswordReset} >Forgot your password ?             </button>
            </FormLabel>
            <Stack spacing={4} mt={4}>
              <Button className="btn-l-" colorScheme="teal"
               onClick={handleLogin}
               >
                Login
              </Button>
              <Button className="btn-ca-" variant="outline" onClick={() => setShowLoginForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )}
      {showRegisterForm && (
        <Box className="register-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form onChange={(e)=>{setRegisterData({...registerData,[e.target.name]: e.target.value})}}>
            <FormLabel style={{ textAlign: "center",padding:"10px",fontWeight:"700",fontSize:"1.2em",color:"#6ac045" }}>Register</FormLabel>

            <FormControl  style={{height:"90px"}} >
              <FormLabel id="register-username">Username</FormLabel>
              <Input id="register-username-form" type="username" placeholder="Username"  name="username"
 />
            </FormControl>
            
            <FormControl id="register-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="E-Mail (no confirmation needed)"            name="email"
              />
            </FormControl>
            <FormControl id="register-password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type={showPass ? "text" : "password"} placeholder="Password" name="password" />
              </FormControl>
            <FormControl id="confirm-password" mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type={showPass ? "text" : "password"} placeholder="Confirm Password" name="Confirm Password" />

            </FormControl>
            
            <FormLabel className="chek-and-forget-btn">
            <Checkbox
    className="check-box"
    isChecked={showPass}
    onChange={() => setShowPass(!showPass)} // Toggle the showPass state
  >
  </Checkbox>
              <h1>
            By clicking Register, you agree to our 
            By clicking Register, you agree to our 
    <a href="https://yts.mx/terms" style={{color: 'blue', textDecoration: 'underline'}}>Terms and Conditions</a>
            
            </h1></FormLabel>
            <Stack spacing={4} mt={4}>
              <Button className="btn-r-" colorScheme="teal" onClick={
                handleRegister
              }>
                Register
              </Button>
              <Button className="btn-c-" variant="outline" onClick={() => setShowRegisterForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )}




{showPasswordResetForm && (
        <Box className="password-reset-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form>
            <FormLabel style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>Reset Password</FormLabel>
            <h1 style={{ textAlign: "center", padding: "10px",  fontSize: ".7em", }}>If you have Forgotten your password, just type in your E-mail Address and YTS will send you a link to Reset Your Password.</h1>

            <FormControl id="reset-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="E-Mail" />
            </FormControl>
            <Stack spacing={4} mt={4}>
              <Button className="btn-r-" colorScheme="teal" >
                Reset Password
              </Button>
              <Button className="btn-c-" variant="outline" onClick={() => setShowPasswordResetForm(false)}>
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