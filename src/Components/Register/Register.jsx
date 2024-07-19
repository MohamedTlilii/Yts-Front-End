import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Input, Checkbox, Button, Stack } from '@chakra-ui/react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Message, MessageHeader } from 'semantic-ui-react';

function Register({ showRegisterForm, setShowRegisterForm, setShowLoginForm }) {
    const bgColor = useColorModeValue('white', 'black');
    const color = useColorModeValue('black', 'white');

    const [registerData, setRegisterData] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMsg = () => {
        setTimeout(() => {
            setMessage('');
            setShowRegisterForm(false); // Hide register form
            setShowLoginForm(true); // Show login form
        }, 2000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRegister = () => {
        setLoading(true);

        axios.post("http://localhost:5000/api/user/register", registerData)
            .then((res) => {
                setLoading(false);
                setMessage('User was Created Successfully');
                handleMsg();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else if (err.response.data.error.userName) {
                    setError(err.response.data.error.userName.message);
                } else if (err.response.data.error.email) {
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

    return (
        <Box className="register-form" bg={bgColor} color={color} p={4} borderRadius="md" boxShadow="md" style={{ display: showRegisterForm ? 'block' : 'none' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <FormLabel style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>Register</FormLabel>

                <FormControl style={{ height: "90px" }}>
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
                        required
                    />
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
                        <a href="https://yts.mx/terms" style={{ color: 'blue', textDecoration: 'underline' }}>Terms and Conditions</a>
                    </h1>
                </FormLabel>

                <>
                    {error && (
                        <Message style={{color:"red"}} status="error">
                            <MessageHeader>OOOPPPS! 🤕</MessageHeader>
                            <p>{error}</p>
                        </Message>
                    )}
                    {message && (
                        <Message style={{color:"#6ABA46"}} status="success">
                            <MessageHeader>{message} 🥳</MessageHeader>
                            <p>You will be redirected to the Login page</p>
                        </Message>
                    )}
                </>

                <Stack spacing={4} mt={4}>
                    <Button className="btn-r-" colorScheme="teal" onClick={handleRegister} isLoading={loading}>
                        Register
                    </Button>
                    <Button className="btn-c-" variant="outline" onClick={() => setShowRegisterForm(false)}>
                        Cancel
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default Register;
