"use client";

import ErrorFeedback from "@/components/Error";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Progress,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDetailsContext } from "@lib/context/DetailsContext";
import { useDetailsQuery } from "@lib/redux/slices/ApiSlice";
import React from "react";
import { Details } from "@lib/types";

export default function MovieDetails() {
  const { details } = useDetailsContext();
  const [req, setReq] = React.useState<Details>(details);
  React.useEffect(() => {
    setReq(details);
  }, [details]);
  const year_txt_color = useColorModeValue("gray.900", "gray.400")
  const divider_color = useColorModeValue("gray.200", "gray.600")
  const plot_txt_color = useColorModeValue("gray.500", "gray.400")
  const title_txt_color = useColorModeValue("yellow.500", "yellow.300")
  const back_btn_bg_color = useColorModeValue("gray.900", "gray.50")
  const back_btn_color = useColorModeValue("white", "gray.900")
  const { data: result, error, isLoading, isFetching } = useDetailsQuery(req);
  if (isLoading || isFetching) return <Progress size="lg" isIndeterminate />;
  if (error)
    return (
      <ErrorFeedback
        title={`Error retrieving details`}
        message={`Please try again later`}
      />
    );

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={result?.data.Title}
            src={result?.data.Poster}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {result?.data.Title}
            </Heading>
            <Text
              color={year_txt_color}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {result?.data.Year}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={divider_color}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={plot_txt_color}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {result?.data.Plot}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={title_txt_color}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Production
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>{result?.data.Genre}</ListItem>
                  <ListItem>{result?.data.Language}</ListItem>{" "}
                  <ListItem>{result?.data.Runtime}</ListItem>
                  <ListItem>{result?.data.Type.toLocaleUpperCase()}</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{result?.data.Director}</ListItem>
                  <ListItem>{result?.data.Writer}</ListItem>
                  <ListItem>{result?.data.Actors}</ListItem>
                  <ListItem>{result?.data.Country}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={title_txt_color}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Metadata
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Rated:
                  </Text>{" "}
                  {result?.data.Rated}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Released:
                  </Text>{" "}
                  {result?.data.Released}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Awards:
                  </Text>{" "}
                  {result?.data.Awards}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Metascore:
                  </Text>{" "}
                  {result?.data.Metascore}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    IMDB Rating:
                  </Text>{" "}
                  {result?.data.imdbRating}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    IMDB Votes:
                  </Text>{" "}
                  {result?.data.imdbVotes}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Box Office:
                  </Text>{" "}
                  {result?.data.BoxOffice}{" "}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={back_btn_bg_color}
            color={back_btn_color}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </Button>

          {/* <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
