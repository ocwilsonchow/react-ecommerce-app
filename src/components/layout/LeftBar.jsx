import React from 'react';
import { Center, Flex, Box, Text ,useColorModeValue } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C')

  return (
    <Flex flexDir="column" alignItems="center" bg={bgColor}  h="100vh" py={5}>
      <Box>
        <ColorModeSwitcher borderRadius="50%" m={0} />
      </Box>
    </Flex>
  );
};

export default LeftBar;
