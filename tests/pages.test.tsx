import MovieDetails from "@/app/details/page";
import SearchPage from "@/app/search/page";
import Results from "@/app/search/results/page";
import { SearchContext, DetailsContext, HeadingContext } from "@lib/contexts";
import store from "@lib/redux/store";
import { ApiError, ErrorResponse, OMDBResponseType, Search } from "@lib/types";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { server } from "../jest.setup";
import { rest } from "msw";
import sample_error_response from "@lib/mocks/sample-error-response.json";
import { useMemo } from "react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context";
import SearchLayout from "@/app/search/layout";

// Create a mock router context value
const routerContextValue: AppRouterInstance = {
  push: () => {},
  replace: () => {},
  back: () => {},
  prefetch: async () => {},
  forward: () => {},
  refresh: () => {},
};

describe("Home page", () => {
  it("renders search form", () => {
    const params: Search = { search: "" };
    const setSearchParams = () => {};
    const { container } = render(
      <AppRouterContext.Provider value={routerContextValue}>
        <SearchContext.Provider value={{ params, setSearchParams }}>
          <SearchPage />
        </SearchContext.Provider>
      </AppRouterContext.Provider>
    );

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("type-select")).toBeInTheDocument();
    expect(screen.getByTestId("year-input")).toBeInTheDocument();
  });
});
describe("Results page", () => {
  it("renders search results", async () => {
    const heading = 'Search results for "batman" in movie(s)';
    const movie_title = `BATMAN BEGINS`;
    const params: Search = { search: "batman", type: OMDBResponseType.movie };
    const setSearchParams = () => {};
    const details = { imdb_id: "" };
    const setDetailsParams = () => {};
    const { container } = render(
      <AppRouterContext.Provider value={routerContextValue}>
        <Provider store={store}>
          <SearchContext.Provider value={{ params, setSearchParams }}>
            <DetailsContext.Provider value={{ details, setDetailsParams }}>
              <SearchLayout>
                <Results />
              </SearchLayout>
            </DetailsContext.Provider>
          </SearchContext.Provider>
        </Provider>
      </AppRouterContext.Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(heading)).toBeInTheDocument();
      expect(screen.getByText(movie_title)).toBeInTheDocument();
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
    const error_title = `Error retrieving movies`;
    const params: Search = {
      search: "batman&&&&!",
      type: OMDBResponseType.movie,
    };
    const setSearchParams = () => {};
    const details = { imdb_id: "" };
    const setDetailsParams = () => {};
    const { container } = render(
      <AppRouterContext.Provider value={routerContextValue}>
        <Provider store={store}>
          <SearchContext.Provider value={{ params, setSearchParams }}>
            <DetailsContext.Provider value={{ details, setDetailsParams }}>
              <SearchLayout>
                <Results />
              </SearchLayout>
            </DetailsContext.Provider>
          </SearchContext.Provider>
        </Provider>
      </AppRouterContext.Provider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(error_title)).toBeInTheDocument();
    });
  });
});
describe("Details page", () => {
  it("renders movie details correctly", async () => {
    const movie_title = `Batman v Superman: Dawn of Justice`;
    const movie_year = `2016`;
    const params: Search = { search: "" };
    const setSearchParams = () => {};
    const details = { imdb_id: "tt2975590" };
    const setDetailsParams = () => {};
    const { container } = render(
      <AppRouterContext.Provider value={routerContextValue}>
        <Provider store={store}>
          <SearchContext.Provider value={{ params, setSearchParams }}>
            <DetailsContext.Provider value={{ details, setDetailsParams }}>
              <MovieDetails />
            </DetailsContext.Provider>
          </SearchContext.Provider>
        </Provider>
      </AppRouterContext.Provider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(movie_title)).toBeInTheDocument();
      expect(screen.getByText(movie_year)).toBeInTheDocument();
    });
  });
});
