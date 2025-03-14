import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ResultTypeEnum } from "@/definitions/omdb.types";
import { useDetailQuery } from "@/store/slices/api";
import { MovieDetailProps } from "./movie-detail.types";
import styles from "./movie-detail.module.scss";

export const MovieDetail = ({ id }: MovieDetailProps) => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useDetailQuery({ i: id || "" });

  const onGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const typeName = useMemo(() => {
    switch (data?.Type) {
      case ResultTypeEnum.Movie:
        return "Movie";
      case ResultTypeEnum.Series:
        return "TV Series";
      case ResultTypeEnum.Episode:
        return "TV Series Episode";
      default:
        return "";
    }
  }, [data?.Type]);

  if (isLoading || isFetching) {
    return (
      <div className={styles.loading}>
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    data && (
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div>
            <CardTitle>{`${data.Title} (${data.Year})`}</CardTitle>
            <CardDescription>{typeName}</CardDescription>
          </div>
          <div>
            <Button variant="outline" onClick={onGoBack}>
              <div className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to search
              </div>
            </Button>
          </div>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.cardContentMain}>
            <div className={styles.cardContentMainImage}>
              <img src={data.Poster} alt={data.Title} />
            </div>
            <div>
              <p className={styles.plot}>{data.Plot}</p>
            </div>
          </div>
          <Label>{`Genre: ${data.Genre}`}</Label>
          <Label>{`Duration: ${data.Runtime}`}</Label>
          <Label>{`Country: ${data.Country}`}</Label>
          <Label>{`IMDb rating: ${data.imdbRating} / 10`}</Label>
          <Label>{`Director: ${data.Director}`}</Label>
          <Label>{`Cast: ${data.Actors}`}</Label>
        </CardContent>
        <CardFooter className={styles.cardFooter}></CardFooter>
      </Card>
    )
  );
};
