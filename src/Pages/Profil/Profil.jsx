import React, { useEffect, useState } from 'react';
import './Profil.scss';
import { Box, Button, useColorModeValue, Text, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, IconButton } from '@chakra-ui/react';
import { MdDelete, MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { url } from "../../utils/url";
import { useFetch } from "../../utils/useFetch";
import { toast, ToastContainer } from 'react-toastify';
// import TestToast from '../../Components/Toast/Toast';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Profil() {
  
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserData, setNewUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateUserPic, setUpdateUserPic] = useState();
  const [loadingP, setLoadingP] = useState(false);
  const [initialUserData, setInitialUserData] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]); // State to store favorite movies
// console.log(favoriteMovies);
  let token = localStorage.getItem("token");
  const userId = localStorage.getItem('id'); 

  const { data } = useFetch(
    "https://yts-back-end.onrender.com/api/user/GetInformation",
    token
  );

  const profileImageUrl = data?.imageUrl || '';
  const profileUserName = data?.userName || 'User';
  const profileEmail = data?.email || 'user@example.com';

  const fetchFavoriteMovies = () => {
    axios
      .get(`https://yts-back-end.onrender.com/api/favorite/getFavorites/${userId}`, {
      })
      .then((response) => {
        setFavoriteMovies(response.data.favorites);
      })
      .catch((error) => {
        console.error("Failed to fetch favorite movies", error);
      });
  };

  const handleUpdateUser = () => {
    if (!newUserData.userName && !newUserData.email) {
      toast.error("At least one field (Username or Email) must be provided");
      return;
    }

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
    if (!updateUserPic) {
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
        setTimeout(() => {
          onClose();
        }, 2000);
      })
      .catch((err) => {
        setLoadingP(false);
        console.error("Error updating profile picture:", err);
        toast.error("Failed to update profile picture. Please try again.");
      });
  };

  useEffect(() => {
    fetchFavoriteMovies(); // Fetch favorite movies on component mount
  }, [userId]);

  const handleUnfavoriteMovie = async (movieId) => {
    try {
      const response = await axios.delete(`https://yts-back-end.onrender.com/api/favorite/removeFavorite/${userId}/${movieId}`);
      
      if (response.status) {
        
        toast.success("Movie removed from favorites");
        fetchFavoriteMovies(); // Refresh the list of favorite movies
        setTimeout(() => {
          onClose();
        }, 3000);
      } 
    } catch (error) {
      console.error("Failed to remove movie from favorites", error);
     
    }
  };
  const truncateTitle = (title, maxLength) => {
    return title.length <= maxLength ? title : title.slice(0, maxLength) + '...';
  };
  return (
    <>
      <Box className="profil-container" bgColor={bgColor} color={color}>
        <Box className="profile-section">
          <Image src={profileImageUrl} alt="Profile Avatar" className="profile-avatar" />
          <Text className="profile-name">{profileUserName}</Text>
          <Text className="profile-email">{profileEmail}</Text>
          <Button className="edit-button" colorScheme="teal" onClick={onOpen}>
            Edit Information
          </Button>
        </Box>
        <Box className="favorites-section">
          <Text className="section-title">
            <MdFavoriteBorder  className='favvvv' />
            <h2>Favorite Movies</h2>
          </Text>
          <Box className="movies-container">
          {favoriteMovies.map((movie) => (
             <Box className="movie-item" key={movie._id}>
             <div className='movie-image-container'>
               <Image src={movie.large_cover_image} alt={movie.title} className="movie-poster" />
               <div className='movie-details-hover'>
                 <FaStar className='faster' />
                 <h2>{movie.rating}/10</h2>
                 <h4>{movie.genres ? movie.genres.join(" ") : "No genres available"}</h4>
                 <IconButton className='iconbtntnt'
                   icon={<MdDelete />}
                   aria-label="Remove from favorites"
                   onClick={() => handleUnfavoriteMovie(movie.movieId)}/>
                 <Link to={`/singlemovie/${movie.movieId}`} style={{ color: color }}>
                   <button>View Details</button>
                 </Link>
               </div>
             </div>
             <div className='movie-details'>
             <Link to={`/singlemovie/${movie.movieId}`} style={{ color: color }}>
  <Box><h3>{truncateTitle(movie.title, 15)}</h3></Box>
</Link>

             </div>
           </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} bgColor={bgColor} color={color}>
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
                <Button isLoading={loading} onClick={handleUpdateUser}>Edit Info</Button>
                <ToastContainer />
              </Box>
              <FormControl className='chakra-form-control-imageUrl'>
                <FormLabel className='chakra-form-label-imageUrl' htmlFor="imageUrl">Profile Image URL</FormLabel>
                <Input className='chakra-input-imageUrl' id="imageUrl" type="file" 
                  accept="image/*" onChange={(e) => setUpdateUserPic(e.target.files[0])}
                />
                <Button className='btn-imgurl' onClick={handleUpdatePhoto}>Update photo</Button>
              </FormControl>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
       

    </>
  );
}

export default Profil;
