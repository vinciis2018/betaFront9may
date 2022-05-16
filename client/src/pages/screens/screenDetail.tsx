import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Image, Center, Text, Stack, IconButton, Flex, Button, FormControl, Select, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BiLike, BiPieChart, BiChevronRight, BiFlag} from 'react-icons/bi';
import {AiOutlineArrowUp, AiOutlineArrowDown, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";
import { LoadingBox, MessageBox, Rating } from "components/helpers";

import { detailsScreen, createReview, getScreenParams, screenVideosList } from '../../Actions/screenActions';
import { getScreenCalender } from '../../Actions/calenderActions';
import { getScreenGameDetails } from '../../Actions/gameActions';
import { SCREEN_REVIEW_CREATE_RESET } from '../../Constants/screenConstants';

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';
import { useFinnie } from 'components/finnie';

export function ScreenDetail (props: any) {
  const screenId = props.match.params.id;
  // const txId = props.match.params.txId;
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected }
  } = useFinnie();


  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { 
    videos, 
    loading: loadingScreenVideos, 
    error: errorScreenVideos 
  } = screenVideos;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const screenGameDetails = useSelector((state: any) => state.screenGameDetails);
  const {
    loading: loadingScreenGameDetails,
    error: errorScreenGameDetails,
    screenGameData
  } = screenGameDetails;

  const screenParams = useSelector((state: any) => state.screenParams);
  const { 
    loading: loadingScreenParams,
    error: errorScreenParams,
    params  
  } = screenParams;

  const screenReviewCreate = useSelector((state: any) => state.screenReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = screenReviewCreate;

  const [txId, setTxId] = React.useState<any>("")
  const {data: nft, isLoading, isError} = useNft({id: txId});
  // const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})


  const dispatch = useDispatch();
  React.useEffect(() => {

    if(!isFinnieConnected) {
      connectFinnie();
    }
    if(!screen) {
      dispatch(detailsScreen(screenId));
    } else {
      setTxId(screen?.image?.split("/").slice(-1)[0]);
    }
    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating(0);
      setComment('');
      dispatch({
        type: SCREEN_REVIEW_CREATE_RESET
      })
    }

    dispatch(screenVideosList(screenId));
    dispatch(getScreenCalender(screenId));
    dispatch(getScreenGameDetails(screenId));
    dispatch(getScreenParams(screenId));

  }, [
    dispatch,
    screen,
    txId,
    nft
  ])

  
  const reviewHandler = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(screenId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox message={errorUser}></MessageBox>
      ) : (
        <Center maxW="container.lg" mx="auto" pb="8">
          {loadingScreen ? (
            <LoadingBox></LoadingBox>
          ) : errorScreen ? (
            <MessageBox message={errorScreen}></MessageBox>
          ) : (
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Screen Details</Text>
                <IconButton as={RouterLink} to={`/screen/${screenId}/edit`} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
              </Stack>

              {isLoading && <LoadingBox></LoadingBox>}
              {isError && <MessageBox message={isError}></MessageBox>}
              {nft && (
                <Box rounded="lg" color="gray.200" border="1px" shadow="card">
                  <NftMediaContainer nft={nft} />
                </Box>
              )}

              <Flex p="2" align="center" justify="space-between"  rounded="lg" shadow="card">
                <Box p="2">
                  <Text fontWeight="600">{screen?.name}</Text>
                  <Text fontSize="sm" color="gray.500">({screen.category})</Text>
                </Box>
                <Stack>
                <Rating rating={screen.rating} numReviews={screen.numReviews}></Rating>
                </Stack>
              </Flex>

              {loadingScreenGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenGameDetails ? (
                <MessageBox message={errorScreenGameDetails}></MessageBox>
              ) : (
                <Stack>
                  <Box p="4" rounded="lg" shadow="card">
                    <Flex>
                      <Text fontSize="xs" fontWeight="600">Owned by : </Text>
                      <Text px="5px" color="gray.500" fontSize="xs" fontWeight="600">{screen.master.master.name}</Text>
                    </Flex>
                    <Flex>
                      <Text fontSize="xs" fontWeight="600">Location : </Text>
                      <Text px="5px" color="gray.500" fontSize="xs" fontWeight="600">{screen.screenAddress}, {screen.districtCity}, {screen.stateUT}, {screen.country}  </Text>
                    </Flex>
                    {loadingScreenCalender ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreenCalender ? (
                      <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
                    ) : (
                      <Flex 
                        as={Link}
                        href={`https://viewblock.io/arweave/tx/${calender?.activeGameContract}`}
                        isExternal
                        rel="noopener noreferrer"
                        align="center"
                        justify="space-between"
                      >
                        <Text fontSize="sm" fontWeight="600">{screenGameData?.gameType}</Text>
                        <AiTwotoneInfoCircle
                          color="green"
                          fontSize="10px"
                        />
                      </Flex>
                    )}
                  </Box>
                  <hr />

                  <Stack p="4" align="center" rounded="lg" shadow="card">
                    <Text fontSize="sm" fontWeight="600">Available Slots for the day</Text>
                    <Flex align="center">
                      <Text px="2" fontSize="xl" fontWeight="600" color="gray.500">2146</Text>
                      <BiPieChart fontSize="20px" color="green" />
                    </Flex>
                  </Stack>
                  
                  {loadingScreenParams ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenParams ? (
                    <MessageBox variant="danger">{errorScreenParams}</MessageBox>
                  ) : (
                    <SimpleGrid py="4" gap="4" columns={[2]} >
                      <Box rounded="lg" shadow="card" border="1px" borderColor="gray.300" p="2">
                        <Flex align="center" justify="space-between">
                          <Stack px="1">
                            <Flex>
                              <Text fontSize="xs">Worth : </Text>
                              <Text fontWeight="400" color="gray.500" fontSize="xs">₹{screen.scWorth}</Text>
                            </Flex>
                            <Text px="1" fontWeight="600" color="gray.500" fontSize="md">₹{params.Wdash}</Text>
                          </Stack>
                          {params.Wdash > screen.scWorth && (
                            <AiOutlineArrowUp fontSize="30px" color="green"/>
                          )}
                          {params.Wdash < screen.scWorth && (
                            <AiOutlineArrowDown fontSize="30px" color="red" />
                          )}
                        </Flex>
                      </Box>
                      <Box border="1px" rounded="lg" shadow="card" borderColor="gray.300" p="2">
                        <Flex align="center" justify="space-between">
                          <Stack px="1">
                            <Flex>
                              <Text fontSize="xs">Slot Rent : </Text>
                              <Text fontWeight="400" color="gray.500" fontSize="xs">₹{screen.rentPerSlot}</Text>
                            </Flex>
                            <Text px="1" fontWeight="600" color="gray.500" fontSize="md">₹{params.Rdash}</Text>
                          </Stack>
                          {params.Rdash > screen.rentPerSlot && (
                            <AiOutlineArrowUp fontSize="30px" color="green"/>
                          )}
                          {params.Rdash < screen.rentPerSlot && (
                            <AiOutlineArrowDown fontSize="30px" color="red" />
                          )}
                        </Flex>
                      </Box>
                    </SimpleGrid>
                  )}
                </Stack>
              )}

              <Box p="2" rounder="lg" shadow="card">
                <Text fontSize="sm" fontWeight="600">Details </Text>
                <Text fontSize="sm">{screen.description}</Text>
                <Text fontSize="sm">Time period of 1 slot : {screen.slotsTimePeriod} seconds</Text>
                <Text fontSize="sm">Screen Type : {screen.screenType}</Text>
                <Text fontSize="sm">Number of Independent Advertisers : {screen.allies.length}</Text>
              </Box>
              <hr />
              {loadingScreenVideos ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenVideos ? (
                <MessageBox message={errorScreenVideos}></MessageBox>
              ) : (
                <Stack p="1">
                  <Text fontSize="md" fontWeight="600">Currently playing on the screen</Text>
                  {videos.map((video: any) => (
                    <Box as={RouterLink} to={`/advert/${video._id}/${video?.video.split('/').slice(-1)[0]}`} color="gray.200" border="1px" p="2" rounded="md" shadow="card">
                      <Flex>
                        <Image 
                          px="1px"
                          src={video?.thumbnail}
                          width="150px"
                          height="100px"
                          rounded="md"
                        />
                        <Box color="black" px="10px">
                          <Text fontWeight="600">{video?.title}</Text>
                          <Text color="gray.500">(video category)</Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              )}
              <SimpleGrid gap="2" columns={[2]} p="10px" align="center" justify="space-between">
                <Button size="sm" fontSize="xs" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" as={RouterLink} to={`/createCampaign/${screen._id}`} p="2" >Create Campaign</Button>
                <Button size="sm" fontSize="xs" color="violet.500" variant="outline" as={RouterLink} to={`/dashboard/screen/${screen._id}`} p="2" >View Dashboard</Button>
              </SimpleGrid>
              <Stack>
                <SimpleGrid p="2" gap="4" columns={[1, 2]}>
                  {userInfo ? (
                    <Box shadow="card" rounded="lg" p="4">
                      <FormControl id="comment">
                        <FormLabel fontSize="xs">Write a comment and get a chance to get free tokens...</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="comment"
                            onChange={(e: any) => setComment(e.target.value)} 
                            placeholder={comment} 
                            value={comment}
                            type="text"  
                          />
                        </Stack>
                      </FormControl>
                      <Flex p="2" align="center" justify="space-between">
                        <Text fontSize="xs">Reviewed By <strong>{screen?.numReviews}</strong></Text>
                        <Text fontSize="xs">Average Ratings <strong>{screen?.rating}</strong></Text>
                      </Flex>
                      <Flex py="2" align="center" justify="space-between">
                        <Rating rating={screen?.rating} numReviews={screen?.numReviews}></Rating>
                        <FormControl p="2" id="rating">
                          <Stack direction="row" align="center">
                            <Select
                              title="rating"
                              value={rating}
                              onChange={(e: any) => setRating(e.target.value)}
                            >
                              <option value="">Rating...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very Good</option>
                              <option value="5">5- Excellent</option>
                            </Select>
                          </Stack>
                        </FormControl>
                      </Flex>
                      <hr />
                      <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm" width="100%" type="submit" onSubmit={reviewHandler}>Submit</Button>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                    </Box>
                  ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                  )}
                  <Box shadow="card" rounded="lg" p="4">
                    {screen?.reviews?.length === 0 && <MessageBox>There is no review</MessageBox>}
                    {screen?.reviews?.map((review: any) => (
                      <Box shadow="card" p="2" rounded="lg" key={review?._id}>
                        <Flex >
                          <Text fontSize="md">{review?.name}</Text>
                          <Rating rating={review?.rating} caption=" "></Rating>
                        </Flex>
                        <Text fontSize="md">{review?.createdAt?.substring(0, 10)}</Text>
                        <hr />
                        <Text fontSize="md">{review?.comment}</Text>
                      </Box>
                    ))}
                  </Box>
                </SimpleGrid>
              </Stack>
            </Stack>
          )}
      </Center>
      )}
      

    </Box>
  )
}