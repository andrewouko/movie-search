"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { AiOutlineCloseSquare } from "react-icons/ai";

type Props = {
  title: string;
  message: string;
};

export default function ErrorFeedback({ title, message }: Props) {
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      align="center"
      justify="center"
      minHeight={`100vh`}
      id="search"
    >
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={"red.500"}
            rounded={"50px"}
            w={"55px"}
            h={"55px"}
            textAlign="center"
          >
            <AiOutlineCloseSquare />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {title}
        </Heading>
        <Text color={"gray.500"}>{message}</Text>
      </Box>
    </Flex>
  );
}
