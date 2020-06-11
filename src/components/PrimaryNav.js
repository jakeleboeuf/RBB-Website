import {
  Box,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import VisuallyHidden from '@reach/visually-hidden';
import { Link as GatsbyLink } from 'gatsby';
import React, { forwardRef, useLayoutEffect, useState } from 'react';
import Button from '../components/Button';
import SubscribeForm from '../components/SubscribeForm';
import Image from './Image';
import { Nav, NavItem, NavLink, NavMenu } from './Nav';
import { getUser } from '../utils/storage';
const INITIAL_TOGGLE_STATE = false;
const NAV_HEIGHT = '100px';

const PrimaryNav = forwardRef(
  ({ menuLinks, logoInformation, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(INITIAL_TOGGLE_STATE);
    const showSubscribeButton = !getUser('subscription');
    const isMedium = useThemeBreakpoint('md');
    const theme = useTheme();
    const toUpperCase = text => text.toUpperCase();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => {
      // TODO: Prevent scrolling while the slideout is open. The below logic works, but if a user clicks a link they'll keep the fixed position
      // document.body.style.position = isVisible ? 'unset' : 'fixed';
      setIsVisible(!isVisible);
    };

    // Layout effect prevents a flash of visibility when resizing the screen
    useLayoutEffect(() => {
      setIsVisible(isMedium);
    }, [isMedium]);

    return (
      // Breakpoints follow a [default, 1st breakpoint, 2nd breakpoint] structure.
      // In this case, padding would be 0 by default, 0 for the 'sm' breakpoint, and 6
      // for the 'md' breakpoint and above (lg, xl, ...).
      <Box position="relative" height={NAV_HEIGHT}>
        {isVisible ? (
          <Box
            position="fixed"
            height="100vh"
            width="100vw"
            top="0"
            left="0"
            backgroundColor="rgba(0,0,0, .7)"
            zIndex={1}
            display={['block', 'block', 'none', 'none']}
          ></Box>
        ) : null}
        <Nav
          zIndex={1}
          position="absolute"
          width="100%"
          height={NAV_HEIGHT}
          ref={ref}
          align="center"
          justify="space-between"
          wrap="wrap"
          aria-label="Primary site navigation"
          backgroundColor={theme.colors['rbb-white']}
          color={theme.colors['rbb-black-000']}
          fontFamily="Arvo"
          pl={[0, 0, 6]}
          pr={[0, 0, 6]}
          pb={[0, 0, 3]}
          pt={[0, 0, 3]}
          {...props}
        >
          <Box display={['block', 'block', 'none']} ml={{ sm: '5' }}>
            <button
              onClick={handleToggle}
              aria-expanded={isVisible && !isMedium}
              aria-controls="navigation"
              outline="transparent"
            >
              <VisuallyHidden>
                {`${isVisible ? 'Hide' : 'Show'} the navigation menu`}
              </VisuallyHidden>
              <Flex h="40px" w="40px" justify="center" align="center">
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="#001514"
                  stroke="#001514"
                  strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isVisible ? (
                    <>
                      <title>Close</title>
                      <line
                        x1="2.70711"
                        y1="1.29289"
                        x2="26.7487"
                        y2="25.3345"
                      />
                      <line
                        x1="1.29289"
                        y1="25.2929"
                        x2="25.3345"
                        y2="1.25123"
                      />
                    </>
                  ) : (
                    <>
                      <title>Menu</title>
                      <line y1="8" x2="34" y2="8" />
                      <line y1="19" x2="34" y2="19" />
                    </>
                  )}
                </svg>
              </Flex>
            </button>
          </Box>
          <Flex
            align="center"
            ml={[0, 0, 5]}
            mr={[8, 8, 0]}
            my={[5, 5, 0]}
            width={['50%', '50%', 'auto']}
          >
            <Link as={GatsbyLink} to="/">
              <Image
                publicId="assets/RBBLogoFinal_ugdskx"
                transforms={{
                  height: 0.1,
                }}
                alt={logoInformation.alt}
              />
            </Link>
          </Flex>

          <NavMenu
            display={['flex', 'block', 'flex']}
            width={['auto', 'full', 'auto']}
            alignItems="center"
            justify="flex-start"
            flexGrow={1}
            hidden={!isVisible || undefined}
            aria-hidden={isVisible && !isMedium}
            id="navigation"
            position={['absolute', 'absolute', 'static']}
            top={['100px', '100px', 'auto']}
            backgroundColor={[
              theme.colors['rbb-white'],
              theme.colors['rbb-white'],
              'transparent',
            ]}
            zIndex={['1', '1', 'auto']}
          >
            {menuLinks.map((link, index, src) => (
              <NavItem
                key={link.name}
                p={[6, 6, 0]}
                borderTop={[
                  `1px solid ${theme.colors['rbb-black-100']}`,
                  `1px solid ${theme.colors['rbb-black-100']}`,
                  'none',
                ]}
                borderBottom={[
                  index !== src.length - 1
                    ? 'none'
                    : `1px solid ${theme.colors['rbb-black-100']}`,
                  index !== src.length - 1
                    ? 'none'
                    : `1px solid ${theme.colors['rbb-black-100']}`,
                  'none',
                ]}
                ml={[undefined, undefined, 8]}
                display="block"
                fontWeight="bold"
                textAlign="left"
              >
                <NavLink to={link.slug}>{toUpperCase(link.name)}</NavLink>
              </NavItem>
            ))}
            <NavItem marginLeft="auto">
              {/* Subscribe button when user is on web and a subscriber id is not found in local storage*/}
              {isVisible && showSubscribeButton && (
                <Flex justify={['center', 'center', 'flex-end']}>
                  <Button
                    display={['none', 'none', 'block']}
                    onClick={onOpen}
                    hidden={!isVisible || undefined}
                    data-testid="subscribe"
                  >
                    Subscribe
                  </Button>
                </Flex>
              )}
            </NavItem>

            {/* Subscribe button when user is on mobile */}
            {showSubscribeButton && (
              <NavItem
                display={['none', 'block', 'none']}
                p={[6, 6, 0]}
                borderBottom={[
                  `1px solid ${theme.colors['rbb-black-100']}`,
                  `1px solid ${theme.colors['rbb-black-100']}`,
                  'none',
                ]}
              >
                <Flex
                  direction="row"
                  justify={['center', 'center', 'flex-end']}
                >
                  <Button
                    data-testid="subscribeMobile"
                    onClick={onOpen}
                    hidden={!isVisible || undefined}
                  >
                    Subscribe
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Subscribe</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody paddingBottom="1.5rem">
                        <SubscribeForm />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Flex>
              </NavItem>
            )}
          </NavMenu>
        </Nav>
      </Box>
    );
  }
);

export default PrimaryNav;

// TODO: Consider extracting to separate util
const sizes = ['sm', 'md', 'lg', 'xl'];

/**
 * @param {'sm'|'md'|'lg'|'xl'} breakpoint
 */
function useThemeBreakpoint(breakpoint) {
  const index = sizes.indexOf(breakpoint);
  const theme = useTheme();
  const query = `(min-width: ${theme.breakpoints[index]})`;
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useLayoutEffect(() => {
    let matcher = window.matchMedia(query);
    setMatches(matcher.matches);
    matcher.addListener(listener);
    return () => {
      matcher.removeListener(listener);
    };
    function listener(event) {
      setMatches(event.matches);
    }
  }, [query]);

  if (index < 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'An incorrect breakpoint key was used in `useThemeBreakpoint`. Use `sm`, `md`, `lg` or `xl`'
      );
    }
    return false;
  }
  return matches;
}
