import React from 'react'
import Hero from '../../Components/Hero/Hero'
import "./LandingPage.scss"
import HeroRow from '../../Components/HeroRow/HeroRow'
import HeroWarning from '../../Components/HeroWarning/HeroWarning'
import HeroLatest from '../../Components/HeroLatest/HeroLatest'
import HeroUpcoming from '../../Components/HeroUpcoming/HeroUpcoming'
import { Box, } from '@chakra-ui/react'
function LandingPage() {
  return (
    <Box className="landingPage" >
        <Hero/>
        <div className='line-section'></div>
        <HeroRow/>
        <HeroWarning/>
        <div className='line-section'></div>
<HeroLatest/>
<div className='line-section'></div>
<HeroUpcoming/>
    </Box>
  )
}

export default LandingPage