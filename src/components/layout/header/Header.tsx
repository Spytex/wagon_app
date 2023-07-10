import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Image, HStack, IconButton,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon, CloseIcon, HamburgerIcon} from '@chakra-ui/icons';
import Logo from "public/train_logo.png";

const Links = ['Home', 'Photos'];
const Hrefs = ['/', 'photos'];

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}>
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position="sticky" top={0} zIndex="1">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/">
                <Image src={Logo.src} alt="logo" boxSize="50px" objectFit="cover" />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                  <NavLink key={link} href={Hrefs[index]}>
                    {link}
                  </NavLink>
                ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>

        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                  <NavLink key={link} href={Hrefs[index]}>
                    {link}
                  </NavLink>
                ))}
            </Stack>
          </Box>
        ) : null}

      </Box>
    </>
  );
}
