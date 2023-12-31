"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Select,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchContext } from "@lib/contexts";
import { Search, SearchSchema } from "@lib/types";
import { useContextSafely } from "@lib/utils";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCalendar3, BsSearch } from "react-icons/bs";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Search>({
    resolver: zodResolver(SearchSchema),
  });
  const router = useRouter();
  const { params, setSearchParams } = useContextSafely(SearchContext);
  const onSubmit: SubmitHandler<Search> = (data) => {
    router.push('/search/results');
    setSearchParams(data);
  };
  if(params.search.length > 0) {
    return <Progress size="lg" isIndeterminate />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid={"search-form"}>
      <VStack spacing={5}>
        <FormControl isRequired isInvalid={errors.search ? true : false}>
          <FormLabel>Search</FormLabel>
          <InputGroup>
            <InputLeftElement>{<BsSearch />}</InputLeftElement>
            <Input
              data-testid={"search-input"}
              type="search"
              placeholder="Search movies, series & episodes..."
              {...register("search")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.search?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.type ? true : false}>
          <FormLabel>Content Type</FormLabel>
          <InputGroup>
            <Select
              data-testid={"type-select"}
              variant="outline"
              placeholder="Select option"
              {...register("type")}
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </Select>
          </InputGroup>
          <FormErrorMessage>{errors?.type?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.year ? true : false}>
          <FormLabel>Release year</FormLabel>
          <InputGroup>
            <InputLeftElement>{<BsCalendar3 />}</InputLeftElement>
            <Input
              data-testid={"year-input"}
              type="number"
              min="1900"
              max="2099"
              step="1"
              placeholder="Enter release year..."
              {...register("year")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.year?.message}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          width="full"
          isLoading={isSubmitting}
          type="submit"
        >
          Find
        </Button>
      </VStack>
    </form>
  );
}
