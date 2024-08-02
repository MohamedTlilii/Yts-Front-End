import { Button, useColorModeValue, Card, Select, Text,Box, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import "./SearchNav.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SearchNav() {
  const bg = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [quality, setQuality] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    const params = {
      query_term: searchQuery,
      quality: quality || undefined,
      minimum_rating: rating || undefined,
      genre: genre || undefined,
      language: language || undefined,
      year: year || undefined,
      order_by: orderBy || undefined,
    };

    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    console.log('Query String:', queryString);

    try {
      const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?${queryString}`);
      console.log('API Response:', response.data);
      const movies = response.data.data.movies;
      if (movies && movies.length > 0) {
        navigate(`/singlemovie/${movies[0].id}`);
      } else {
        alert('No movies found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <Box className='Box'   >
        
<Card className='Card'  bg={bg} color={color}   >

<FormControl className='FormControl'>
          <Input
            className='Input'
            type='text'
            placeholder='Search for a movie...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button className='BTN' colorScheme='green' onClick={handleSearch}>Search</Button>
        </FormControl>   <Box className='BoxBox'>
  <Box className='SoloBox'>
  <Text className='Textt' fontSize='sm'>Quality:</Text>
  <Select className='SelectBox' size='xs' placeholder='All' value={quality} onChange={(e) => setQuality(e.target.value)}>
  <option value='option1' >480p</option>
  <option value='option2'>720p</option>
  <option value='option3'>1080p</option>
  <option value='option4'>1080p.x265</option>
  <option value='option5'>2016p</option>
  <option value='option6'>3D</option>
</Select>
  </Box>

  <Box className='SoloBox'>  
    <Text className='Textt' fontSize='sm'>Rating:</Text>
    <Select className='SelectBox' size='xs' placeholder='All' value={rating} onChange={(e) => setRating(e.target.value)}>
    <option value='option1' >9+</option>
  <option value='option2'>8+</option>
  <option value='option3'>7+</option>
  <option value='option3'>6+</option>
  <option value='option3'>5+</option>
  <option value='option3'>4+</option>
  <option value='option3'>3+</option>
  <option value='option3'>2+</option>
  <option value='option3'>1+</option>
</Select> 
 </Box>


<Box className='SoloBox'>  
<Text className='Textt'  fontSize='sm'>Genre:</Text>
<Select className='SelectBox' size='xs' placeholder='All' value={genre} onChange={(e) => setGenre(e.target.value)}>
<option value='option1' >Action</option>
  <option value='option2'>Adventure</option>
  <option value='option3'>Animation</option>
  <option value='option4'>Biography</option>
  <option value='option5'>Comedy</option>
  <option value='option6'>Crime</option>
  <option value='option7'>Documentary</option>
  <option value='option8'>Drama</option>
  <option value='option9'>Family</option>
  <option value='option10'>Fantasy</option>
  <option value='option11'>Film-Noir</option>
  <option value='option12'>Game-Show</option>
  <option value='option13'>History</option>
  <option value='option14'>Horror</option>
  <option value='option15'>Music</option>
  <option value='option16'>Musical</option>
  <option value='option17'>Mystery</option>
  <option value='option18'>News</option>
  <option value='option19'>Reality-TV</option>
  <option value='option20'>Romance</option>
  <option value='option21'>Sci-Fi</option>
  <option value='option22'>Sport</option>
  <option value='option23'>Talk-Show</option>
  <option value='option24'>Thriller</option>
  <option value='option25'>War</option>
  <option value='option26'>Western</option>
  
</Select>
</Box>

<Box className='SoloBox '> 
<Text className='Textt' fontSize='sm'>Language:</Text>
<Select className='SelectBox' size='xs' placeholder='--------All--------' value={language} onChange={(e) => setLanguage(e.target.value)}>
<option value='option1' >English</option>
  <option value='option2'>Foreign</option>
  <option value='option3'>French (2951)</option>
  <option value='option4'>    Japanese (2630)   </option>
  <option value='option5'>   Spanish (1625)    </option>
  <option value='option6'>    Italian (1410)   </option>
  <option value='option7'>  German (1151)     </option>
  <option value='option8'>  Chinese (1009)     </option>
  <option value='option9'>     Korean (887)  </option>
  <option value='option10'>   Cantonese (773)    </option>
  <option value='option11'>    Hindi (718)   </option>
  <option value='option12'>   Swedish (409)    </option>
  <option value='option13'>  Portuguese (391)     </option>
  <option value='option14'>   Russian (389)    </option>
  <option value='option15'>    Romanian (353)   </option>
  <option value='option16'>  Polish (347)     </option>
  <option value='option17'>    Dutch (242)   </option>
  <option value='option18'>   Thai (229)    </option>
  <option value='option19'>   Turkish (225)    </option>
  <option value='option20'>     Danish (223)  </option>
  <option value='option21'>      Norwegian (158) </option>
  <option value='option22'>    Arabic (154)   </option>
  <option value='option23'>   Indonesian (151)    </option>
  <option value='option24'>   Tamil (151)    </option>
  <option value='option25'>   Finnish (133)   </option>
  <option value='option26'>     Telugu (129)  </option>
  <option value='option27'>    Hungarian (127)   </option>
  <option value='option27'>     Vietnamese (126)  </option>
  <option value='option27'>  Czech (119)     </option>
  <option value='option27'>     Tagalog (98)  </option>
  <option value='option27'>    Persian (89)   </option>
  <option value='option27'>    Hebrew (75)   </option>
  <option value='option27'>      Estonian (62) </option>
  <option value='option27'>   Ukrainian (59)   </option>
  <option value='option27'>       </option>
  <option value='option27'>       </option>

</Select>
</Box>

<Box className='SoloBox '> 
<Text className='Textt' fontSize='sm'>Year:</Text> 
<Select className='SelectBox' size='xs' placeholder='All' value={year} onChange={(e) => setYear(e.target.value)}>
<option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
              <option value='2017'>2017</option>
              <option value='2016'>2016</option>
              <option value='2015'>2015</option>
              <option value='2014'>2014</option>
              <option value='2013'>2013</option>
              <option value='2012'>2012</option>
              <option value='2011'>2011</option>
              <option value='2010'>2010</option>
              <option value='2009'>2009</option>
              <option value='2008'>2008</option>
              <option value='2007'>2007</option>
              <option value='2006'>2006</option>
              <option value='2005'>2005</option>
              <option value='2004'>2004</option>
              <option value='2003'>2003</option>
              <option value='2002'>2002</option>
              <option value='2001'>2001</option>
              <option value='2000'>2000</option>
              <option value='1999'>1999</option>
              <option value='1998'>1998</option>
              <option value='1997'>1997</option>
              <option value='1996'>1996</option>
              <option value='1995'>1995</option>
              <option value='1994'>1994</option>
              <option value='1993'>1993</option>
              <option value='1992'>1992</option>
              <option value='1991'>1991</option>
              <option value='1990'>1990</option>
              <option value='1989'>1989</option>
              <option value='1988'>1988</option>
              <option value='1987'>1987</option>
              <option value='1986'>1986</option>
              <option value='1985'>1985</option>
              <option value='1984'>1984</option>
              <option value='1983'>1983</option>
              <option value='1982'>1982</option>
              <option value='1981'>1981</option>
              <option value='1980'>1980</option>
              <option value='1979'>1979</option>
              <option value='1978'>1978</option>
              <option value='1977'>1977</option>
              <option value='1976'>1976</option>
              <option value='1975'>1975</option>
              <option value='1974'>1974</option>
              <option value='1973'>1973</option>
              <option value='1972'>1972</option>
              <option value='1971'>1971</option>
              <option value='1970'>1970</option>
</Select>
</Box>

<Box className='SoloBox '>
<Text className='Textt' fontSize='sm'>Order By:</Text> 
<Select className='SelectBox' size='xs' placeholder='All' value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
<option value='title'>Title</option>
              <option value='year'>Year</option>
              <option value='rating'>Rating</option>
              <option value='peers'>Peers</option>
              <option value='seeds'>Seeds</option>
              <option value='download_count'>Download Count</option>
              <option value='like_count'>Like Count</option>
              <option value='date_added'>Date Added</option>
</Select>
</Box>

   </Box>

 
</Card>


</Box>

  
  )
}

export default SearchNav