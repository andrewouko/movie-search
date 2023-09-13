import { NextApiRequest } from "next/types";
import { TypeOf } from "zod";
import {
  ApiError,
  ApiResponse,
  ErrorResponse,
  ErrorStatusCodes,
  OMDBResponseType,
  Search,
  SearchSchema,
  StatusCodes,
  ValidationError,
} from "@lib/types";
import { NextResponse } from "next/server";

export function isApiError<T>(data: T | ApiError): data is ApiError {
  return (data as ApiError).Error !== undefined;
}

const setApiErrorReponseStatus = (status: StatusCodes, data: ApiError): ErrorStatusCodes => {
  if(data.Error.toLowerCase().includes("not found"))
    return 404
  if(data.Error.toLowerCase().includes("incorrect"))
    return 400
  return status as ErrorStatusCodes
}

function formatResponse<T>(
  status: StatusCodes,
  data: T | ApiError | string
): ApiResponse<T> | ErrorResponse {
  if (typeof data === "string" && status !== 200) {
    try {
      data = JSON.parse(data);
    } catch (err) {}
    return {
      status,
      error: data as ValidationError | string
    }
  }
  if (typeof data !== "string" && isApiError<T>(data)){
    status = setApiErrorReponseStatus(status, data)
    return {
      status,
      error: data,
    };
  }
  return {
    status: 200,
    data: data as T,
  };
}

export function jsonResponse<T>(
  status: StatusCodes,
  data: T | ApiError | string
): NextResponse {
  const response = formatResponse<T>(status, data);
  return NextResponse.json(response, { status: response.status });
}

export interface SearchRequest extends NextApiRequest {
  body: TypeOf<typeof SearchSchema>;
}
