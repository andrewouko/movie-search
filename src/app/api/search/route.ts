import { isApiError, jsonResponse } from "@lib/utils";
import sample_response from "@lib/mocks/sample-search-response.json";
import sample_error_response from "@lib/mocks/sample-error-response.json";
import sample_auth_error_response from "@lib/mocks/sample-auth-error-response.json";
import {
  SearchResponseBody,
  Search,
  SearchSchema,
  StatusCodes,
  ApiError,
} from "@lib/types";
import { NextResponse } from "next/server";
import { SafeParseReturnType } from "zod";

export async function GET(req: Request): Promise<NextResponse> {
  const request_body = Object.fromEntries(
    new URL(req.url).searchParams
  ) as unknown as Search;
  const validation_result = validateRequest(request_body);
  if (!validation_result.success)
    return jsonResponse(400, validation_result.error.message);
  return await searchOMDBApi(request_body);
}

const validateRequest = (
  request_body: Search
): SafeParseReturnType<Search, Search> => {
  request_body.page = Number(request_body.page) || undefined;
  request_body.year = Number(request_body.year) || undefined;
  return SearchSchema.safeParse(request_body);
};

const searchOMDBApi = async (request_body: Search): Promise<NextResponse> => {
  try {
    const params = new URLSearchParams({
      s: request_body.search,
      ...(request_body.type && { type: request_body.type }),
      ...(request_body.year && { y: request_body.year.toString() }),
      ...(request_body.page && { page: request_body.page.toString() }),
      ...(process.env.API_KEY && { apikey: process.env.API_KEY }),
    })

    // console.log("http://www.omdbapi.com?" + params.toString())

    const res = await fetch(
      "http://www.omdbapi.com?" + params.toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const status = (await res.status) as StatusCodes;
    const data = (await res.json()) as SearchResponseBody | ApiError;
    if(!isApiError<SearchResponseBody>(data) && data.totalResults) data.totalPages = Math.ceil(Number(data.totalResults) / 10)
    /* const status = 200
    let data: SearchResponseBody
    data = {
      ...sample_response,
      totalPages: Math.ceil(Number(sample_response.totalResults) / 10)
    } */
    /* // const status = 401;
    const status = 404;
    // const data = sample_auth_error_response;
    const data = sample_error_response; */
    return jsonResponse<SearchResponseBody | ApiError>(status, data);
  } catch (err: any) {
    return jsonResponse(500, (err as Error).message);
  }
};
