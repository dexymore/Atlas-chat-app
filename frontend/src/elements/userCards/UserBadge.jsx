import React from 'react'
import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function UserBadge({user,handleFunction}) {
    console.log(user)
  return (
<Box
mx={1}
 px={1}
py={1}
bg={"#E8E8E8"}
_hover={{
    background: "#38B2AC",
}}
color={"black"}
cursor={"pointer"}
borderRadius={'lg'}
borderWidth={1}
borderColor={'#black'}
onClick={handleFunction}
>
    {user.name}

<CloseIcon pl={1}></CloseIcon>

</Box>
  )
}

export default UserBadge