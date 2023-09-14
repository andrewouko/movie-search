import React from "react";
import { DetailsContextValue, HeadingContextValue, SearchContextValue } from "./types";

export const SearchContext = React.createContext<
  SearchContextValue | undefined
>(undefined);

export const DetailsContext = React.createContext<
  DetailsContextValue | undefined
>(undefined);

export const HeadingContext = React.createContext<HeadingContextValue | undefined>(
  undefined
);
