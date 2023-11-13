import { ChangeEvent, useState } from "react";
import {
  Button,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pic, setPic] = useState<string>("");
  const [picLoading, setPicLoading] = useState<boolean>(false);

  const handlerClick = () => setShow(!show);

  const postDetails = () => {};

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handlerClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          padding={1.5}
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            postDetails(e.target.files[0])
          }
        />
      </FormControl>
    </VStack>
  );
};
export default Signup;
