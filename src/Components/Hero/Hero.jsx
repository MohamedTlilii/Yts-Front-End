// import React from 'react';

// function Hero() {
//   return (
//     <div>
//       <div className="hidden-xs hidden-sm">
//         <h1>Download YTS YIFY movies: HD smallest size</h1>
//         <p style={{ marginBottom: '10px' }}>
//           Welcome to the official <b>YTS.MX</b> website. Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.
//           <br/>
//           <a href="https://yts.mx/blog/yts-mx-is-the-only-new-official-domain-for-yify-movies" title="IMPORTANT - YTS.MX is the only new official domain for YIFY Movies"><b>IMPORTANT - YTS.MX is the only new official domain for YIFY Movies</b></a>
//         </p>
//       </div>
//       <div>
//         <img src="/images/telegram.svg" width="16" height="16" alt="Telegram" /> <a href="https://t.me/ytsmx_updates" target="_blank" rel="nofollow">YTSMX_UPDATES</a> | <img src="/images/twitter.svg" width="16" height="16" alt="Twitter" /> <a href="https://x.com/ytsyify" target="_blank" rel="nofollow">Follow <b>@YTSYIFY</b> for upcoming featured movies!</a><br /><br />
//       </div>
//       <h2><span className="icon-star"></span>Popular Downloads <a href="https://yts.mx/browse-movies/0/all/all/0/featured/0/all">more featured...</a> <a href="https://yts.mx/rss-guide"><img title="RSS" src="/assets/images/website/rss-icon.png" alt="RSS" width="24" height="24" /></a></h2>
//     </div>
//   );
// }

// export default Hero;

import React from 'react';
import { Text, Stack, Link, Flex } from '@chakra-ui/react';
import './Hero.scss';
import { FaTelegram,FaTwitter   } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaRssSquare } from "react-icons/fa";




function Hero() {
  return (
    <Stack  className='hero-Stack'>
      <Text className=' title' fontSize='6xl' as="h1">Download YTS YIFY movies: HD smallest size</Text>
      
      <Text className=' second-title' fontSize='md' as="p" style={{width:"140px"
      }}>
        Welcome to the official <b>YTS.MX</b> website. Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.
      </Text>
      
      <Text className='third-title' fontSize='md'  as="a">
        <br />
        <Link href="https://yts.mx/blog/yts-mx-is-the-only-new-official-domain-for-yify-movies" title="IMPORTANT - YTS.MX is the only new official domain for YIFY Movies" isExternal>
          <b>IMPORTANT - YTS.MX is the only new official domain for YIFY Movies</b>
        </Link>
      </Text>
        <Text className='four-title' fontSize='md'  as="a">
                <Link>   <FaTelegram /> </Link> 

          <Link>YTSMX_UPDATES |</Link> 
          <Link> <FaTwitter /></Link> 
         
          

         

          <Link href="https://twitter.com/YTSYIFY" isExternal ml={1} color="teal.500">Follow @YTSYIFY
          for upcoming featured movies!
          </Link> 
        </Text>
      
      <Flex align="center" className='five-title'>

        <CiStar />
        <Text fontSize='lg' as="h2" mr={2} >

          <span className="icon-star"></span> Popular Downloads
        </Text>
       <Link> <FaRssSquare /></Link>
        <Text fontSize='lg' as="h2" mr={2}>

        <Link href="https://yts.mx/browse-movies/0/all/all/0/featured/0/all" mr={2} isExternal>
          more featured...
        </Link>
       
        </Text>
    
      </Flex>
     
    </Stack>
  );
}

export default Hero;
