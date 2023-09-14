import {
  ApiError,
  ApiResponse,
  ErrorResponse,
  ErrorStatusCodes,
  ErrorTypes,
  StatusCodes,
  SuccessStatusCodes
} from "@lib/types";
import React from "react";

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
    if (payload.Error.toLowerCase().includes("not found")) status = ErrorStatusCodes.NOT_FOUND;
    if (payload.Error.toLowerCase().includes("incorrect")) status = ErrorStatusCodes.BAD_REQUEST;
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


export const useContextSafely = <T>(new_context: React.Context<T>) => {
  const context = React.useContext(new_context);
  if(context === undefined) {
      throw new Error(`useContextSafely must be used within a Provider`)
  }
  return context;
}