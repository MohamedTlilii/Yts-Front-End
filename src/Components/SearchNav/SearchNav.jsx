import { Button, useColorModeValue, Card, Select, Text,Box, FormControl, Input } from '@chakra-ui/react'
import React from 'react'
import "./SearchNav.scss";

function SearchNav() {
  const bg = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
    // const bg = useColorModeValue('white', 'rgb(26, 32, 44)')
    // const color = useColorModeValue('rgb(26, 32, 44)', 'white')
  return (
    <Box className='Box'   >
        
<Card className='Card'  bg={bg} color={color}   >

<FormControl className='FormControl' >

  <Input className='Input' type='text' placeholder="Search for a movie..."    />
  <Button className='BTN' colorScheme='green'>Search</Button>
</FormControl>

   <Box className='BoxBox'>
  <Box className='SoloBox'>
  <Text className='Textt' fontSize='sm'>Quality:</Text>
    <Select className='SelectBox'  size='xs' placeholder='All'>
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
    <Select   className='SelectBox' size='xs' placeholder='All'>
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
    <Select  className='SelectBox' size='xs' placeholder='All'>
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
    <Select className='SelectBox'  size='xs' placeholder='--------All--------'>
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
 <Select className='SelectBox'  size='xs' placeholder='All'>
  <option value='option1' >Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
</Box>

<Box className='SoloBox '>
<Text className='Textt' fontSize='sm'>Order By:</Text> 
<Select className='SelectBox'   size='xs' placeholder='All'>
  <option value='option1' >Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
</Box>

   </Box>

 
</Card>


</Box>

  
  )
}

export default SearchNav