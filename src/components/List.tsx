import { useSearchQuery } from "@/app/Redux/Slices/ApiSlice";
import { useSearchContext } from "../../lib/context/SearchContext";
import { Progress, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import ErrorFeedback from "./Error";
import { useDetailsContext } from "../../lib/context/DetailsContext";
import Pagination from "./Pagination";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
};

export default function List({ setHeading, setShowForm }: Props) {
  const { params, setSearchParams } = useSearchContext();
  const { details } = useDetailsContext();
  React.useEffect(() => {
    setHeading(`Search results for "${params.search}" in ${params?.type}(s)`);
    setShowForm(false);
  }, [setHeading, setShowForm, params, details]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    setSearchParams(prev => ({
      ...prev,
      page: value
    }))
  }
  const { data: result, error, isLoading, isFetching } = useSearchQuery(params);
  if (isLoading || isFetching) return <Progress size="lg" isIndeterminate />;
  if (error){
    let error_msg = `Please try again later`
    return (
      <ErrorFeedback
        title={`Error retrieving movies`}
        message={error_msg}
      />
    );
  }
  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing={10} minH="full">
        {result?.data.Search.map((movie) => (
          <Card key={movie.imdbID} {...movie} />
        ))}
      </SimpleGrid>
      <Pagination totalPages={result?.data?.totalPages || 1} currentPage={currentPage} handlePageChange={handlePageChange} />
    </>
  );
}
