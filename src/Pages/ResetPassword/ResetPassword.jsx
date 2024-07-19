    import { Checkbox } from 'semantic-ui-react';
    import './ResetPassword.scss';
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

    import { useState } from 'react';

    function ResetPassword() {
        const bgColor = useColorModeValue('white', 'black');
        const color = useColorModeValue('black', 'white');
        const inputBgColor = useColorModeValue('gray.200', 'gray.600');
        const [showPass, setShowPass] = useState(false);
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        
        const [bannedErr, setBannedErr] = useState("");
        


    return (
        <>
        <Box className="reset-password-container" bg={bgColor} color={color} p={8} rounded="md" shadow="md">
        <Box className="reset-password-card" bg={bgColor} color={color} p={6} rounded="md" shadow="md">
            <Heading className='tittle-rest' style={{ textAlign: "center", padding: "10px", fontWeight: "700", fontSize: "1.2em", color: "#6ac045" }}>Reset Password</Heading>
            <form id="resetForm">
            <FormControl className="input-group" mb={4}>
                <Input
                type={showPass ? "text" : "password"}
                id="newPassword"
                placeholder="New Password"
                required
                bg={inputBgColor}
                color={color}
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
                />
            </FormControl>
            <FormLabel className="chek-and-forget-btn">
                <Checkbox className="check-box" isChecked={showPass} onChange={() => setShowPass(!showPass)}>
                </Checkbox>
                
                </FormLabel>
            <Button type="submit" className="reset-button" colorScheme="teal" size="md" width="full">
                Reset Password
            </Button>
            </form>
        </Box>
        </Box>
        <>
                    {error && (
                        <Message style={{color:"red"}} status="error">
                            <MessageHeader>OOOPPPS! 🤕</MessageHeader>
                            <p>{error}</p>
                        </Message>
                    )}
                    {bannedErr && (
                        <Message style={{color:"red"}} status="error">
                            <MessageHeader>{bannedErr} 🤕</MessageHeader>
                            <p>{error}</p>
                        </Message>
                    )}
                    {message && (
                        <Message style={{color:"#6ABA46"}} status="success">
                            <MessageHeader>{message} 🥳</MessageHeader>
                            <p>You will be redirected to the Home page</p>
                        </Message>
                    )}
                </>
            </>
        );
    }

    export default ResetPassword;