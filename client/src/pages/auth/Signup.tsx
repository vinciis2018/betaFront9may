import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import {LoadingBox, MessageBox} from '../../components/helpers';
import { signup } from '../../Actions/userActions';


export function Signup(props: any) {

  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');

  const [modalVisible, setModalVisible] = useState<any>(false);

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/';

  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const openModal = () => {
    setModalVisible(true);
  };


  const dispatch = useDispatch();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password donot match')
    } else {
      dispatch(signup(name, email, password));
      dispatch(openModal)

      props?.history?.push('/signin');
  
    }
  };

  useEffect(() => {
    if (userInfo) {
      props?.history?.push(redirect);
    }
  }, [props?.history, redirect, userInfo]);

  return (
    <Stack>
      <Heading textAlign="center">
        KEEP CALM AND WATCH ADS AS NEVER BEFORE
      </Heading>
      <hr />

      {modalVisible ? (
        <Text textAlign="center">Please check your email for the completing the registration process. Please contact @
            <Link as={RouterLink} to="/signin">itisvinciis@gmail.com</Link> in case you don't recieve our email.
        </Text>
      ) : (
        <Flex>
          <img 
            width="50%"
            src="../../../images/sign_up_image.png" 
            alt="sign_up_image" 
            />
          <Stack width="50%">
            <Heading fontSize="" textAlign="center">Please enter your details</Heading>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="name"
                  onChange={(e) => setName(e?.target?.value)} 
                  placeholder={name} 
                  value={name}
                  required
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="email"
                  onChange={(e) => setEmail(e?.target?.value)} 
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
                  onChange={(e) => setPassword(e?.target?.value)} 
                  placeholder={password} 
                  value={password}
                  required
                  type="password"  
                />
              </Stack>
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e?.target?.value)} 
                  placeholder={confirmPassword} 
                  value={confirmPassword}
                  required
                  type="password"  
                />
              </Stack>
            </FormControl>
            <Button type="submit" onClick={submitHandler}>
              REGISTER
            </Button>
            <Text className="title">Already a user?
              <Link as={RouterLink} to={`/signin?redirect=${redirect}`}>Click here to login</Link>
            </Text>
          </Stack>
        </Flex>
      )}
      <hr />
      <Heading fontSize="" textAlign="center">KEEP CALM AND WATCH ADS AS NEVER BEFORE</Heading>
      <hr />

    </Stack>
  )
}