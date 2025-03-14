import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { YearCombobox } from "../year-combobox/year-combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ResultTypeEnum } from "@/definitions/omdb.types";
import { useSearch } from "@/api/use-search";
import { setTitle, setType } from "@/store/slices/ui";
import styles from "./filters.module.scss";

export const Filters = () => {
  const dispatch = useAppDispatch();

  const { isFetching } = useSearch();

  const { title, type } = useAppSelector((state) => state.ui);

  const [searchValue, setSearchValue] = useState(title);
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const onTypeChange = useCallback(
    (value: ResultTypeEnum) => {
      dispatch(setType(value));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setTitle(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          placeholder="Enter a movie or series name"
          value={searchValue}
          onChange={onSearchChange}
          disabled={isFetching}
        />
      </div>
      <div className={styles.type}>
        <Select
          defaultValue={type}
          onValueChange={onTypeChange}
          disabled={isFetching}
        >
          <SelectTrigger className={styles.select}>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ResultTypeEnum.Movie}>
                <span className={styles.selectItem}>Movies</span>
              </SelectItem>
              <SelectItem value={ResultTypeEnum.Series}>
                <span className={styles.selectItem}>TV Series</span>
              </SelectItem>
              <SelectItem value={ResultTypeEnum.Episode}>
                <span className={styles.selectItem}>Episodes</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className={styles.year}>
        <YearCombobox disabled={isFetching} />
      </div>
    </div>
  );
};
