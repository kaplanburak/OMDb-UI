import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/store/slices/ui";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PaginationProps } from "./pagination.types";
import { Label } from "../ui/label";
import styles from "./pagination.module.scss";

export const Pagination = ({ totalItems }: PaginationProps) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.page);

  const totalPages = Math.ceil(totalItems / 10) || 0;

  const [inputValue, setInputValue] = useState(currentPage);
  const [debouncedInputValue] = useDebounce(Number(inputValue), 300);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setInputValue(value);
    }
  };

  const showingResults = useMemo(() => {
    return (currentPage - 1) * 10 + 1;
  }, [currentPage]);

  useEffect(() => {
    dispatch(setPage(debouncedInputValue));
  }, [debouncedInputValue, dispatch]);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Label>
          Showing {showingResults} to {showingResults + 9} from total{" "}
          {totalItems} results
        </Label>
      </div>
      <div className={styles.pagination}>
        <Button
          onClick={handlePrevClick}
          disabled={currentPage <= 1}
          className={styles.button}
        >
          Previous
        </Button>
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min={1}
          max={totalPages}
          className={styles.input}
        />
        <Button
          onClick={handleNextClick}
          disabled={currentPage >= totalPages}
          className={styles.button}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
