import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// context
import { useFinnie } from "components/finnie";
import { signout } from '../../../Actions/userActions';

import {useWindowSize} from "components/utils";
// ui
import { Button, Badge, Center, Box, Flex, Heading, Stack, Menu, MenuButton, MenuList, MenuItem, Text, IconButton, Tooltip, Image } from "@chakra-ui/react";
// icons
import { IoRemoveCircle } from "react-icons/io5";
import { ArweaveIcon, KoiiIcon, RatIcon } from "components/icons";
import { RiGlobeLine, RiWallet3Line, RiSearch2Line, RiUserSmileLine, RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineFundProjectionScreen, AiOutlineSetting } from "react-icons/ai";

// assets
import Logo from "assets/logo.png";
import { userInfo } from "os";
import { LoadingBox, MessageBox } from "components/helpers";
export function Nav() {

  const { width } = useWindowSize();

  const style = {
    bgColor: "gray.100",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    zIndex: "1"
  };
  /* Finnie */
  const {
    state: { connectFinnie, disconnectFinnie, walletAddress, isLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  } = useFinnie();
  const dispatch = useDispatch();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { 
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo 
  } = userSignin;

  React.useEffect(() => {
  },[
    dispatch,
    userInfo
  ]);

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <Box __css={style} bg="white" px="4" color="white" shadow="card">
      {loadingUserInfo ? (
        <LoadingBox></LoadingBox>
      ) : errorUserInfo ? (
        <MessageBox message={errorUserInfo}></MessageBox>
      ) : (
        <>
          {width > 500 && (
            <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
              <Stack as={Link} to="/" direction="row" align="center">
                <Image width={{ base: 30, lg: "40px" }} src={Logo} />
                <Heading color="black" size="md">{config?.companyName}</Heading>
              </Stack>
              {/* Connect to finnie button */}
              {isFinnieConnected ? (
                <Stack direction="row" align="center" spacing="1">
                  <IconButton as={Link} to={`/artist/${walletAddress}`} icon={<RiSearch2Line size="20px" color="black" />} aria-label="search-what-you-are-looking-for" bg="none" rounded="md" h="33px" />
                  <Menu>
                    <MenuButton>
                      <Badge variant="outline" colorScheme="black" rounded="full">
                        <Stack align="center" direction="row" spacing="4" cursor="pointer" px="2" py="1" rounded="full" fontSize="sm" fontWeight="600">
                          {/* Rat balance */}
                          <Stack direction="row" align="center">
                            <RatIcon color="black" boxSize="20px" />
                            <Text fontSize="xs" lineHeight="1">{walletPrice?.ratBalance?.toFixed?.(3)}</Text>
                          </Stack>
                          {/* Koii balance */}
                          <Stack direction="row" align="center">
                            <KoiiIcon color="black" boxSize="22px" />
                            <Text fontSize="xs" lineHeight="1">{walletBalance?.koii?.toFixed?.(2)}</Text>
                          </Stack>
                          {/* Arweave balance */}
                          <Stack direction="row" align="center">
                            <ArweaveIcon color="black" boxSize="20px" />
                            <Text fontSize="xs" lineHeight="1">{walletBalance?.ar?.toFixed?.(3)}</Text>
                          </Stack>
                        </Stack>
                      </Badge>
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} to={`/mapbox`} color="black" icon={<RiGlobeLine size="20px" />}>
                        Explore                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/screens`} color="black" icon={<AiOutlineFundProjectionScreen size="20px" />}>
                        Screens                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/adverts`} color="black" icon={<RiAdvertisementLine size="20px" />}>
                        Adverts                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/userProfile/${walletAddress}`} color="black" icon={<RiUserSmileLine size="20px" />}>
                        Profile                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/wallet/${walletAddress}`} color="black" icon={<RiWallet3Line size="20px" />}>
                        Wallet
                      </MenuItem>
                      <MenuItem onClick={disconnectFinnie} color="black" icon={<IoRemoveCircle size="20px" />}>
                        Disconnect
                      </MenuItem>
                      <MenuItem onClick={signoutHandler} color="black" icon={<RiLogoutBoxRLine size="20px" />}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Tooltip bg="violet.500" color="white" hasArrow placement="bottom" label="User Profile">
                    <Center as={Link} to={`/userProfile/${walletAddress}`} bg="gray.100" border="1px solid white" shadow="card" mx="auto" rounded="full" color="blue.100" boxSize="50px" flexBasis="50px" flexShrink="0">
                      <Image  width="100%" rounded="full" src={userInfo?.avatar} />
                    </Center>
                    {/* <IconButton as={Link} to={`/artist/${walletAddress}`} icon={<RiUser4Line size="20px" />} aria-label="go-to-my-page" bg="blue.400" rounded="sm" h="33px" /> */}
                  </Tooltip>
                </Stack>
              ) : (
                <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" isLoading={isLoading} onClick={connectFinnie}>
                  {isLoading ? "Connecting..." : "Connect finnie"}
                </Button>
              )}
            </Flex>
          )}
          {width <= 500 && (
            <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
              {isFinnieConnected ? (
                <Stack direction="row" align="center">
                  <Center as={Link} to="/" bg="gray.100" border="1px solid white" shadow="card" mx="auto" rounded="full" color="blue.100" boxSize="50px" flexBasis="50px" flexShrink="0">
                    <Image width="100%" rounded="full" src={userInfo?.avatar} />
                  </Center>
                  <Badge borderRadius='full' px='4' py="2" variant="outline" colorScheme='black'>
                    <Menu>  
                      <MenuButton>
                        <Flex align="center" justify="space-between">
                          <Text lineHeight="1">₹ {walletPrice?.totalPrice?.toFixed(3)}</Text>
                          <RiWallet3Line size="20px" color="black"/>
                        </Flex>
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={Link} to={`/mapbox`} color="black" icon={<RiGlobeLine size="20px" />}>
                          Explore                    
                        </MenuItem>
                        <MenuItem as={Link} to={`/screens`} color="black" icon={<AiOutlineFundProjectionScreen size="20px" />}>
                          Screens                    
                        </MenuItem>
                        <MenuItem as={Link} to={`/adverts`} color="black" icon={<RiAdvertisementLine size="20px" />}>
                          Adverts                    
                        </MenuItem>
                        <MenuItem as={Link} to={`/userProfile/${walletAddress}`} color="black" icon={<RiUserSmileLine size="20px" />}>
                          Profile                    
                        </MenuItem>
                        <MenuItem as={Link} to={`/wallet/${walletAddress}`} color="black" icon={<RiWallet3Line size="20px" />}>
                          Wallet
                        </MenuItem>
                        <MenuItem onClick={disconnectFinnie} color="black" icon={<IoRemoveCircle size="20px" />}>
                          Disconnect
                        </MenuItem>
                        <MenuItem onClick={signoutHandler} color="black" icon={<RiLogoutBoxRLine size="20px" />}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Badge>
                </Stack>
              ) : (
                <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" isLoading={isLoading} onClick={connectFinnie}>
                  {isLoading ? "Connecting..." : "Connect finnie"}
                </Button>
              )}
              <IconButton as={Link} to={`/artist/${walletAddress}`} icon={<RiSearch2Line size="20px" color="black" />} aria-label="search-what-you-are-looking-for" bg="none" rounded="sm" h="33px" />
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
