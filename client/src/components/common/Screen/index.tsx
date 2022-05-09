import React from 'react'
import {Link as RouterLink} from 'react-router-dom';
import { Box, Image, Flex, Stack, Button, Link, Text, IconButton } from "@chakra-ui/react";
import { triggerPort } from 'services/utils';
import { Rating } from 'components/helpers';

export function Screen(props: any) {
  const { screen } = props;

  return (
    <Box shadow="card" rounded="lg" p="2" key={screen._id} >
      <Box p="1">
        <Image 
          width="100%"
          height="150px"
          borderRadius="10px"
          src={screen?.image}
          onLoad={() =>  triggerPort(screen?.image?.split("/").slice(-1)[0])}
        />
      </Box>
      
      <Stack p="1">
        <Text fontSize="xs" fontWeight="600">{screen?.name}</Text>
        <Text fontSize="sm" color="gray.500">({screen?.category})</Text>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="xs" color="">Available Slots</Text>
            <Text></Text>
          </Box>
          <Rating rating={screen.rating} numReviews={screen.numReviews} />
        </Flex>
      </Stack>
      <Flex mb="0" pb="0">
        <Button as={RouterLink} to={`/screen/${screen._id}`} p="1" width="100%" color="violet.500" variant="outline">View</Button>
      </Flex>
    </Box>
  )
}
