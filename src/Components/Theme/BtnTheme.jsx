import { Button, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function BtnTheme() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <header>
        <Button style={{ borderRadius: '50px' ,width:"50px",height:"23px"}}   onClick={toggleColorMode}>
           {colorMode === 'light' ? <MdDarkMode  /> : <MdOutlineLightMode />}
          
          


        </Button>
      </header>
    );
}

export default BtnTheme