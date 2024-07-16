import "./Navbar.scss";
import { IoIosStats } from "react-icons/io";
import { CiViewList, CiSearch,CiLogout } from "react-icons/ci";
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
  Checkbox,
  
} from '@chakra-ui/react';
import { MessageHeader, Message } from "semantic-ui-react";

import { useContext, useEffect, useState,useRef  } from 'react';
import { StoreContext } from '../../StoreContext';
import React from 'react';
import axios from "axios";
import MovieItem from "../MovieItem/MovieItem";
import {  useNavigate } from "react-router-dom";

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
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannedErr, setBannedErr] = useState("");

  // console.log("registerData:", registerData);
  const navigate = useNavigate();

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
  // Login
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    console.log('Login Data:', loginData); // Log login data for debugging

    axios
      .post("http://localhost:5000/api/user/login", loginData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("isUser", res.data.data.isUser);
        localStorage.setItem("isBanned", res.data.data.isBanned);
        localStorage.setItem("id", res.data.data.id);
        setTimeout(() => {
          setLoading(false);
          if (res.data.data.isUser && !res.data.data.isBanned) {
            setMessage("Logged successfully");
            navigate("/");
          } else if (res.data.data.isUser && res.data.data.isBanned) {
            setBannedErr("You are banned for 30 days");
          }
        }, 2000);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        setError(err.response?.data?.error || "An error occurred");
        setTimeout(() => {
          setError("");
        }, 8000);
      });
  };
    // Login
// Register
  const handleRegister = () => {
    setLoading(true);

    axios.post("http://localhost:5000/api/user/register", registerData)
    
      .then((res) => {          
          console.log(res);
          setLoading(false);
          if(!error){
            setMessage('User was Created Successfuly')
          }
          // Hide the message after a delay
      setTimeout(() => {
        setMessage('');
      }, 3000);
          setTimeout(() => {
            // navigate("/login");
            setShowLoginForm(true);
          setShowRegisterForm(false);
          }, 3000);

        })
        .catch((err) => {
          setLoading(false);
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else if (err.response.data.error.userName) {
            setError(err.response.data.error.userName.message);
          } else if  (err.response.data.error.email) {
            setError(err.response.data.error.email.message);
          } else {
            setError('An unexpected error occurred.');
          }
          setTimeout(() => {
            setError('');
          }, 10000);
          console.error(err);
        });
    };
// Register
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
           onSubmit={handleLogin}>
          <FormLabel style={{ textAlign: "center",padding:"10px",fontWeight:"700",fontSize:"1.2em",color:"#6ac045" }}>Login</FormLabel>

            <FormControl id="email">

              <FormLabel>Email address</FormLabel>
              <Input  type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="password" mt={4}>
  <FormLabel>Password</FormLabel>
  <Input type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>

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



            <>
    {error && (
      <Message status="error">
        <MessageHeader>OOOPPPS! 🤕</MessageHeader>
        <p>{error}</p>
      </Message>
    )}
    {bannedErr && (
      <Message status="error">
        <MessageHeader>{bannedErr} 🤕</MessageHeader>
        <p>{error}</p>
      </Message>
    )}
    {message && (

      <Message status="success">
        <MessageHeader>{message} 🥳</MessageHeader>
        <p>You will be redirected to the Home page</p>
      </Message>
    )}
  </>
            <Stack spacing={4} mt={4}>
              <Button className="btn-l-"
          colorScheme="teal"
          type="submit"
          isLoading={loading} // Assuming you are using Chakra UI's Button

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
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <FormLabel style={{ textAlign: "center",padding:"10px",fontWeight:"700",fontSize:"1.2em",color:"#6ac045" }}>Register</FormLabel>

            <FormControl  style={{height:"90px"}} >
              <FormLabel id="register-username">Username</FormLabel>
              <Input id="register-username-form" type="text"
      name="userName"
      value={registerData.userName}
      onChange={handleInputChange}
      placeholder="Username"
      required
 />
            </FormControl>
            
            <FormControl id="register-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
      name="email"
      value={registerData.email}
      onChange={handleInputChange}
      placeholder="E-Mail (no confirmation needed)"
      required
              />
            </FormControl>
            <FormControl id="register-password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type={showPass ? "text" : "password"}  
      name="password"
      value={registerData.password}
      onChange={handleInputChange}
      placeholder="Password"
      required/>
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
            {/* <h2 style={{color:"red",fontSize:"20px"}}>{message}</h2> */}
            <>
    {error && (
      <Message status="error">
        <MessageHeader>OOOPPPS! 🤕</MessageHeader>
        <p>{error}</p>
      </Message>
    )}
    {message && (

      <Message status="success">
        <MessageHeader>{message} 🥳</MessageHeader>
        <p>You will be redirected to the Login page</p>
      </Message>
    )}
  </>



            <Stack spacing={4} mt={4}>
              <Button className="btn-r-" colorScheme="teal"   onClick={handleRegister}
          isLoading={loading}
        >
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