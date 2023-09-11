import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";


function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();



  const submitHandler = async () => {
    setLoading(true);
  
    if (!name || !email || !password || !passwordConfirm) {
      setLoading(false);
      return toast({
        title: "Please fill in all the required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  
    if (password !== passwordConfirm) {
      setLoading(false);
      return toast({
        title: "Passwords do not match",
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
      const userData = { name, email, password, passwordConfirm };
  
      const response = await axios.post("/api/user", userData, config);
  
      // Handle success
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
      toast({
        title: "Account created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      // Handle specific error cases here
      setLoading(false);
      if (error.response) {
        // Handle error response (e.g., validation errors)
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Handle unexpected errors (e.g., network issues)
        toast({
          title: "An unexpected error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.error(error);
      }
    }
  };
  
  return (
    <VStack spacing={5} color={"blackAlpha.700"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="name"
          placeholder=""
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
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
      <FormControl id="password-confirm" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder=""
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
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

        <FormControl id="pic" >
        <FormLabel>upload you pic</FormLabel>
        {/* <Input type="file" onChange={(e) => {postDetails(e.target.files[0])}} p={1.5} accept="image/*"/> */}
        </FormControl>

        <Button onClick={
            submitHandler
        }
        style={{marginTop:15}}  w={"100%"} colorScheme="blue" isLoading={loading}> signup</Button>
    </VStack>
  );
}

export default Signup;
