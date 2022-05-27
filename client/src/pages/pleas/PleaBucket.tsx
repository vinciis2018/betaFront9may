import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, FormControl, Input, Heading, Image, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, FormLabel, Select } from "@chakra-ui/react";

import { listAllPleas } from '../../Actions/pleaActions';
import { listUsers } from '../../Actions/userActions';
import { rejectScreenAllyPlea, grantScreenAllyPlea } from '../../Actions/screenActions';
import {LoadingBox} from '../../components/helpers/LoadingBox';
import {MessageBox} from '../../components/helpers/MessageBox';

export function PleaBucket (props: any) {

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;

  const userSignin = useSelector((state: any) => state.userSignin);
  const {userInfo} = userSignin; 

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const screenAllyPleaGrant = useSelector((state: any) => state.screenAllyPleaGrant);
  const {
    loading: loadingScreenAllyPleaGrant,
    error: errorScreenAllyPleaGrant,
    success: successScreenAllyPleaGrant,
  } = screenAllyPleaGrant;

  const screenAllyPleaReject = useSelector((state: any) => state.screenAllyPleaReject);
  const {
    loading: loadingScreenAllyPleaReject,
    error: errorScreenAllyPleaReject,
    success: successScreenAllyPleaReject
  } = screenAllyPleaReject;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(successScreenAllyPleaGrant){
      window.alert("Ally access Granted")
    }
    if(successScreenAllyPleaReject){
      window.alert("Ally access Rejected")
    }
    dispatch(listAllPleas());
    dispatch(listUsers());
      
  }, [dispatch, userInfo, successScreenAllyPleaGrant, successScreenAllyPleaReject]);

  const allyAccessHandler = (pleaId: any) => {
    window.confirm("Are you sure?")
    dispatch(grantScreenAllyPlea(pleaId))
  }

  const allyRemoveHandler = (pleaId: any) => {
    window.confirm("Are you sure?")
    dispatch(rejectScreenAllyPlea(pleaId))
  }
  
  return (
    <Flex p="10px">
      {loadingScreenAllyPleaGrant && <LoadingBox></LoadingBox>}
      {errorScreenAllyPleaGrant && <MessageBox variant="danger">{errorScreenAllyPleaGrant}</MessageBox>}
      {loadingScreenAllyPleaReject && <LoadingBox></LoadingBox>}
      {errorScreenAllyPleaReject && <MessageBox variant="danger">{errorScreenAllyPleaReject}</MessageBox>}
      {loadingAllPleas ? (
        <LoadingBox></LoadingBox>
      ) : errorAllPleas ? (
        <MessageBox variant="danger">{errorAllPleas}</MessageBox>
      ) : (
        <Stack width="100%" p="10px">
          {userInfo && (
            <Box>
              <Heading align="center" fontSize="100%">Pleas I made</Heading>
              <hr/>
              {allPleas.filter((plea: any) => plea.from === userInfo._id).map((plea: any) =>  (
                <Box shadow="card" p="10px" justify="space-between" px="5px"  key={plea._id}>
                  {loadingUsers ? (
                    <LoadingBox></LoadingBox>
                  ) : errorUsers ? (
                    <MessageBox variant="danger">{errorUsers}</MessageBox>
                  ) : (
                    <Flex>
                      {users.filter((user: any) => user._id === plea.to).map((user: any) => (
                        <Heading fontSize="70%">To: {user.name}</Heading>
                      ))}
                      {plea.reject && <Heading fontSize="70%" color="red">Access Revoked</Heading>}
                    </Flex>
                  )}
                  <Text fontSize="70%">{plea.content}</Text>
                  <Text fontSize="70%">Type: {plea.pleaType}</Text>
                  <Text fontSize="70%">Screen: {plea.screen} </Text>
                  <Stack color={plea.status ? "green" : "red"}>Status: {plea.status ? (<Heading>Granted</Heading>) : (<Heading>In Process</Heading>)}</Stack>
                </Box>
              ))}
            </Box>
         )}
         {userInfo.isMaster && (
           <Box>
            <Heading align="center" fontSize="100%">Pleas I recieved</Heading>
            <hr/>
             {allPleas.filter((plea: any) => plea.to === userInfo._id).map((plea: any) => (
              <Box shadow="card" p="10px" justify="space-between" px="5px" key={plea._id}>
                {loadingUsers ? (
                  <LoadingBox></LoadingBox>
                ) : errorUsers ? (
                  <MessageBox variant="danger">{errorUsers}</MessageBox>
                ) : (
                  <Flex p="5px" justify="space-between">
                    {users.filter((user: any) => user._id === plea.from).map((user: any) => (
                      <Heading fontSize="70%">From: {user.name}</Heading>
                    ))}
                    {!plea.status && <Button width="20%" fontSize="50%" onClick={() => allyAccessHandler(plea._id)}>Give Access</Button>}
                    {plea.status && <Button width="20%" fontSize="50%" onClick={() => allyRemoveHandler(plea._id)}>Revoke Access</Button>}
                  </Flex>
                )}
                <Text fontSize="70%">{plea.content}</Text>
                <Text fontSize="70%">Type: {plea.pleaType}</Text>
                <Text fontSize="70%">Screen: {plea.screen} </Text>
                <Stack color={plea.status ? "green" : "red"}>Status: {plea.status ? (<Heading fontSize="70%">Granted</Heading>) : (<Heading fontSize="70%">In Process</Heading>)}</Stack>
              </Box>
             ))}
           </Box>
         )}
         <hr />
         {userInfo.isItanimulli && (
            <Box>
              <Heading align="center" fontSize="100%">All Requests</Heading>
              <hr/>
              {allPleas.map((plea: any) => (
                <Box shadow="card" p="10px" justify="space-between" px="5px" key={plea._id}>
                    {loadingUsers ? (
                      <LoadingBox></LoadingBox>
                    ) : errorUsers ? (
                      <MessageBox variant="danger">{errorUsers}</MessageBox>
                    ) : (
                      <Flex p="5px" justify="space-between">
                        {users.filter((user: any) => user._id === plea.from).map((user: any) => (
                          <Heading fontSize="70%">From: {user.name}</Heading>
                        ))}
                        {users.filter((user: any) => user._id === plea.to).map((user: any) => (
                          <Heading fontSize="70%">To: {user.name}</Heading>
                        ))}
                      </Flex>
                    )}
                    <Text fontSize="70%">{plea.content}</Text>
                    <Text fontSize="70%">Type: {plea.pleaType}</Text>
                    <Text fontSize="70%">Screen: {plea.screen} </Text>
                    <Stack color={plea.status ? "green" : "red"}>Status: {plea.status ? (<Heading fontSize="70%">Granted</Heading>) : (<Heading fontSize="70%">In Process</Heading>)}</Stack>
                </Box>
              ))}
            </Box>
          )}
         {!userInfo && (
           <Text fontSize="">PleaseSignin</Text>
         )}
        </Stack>
      )}
    </Flex>
  );
}