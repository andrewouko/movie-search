import { useDetailsQuery } from "@/app/Redux/Slices/ApiSlice";
import {
  Avatar,
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  useColorModeValue,
  useDisclosure,
  Image,
  Text,
  Progress
} from "@chakra-ui/react";
import React from "react";
import ErrorFeedback from "./Error";
import { useDetailsContext } from "../../lib/context/DetailsContext";

export type Props = {
  open: boolean;
};
export default function Details({open}: Props) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { details, setDetailsParams } = useDetailsContext();
  const { data: result, error, isLoading, isFetching } = useDetailsQuery(details);
  if (isLoading || isFetching) return <Progress size="lg" isIndeterminate />;
  if (error) return <ErrorFeedback title={`Error retrieving details`} message={`Please try again later`} />;
  return (
    <Drawer onClose={() => {
        onClose()
        setDetailsParams({imdb_id: ""})
    }} isOpen={open} placement='right' >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>{result?.data.Title}</DrawerHeader>
        <DrawerBody>
          <Center py={6}>
            <Box
              maxW={"445px"}
              w={"full"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"md"}
              p={6}
              overflow={"hidden"}
            >
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}
              >
                <Image
                  src={result?.data.Poster}
                //   fit={`fill`}
                  alt="Example"
                />
              </Box>
              <Stack>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {result?.data.Type}
                </Text>
                <Heading
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color={useColorModeValue("gray.700", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {result?.data.Title}
                </Heading>
                <Text color={"gray.500"}>{result?.data.Plot}</Text>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{result?.data.Genre}</Text>
                  <Text color={"gray.500"}>{`${result?.data.Year} · ${result?.data.Runtime}`}</Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
