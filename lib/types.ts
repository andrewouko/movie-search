import { z } from "zod";
export type ErrorStatusCodes = 400 | 401 | 403 | 404 | 500;
export type StatusCodes = ErrorStatusCodes | 200;
export type ApiResponse<T> = {
  status: 200;
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
export type ErrorResponse = {
  status: ErrorStatusCodes;
  error: ValidationError | ApiError | string;
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
