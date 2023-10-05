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



function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  // const [passwordCheker, setPasswordCheker] = useState("password must be at least 8 characters long")
  
  const toast = useToast();
  const navigate = useNavigate();
  const handleRealTimePasswordCheck = (e) => {
    setPassword(e.target.value);
  
    if (e.target.value.length < 8) {
      e.target.style.border = "2px solid #a71a40";
    } else {
      e.target.style.borderBottom = ""; // Reset the border to its default style
    }
  };
  

  const postDetails = (pics) => {
  // setLoading(true)
  if(!pics||pics===undefined){
    return toast({
      title: "Please upload a pic",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
  }
  if(pics.type==="image/jpeg"||pics.type==="image/png"){
    const data=new FormData()
    data.append("file",pics)
    data.append("upload_preset","atlas-chat")
    data.append("cloud_name","dnn7q1uqx")
    fetch("https://api.cloudinary.com/v1_1/dnn7q1uqx/upload", {
  method: "post",
  body: data,
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to upload image");
    }
    return res.json();
  })
  .then((data) => {
    setPic(data.url.toString());
    setLoading(false);
  })
  .catch((err) => {
    console.log(err);
    // Handle the error, display a message to the user, etc.
  });

  }
}
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
    if (!pic) {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        const dog = response.data.message;
    
        setPic(dog);
    
     
      } catch (error) {
        // Handle any errors that may occur during the API request
        console.error(error);
      }
    }
    
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const userData = { name, email, password, passwordConfirm,pic };

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
        <FormLabel
        className="white-color"
        >Name</FormLabel>
        <Input
          bg={"#666"}
          border={"none"}
          type="name"
          placeholder=""
          onChange={(e) => {
          setName(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel
        className="white-color"
        >email</FormLabel>
        <Input
        bg={"#666"}
        border={"none"}
          type="email"
          placeholder=""
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel
        className="white-color"
        >password</FormLabel>
        <InputGroup>
          <Input
          bg={"#666"}
          border={"none"}
            type={show ? "text" : "password"}
            placeholder=""
            onChange={(e) => {
              setPassword(e.target.value);
            }
            
            }

            onKeyUp={(e)=>handleRealTimePasswordCheck(e)}
          />
          {/* <span style={{color:"white"}}>{passwordCheker}</span> */}
          <InputRightElement width={"4.5rem"}>
            <Button
                 className="purple-bg white-color"
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
        <FormLabel
        className="white-color"
        >password</FormLabel>
        <InputGroup>
          <Input
          bg={"#666"}
          border={"none"}
            type={show ? "text" : "password"}
            placeholder=""
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
            className="purple-bg white-color"
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
        <FormLabel
        className="white-color"
        >upload you pic</FormLabel>
        <Input type="file" onChange={(e) => {postDetails(e.target.files[0])}} p={1.5} bg={"#666"} border={"none"}/>
        </FormControl>

        <Button onClick={
            submitHandler
        }
        style={{marginTop:15}}  w={"100%"} colorScheme="purple" isLoading={loading}> signup</Button>
    </VStack>
  );
}

export default Signup;
