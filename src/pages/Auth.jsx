import React, { useState, useRef } from 'react';
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

const PagesAuth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  console.log(isSignup);

  return (
    <VStack w="100%" p={5}>
      <VStack bg="gray.700" m={8} p={5} minW="400px" spacing={3}>
        {isSignup && (
          <>
            <Text fontWeight="bold" fontSize="3xl">
              Sign up
            </Text>
            <FormControl ref={emailRef} required>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" id="email" type="text" />
            </FormControl>

            <FormControl ref={passwordRef} required>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
              />
            </FormControl>

            <FormControl ref={confirmPasswordRef} required>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </FormControl>

            <HStack>
              <Text>Have an account already?</Text>
              <Button size="sm" variant="ghost" onClick={switchMode}>
                Log in
              </Button>
            </HStack>

            <Flex p={5}>
              <Button type="submit">Sign up</Button>
            </Flex>
          </>
        )}

        {!isSignup && (
          <>
            <Text fontWeight="bold" fontSize="3xl">
              Log in
            </Text>
            <FormControl ref={emailRef} required>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" id="email" type="text" />
            </FormControl>

            <FormControl ref={passwordRef} required>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
              />
            </FormControl>

            <HStack>
              <Text>Have an account already?</Text>
              <Button size="sm" variant="ghost" onClick={switchMode}>
                Log in
              </Button>
            </HStack>

            <Flex p={5}>
              <Button type="submit">Sign up</Button>
            </Flex>
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default PagesAuth;
