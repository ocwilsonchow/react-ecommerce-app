import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="lg"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="yellow.400"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
      transition="all ease 0.2s"
      _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
    />
  );
};
