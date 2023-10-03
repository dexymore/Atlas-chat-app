import React from 'react'
import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function UserBadge({user,handleFunction}) {
    console.log(user)
  return (
<Box
m={1}
 px={2}
py={2}
bg={"#666"}
_hover={{
    background: "#724C9D",
}}
color={"black"}
cursor={"pointer"}
borderRadius={'lg'}
borderWidth={"none"}
borderColor={'#black'}
className='white-color'
onClick={handleFunction}
>
    {user.name}

<CloseIcon pl={1}></CloseIcon>

</Box>
  )
}

export default UserBadge