import {
  ApiError,
  ApiResponse,
  ErrorResponse,
  ErrorStatusCodes,
  ErrorTypes,
  StatusCodes,
  SuccessStatusCodes,
  ValidationError,
} from "@lib/types";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function isApiError<T>(payload: ErrorTypes | T): payload is ApiError {
  return (payload as ApiError).Error !== undefined;
}

function isSuccessStatus(status: StatusCodes): status is SuccessStatusCodes {
  return (
    status === SuccessStatusCodes.OK ||
    status === SuccessStatusCodes.NO_CONTENT ||
    status === SuccessStatusCodes.PARTIAL_CONTENT
  );
}

export function formatErrorResponse(
  status: StatusCodes,
  payload: ErrorTypes
): ErrorResponse {
  if (isSuccessStatus(status))
    status = ErrorStatusCodes.INTERNAL_SERVER_ERROR;
  if (isApiError(payload)) {
    if (payload.Error.toLowerCase().includes("not found")) status = 404;
    if (payload.Error.toLowerCase().includes("incorrect")) status = 400;
  }
  return {
    status,
    error: payload,
  };
}

export function formatResponse<T>(
  status: StatusCodes,
  payload: T
): ApiResponse<T> {
  if(!isSuccessStatus(status)) status = SuccessStatusCodes.OK;
  return {
    status,
    data: payload,
  };
}

export function jsonResponse<T>(
  payload: ApiResponse<T> | ErrorResponse
): Response {
  const responseBody = JSON.stringify(payload);
  const response = new Response(responseBody, {
    status: payload.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}
