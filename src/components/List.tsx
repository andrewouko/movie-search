import { useSearchQuery } from "@/app/Redux/Slices/ApiSlice";
import { useSearchContext } from "../../lib/context/SearchContext";
import { Progress, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import ErrorFeedback from "./Error";
import Details from "./Details";
import { useDetailsContext } from "../../lib/context/DetailsContext";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
};

export default function List({ setHeading, setShowForm }: Props) {
  const { params } = useSearchContext();
  React.useEffect(() => {
    setHeading(`Search results for "${params.search}" in ${params?.type}(s)`);
    setShowForm(false);
  }, [setHeading, setShowForm, params]);
  const { data: result, error, isLoading, isFetching } = useSearchQuery(params);
  if (isLoading || isFetching) return <Progress size="lg" isIndeterminate />;
  if (error)
    return (
      <ErrorFeedback
        title={`Error retrieving movies`}
        message={`Please try again later`}
      />
    );
  return (
    <SimpleGrid columns={[1, null, 2]} spacing={10} minH="full">
      {result?.data.Search.map((movie) => (
        <Card key={movie.imdbID} {...movie} />
      ))}
    </SimpleGrid>
  );
}
