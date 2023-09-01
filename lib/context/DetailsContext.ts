import React from "react";
import { Details } from "../../types";

type DetailsContextValue = {
  details: Details;
  setDetailsParams: React.Dispatch<React.SetStateAction<Details>>;
};

export const DetailsContext = React.createContext<
  DetailsContextValue | undefined
>(undefined);

export const useDetailsContext = (): DetailsContextValue => {
  const context = React.useContext(DetailsContext);
  if (context === undefined)
    throw new Error(
      "useDetailsContext can only be used inside a SearchContext Provider"
    );
  return context;
};
