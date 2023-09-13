import Home from "@/app/page";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { SearchContext } from "@lib/context/SearchContext";
import { OMDBResponseType, Search } from "@lib/types";
import { DetailsContext } from "@lib/context/DetailsContext";
import { Provider } from "react-redux";
import store from "@lib/redux/store";
import MovieDetails from "@/app/details/page";
import preview from 'jest-preview';


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
    const params: Search = { search: "batman", type: OMDBResponseType.movie};
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

    preview.debug();

    expect(
      container.getElementsByClassName("chakra-heading")[0].innerHTML
    ).toContain('Search results for "batman"');
  });
  it("renders error component", async() => {
    const params: Search = { search: "batman&&&&!", type: OMDBResponseType.movie };
    const setSearchParams = () => { };
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

    // preview.debug()

    await new Promise(r => setTimeout(r, 2000));

    expect(
      container.getElementsByClassName("chakra-heading")[0].innerHTML
    ).toContain("Error retrieving movies");

    // preview.debug()
  });
  it("renders details page", async () => {
    const params: Search = { search: "" };
    const setSearchParams = () => {};
    const details = { imdb_id: "tt2975590" };
    const setDetailsParams = () => {};
    act(() => {
      const { container } = render(
        <Provider store={store}>
          <SearchContext.Provider value={{ params, setSearchParams }}>
            <DetailsContext.Provider value={{ details, setDetailsParams }}>
              <MovieDetails />
            </DetailsContext.Provider>
          </SearchContext.Provider>
        </Provider>
      );
      console.log(container.getElementsByClassName("chakra-button"))
      expect(
        container.getElementsByClassName("chakra-button")[0].innerHTML
      ).toContain("Back")
    });



    // await new Promise(r => setTimeout(r, 2000));

    // expect(screen.getByRole("progressbars")).toBeInTheDocument();

    /* expect(
      container.getElementsByClassName("chakra-button")[0].innerHTML
    ).toContain("Back"); */
  });
});
