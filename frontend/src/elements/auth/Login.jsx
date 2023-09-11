import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel,useToast , Input, VStack ,Button,InputRightElement,InputGroup} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose'

function Login() {
    const [show, setShow] = useState(false);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const toast = useToast();
const navigate = useNavigate();
  

const submitHandler = async () => {
  setLoading(true);

  if (!email || !password) {
    setLoading(false);
    return toast({
      title: "Please fill in all the required fields",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add 'await' here to wait for the Axios request to complete
    const response = await axios.post(
      "api/user/login",
      { email, password },
      config
    );

    const { data } = response;
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chat");
    toast({
      title: "Login Successful",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
  } catch (error) {
    setLoading(false);
    toast({
      title: "Invalid Credentials",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};

  
    return (
      <VStack spacing={5} color={"blackAlpha.700"}>
       
  
        <FormControl id="email" isRequired>
          <FormLabel>email</FormLabel>
          <Input
          value={email}
            type="email"
            placeholder=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>password</FormLabel>
          <InputGroup>
            <Input
            value={password}
              type={show ? "text" : "password"}
              placeholder=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width={"4.5rem"}>
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? "hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

  
          <Button onClick={
              submitHandler
          }
          style={{marginTop:12}}  w={"100%"} colorScheme="red"> login</Button>

          <Button onClick={()=>{
            setEmail("guest@atlas.com")
            setPassword("guest123")
          }}   w={"100%"} colorScheme="green"> login as guest</Button>
      </VStack>
    );
}

export default Login