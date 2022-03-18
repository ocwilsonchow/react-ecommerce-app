import React from 'react';
import { Flex, VStack, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaStore, FaThList, FaCartArrowDown } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';
import { RiLoginBoxLine, RiLogoutBoxFill, RiAdminFill } from 'react-icons/ri';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const { signout, user } = useAuth();

  const handleSignOut = () => {
    signout();
  };

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      bg={bgColor}
      h="100vh"
      py={5}
    >
      <VStack>
        <Link to="/">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            my={2}
            icon={<FaStore />}
          />
        </Link>
        <Link to="/categories">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            my={2}
            icon={<FaThList />}
          />
        </Link>
        <Link to="/cart">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            my={2}
            icon={<FaCartArrowDown />}
          />
        </Link>
        <Link to="/my/account">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            my={2}
            icon={<AiTwotoneSetting />}
          />
        </Link>

        {/* Admin Panel */}
        {user && (
          <Link to="/admin/stockmanagement">
            <IconButton
              color="tomato"
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<RiAdminFill />}
            />
          </Link>
        )}

         {/* Log in button */}
        {!user && (
          <Link to="/auth">
            <IconButton
              color="blue.500"
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<RiLoginBoxLine />}
            />
          </Link>
        )}

         {/* Log out button*/}
        {user && (
          <IconButton
            onClick={handleSignOut}
            variant="ghost"
            color="red.400"
            my={2}
            size="lg"
            borderRadius="50%"
            icon={<RiLogoutBoxFill />}
          />
        )}
      </VStack>
      <ColorModeSwitcher borderRadius="50%" my={2} mx={0} />
    </Flex>
  );
};

export default LeftBar;
