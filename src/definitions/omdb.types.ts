export type SearchItem = {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: ResultTypeEnum;
  Year: string;
};

export type SearchResult = {
  Search: SearchItem[];
  totalResults: string;
};

export type SearchArgs = {
  s: string;
  type?: string;
  page: string;
  y?: string;
};

export enum ResultTypeEnum {
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}

export type DetailResult = {
  Title: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Year: string;
  Country: string;
  Genre: string;
  Plot: string;
  Type: ResultTypeEnum;
};
