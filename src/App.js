import React from 'react';
import {
  ChakraProvider,
  VStack,
  HStack,
  Code,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <HStack w="100%">
        <VStack
          h="100vh"
          w={['0px', '100px', '100px', '200px']}
          display={{ sm: 'none', md: 'block' }}
          border="1px"
          borderColor="gray.200"
        >
          <Code>LeftBar</Code>
          <ColorModeSwitcher />
        </VStack>
        <VStack h="100vh" w="100%">
          <Code>Main</Code>
        </VStack>
        <VStack
          h="100vh"
          w={['0px', '100px', '100px', '600px']}
          display={{ sm: 'none', md: 'block' }}
          border="1px"
          borderColor="gray.200"
        >
          <Code>RightBar</Code>
        </VStack>
      </HStack>
    </ChakraProvider>
  );
}

export default App;
