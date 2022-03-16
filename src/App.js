import React from 'react';
import { ChakraProvider, Flex,  VStack, HStack, Code, theme } from '@chakra-ui/react';
import LeftBar from './components/layout/LeftBar';
import RightBar from './components/layout/RightBar';
import Main from './components/layout/Main';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex w="100vw">
        <Flex
          h="100vh"
          minW={['0px', '80px', '80px', '80px']}
          display={{ sm: 'none', md: 'block' }}
        >
          <LeftBar />
        </Flex>
        <Flex h="100vh" overflow="auto" w="100%">
          <Main />
        </Flex>
        <Flex
          h="100vh"
          minW={['0px', '80px', '80px', '400px']}
          display={{ sm: 'none', md: 'block' }}
          overflow="auto"
        >
          <RightBar />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
