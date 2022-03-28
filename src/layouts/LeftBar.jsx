import React from 'react';
import {
  Flex,
  VStack,
  useColorModeValue,
  IconButton,
  Box,
  Tag,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { FaStore, FaThList, FaCartArrowDown, FaHistory } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';
import { RiLoginBoxLine, RiLogoutBoxFill, RiAdminFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const { signout, user } = useAuth();
  const { resetCartOnLogout, cartItems, favoriteItems } = useCart();

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
        <Tooltip label="Home">
          <Link to="/">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<FaStore />}
              transition="all ease 0.2s"
              _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
            />
          </Link>
        </Tooltip>
        <Tooltip label="Categories">
          <Link to="/categories">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<FaThList />}
              transition="all ease 0.2s"
              _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
            />
          </Link>
        </Tooltip>
        <Tooltip label="Checkout">
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
                transition="all ease 0.2s"
                _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
              />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip label="My favorites">
          <Link to="/favorites">
            <Box position="relative">
              {user && (
                <Tag
                  justifyContent="center"
                  alignItems="center"
                  colorScheme="cyan"
                  fontWeight="extrabold"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  top="0.5rem"
                  right="0px"
                  fontSize="xs"
                >
                  {favoriteItems && favoriteItems.length}
                </Tag>
              )}
              <IconButton
                variant="ghost"
                borderRadius="50%"
                size="lg"
                my={2}
                icon={<MdFavorite />}
                transition="all ease 0.2s"
                _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
              />
            </Box>
          </Link>
        </Tooltip>

        <Tooltip label="Order history">
          <Link to="/my/order">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              my={2}
              icon={<FaHistory />}
              transition="all ease 0.2s"
              _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
            />
          </Link>
        </Tooltip>

        {user && (
          <Tooltip label="My account">
            <Link to="/my/account">
              <IconButton
                variant="ghost"
                borderRadius="50%"
                size="lg"
                my={2}
                icon={<AiTwotoneSetting />}
                transition="all ease 0.2s"
                _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
              />
            </Link>
          </Tooltip>
        )}

        {/* Admin Panel */}
        {!user?.isAnonymous && user && (
          <Tooltip label="Admin panel">
            <Link to="/admin/stockmanagement">
              <IconButton
                variant="ghost"
                borderRadius="50%"
                size="lg"
                my={2}
                icon={<RiAdminFill />}
                transition="all ease 0.2s"
                _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
              />
            </Link>
          </Tooltip>
        )}

        {/* Log in button */}
        {!user && (
          <Tooltip label="Login">
            <Link to="/auth">
              <IconButton
                variant="ghost"
                borderRadius="50%"
                size="lg"
                my={2}
                icon={<RiLoginBoxLine />}
                transition="all ease 0.2s"
                _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
              />
            </Link>
          </Tooltip>
        )}

        {/* Log out button*/}
        {user && (
          <Tooltip label="Log out">
            <IconButton
              onClick={handleSignOut}
              variant="ghost"
              my={2}
              size="lg"
              borderRadius="50%"
              icon={<RiLogoutBoxFill />}
              transition="all ease 0.2s"
              _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
            />
          </Tooltip>
        )}
      </VStack>
      <VStack>
        <Tooltip label="About this project">
          <Link to="/about">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              icon={<InfoIcon />}
              transition="all ease 0.2s"
              _hover={{ bg: 'blue.200', borderRadius: '0.4rem' }}
            />
          </Link>
        </Tooltip>
        <ColorModeSwitcher borderRadius="50%" my={2} mx={0} />
      </VStack>
    </Flex>
  );
};

export default LeftBar;
