import Home from "@/app/page";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { SearchContext } from "@lib/context/SearchContext";
import { OMDBResponseType, Search } from "@lib/types";
import { DetailsContext } from "@lib/context/DetailsContext";
import { Provider } from "react-redux";
import store from "@lib/redux/store";
import MovieDetails from "@/app/details/page";

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import sample_response from "@lib/mocks/sample-search-response.json";

export const handlers = [
  rest.get('/api/search', (_req, res, ctx) => {
    return res(ctx.json(sample_response))
  }),
]

export const server = setupServer(...handlers)

// Enable the API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable the API mocking after the tests finished.
afterAll(() => server.close())


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
  it("renders search results", async() => {
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


    await waitFor(() => {
      expect(screen.getByText(`Error retrieving movies`)).toBeInTheDocument()
    })

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
  });
});
