import { Navigate, useSearchParams } from "react-router";
import { MovieDetail } from "@/components/movie-detail/movie-detail";

export const DetailRoute = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  if (id) {
    return <MovieDetail id={id} />;
  }

  return <Navigate to="/" />;
};
