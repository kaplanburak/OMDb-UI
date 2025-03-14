import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import styles from "./movies-table.module.scss";
import { Pagination } from "../pagination/pagination";
import { useSearch } from "@/api/use-search";

export const MoviesTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useSearch();

  const loading = isLoading || isFetching;

  const items = useMemo(
    () => (data && Array.isArray(data?.Search) ? data.Search : []),
    [data]
  );

  const onRowClick = useCallback(
    (imdbID: string) => () => {
      navigate(`/detail?id=${imdbID}`);
    },
    [navigate]
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">IMDb ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            !loading &&
            (items.length > 0 ? (
              items.map((row) => {
                return (
                  <TableRow
                    key={row.imdbID}
                    onClick={onRowClick(row.imdbID)}
                    className={styles.row}
                  >
                    <TableCell>{row.Year}</TableCell>
                    <TableCell>{row.Title}</TableCell>
                    <TableCell className="text-right">{row.imdbID}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                <div className="w-full flex justify-center items-center">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isSuccess && (
        <div className={styles.pagination}>
          <Pagination totalItems={Number(data?.totalResults)} />
        </div>
      )}
    </div>
  );
};
