import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { Box, Image, Heading, Text, Stack, Center, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from "components/helpers";
import { listScreens } from '../../Actions/screenActions';
import { listAllVideos } from '../../Actions/videoActions';
import { triggerPort } from 'services/utils';
import {InfoIcon} from "@chakra-ui/icons"
import { AiOutlineFundProjectionScreen, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { RiGlobeLine, RiWallet3Line, RiSearch2Line, RiUserSmileLine, RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";

export function Home() {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens: screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { 
    loading: loadingVideos, 
    error: errorVideos, 
    allVideos: allVideos
  } = videoListAll;

  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listScreens({}));
    dispatch(listAllVideos());

    // dispatch(listTopMasters());
    // dispatch(getAllPins());
  }, [
    dispatch
  ]);

  return (
    <Box px="2" pt="20">
      {/* Container */}
      <Center maxW="container.lg" mx="auto" pb="8">
        {/* <DragAndDropUploader /> */}
        {/* Leaderboard */}
        {/* <Leaderboard /> */}
        <Stack  p="2" color="">
          <SimpleGrid p="2" gap="2" columns={[2]}>
              <Box rounded="lg" shadow="card" border="1px" >
                <AiOutlineFundProjectionScreen fontSize="50px" color="gray.300" />
              </Box>
              <Box rounded="lg" shadow="card" border="1px" align="center">
                <RiAdvertisementLine fontSize="50px" color="gray.300" />
              </Box>
            </SimpleGrid>
            <Box p="2"  >
              <Flex px="10" pb="20" rounded="lg" shadow="card" border="1px" align="center" justify="center">
                <RiGlobeLine fontSize="50px" color="gray" />
                <Text p="2" fontSize="50px" color="gray" fontWeight="600">Explore</Text>
              </Flex>
            </Box>

          {loadingScreens ? (
            <LoadingBox></LoadingBox>
          ) : errorScreens ? (
            <MessageBox variant="danger">{errorScreens}</MessageBox>
          ) : (
            <Center >
              {screens?.length === 0 && <MessageBox>No Screen Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {screens?.map((screen: any) => (
                  <Box key={screen?._id} onClick={() => window.location.replace(`/screen/${screen?._id}`)} d="flex" flexDir="column" rounded="lg" bg="" shadow="card" flexBasis="100%">
                    {/* {(screen?.image.split("/").slice(-1)[0])} */}
                    <Image 
                      height="300px"
                      width="100%"
                      // shadow="card"
                      rounded="xl"
                      src={screen?.image}
                      onLoad={() =>  triggerPort(screen?.image.split("/").slice(-1)[0])}
                    />
                    <Text fontSize="" className="legend">{screen?.name}</Text>
                  </Box>
                ))}
              </Carousel>
            </Center>
          )}
          <hr />
          <Stack >
            <Flex justify="space-between">
              <Text>Previous</Text>
              <Text>Ongoing</Text>
              <Text>Next</Text>
            </Flex>
            {loadingVideos ? (
              <LoadingBox></LoadingBox>
            ) : errorVideos ? (
              <MessageBox variant="danger">{errorVideos}</MessageBox>
            ) : (
              <SimpleGrid gap="4" columns={[1, 2]} px="10px">
                {allVideos?.map((video: any) => (
                  <Box key={video?._id} as={RouterLink} to={`/advert/${video?._id}/${video?.video?.split('/')?.slice(-1)[0]}`} d="flex" flexDir="column" rounded="md" bg="" shadow="card" flexBasis="100%">
                    <Image 
                      height="200px"
                      rounded="md"
                      src={video?.thumbnail}
                      onLoad={() =>  triggerPort(video?.thumbnail?.split("/")?.slice(-1)[0])}
                    />
                    <Flex p="4" align="top" justify="space-between">
                      <Stack>
                        <Text fontWeight="600">{video?.title}</Text>
                        <Text color="gray.500">(Video Category)</Text>
                      </Stack>
                      <InfoIcon color="green.500" />
                    </Flex>
                  
                    <Flex p="4" align="center" justify="space-between">
                      <Box>
                        <Text fontWeight="600" fontSize="sm">{video?.title}</Text>
                        <Text color="gray.500" fontSize="sm">{video?.title}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="600" fontSize="sm">{video?.title}</Text>
                        <Text color="gray.500" fontSize="sm">{video?.title}</Text>
                      </Box>
                    </Flex>
                    <SimpleGrid gap="2" columns={[2]} p="4" align="center" justify="space-between">
                      <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" size="sm" fontSize="xs" type="submit">
                        View Status
                      </Button>
                      <Button size="sm" fontSize="xs" color="violet.500" variant="outline" type="submit">
                        Change Status
                      </Button>
                    </SimpleGrid>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack>
          
        </Stack>
      </Center>
    </Box>
  );
}
