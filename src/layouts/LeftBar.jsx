import React from 'react';
import {
  Flex,
  VStack,
  useColorModeValue,
  IconButton,
  Box,
  Tag,
} from '@chakra-ui/react';
import { FaStore, FaThList, FaCartArrowDown } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';
import { RiLoginBoxLine, RiLogoutBoxFill, RiAdminFill } from 'react-icons/ri';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const { signout, user } = useAuth();
  const { resetCartOnLogout, cartItems } = useCart();

  const handleSignOut = () => {
    resetCartOnLogout();
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
        <Link to="/checkout">
          <Box position="relative">
            {user && (
              <Tag
                justifyContent="center"
                alignItems="center"
                colorScheme="twitter"
                fontWeight="extrabold"
                variant="solid"
                borderRadius="full"
                position="absolute"
                top="0.5rem"
                right="0px"
                fontSize="xs"
              >
                {cartItems && cartItems.length}
              </Tag>
            )}
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<FaCartArrowDown />}
            />
          </Box>
        </Link>
          <Link to="/favorites">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            my={2}
            icon={<MdFavorite />}
          />
        </Link>

        {user && (
          <Link to="/my/account">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<AiTwotoneSetting />}
            />
          </Link>
        )}

        {/* Admin Panel */}
        {!user?.isAnonymous && user && (
          <Link to="/admin/stockmanagement">
            <IconButton
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
