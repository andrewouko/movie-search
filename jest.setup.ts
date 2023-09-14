import {
  ApiResponse,
  DetailsResponseBody,
  SearchResponseBody,
} from "@lib/types";
import { rest } from "msw";
import { setupServer } from "msw/node";

import sample_details_response from "@lib/mocks/sample-details-response.json";
import sample_response from "@lib/mocks/sample-search-response.json";


import { fetch, Headers, Request, Response } from "cross-fetch";

import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd())

// RTK does not have fetch available
// so we use cross-fetch
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

export const handlers = [
  rest.get("/api/search", (_req, res, ctx) => {
    const status = 200;
    let data: SearchResponseBody;
    data = {
      ...sample_response,
      totalPages: Math.ceil(Number(sample_response.totalResults) / 10),
    };
    let response: ApiResponse<SearchResponseBody>;
    response = {
      status,
      data,
    };
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get("/api/search/details", (_req, res, ctx) => {
    const status = 200;
    const data: DetailsResponseBody = sample_details_response;
    const response: ApiResponse<DetailsResponseBody> = {
      status,
      data,
    };
    return res(ctx.status(200), ctx.json(response));
  })
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
