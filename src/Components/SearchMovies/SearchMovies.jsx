import React, { useState } from 'react'
import './SearchMovies.scss'
import { Button, useColorModeValue, Card, Select, Text,Box, FormControl, Input } from '@chakra-ui/react'

function SearchMovies({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState({
    quality: '',
    minimum_rating: 0,
    genre: '',
    language: '',
    year: '',
    order_by: ''
  });


  

    const bg = useColorModeValue('white', 'black');
    const color = useColorModeValue('black', 'white');


      
    const handleSearchClick = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      onSearch(lowerCaseSearchTerm, filters);
      // console.log(lowerCaseSearchTerm, filters);
    };
  
    
    
      const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        
        // Automatically trigger search when input is cleared
        if (value === '') {
          onSearch('', filters);
        }
      };
    
  // qualty
    const handleQualityChange = (event) => {
      setFilters({ ...filters, quality: event.target.value });
    };
  // gnre
const handleGenreChange = (event) => {
      setFilters({ ...filters, genre: event.target.value });
    };

// rating

const handleRatingChange = (event) => {
  const selectedValue = event.target.value;
  setFilters({ ...filters, minimum_rating: parseInt(selectedValue) });
};

    
  
    
// year
    const handleYearChange = (event) => {
      setFilters({ ...filters, year: event.target.value });
    };
  // laguage
    const handleLanguageChange = (event) => {
      setFilters({ ...filters, language: event.target.value });
    };
  
    
  // orderby
    const handleOrderByChange = (event) => {
      setFilters({ ...filters, order_by: event.target.value });
    };
   
  
  return (
    <div className='SearchMovies'  >
         <Box 
         className='Box-Movies' 
         >
        
        <Box className='Card-Movies'  bg={bg} color={color}    >
        
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
            {/* quality */}
          <Box className='SoloBox-Movies'>
              <Text className='Textt-Movies' fontSize='sm'>Quality:</Text>
              <Select
                className='SelectBox-Movies'
                size='xs'
                placeholder='All'
                name='quality'
                onChange={handleQualityChange}
              >
                {/* <option value=''>All</option> */}
                <option value='480p'>480p</option>
                <option value='720p'>720p</option>
                <option value='1080p'>1080p</option>
                <option value='1080P.x265'>1080P.x265</option>
                <option value='2160p'>2160p</option>
                <option value='3D'>3D</option>
              </Select>
            </Box>
        



            {/* genre */}

            <Box className='SoloBox-Movies'>
              <Text className='Textt-Movies' fontSize='sm'>Genre:</Text>
              <Select
                className='SelectBox-Movies'
                size='xs'
                placeholder='All'
                name='genre'
                onChange={handleGenreChange}
              >
                {/* <option value=''>All</option> */}
                <option value="action">Action</option>
<option value="adventure">Adventure</option>
<option value="animation">Animation</option>
<option value="biography">Biography</option>
<option value="comedy">Comedy</option>
<option value="crime">Crime</option>
<option value="documentary">Documentary</option>
<option value="drama">Drama</option>
<option value="family">Family</option>
<option value="fantasy">Fantasy</option>
<option value="film-noir">Film-Noir</option>
<option value="game-show">Game-Show</option>
<option value="history">History</option>
<option value="horror">Horror</option>
<option value="music">Music</option>
<option value="musical">Musical</option>
<option value="mystery">Mystery</option>
<option value="news">News</option>
<option value="reality-tv">Reality-TV</option>
<option value="romance">Romance</option>
<option value="sci-fi">Sci-Fi</option>
<option value="sport">Sport</option>
<option value="talk-show">Talk-Show</option>
<option value="thriller">Thriller</option>
<option value="war">War</option>
<option value="western">Western</option>

              </Select>
            </Box>







            {/* raitnug */}

            <Box className='SoloBox-Movies'>
              <Text className='Textt-Movies' fontSize='sm'>Rating:</Text>
              <Select
                className='SelectBox-Movies'
                size='xs'
                placeholder='All'
                name='rating'
                onChange={handleRatingChange}
              >
                {/* <option value=''>All</option> */}
                  {[1,2,3,4,5,6,7,8,9].map((e)=> {
                    return <option value={e}>+{e}</option>
                  })}
              </Select>
            </Box>
        
        
            {/* year */}

            <Box 
        className='SoloBox-Movies '
        > 
        <Text 
        className='Textt-Movies' 
        fontSize='sm'>Year:</Text> 
         <Select className='SelectBox-Movies'  size='xs' placeholder='All' onChange={handleYearChange}
              >
         <option value="2024">2024</option>
<option value="2023">2023</option>
<option value="2020-2024">2020-now</option>
<option value="2010-2024">2010-now</option>
<option value="2010-2019">2010-2019</option>
<option value="2000-2009">2000-2009</option>
<option value="1990-1999">1990-1999</option>
<option value="1980-1989">1980-1989</option>
<option value="1970-1979">1970-1979</option>
<option value="1950-1969">1950-1969</option>
<option value="1900-1949">1900-1949</option>

        </Select>
        </Box>



                   {/* language */}

        
        <Box 
        className='SoloBox-Movies '
        > 
        <Text 
        className='Textt-Movies'
         fontSize='sm'>Language:</Text>
            <Select className='SelectBox-Movies'  size='xs' placeholder='All' onChange={handleLanguageChange}>
            <option value="en">English</option>
<option value="foreign">Foreign</option>
{/* <option value="all" selected="selected">All</option> */}
<option value="fr">French (2954)</option>
<option value="ja">Japanese (2632)</option>
<option value="es">Spanish (1630)</option>
<option value="it">Italian (1410)</option>
<option value="de">German (1154)</option>
<option value="zh">Chinese (1019)</option>
<option value="ko">Korean (890)</option>
<option value="cn">Cantonese (775)</option>
<option value="hi">Hindi (721)</option>
<option value="sv">Swedish (409)</option>
<option value="pt">Portuguese (394)</option>
<option value="ru">Russian (390)</option>
<option value="ro">Romanian (353)</option>
<option value="pl">Polish (347)</option>
<option value="nl">Dutch (242)</option>
<option value="tr">Turkish (230)</option>
<option value="th">Thai (229)</option>
<option value="da">Danish (224)</option>
<option value="no">Norwegian (158)</option>
<option value="ar">Arabic (157)</option>
<option value="id">Indonesian (151)</option>
<option value="ta">Tamil (151)</option>
<option value="fi">Finnish (135)</option>
<option value="te">Telugu (130)</option>
<option value="hu">Hungarian (128)</option>
<option value="vi">Vietnamese (126)</option>
<option value="cs">Czech (120)</option>
<option value="tl">Tagalog (99)</option>
<option value="fa">Persian (89)</option>
<option value="he">Hebrew (75)</option>
<option value="et">Estonian (63)</option>
<option value="uk">Ukrainian (59)</option>
<option value="el">Greek (54)</option>
<option value="ml">Malayalam (53)</option>
<option value="pa">Punjabi (53)</option>
<option value="bn">Bangla (35)</option>
<option value="ms">Malay (34)</option>
<option value="ca">Catalan (28)</option>
<option value="is">Icelandic (22)</option>
<option value="sk">Slovak (21)</option>
<option value="sr">Serbian (20)</option>
<option value="ur">Urdu (20)</option>
<option value="kn">Kannada (19)</option>
<option value="mr">Marathi (16)</option>
<option value="lv">Latvian (14)</option>
<option value="lt">Lithuanian (14)</option>
<option value="xx">xx (12)</option>
<option value="ka">Georgian (11)</option>
<option value="hr">Croatian (11)</option>
<option value="bg">Bulgarian (10)</option>
<option value="gl">Galician (9)</option>
<option value="wo">Wolof (9)</option>
<option value="ku">Kurdish (9)</option>
<option value="eu">Basque (8)</option>
<option value="mk">Macedonian (8)</option>
<option value="sh">Serbo-Croatian (8)</option>
<option value="af">Afrikaans (7)</option>
<option value="bs">Bosnian (6)</option>
<option value="ga">Irish (6)</option>
<option value="yo">Yoruba (6)</option>
<option value="sw">Swahili (5)</option>
<option value="bo">Tibetan (5)</option>
<option value="kk">Kazakh (5)</option>
<option value="sq">Albanian (5)</option>
<option value="am">Amharic (4)</option>
<option value="hy">Armenian (4)</option>
<option value="zu">Zulu (4)</option>
<option value="sl">Slovenian (4)</option>
<option value="yue">Cantonese (4)</option>
<option value="km">Khmer (3)</option>
<option value="ps">Pashto (3)</option>
<option value="st">Southern Sotho (3)</option>
<option value="xh">Xhosa (3)</option>
<option value="gu">Gujarati (3)</option>
<option value="ab">Abkhazian (2)</option>
<option value="la">Latin (2)</option>
<option value="mn">Mongolian (2)</option>
<option value="os">Ossetic (2)</option>
<option value="yi">Yiddish (2)</option>
<option value="mi">Maori (2)</option>
<option value="ak">Akan (2)</option>
<option value="ht">Haitian Creole (2)</option>
<option value="cy">Welsh (2)</option>
<option value="mt">Maltese (2)</option>
<option value="cmn">cmn (2)</option>
<option value="my">Burmese (2)</option>
<option value="ne">Nepali (2)</option>
<option value="jv">Javanese (2)</option>
<option value="lo">Lao (2)</option>
<option value="bm">Bambara (2)</option>
<option value="dz">Dzongkha (2)</option>
<option value="nb">Norwegian Bokmål (1)</option>
<option value="aa">Afar (1)</option>
<option value="lb">Luxembourgish (1)</option>
<option value="ky">Kyrgyz (1)</option>
<option value="az">Azerbaijani (1)</option>
<option value="so">Somali (1)</option>
<option value="iu">Inuktitut (1)</option>
<option value="lg">Ganda (1)</option>
<option value="be">Belarusian (1)</option>
<option value="ig">Igbo (1)</option>
<option value="zxx">No linguistic content (1)</option>
<option value="fil">Filipino (1)</option>
<option value="tw">Twi (1)</option>
<option value="rw">Kinyarwanda (1)</option>
<option value="or">Odia (1)</option>
<option value="ase">American Sign Language (1)</option>
<option value="nan">Min Nan Chinese (1)</option>
<option value="ber">ber (1)</option>
<option value="qag">qag (1)</option>
<option value="gsw">Swiss German (1)</option>
<option value="ln">Lingala (1)</option>
<option value="iba">Iban (1)</option>
<option value="cr">Cree (1)</option>
<option value="tn">Tswana (1)</option>
<option value="qab">qab (1)</option>
<option value="rom">Romany (1)</option>
<option value="mo">Romanian (1)</option>
<option value="sa">Sanskrit (1)</option>
<option value="ukl">ukl (1)</option>
<option value="ug">Uyghur (1)</option>
<option value="kvk">kvk (1)</option>
<option value="se">Northern Sami (1)</option>
<option value="om">Oromo (1)</option>
<option value="myn">myn (1)</option>

        
        </Select>
        </Box>
        
       
                    {/* orderby */}

        <Box 
        className='SoloBox-Movies '
        >
        <Text
         className='Textt-Movies'
          fontSize='sm'>Order By:</Text> 
        <Select className='SelectBox-Movies'   size='xs' placeholder='Latest' onChange={handleOrderByChange}>
{/* <option value="latest" selected="selected">Latest</option> */}
<option value="oldest">Oldest</option>
<option value="featured">Featured</option>
<option value="seeds">Seeds</option>
<option value="peers">Peers</option>
<option value="year">Year</option>
<option value="rating">IMDb Rating</option>
<option value="likes">YTS Likes</option>
<option value="rt_audience">RT Audience</option>
<option value="alphabetical">Alphabetical</option>
<option value="downloads">Downloads</option>
        </Select>
        </Box>
        
           </Box>
        
         
        </Box>
        
        
        </Box>
    </div>
  )
}

export default SearchMovies