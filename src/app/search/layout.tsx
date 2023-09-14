"use client";
import {
  Box,
  Flex,
  Heading,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { HeadingContext, SearchContext } from "@lib/contexts";
import { useContextSafely } from "@lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function SearchLayout({ children }: Props) {
  const { params } = useContextSafely(SearchContext);
  const default_heading = "Find content";
  const [heading, setHeading] = React.useState<string>(default_heading);
  const [showSmallBox, setShowSmallBox] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (params.search.length > 0) {
      setShowSmallBox(false);
    } else {
      setShowSmallBox(true);
      setHeading(default_heading);
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
              w={[300, 400, showSmallBox ? 500 : 800]}
            >
              <HeadingContext.Provider value={{ heading, setHeading }}>
                {children}
              </HeadingContext.Provider>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
