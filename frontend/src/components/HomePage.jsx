import React from 'react'
import {Container,Box ,Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signup from '../elements/auth/Signup'
import Login from '../elements/auth/Login'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Lottie from 'lottie-react'
import animationData from '../animations/joinUs.json'

function HomePage() {
  const navigate=useNavigate();


  useEffect(() => {

      const userInfo=JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo && userInfo!==null  ){
navigate('/chat');

      }
  }, []);




  return (
<>
<div className='homeparent'>

<Container maxW="container.xl" centerContent>
<Box d='flex' p={3} justifyContent="center" m={"40px 0 15px 0"} borderRadius={'lg'} borderWidth={"none"} w={{ md: "50%", base: "100%" }} className='black-bg white-color'>
<Text fontSize={{ base: "28px", md: "30px" }} fontWeight="bold" fontFamily="work sans" textAlign="center">
Welcome to Atlas chat
</Text>
</Box>
<Box 
className='black-bg white-color'
 w={{ md: "50%", base: "100%" }} p={4} borderRadius={"lg"} borderWidth={"none"} mb={{ md: "", base: "10%" }}
 boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}
 >
<Tabs variant='soft-rounded' >
  <TabList mb="1em" >
    <Tab w={{ md: "50%", base: "100%" }}>signup</Tab>
    <Tab w={{ md: "50%", base: "100%" }}>login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Signup/>
    </TabPanel>
    <TabPanel>
   <Login/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>

</Container>
<div className='joinus'>
<Lottie
                  animationData={animationData}
                  style={{ width: "60%", height: "60%", marginLeft: 10 }}
                  loop={true}
                  autoPlay={true}
                ></Lottie>

                <h1 className='joinAtlasNow'>
                  Join Atlas Now

                </h1>
</div>
</div>

</>
  )
}

export default HomePage