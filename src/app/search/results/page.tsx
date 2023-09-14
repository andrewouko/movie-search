"use client"

import { useSearchQuery } from "@lib/redux/slices/ApiSlice";
import { CloseButton, Progress, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useContextSafely } from "@lib/utils";
import { DetailsContext, HeadingContext, SearchContext } from "@lib/contexts";
import ErrorFeedback from "@/components/Error";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

export default function Results() {
  const { params, setSearchParams } = useContextSafely(SearchContext);
  const { setHeading } = useContextSafely(HeadingContext);
  const router = useRouter();

  React.useEffect(() => {
    setHeading(`Search results for "${params.search}" in ${params?.type}(s)`);
  }, [setHeading, params]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    setSearchParams((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const { data: result, error, isLoading, isFetching } = useSearchQuery(params);

  if (isLoading || isFetching || params.search.length < 1) return <Progress size="lg" isIndeterminate />;
  if (error) {
    let error_msg = `Please try again later`;
    return (
      <ErrorFeedback title={`Error retrieving movies`} message={error_msg} />
    );
  }
  return (
    <>
      <CloseButton
        size="lg"
        onClick={() => {
          router.push('/search');
          setSearchParams({ search: "" });
        }}
      />
      <SimpleGrid columns={[1, null, 2]} spacing={10} minH="full">
        {result?.data.Search.map((movie) => (
          <Card key={movie.imdbID} {...movie} />
        ))}
      </SimpleGrid>
      <Pagination
        totalPages={result?.data?.totalPages || 1}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
