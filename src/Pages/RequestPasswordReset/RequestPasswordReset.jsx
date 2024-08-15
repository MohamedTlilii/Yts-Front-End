import { Checkbox } from 'semantic-ui-react';
import './RequestPasswordReset.scss';
import {
    Box,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    FormLabel,
} from '@chakra-ui/react';
import { MessageHeader, Message } from 'semantic-ui-react';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RequestPasswordReset() {
    const bgColor = useColorModeValue('white', 'black');
    const color = useColorModeValue('black', 'white');
    const inputBgColor = useColorModeValue('gray.200', 'gray.600');
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    // console.log(passwordData);

    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    // console.log("Reset Password Token:", token);

    const navigate = useNavigate();

    const handleResetPassword = (event) => {
        event.preventDefault();
        setLoading(true);

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            setTimeout(() => setError(""), 5000);
            return;
        }

        axios
            .post(`https://yts-back-end.onrender.com/api/user/resetPasswordPage/${token}`, {
                
                newPassword: passwordData.newPassword,
                confirmNewPassword: passwordData.confirmPassword
            })
            .then((res) => {

                setMessage("Password reset successfully");
                setLoading(false);
                setTimeout(() => {
                    setMessage("");
                    navigate('/');
                }, 5000);
            })
            .catch((err) => {
                setError(err.response?.data?.error || "An error occurred");
                setLoading(false);
                setTimeout(() => setError(""), 5000);
            });
    };

    return (
        <>
            <div className="reset-password-container" bg={bgColor} color={color} p={8} rounded="md" shadow="md">
                <Box className="reset-password-card" bg={bgColor} color={color} p={6} rounded="md" shadow="md">
                    <Heading className='title-reset' style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>
                        Reset Password
                    </Heading>
                    <form id="resetForm" onSubmit={handleResetPassword}>
                        <FormControl className="input-group" mb={4}>
                            <Input
                                type={showPass ? "text" : "password"}
                                id="newPassword"
                                placeholder="New Password"
                                required
                                bg={inputBgColor}
                                color={color}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            />
                        </FormControl>
                        <FormControl className="input-group" mb={4}>
                            <Input
                                type={showPass ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                required
                                bg={inputBgColor}
                                color={color}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            />
                        </FormControl>
                        <FormLabel className="check-and-forget-btn">
                            
                        <label className="show-password-label">
                                <Checkbox className="check-box" checked={showPass} onChange={() => setShowPass(!showPass)}  />
                                Show Password
                            </label>                       

                            <>
                {error && (
                    <Message style={{ color: "red" }} status="error">
                        <MessageHeader>OOOPPPS! 🤕</MessageHeader>
                        <p>{error}</p>
                    </Message>
                )}
                {message && (
                    <Message style={{ color: "#6ABA46" }} status="success">
                        <MessageHeader>{message} 🥳</MessageHeader>
                        <p>You will be redirected to the landing page</p>
                    </Message>
                )}
            </>
                        </FormLabel>
                        <Button type="submit" className="reset-button" colorScheme="teal" size="md" width="full" isLoading={loading}>
                            Reset Password 
                        </Button>
                    </form>
                </Box>
            </div>
           
        </>
    );
}

export default RequestPasswordReset;
