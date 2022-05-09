import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { TextField } from '@material-ui/core';

import {LoadingBox, MessageBox} from '../../components/helpers';
import { signin } from '../../Actions/userActions';


export function Signin(props: any) {

  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Stack>
      <Heading fontSize="30px" textAlign="center">
        Any one can advertise...
      </Heading>
      <hr />
      <SimpleGrid columns={[1, 2]} gap="4" p="10px">
        <Image 
          height="100%"
          src={`https://6cwluhoue2meh5wnka3ebaox6tlwlz6zdmabkyvplsltf7c6.arweave.net/8Ky_6HdQmmEP2zVA2QIHX9Ndl59kbAB_Vir1yXMvxeM`} 
          alt="sign_in_image" 
        />
        <Stack shadow="card" p="10px" rounded="md">
          <Heading fontSize="" textAlign="center">
            Welcome Back Again
          </Heading>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Stack direction="row" align="center">
              <Input 
                id="email"
                onChange={(e) => setEmail(e.target.value)} 
                placeholder={email} 
                value={email}
                required
                type="email"  
              />
            </Stack>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Stack direction="row" align="center">
              <Input 
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
                placeholder={password} 
                value={password}
                required
                type="password"  
              />
            </Stack>
          </FormControl>
          
          <Text fontSize="70%"> If you don't remember your password {' '}
            <Link to="/forgot_password"> click here to reset your password</Link>{' '}
          </Text>
          <Button fontSize="70%" type="submit" onClick={submitHandler}>
            By clicking on this LOGIN button, I agree to its all <Link as={RouterLink} to="/terms_and_conditions"> Terms and Conditions</Link>
          </Button>
          <Text>Not a registered user?
            <Link as={RouterLink} to={`/signup?redirect=${redirect}`}>Click here to register</Link>
          </Text>
        </Stack>
      </SimpleGrid>
      <hr />
      <Heading fontSize="30px" textAlign="center">
        Increase your advertising revenue...
      </Heading>
      <hr />
    </Stack>
  )
}