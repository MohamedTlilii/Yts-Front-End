import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Checkbox,
  useColorModeValue,
 
  
} from '@chakra-ui/react';
import { MessageHeader, Message } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ showLoginForm, setShowLoginForm, setIsLoggedIn }) {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const [loginData, setLoginData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannedErr, setBannedErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  // const [showPasswordResetFormClick, setShowPasswordResetFormClick] = useState(true);
  const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation


  const handleMsg = () => {
    setTimeout(() => {
      setMessage('');
      setIsLoggedIn(true); // Set logged in state
      setShowLoginForm(false); // Hide login form
    }, 2000);
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);

    axios
      .post("http://localhost:5000/api/user/login", loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("isUser", res.data.data.isUser);
        localStorage.setItem("isBanned", res.data.data.isBanned);
        localStorage.setItem("id", res.data.data.id);
        setLoading(false);
        if (res.data.data.isUser && !res.data.data.isBanned) {
          handleMsg();
          setMessage("Logged in successfully");
        } else if (res.data.data.isUser && res.data.data.isBanned) {
          setBannedErr("You are banned for 30 days");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || "An error occurred");
        setTimeout(() => {
          setError("");
        }, 8000);
      });
  };

  const handlePasswordReset = () => {
    // Implement your password reset logic here
    setShowPasswordResetForm(true);
    setShowLoginForm(false); // Hide the login form
  };
  const handleResetPasswordClick = (event) => {
    event.preventDefault(); // Prevent default form submission
    setShowPasswordResetForm(false); // Hide the reset form
    navigate('/resetPassword');
  };

  // // email
  // const handlePasswordReset = () => {
  //   // Implement logic to send reset password email
  //   axios
  //     .put('http://localhost:5000/api/user/forgotPassword', { email: resetEmail })
  //     .then((res) => {
  //       // Handle success
  //       setShowPasswordResetForm(false); // Hide the reset form after successful submission
  //       setMessage(res.data.message);
  //     })
  //     .catch((err) => {
  //       // Handle error
  //       console.error(err);
  //       setError(err.response?.data?.error || 'An error occurred');
  //     });
  // };


  return (
    <>
      {showLoginForm && (
        <Box className="login-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md">
          <form onSubmit={handleLogin}>
            <FormLabel style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>Login</FormLabel>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type={showPass ? "text" : "password"} name="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </FormControl>
            <FormLabel className="chek-and-forget-btn">
              <Checkbox className="check-box" isChecked={showPass} onChange={() => setShowPass(!showPass)}>
              </Checkbox>
              <button className="h1" onClick={handlePasswordReset}>Forgot your password?</button>
            </FormLabel>
            <>
              {error && (
                <Message style={{color:"red"}} status="error">
                  <MessageHeader >OOOPPPS! 🤕</MessageHeader>
                  <p>{error}</p>
                </Message>
              )}
              {bannedErr && (
                <Message style={{color:"red"}} status="error">
                  <MessageHeader>{bannedErr} 🤕</MessageHeader>
                  <p>{error}</p>
                </Message>
              )}
              {message  && (
                <Message style={{color:"#6ABA46"}} status="success">
                  <MessageHeader>{message} 🥳</MessageHeader>
                  <p>You will be redirected to the Home page</p>
                </Message>
              )}
            </>
            <Stack spacing={4} mt={4}>
              <Button className="btn-l-" colorScheme="teal" type="submit" isLoading={loading}>
                Login
              </Button>
              <Button className="btn-ca-" variant="outline" onClick={() => setShowLoginForm(false)}>
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
            <h1 style={{ textAlign: "center", padding: "10px", fontSize: ".7em" }}>If you have forgotten your password, just type in your email address and YTS will send you a link to reset your password.</h1>
            <FormControl id="reset-email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="E-Mail" />
            </FormControl>
            <Stack spacing={4} mt={4}>
            {/* <Link to="resetPassword"> */}
      <Button className="btn-r-" colorScheme="teal" onClick={handleResetPasswordClick}>
        Reset Password
      </Button>
    {/* </Link>  */}

              <Button className="btn-c-" variant="outline" onClick={() => setShowPasswordResetForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
}

export default Login;
