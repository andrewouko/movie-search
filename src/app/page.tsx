"use client";
import List from "@/components/List";
import SearchForm from "@/components/SearchForm";
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useSearchContext } from "@lib/context/SearchContext";

export default function Home() {
  const { params, setSearchParams } = useSearchContext();
  const default_heading = "Find content"
  const [heading, setHeading] = React.useState<string>(default_heading);
  const [showForm, setShowForm] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (params.search.length > 0) {
      setShowForm(false);
    }
  }, [params]);
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      align="center"
      justify="center"
      minHeight={`100vh`}
      id="search"
    >
      <Box
        borderRadius="lg" /* m={{ base: 5, md: 16, lg: 10 }} */ /* p={{ base: 5, lg: 8 }} */
        className="fiesta"
      >
        <Box>
          <VStack /* spacing={{ base: 4, md: 8, lg: 10 }} */>
            <Heading
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
            >
              {heading}
            </Heading>
            <Box
              bg={useColorModeValue("white", "gray.700")}
              borderRadius="lg"
              p={8}
              color={useColorModeValue("gray.700", "whiteAlpha.900")}
              shadow="base"
              w={[300, 400, showForm ? 500 : 800]}
            >
              {showForm && <SearchForm />}
              {!showForm && (
                <CloseButton
                  size="lg"
                  onClick={() => {
                    setShowForm(true);
                    setHeading(default_heading)
                    setSearchParams({search: ""})
                  }}
                />
              )}
              {!showForm && <List {...{ setHeading, setShowForm }} />}
            </Box>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
