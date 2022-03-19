import React from 'react';
import { Flex, theme } from '@chakra-ui/react';
import './App.scss'

import LeftBar from '../layouts/LeftBar';
import RightBar from '../layouts/RightBar';

import { Outlet } from 'react-router-dom';

function App() {
  return (

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

  );
}

export default App;
