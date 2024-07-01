import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import "./MovieItem.scss"
function MovieItem({ movie }) {
  return (
    <Box id="box-cover-serach"  >
      <Image id="image-cover-serach" src={movie.medium_cover_image} alt={movie.title} boxSize="50px" objectFit="cover" mr={2} />
      <Text id="titlle-cover-serach" fontSize="md">{movie.title}</Text>
    </Box>
  );
}

export default MovieItem;
    