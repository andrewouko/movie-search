import { NextResponse } from "next/server";
import { SafeParseReturnType } from "zod";
import {
  ApiError,
  ApiResponse,
  Details,
  DetailsResponseBody,
  DetailsSchema,
  ErrorResponse,
  SearchResponseBody,
  StatusCodes,
} from "@lib/types";
import { formatErrorResponse, formatResponse, isApiError, jsonResponse } from "@lib/utils";
import sample_response from "@lib/mocks/sample-details-response.json";

export async function GET(req: Request): Promise<Response> {
  const request_body = Object.fromEntries(
    new URL(req.url).searchParams
  ) as unknown as Details;
  const validation_result = validateRequest(request_body);
  if (!validation_result.success)
    return jsonResponse(formatErrorResponse(400, validation_result.error.message));
  return jsonResponse(await getDetails(request_body));
}

const validateRequest = (
  request_body: Details
): SafeParseReturnType<Details, Details> => {
  return DetailsSchema.safeParse(request_body);
};

const getDetails = async (request_body: Details): Promise<ApiResponse<DetailsResponseBody> | ErrorResponse> => {
  try {
    let params = {
      ...{ i: request_body.imdb_id },
      ...(request_body.plot && { plot: request_body.plot }),
      ...(process.env.API_KEY && { apikey: process.env.API_KEY }),
    };

    const res = await fetch(
      "http://www.omdbapi.com?" + new URLSearchParams(params).toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const status = (await res.status) as StatusCodes;
    const data = (await res.json()) as DetailsResponseBody | ApiError;

    /* const status =  200
    const data = sample_response */
    if(isApiError(data)){
      return formatErrorResponse(status, data);
    }

    return formatResponse<DetailsResponseBody>(status, data);
  } catch (err: any) {
    return formatErrorResponse(500, (err as Error).message);
  }
};
