import React, { useState, useEffect } from "react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import { useSearchContext } from "@lib/context/SearchContext";

type Props = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (value: number) => void;
};

export default function PaginationComponent({
  totalPages,
  currentPage,
  handlePageChange,
}: Props) {
  const { pagesCount, pages } = usePagination({
    pagesCount: totalPages,
    initialState: { currentPage },
    limits: {
      outer: 1,
      inner: 1,
    },
  });

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <PaginationContainer>
        <PaginationPrevious>Prev</PaginationPrevious>
        <PaginationPageGroup>
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w={7}
              bg="red.300"
              fontSize="sm"
              _hover={{
                bg: "green.300",
              }}
              _current={{
                w: 7,
                bg: "green.300",
                fontSize: "sm",
                _hover: {
                  bg: "blue.300",
                },
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext>Next</PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
}
