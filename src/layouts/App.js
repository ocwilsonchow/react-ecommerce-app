import React from 'react';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';

import LeftBar from '../layouts/LeftBar';
import RightBar from '../layouts/RightBar';

import Routing from '../layouts/Routing';
import { Outlet } from 'react-router-dom';

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
            <Outlet />
          </Flex>
          <Flex
            h="100vh"
            minW={['0px', '300px', '300px', '300px']}
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
