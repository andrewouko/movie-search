import { z } from "zod";
export enum ErrorStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
export enum SuccessStatusCodes {
  OK = 200,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206
}
export type StatusCodes = ErrorStatusCodes | SuccessStatusCodes;
export type ApiResponse<T> = {
  status: SuccessStatusCodes;
  data: T;
};
export type ApiError = {
  Response: string;
  Error: string;
};
export type ValidationError = Array<{
  code: string;
  expected: string;
  received: string;
  path: Array<string>;
  message: string;
}>;

export type ErrorTypes = ValidationError | ApiError | string;

export type ErrorResponse = {
  status: ErrorStatusCodes;
  error: ErrorTypes;
};

export enum OMDBResponseType {
  movie = "movie",
  series = "series",
  episode = "episode",
}

// export type OMDBResponseType = "movie" | "series" | "episode";

export const SearchSchema = z.object({
  search: z.string().min(1),
  type: z.nativeEnum(OMDBResponseType).optional(),
  year: z.coerce.number().optional(),
  page: z.number().optional(),
});

export type Search = z.infer<typeof SearchSchema>;

export type SearchResponseItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type SearchResponseBody = {
  Search: Array<SearchResponseItem>;
  totalResults: string;
  Response: string;
  totalPages?: number;
};

export enum PlotType {
  short = "short",
  full = "full",
}

export const DetailsSchema = z.object({
  imdb_id: z.string().min(1),
  plot: z.nativeEnum(PlotType).optional(),
});

export type Details = z.infer<typeof DetailsSchema>;

export type Ratings = Array<{
  Source: string;
  Value: string;
}>;

export type DetailsResponseBody = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Ratings;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type DetailsContextValue = {
  details: Details;
  setDetailsParams: React.Dispatch<React.SetStateAction<Details>>;
};

export type SearchContextValue = {
  params: Search;
  setSearchParams: React.Dispatch<React.SetStateAction<Search>>;
};

export type HeadingContextValue = {
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
};
