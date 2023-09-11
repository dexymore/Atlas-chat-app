import React from 'react'
import {Container,Box ,Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signup from '../elements/auth/Signup'
import Login from '../elements/auth/Login'

function HomePage() {
  return (
<Container maxW="container.xl" centerContent>
<Box d='flex' p={3} justifyContent="center" bg ={"white"} m={"40px 0 15px 0"} borderRadius={'lg'} borderWidth={"1px"} w={"50%"}>
<Text fontSize="4xl" fontWeight="bold" color="gray.600" fontFamily="work sans" textAlign="center">
Welcome to Atlas chat
</Text>
</Box>
<Box bg={"white"} w={"50%"} p={4} borderRadius={"lg"} borderWidth={"1px"}>
<Tabs variant='soft-rounded' >
  <TabList mb="1em" >
    <Tab w={"50%"}>signup</Tab>
    <Tab w={"50%"}>login</Tab>
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
  )
}

export default HomePage