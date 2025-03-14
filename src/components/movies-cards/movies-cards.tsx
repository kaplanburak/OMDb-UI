import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useSearch } from "@/api/use-search";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Pagination } from "../pagination/pagination";
import styles from "./movies-cards.module.scss";

export const MoviesCards = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useSearch();

  const onCardClick = useCallback(
    (imdbID: string) => () => {
      navigate(`/detail?id=${imdbID}`);
    },
    [navigate]
  );

  if (isLoading || isFetching) {
    return (
      <div className={styles.loading}>
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (isSuccess && !data?.Search) {
    return <p>No results found</p>;
  }

  return (
    <div className={styles.container}>
      {data?.Search &&
        data.Search.map((item) => {
          return (
            <Card
              key={item.imdbID}
              className={styles.card}
              onClick={onCardClick(item.imdbID)}
            >
              <CardContent>
                <CardTitle>{`${item.Title} (${item.Year})`}</CardTitle>
              </CardContent>
              <CardFooter>
                <CardDescription className={styles.id}>
                  {item.imdbID}
                </CardDescription>
              </CardFooter>
            </Card>
          );
        })}
      {isSuccess && (
        <div className={styles.pagination}>
          <Pagination totalItems={Number(data?.totalResults)} />
        </div>
      )}
    </div>
  );
};
