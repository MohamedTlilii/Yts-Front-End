import React from 'react'
import { Outlet } from "react-router-dom";
import NavSearch from '../Components/NavSerch/NavSerch';
// import Footer from '../Components/Footer/Footer';
import { Box, useColorModeValue } from '@chakra-ui/react'

function ConnexionLayout() {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');

  return (
    <Box  bg={bgColor} color={color}>
    <NavSearch/>
          <Outlet />
          {/* <Footer/> */}

</Box>

  )
}

export default ConnexionLayout