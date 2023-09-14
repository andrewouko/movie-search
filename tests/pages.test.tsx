import MovieDetails from "@/app/details/page";
import Home from "@/app/page";
import { DetailsContext } from "@lib/context/DetailsContext";
import { SearchContext } from "@lib/context/SearchContext";
import store from "@lib/redux/store";
import {
  ApiError,
  ErrorResponse,
  OMDBResponseType,
  Search
} from "@lib/types";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { server } from "../jest.setup";
import { rest } from "msw";
import sample_error_response from "@lib/mocks/sample-error-response.json";

describe("Home page", () => {
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
  it("renders search results", async () => {
    const params: Search = { search: "batman", type: OMDBResponseType.movie };
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

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('Search results for "batman" in movie(s)')
      ).toBeInTheDocument();
      expect(screen.getByText(`BATMAN BEGINS`)).toBeInTheDocument();
    });
  });
  it("renders error component", async () => {
    // custom middleware & route to trigger error
    server.use(
      rest.get("/api/search", (_req, res, ctx) => {
        const status = 404;
        const data: ApiError = sample_error_response;
        const response: ErrorResponse = {
          status,
          error: data,
        };
        return res(ctx.status(status), ctx.json(response));
      })
    );
    const params: Search = {
      search: "batman&&&&!",
      type: OMDBResponseType.movie,
    };
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
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(`Error retrieving movies`)).toBeInTheDocument();
    });
  });
});
describe("Details page", () => {
  it("renders movie details correctly", async () => {
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
    await waitFor(() => {
      expect(
        screen.getByText(`Batman v Superman: Dawn of Justice`)
      ).toBeInTheDocument();
      expect(screen.getByText(`2016`)).toBeInTheDocument();
    });
  });
});
