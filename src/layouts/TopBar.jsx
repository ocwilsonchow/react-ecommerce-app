import React from 'react';
import {
  Flex,
  HStack,
  useColorModeValue,
  IconButton,
  Box,
  Tag,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaStore, FaThList, FaCartArrowDown } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';
import { RiLoginBoxLine, RiLogoutBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import RightBar from './RightBar';
import RightDrawer from '../components/RightDrawer';

const TopBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');

  const { signout, user } = useAuth();
  const { resetCartOnLogout, cartItems } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleSignOut = () => {
    resetCartOnLogout();
    signout();
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg={bgColor}
      display={{ base: 'flex', md: 'none' }}
      position="relative"
      w="100%"
    >
      <HStack spacing="4px">
        <Link to="/">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
            icon={<FaStore />}
          />
        </Link>
        <Link to="/categories">
          <IconButton
            variant="ghost"
            borderRadius="50%"
            size="lg"
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
              icon={<FaCartArrowDown />}
            />
          </Box>
        </Link>

        {user && (
          <Link to="/my/account">
            <IconButton
              variant="ghost"
              borderRadius="50%"
              size="lg"
              icon={<AiTwotoneSetting />}
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
              icon={<RiLoginBoxLine />}
            />
          </Link>
        )}

        {/* Log out button*/}
        {user && (
          <IconButton
            onClick={handleSignOut}
            variant="ghost"
            size="lg"
            borderRadius="50%"
            icon={<RiLogoutBoxFill />}
          />
        )}
        <ColorModeSwitcher borderRadius="50%" />
        <>
          <IconButton
            icon={<HamburgerIcon />}
            ref={btnRef}
            onClick={onOpen}
            variant="ghost"
            size="lg"
            borderRadius="50%"
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent alignItems="center" bg={bgColor}>
              <RightDrawer />
            </DrawerContent>
          </Drawer>
        </>
      </HStack>
    </Flex>
  );
};

export default TopBar;
