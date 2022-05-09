import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Image, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, Text, Button, IconButton, Wrap, WrapItem, Badge } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"

import { LoadingBox, MessageBox } from 'components/helpers';
import { detailsScreen, getScreenPinDetails, updateScreen } from '../../Actions/screenActions';
import { updatePin } from '../../Actions/pinActions';

import { SCREEN_UPDATE_RESET } from '../../Constants/screenConstants';
import { PIN_UPDATE_RESET } from '../../Constants/pinConstants';

import {getScreenCalender} from '../../Actions/calenderActions';
import { createScreenGame, removeScreenGame, getScreenGameDetails } from '../../Actions/gameActions';

import { triggerPort } from 'services/utils';
import { useFinnie } from 'components/finnie';
import { useArtist } from "api/hooks";
import { Map } from 'pages/map/Map';


export function ScreenEdit (props: any) {
  const screenId = props.match.params.id;
  
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected }
  } = useFinnie();

  const { data: artist, 
    isLoading: isLoadingArtist, 
    isError: isErrorArtist 
  } = useArtist({ id: walletAddress });

  const [name, setName] = React.useState<any>('');
  const [rentPerSlot, setRentPerSlot] = React.useState<any>('');
  const [image, setImage] = React.useState<any>('');
  const [screenCategory, setScreenCategory] = React.useState<any>('');
  const [screenType, setScreenType] = React.useState<any>('');
  const [screenWorth, setScreenWorth] = React.useState<any>('');
  const [slotsTimePeriod, setSlotsTimePeriod] = React.useState<any>('');
  const [description, setDescription] = React.useState<any>('');
  const [screenTags, setScreenTags] = React.useState<any>([]);
  const [screenAddress, setScreenAddress] = React.useState<any>('');
  const [districtCity, setDistrictCity] = React.useState<any>('');
  const [stateUT, setStateUT] = React.useState<any>('');
  const [country, setCountry] = React.useState<any>('India');
  const [screenLength, setScreenLength] = React.useState<any>('');
  const [screenWidth, setScreenWidth] = React.useState<any>('');
  const [measurementUnit, setMeasurementUnit] = React.useState<any>('ft');

  const [lng, setLng] = React.useState<number | undefined>(25.52);
  const [lat, setLat] = React.useState<number | undefined>(82.33);
  const [mapProps, setMapProps] = React.useState<any>({lng: lng , lat: lat, zoom: 18, height: "360px"})
  const [uploadMediaModal, setUploadMediaModal] = React.useState<any>();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  const screenPinDetails = useSelector((state: any) => state.screenPinDetails);
  const {
    loading: loadingScreenPin,
    error: errorScreenPin,
    screenPin,
  } = screenPinDetails;

  const screenGameDetails = useSelector((state: any) => state.screenGameDetails);
  const {
    loading: loadingScreenGameDetails,
    error: errorScreenGameDetails,
    screenGameData
  } = screenGameDetails

  const screenUpdate = useSelector((state: any) => state.screenUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = screenUpdate;

  const pinUpdate = useSelector((state: any) => state.pinUpdate);
  const {
    loading: loadingPinUpdate,
    error: errorPinUpdate,
    success: successPinUpdate,
  } = pinUpdate;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const screenGameCreate = useSelector((state: any) => state.screenGameCreate);
  const {
    loading: loadingScreenGameCreate,
    error: errorScreenGameCreate,
    success: successScreenGameCreate,
    createdScreenGame
  } = screenGameCreate


  const screenGameRemove = useSelector((state: any) => state.screenGameRemove);
  const {
    loading: loadingScreenGameRemove,
    error: errorScreenGameRemove,
    success: successScreenGameRemove
  } = screenGameRemove

  const dispatch = useDispatch();
  React.useEffect(() => {
    if(!isFinnieConnected) {
      connectFinnie();
    }

    if (!screen || screen._id !== screenId || successUpdate) {
      dispatch({
        type: SCREEN_UPDATE_RESET
      });
      dispatch(detailsScreen(screenId));
      dispatch(getScreenPinDetails(screenId))
  
    } else {
      setName(screen.name);
      setRentPerSlot(screen.rentPerSlot);
      setImage(image || screen.image);
      setScreenCategory(screen.category);
      setScreenType(screen.screenType)
      setScreenWorth(screen.scWorth);
      setSlotsTimePeriod(screen.slotsTimePeriod);
      setDescription(screen.description);
      setScreenAddress(screen.screenAddress);
      setDistrictCity(screen.districtCity);
      setStateUT(screen.stateUT);
      setCountry(screen.country);
      setScreenTags(screen.screenTags);
      setScreenLength(screen.size.length);
      setScreenWidth(screen.size.width);
      setMeasurementUnit(screen.size.measurementUnit)
    }

    if (!screenPin || successPinUpdate) {
      dispatch({
        type: PIN_UPDATE_RESET
      });
      dispatch(getScreenPinDetails(screenId))
    } else {
      setLng(screenPin.lng);
      setLat(screenPin.lat);
      setMapProps({
        lng: lng, lat: lat, zoom: 18, height:"360px"
      })
    }

    if (successUpdate) {
      window.alert('Screen Updated successfully');
    }

    if (successPinUpdate) {
      window.alert('Screen Pin Updated successfully');
    }

    if(successScreenGameCreate) {
      window.alert('Screen Game Created Successfully')
    }

    if(successScreenGameRemove) {
      window.alert('Screen Game Removed Successfully')
    }

    // dispatch(getWalletDetails(userInfo.defaultWallet))
    dispatch(getScreenCalender(screenId))
    dispatch(getScreenGameDetails(screenId))
  }, [
    dispatch, 
    screen, 
    userInfo, 
    screenId, 
    successUpdate, 
    successScreenGameCreate,
    successScreenGameRemove,
    image,
    successPinUpdate,
    screenPin
  ]);

  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create screen game.')
    dispatch(createScreenGame(screenId, {
      _id: screenId,
      name,
      image,
      description,
      rentPerSlot,
      screenCategory,
      screenType,
      screenWorth,
      slotsTimePeriod,
      screenTags,
      createdScreenGame
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeScreenGame(screenId))
  }

  const submitScreenHandler = (e: any) => {
    dispatch(
      updateScreen({
        _id: screenId,
        name,
        rentPerSlot,
        image,
        screenCategory,
        screenType,
        screenWorth,
        slotsTimePeriod,
        description,
        screenAddress,
        districtCity,
        stateUT,
        country,
        screenTags,
        screenLength,
        measurementUnit,
        screenWidth
      })
    );
  };

  const submitPinHandler = (e: any) => {
    e.preventDefault();

    dispatch(updatePin(screenId, {
      lng: lng,
      lat: lat
      
    }))
    setMapProps({
      lng: lng, lat: lat, zoom: 18, height: "360px"
    })
  }

  const handleAddPinClick = (e: any) => {
    const [lng, lat] = e.lngLat;
    setMapProps({
      lng: lng, lat: lat
    })
  };
 

  const openMediaModal = () => {

  }

  return (
    <Box px="2">
      <Box maxW="container.lg" mx="auto" pb="4">
        <Stack p="2" direction="row" justify="space-between">
          <ArrowBackIcon onClick={() => props.history.goBack()} />
          <Text fontWeight="600">Edit Screen Details</Text>
          <EditIcon color="white" />
        </Stack>
        {loadingScreen ? (
          <LoadingBox></LoadingBox>
        ) : errorScreen ? (
          <MessageBox message={errorScreen}></MessageBox>
        ) : (
          <Stack p="2">
            <Box>
              <Text p="1" fontWeight="600" fontSize="xs">Change Screen Image</Text>
              <Image 
                height="200px"
                // shadow="card"
                rounded="xl"
                src={screen.image}
                onLoad={() =>  triggerPort(screen?.image.split("/").slice(-1)[0])}
              />
            </Box>
            {finnieLoading ? (
              <LoadingBox></LoadingBox>
            ) : (
              <Stack align="center">
                {isFinnieConnected && artist?.nfts?.length !== 0 && (
                  <FormControl p="2" id="image"> 
                    <Select
                      placeholder="screen image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    >{artist?.nfts.map((nft: Record<string, any>) => (
                      <option key={nft?.id} value={`https://arweave.net/${nft?.id}`}>
                        {nft?.id}
                      </option>
                    ))}
                    </Select>
                  </FormControl>
                )}
              </Stack>
            )}
            <Box shadow="card" p="2" rounded="lg" >
              <Text align="center" fontWeight="600" p="2" fontSize="md">Edit your screen details</Text>
              <FormControl p="2" id="name">
                <Stack direction="row" align="center">
                  <Input 
                    id="name"
                    onChange={(e) => setName(e.target.value)} 
                    placeholder={name} 
                    value={name}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Name</FormLabel>
              </FormControl>
              <FormControl p="2" id="description">
                <Stack direction="row" align="center">
                  <Input 
                    id="description"
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder={description} 
                    value={description}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's Description</FormLabel>
              </FormControl>
              <FormControl p="2" id="tags">
                <Stack direction="row" align="center">
                  <Input 
                    id="tags"
                    onChange={(e) => setScreenTags(e.target.value)} 
                    placeholder="nsfw,art,holiday, ...etc" 
                    value={screenTags}
                    />
                </Stack>
                <FormLabel px="1" fontSize="xs">Tags</FormLabel>
                <Wrap spacing="8px" mt="3" mb="3">
                  {Object.keys(screenTags).map((key) => [String(key), screenTags[key]]).map((t) => (
                    <WrapItem  key={t[1]}>
                      <Badge rounded="md" shadow="card" py="1" px="2"  colorScheme="blue">{t[1]}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </FormControl>
            </Box>

            <Box shadow="card" rounded="md">
              <Text align="center" fontWeight="600" p="2" fontSize="md">Edit your screen game details</Text>
              {loadingScreenCalender ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenCalender ? (
                <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
              ) : (
              <>
                {!calender.activeGameContract ? (
                  <>
                    <FormControl p="2" id="screenCategory">
                      <Stack direction="row" align="center">
                        <Select
                          placeholder="Screen Category"
                          value={screenCategory}
                          onChange={(e) => setScreenCategory(e.target.value)}
                        >
                          <option value="DOOH_SCREEN">Outdoor Screen</option>
                          <option value="TV_SCREEN">Indoor Screen</option>
                          <option value="MALL_SCREEN">Mall Screen</option>
                          <option value="WEB_SCREEN">Web Screen</option>
                        </Select>
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Screen Category</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="screenType">
                      <Stack direction="row" align="center">
                        <Select
                          placeholder="Screen Type"
                          value={screenType}
                          onChange={(e) => setScreenType(e.target.value)}
                        >
                        <option value="TOP_HORIZONTAL">Top</option>
                        <option value="LEFT_VERTICAL">Left</option>
                        <option value="MIDDLE_HORIZONTAL">Middle</option>
                        <option value="MIDDLE_VERTICAL">Inbetween</option>
                        <option value="RIGHT_VERTICAL">Right</option>
                        <option value="BOTTOM_HORIZONTAL">Bottom</option>
                        </Select>
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Screen Type</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="screenWorth">
                      <Stack direction="row" align="center">
                        <Input 
                          id="screenWorth"
                          onChange={(e) => setScreenWorth(e.target.value)} 
                          placeholder={screenWorth} 
                          value={screenWorth}
                          type="number"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Screen's Worth</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="slotsTimePeriod">
                      <Stack direction="row" align="center">
                        <Select
                          placeholder= "Slots Time Period"
                          value={slotsTimePeriod}
                          onChange={(e) => setSlotsTimePeriod(e.target.value)}
                        >
                          <option value={10}>10 sec slot</option>
                          <option value={20}>20 sec slot</option>
                          <option value={30}>30 sec slot</option>
                          <option value={60}>60 sec slot</option>
                        </Select>
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Slots Time Period</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="rentPerSlot">
                      <Stack direction="row" align="center">
                        <Input 
                          id="rentPerSlot"
                          onChange={(e) => setRentPerSlot(e.target.value)} 
                          placeholder={rentPerSlot} 
                          value={rentPerSlot}
                          type="number"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Screen's Rent/Slot</FormLabel>
                    </FormControl>
                  </>
                ) : (
                  <>
                    {loadingScreenGameDetails ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreenGameDetails ? (
                      <MessageBox variant="danger">{errorScreenGameDetails}</MessageBox>
                    ) : (
                      <Stack>
                        <Text fontSize="">{screenType} Type Screen</Text>
                        <Text fontSize="">Slot Time Period: {screenGameData.gameParams.slotTimePeriod} Sec</Text>
                        <Text fontSize="">Intial Rent per slot: {screenGameData.gameParams.initialRent} RAT</Text>
                        <Text fontSize="">Initial Screen Worth: {screenGameData.gameParams.initialWorth} RAT</Text>
                      </Stack>
                    )}
                  </>
                )}
                {screen.__v > 0 ? (
                  <>
                    {calender.activeGameContract ? (
                      <Flex>
                        {loadingScreenGameRemove ? (
                          <LoadingBox></LoadingBox>
                        ) : errorScreenGameRemove ? (
                          <MessageBox variant="danger">{errorScreenGameRemove}</MessageBox>
                        ) : (
                          <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" onClick={removeGameContract}>Remove Game</Button>
                        )}
                      </Flex>
                    ) : (
                      <Flex>
                        {loadingScreenGameCreate ? (
                          <LoadingBox></LoadingBox>
                        ) : errorScreenGameCreate ? (
                          <MessageBox variant="danger">{errorScreenGameCreate}</MessageBox>
                        ) : (
                          <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" className="primary block" onClick={addGameContract}>Create Game</Button>
                        )}
                      </Flex>
                    )}
                  </>
                ) : (
                  <Text fontSize="70%">Please update the tags once with desired values to create screen game</Text>
                )}
              </>
              )}
            </Box>
            <Box shadow="card" rounded="md">
              <Text align="center" fontWeight="600" p="2" fontSize="md">Edit your screen physical details</Text>
              <FormControl p="2" id="screenAddress">
                <Stack direction="row" align="center">
                  <Input 
                    id="screenAddress"
                    onChange={(e) => setScreenAddress(e.target.value)} 
                    placeholder={screenAddress} 
                    value={screenAddress}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's Address</FormLabel>
              </FormControl>
              <FormControl p="2" id="districtCity">
                <Stack direction="row" align="center">
                  <Input 
                    id="districtCity"
                    onChange={(e) => setDistrictCity(e.target.value)} 
                    placeholder={districtCity} 
                    value={districtCity}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's District/City</FormLabel>
              </FormControl>
              <FormControl p="2" id="stateUT">
                <Stack direction="row" align="center">
                  <Input 
                    id="stateUT"
                    onChange={(e) => setStateUT(e.target.value)} 
                    placeholder={stateUT} 
                    value={stateUT}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's State/UT</FormLabel>
              </FormControl>
              <FormControl p="2" id="country">
                <Stack direction="row" align="center">
                  <Input 
                    id="country"
                    onChange={(e) => setCountry(e.target.value)} 
                    placeholder={country} 
                    value={country}
                    type="text"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's Country</FormLabel>
              </FormControl>
              <FormControl id="screenLength">
                <Stack p="2" direction="row" align="center">
                  <Input 
                    id="screenLength"
                    onChange={(e) => setScreenLength(e.target.value)} 
                    placeholder={screenLength} 
                    value={screenLength}
                    type="number"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's Length</FormLabel>
              </FormControl>
              <FormControl p="2" id="screenWidth">
                <Stack direction="row" align="center">
                  <Input 
                    id="screenWidth"
                    onChange={(e) => setScreenWidth(e.target.value)} 
                    placeholder={screenWidth} 
                    value={screenWidth}
                    type="number"  
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">Screen's Width</FormLabel>
              </FormControl>
              <FormControl p="2" id="measurementUnit">
                <Stack direction="row" align="center">
                  <Select
                    placeholder= "Measurement Unit"
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}
                  >
                    <option value="MT">Select Type</option>
                    <option value="FT">ft</option>
                    <option value="MT">m</option>
                    <option value="PX">px</option>
                  </Select>
                </Stack>
                <FormLabel px="1" fontSize="xs">Measurement Unit</FormLabel>
              </FormControl>
            </Box>
            <Box shadow="card" rounded="md">
              {screen.category !== "WEB_SCREEN" ? (
                <>
                  {loadingScreenPin ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenPin ? (
                    <MessageBox variant="danger">{errorScreenPin}</MessageBox>
                  ) : (
                    <Box>
                      <SimpleGrid gap="2" columns={[2]}>
                        <FormControl p="2" id="longitude">
                          <Stack direction="row" align="center">
                            <Input 
                              id="longitude"
                              onChange={(e: any) => setLng(e.target.value)} 
                              // placeholder={screenPin.lng} 
                              value={lng}
                              type="coordinates"  
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">Longitude</FormLabel>
                        </FormControl>
                        <FormControl p="2" id="latitude">
                          <Stack direction="row" align="center">
                            <Input 
                              id="latitude"
                              onChange={(e: any) => setLat(e.target.value)} 
                              // placeholder={screenPin.lat} 
                              value={lat}
                              type="coordinates"  
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">Latitude</FormLabel>
                        </FormControl>
                      </SimpleGrid>
                      <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" onClick={submitPinHandler}>Update Location</Button>
   
                    </Box>
                  )}
                </>
              ) : (
                <Text fontSize="sm">
                  WEB_SCREEN
                </Text>
              )}
            </Box>
              <Map
                props={mapProps} 
                onDblClick={handleAddPinClick}
              />  
            
          </Stack>
        )}
        <Box p="2">
          <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" onClick={submitScreenHandler}>Update Screen</Button>
        </Box>
      </Box>
    </Box>
  )
}