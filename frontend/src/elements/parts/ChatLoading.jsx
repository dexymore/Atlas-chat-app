import React from 'react'
import { Box, SkeletonCircle, SkeletonText, Stack, VStack } from "@chakra-ui/react"

function ChatLoading() {
  return (
<VStack>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
<Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"100%"} >
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    
</Box>
</VStack>   
  )
}

export default ChatLoading