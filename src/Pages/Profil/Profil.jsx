import React, { useEffect, useState } from 'react';
import './Profil.scss';
import { Box, Button, useColorModeValue, Text, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdFavoriteBorder } from "react-icons/md";
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from "axios";
import { url } from "../../utils/url";
import { useFetch } from "../../utils/useFetch";
import { toast, ToastContainer } from 'react-toastify';
import TestToast from '../../Components/Toast/Toast';

function Profil() {
  
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [showPassword, setShowPassword] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateUserPic, setUpdateUserPic] = useState();
  const [loadingP, setLoadingP] = useState(false);
  const [initialUserData, setInitialUserData] = useState({});

  let token = localStorage.getItem("token");
// console.log(token);
  // const handleClick = () => setShowPassword(!showPassword);
  const { data } = useFetch(
    "http://localhost:5000/api/user/GetInformation",
    token
  );
  // console.log(data);
  // Check if data is defined before attempting to access properties
  const profileImageUrl = data?.imageUrl || '';
  const profileUserName = data?.userName || 'User';
  const profileEmail = data?.email || 'user@example.com';



  const handleUpdateUser = () => {
  // Check if at least one field (Username or Email) is provided
  if (!newUserData.userName && !newUserData.email) {
    toast.error("At least one field (Username or Email) must be provided");
    // console.log("Error: At least one field (Username or Email) must be provided");
    return;
  }

  // // Check if either email or username or both are provided
  // if (newUserData.userName || newUserData.email) {
  //   toast.success("Nice, fields are updated.");
  //   console.log("Success: Fields are updated.");
  // }
  
    // Merge initial data with new data
    const updatedData = {
      userName: newUserData.userName || initialUserData.userName,
      email: newUserData.email || initialUserData.email,
    };
  
    setLoading(true);
    axios
      .put(`${url}/updateInformation`, updatedData, {
        headers: { token },
      })
      .then((res) => {
        setLoading(false);
        toast.success("User information was updated successfully");
        setTimeout(() => {
          onClose();
        }, 2000);
        // onClose(); // Close the modal on success
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to update user information. Please try again.");

        console.dir(err);
      });
  };
  useEffect(() => {
    if (data) {
      setInitialUserData({
        userName: data.userName,
        email: data.email,
      });
    }
  }, [data]);


  const handleUpdatePhoto = () => {
    // console.log("handleUpdatePhoto called"); // Debug statement to check if function is called
  
    if (!updateUserPic) {
      // console.log("No file selected"); // Debug statement to check if file is missing
      toast.error("Please select a photo to upload");
      return;
    }
  
    setLoadingP(true);
    let userData = new FormData();
    userData.append("photo", updateUserPic);
  
    axios
      .put(`${url}/updatePhoto`, userData, { headers: { token } })
      .then((res) => {
        setLoadingP(false);
        toast.success("Profile Picture was updated successfully");
        // console.log("Profile picture updated successfully"); // Debug statement for success
        setTimeout(() => {
          onClose();
        }, 2000); // Adjust the timeout duration as needed (3000ms = 3 seconds)
      })
      .catch((err) => {
        setLoadingP(false);
        console.error("Error updating profile picture:", err); // Log the error details
        toast.error("Failed to update profile picture. Please try again.");
      });
  };
  
  
  return (
    <>
      <Box className="profil-container" bgColor={bgColor} color={color}>
        {/* Profile Information Section */}
          <Box className="profile-section">
          <Image src={profileImageUrl} alt="Profile Avatar" className="profile-avatar" />
          <Text className="profile-name">{profileUserName}</Text>
          <Text className="profile-email">{profileEmail}</Text>
          <Button className="edit-button" colorScheme="teal" onClick={onOpen}>
            Edit Information
          </Button>
        </Box>

        {/* Favorite Movies Section */}
        <Box className="favorites-section">
          <Text className="section-title">
            <MdFavoriteBorder className='favvvv' />
            <h2>Favorite Movies</h2>
          </Text>
          <Box className="movies-container">
            <Box className="movie-item">
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo76UL6PV_whPCmAW9N8Y5Mm62IsnlEYPXc7-GF06_OF6PAIcUodZls2oFPFF6VGLy-ho&usqp=CAU" alt="Movie Poster" className="movie-poster" />
              <Text className="movie-title">Movie Title 1</Text>
            </Box>
            {/* Add more movie items as needed */}
          </Box>
        </Box>
      </Box>

      {/* Modal for Editing Profile */}
      <Modal  isOpen={isOpen} onClose={onClose} bgColor={bgColor} color={color}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box className="modal-content">
         <h2>Update Information</h2>
         <FormControl className='chakra-form-control-username'>
  <FormLabel className='chakra-form-label-username' htmlFor="userName">Username</FormLabel>
  <Input
    className='chakra-input-username'
    id="userName"
    placeholder="UserName"
    value={newUserData.userName || ''}
    onChange={(e) => setNewUserData({ ...newUserData, userName: e.target.value })}
  />
</FormControl>

<FormControl className='chakra-form-control-email'>
  <FormLabel className='chakra-form-label-email' htmlFor="email">Email</FormLabel>
  <Input
    className='chakra-input-email'
    id="email"
    type="email"
    placeholder="User@example.com"
    value={newUserData.email || ''}
    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
  />
</FormControl>
<Box className='btn-info'>
               <Button  isLoading={loading} // Correct property to show the loading state
  onClick={handleUpdateUser} 
                  >Edit Info</Button>
                        <ToastContainer />

             {/* <Button onClick={onClose}>Cancel</Button> */}
             </Box> 




              {/* <FormControl className='chakra-form-control-password'>
      <FormLabel className='chakra-form-label-password' htmlFor="password">Password</FormLabel>
      <InputGroup>
        <Input
          className='chakra-input-password'
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
        />
        <InputRightElement>
          <IconButton
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            onClick={handleClick}
            variant="link"
            className='chakra-password-toggle'
          />
        </InputRightElement>
      </InputGroup>
    </FormControl> */}
             




              <FormControl className='chakra-form-control-imageUrl' >
                <FormLabel className='chakra-form-label-imageUrl' htmlFor="imageUrl">Profile Image URL</FormLabel>
                <Input className='chakra-input-imageUrl' id="imageUrl"  type="file" 
          accept="image/*" onChange={(e) => {
            // console.log("File selected:", e.target.files[0]); // Debug statement to check file input
            setUpdateUserPic(e.target.files[0]);
          }}/>
            <Button className='btn-imgurl' onClick={() => {
                          handleUpdatePhoto();
                        }}>
                        Update photo
                      </Button>
              </FormControl>
              {/* <Box className='btn-img'>
               <Button  isLoading={loading} // Correct property to show the loading state
  onClick={handleUpdateUser} 
                  >Save</Button>
             <Button onClick={onClose}>Cancel</Button>
             </Box> */}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <ToastContainer /> */}
      {/* <TestToast /> */}

    </>
  );
}

export default Profil;