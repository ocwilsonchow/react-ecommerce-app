import React, { useState } from 'react';
import {
  Flex,
  Center,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';

const initialState = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  console.log(isSignup);

  return (
    <VStack w="100%" p={5}>
      <VStack bg="gray.700" m={8} p={5} minW="400px" spacing={3}>
        {isSignup && (
          <>
            <Text fontWeight="bold" fontSize="3xl">Sign up</Text>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" name="password" />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
              />
            </FormControl>

            <HStack>
              <Text>Have an account already?</Text>
              <Button size="sm" variant="ghost" onClick={switchMode}>
                Log in
              </Button>
            </HStack>

            <Flex p={5}>
              <Button>Sign up</Button>
            </Flex>
          </>
        )}

         {!isSignup && (
          <>
            <Text fontWeight="bold" fontSize="3xl">Log in</Text>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" name="password" />
            </FormControl>



            <HStack>
              <Text>Have not got an account?</Text>
              <Button size="sm" variant="ghost" onClick={switchMode}>
                Sign up
              </Button>
            </HStack>

            <Flex p={5}>
              <Button>Log in</Button>
            </Flex>
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default Auth;
