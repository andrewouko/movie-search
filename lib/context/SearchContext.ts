import React from "react";
import { Search } from "../../types";

type SearchContextValue = {
  params: Search;
  setSearchParams: React.Dispatch<React.SetStateAction<Search>>;
};

export const SearchContext = React.createContext<
  SearchContextValue | undefined
>(undefined);

export const useSearchContext = (): SearchContextValue => {
  const context = React.useContext(SearchContext);
  if (context === undefined)
    throw new Error(
      "useSearchContext can only be used inside a SearchContext Provider"
    );
  return context;
};
