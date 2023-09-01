import Home from "@/app/page";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { SearchContext } from "../lib/context/SearchContext";
import { Search } from "../types";
import { DetailsContext } from "../lib/context/DetailsContext";
import { Provider } from "react-redux";
import store from "@/app/Redux/store";
import MovieDetails from "@/app/details/page";
import { GET } from "@/app/api/search/route";
import { createMocks } from "node-mocks-http";

describe("Home", () => {
  it("renders search form", () => {
    const params: Search = { search: "" };
    const setSearchParams = () => {};
    const { container } = render(
      <SearchContext.Provider value={{ params, setSearchParams }}>
        <Home />
      </SearchContext.Provider>
    );

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("type-select")).toBeInTheDocument();
    expect(screen.getByTestId("year-input")).toBeInTheDocument();
  });
  it("renders search results", () => {
    const params: Search = { search: "batman", type: "movie" };
    const setSearchParams = () => {};
    const details = { imdb_id: "" };
    const setDetailsParams = () => {};
    const { container } = render(
      <Provider store={store}>
        <SearchContext.Provider value={{ params, setSearchParams }}>
          <DetailsContext.Provider value={{ details, setDetailsParams }}>
            <Home />
          </DetailsContext.Provider>
        </SearchContext.Provider>
      </Provider>
    );

    expect(
      container.getElementsByClassName("chakra-heading")[0].innerHTML
    ).toContain('Search results for "batman"');
  });
  it("renders error component", () => {
    const params: Search = { search: "batman&&&&!", type: "movie" };
    const setSearchParams = () => {};
    const details = { imdb_id: "" };
    const setDetailsParams = () => {};
    const { container } = render(
      <Provider store={store}>
        <SearchContext.Provider value={{ params, setSearchParams }}>
          <DetailsContext.Provider value={{ details, setDetailsParams }}>
            <Home />
          </DetailsContext.Provider>
        </SearchContext.Provider>
      </Provider>
    );

    expect(
      container.getElementsByClassName("chakra-heading")[0].innerHTML
    ).toContain("Error retrieving movies");
  });
  it("renders details page", async () => {
    const params: Search = { search: "" };
    const setSearchParams = () => {};
    const details = { imdb_id: "tt2975590" };
    const setDetailsParams = () => {};
    const { container } = render(
      <Provider store={store}>
        <SearchContext.Provider value={{ params, setSearchParams }}>
          <DetailsContext.Provider value={{ details, setDetailsParams }}>
            <MovieDetails />
          </DetailsContext.Provider>
        </SearchContext.Provider>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // await new Promise(r => setTimeout(r, 2000));

    // expect(screen.getByRole("progressbars")).toBeInTheDocument();

    /* expect(
      container.getElementsByClassName("chakra-button")[0].innerHTML
    ).toContain("Back"); */
  });
});
