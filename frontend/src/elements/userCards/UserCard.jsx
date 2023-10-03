import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import{Box,Avatar,Text} from '@chakra-ui/react'

function UserCard({handleFunction,user}) {


  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="#666"
    _hover={{
      background: "#724C9D",
      color: "white",
      boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"
    }}
    w="100%"
    d="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg"
  >
    <Avatar
      mr={2}
      size="sm"
      cursor="pointer"
      name={user.name}
      src={user.pic}
    />
    <Box>
      <Text>{user.name}</Text>
      <Text fontSize="xs">
        <b>Email : </b>
        {user.email}
      </Text>
    </Box>
  </Box>
  )
}

export default UserCard