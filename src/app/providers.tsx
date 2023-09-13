"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "@lib/redux/store";
import React from "react";
import { Details, Search } from "@lib/types";
import { SearchContext } from "@lib/context/SearchContext";
import { DetailsContext } from "@lib/context/DetailsContext";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  const [params, setSearchParams] = React.useState<Search>({ search: "" });
  const [details, setDetailsParams] = React.useState<Details>({ imdb_id: "" });
  return (
    <CacheProvider>
      <ChakraProvider>
        <Provider store={store}>
          <SearchContext.Provider value={{ params, setSearchParams }}>
            <DetailsContext.Provider value={{ details, setDetailsParams }}>
              {children}
            </DetailsContext.Provider>
          </SearchContext.Provider>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
