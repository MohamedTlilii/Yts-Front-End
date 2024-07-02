import React, { useState } from 'react'
import './SearchMovies.scss'
import { Button, useColorModeValue, Card, Select, Text,Box, FormControl, Input } from '@chakra-ui/react'

function SearchMovies({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState({
    quality: '',
    rating: '',
    genre: '',
    language: '',
    year: '',
    orderBy: ''
  });

    const bg = useColorModeValue('white', 'black');
    const color = useColorModeValue('black', 'white');


    
    const handleSearchClick = () => {
      onSearch(searchTerm, filters);
    };
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      
      // Automatically trigger search when input is cleared
      if (value === '') {
        onSearch('', filters);
      }
    };
    
  
    const handleQualityChange = (event) => {
      setFilters({ ...filters, quality: event.target.value });
    };
  
    const handleRatingChange = (event) => {
      setFilters({ ...filters, rating: event.target.value });
    };
  
    const handleGenreChange = (event) => {
      setFilters({ ...filters, genre: event.target.value });
    };
  
    const handleLanguageChange = (event) => {
      setFilters({ ...filters, language: event.target.value });
    };
  
    const handleYearChange = (event) => {
      setFilters({ ...filters, year: event.target.value });
    };
  
    const handleOrderByChange = (event) => {
      setFilters({ ...filters, orderBy: event.target.value });
    };
  
  return (
    <div className='SearchMovies'>
         <Box 
         className='Box-Movies'
            >
        
        <Card className='Card-Movies'  bg={bg} color={color}   >
        
          <Text as='h1'>Search Term:</Text>
        <FormControl 
        className='FormControl-Movies'
         >
          <Input 
          className='Input-Movies'
           type='text'   onChange={handleInputChange}    />
          <Button 
          className='BTN-Movies'
           colorScheme='green'  onClick={handleSearchClick}>Search</Button>
        </FormControl>
        
           <Box 
           className='BoxBox-Movies'
           >
          <Box 
          className='SoloBox-Movies'
          >
          <Text 
          className='Textt-Movies'
           fontSize='sm'>Quality:</Text>
            <Select 
            className='SelectBox-Movies' 
             size='xs' placeholder='All'>
          <option value='option1' >480p</option>
          <option value='option2'>720p</option>
          <option value='option3'>1080p</option>
          <option value='option4'>1080p.x265</option>
          <option value='option5'>2016p</option>
          <option value='option6'>3D</option>
        </Select>
          </Box>
        
          <Box 
          className='SoloBox-Movies'
          >  
            <Text 
            className='Textt-Movies'
             fontSize='sm'>Rating:</Text>
            <Select   className='SelectBox-Movies' size='xs' placeholder='All'>
          <option value='option1' >9+</option>
          <option value='option2'>8+</option>
        </Select> 
         </Box>
        
        
        <Box 
        className='SoloBox-Movies'
        >  
        <Text 
        className='Textt-Movies'  
        fontSize='sm'>Genre:</Text>
            <Select  className='SelectBox-Movies' size='xs' placeholder='All'>
          <option value='option1' >Action</option>
          <option value='option2'>Adventure</option>
          
        </Select>
        </Box>
        
        <Box 
        className='SoloBox-Movies '
        > 
        <Text 
        className='Textt-Movies'
         fontSize='sm'>Language:</Text>
            <Select className='SelectBox-Movies'  size='xs' placeholder='--------All--------'>
          <option value='option1' >English</option>
          <option value='option2'>Foreign</option>
          <option value='option3'>French (2951)</option>
          <option value='option4'>    Japanese (2630)   </option>
        
        </Select>
        </Box>
        
        <Box 
        className='SoloBox-Movies '
        > 
        <Text 
        className='Textt-Movies' 
        fontSize='sm'>Year:</Text> 
         <Select className='SelectBox-Movies'  size='xs' placeholder='All'>
          <option value='option1' >Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        </Box>
        
        <Box 
        className='SoloBox-Movies '
        >
        <Text
         className='Textt-Movies'
          fontSize='sm'>Order By:</Text> 
        <Select className='SelectBox-Movies'   size='xs' placeholder='All'>
          <option value='option1' >Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        </Box>
        
           </Box>
        
         
        </Card>
        
        
        </Box>
    </div>
  )
}

export default SearchMovies