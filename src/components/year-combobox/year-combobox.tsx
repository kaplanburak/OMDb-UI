import { useCallback, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { YearComboboxProps } from "./year-combobox.types";
import { setYear } from "@/store/slices/ui";
import styles from "./year-combobox.module.scss";

export const YearCombobox = ({ disabled }: YearComboboxProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const { year } = useAppSelector((state) => state.ui);

  const years = useMemo(
    () =>
      Array.from({ length: 138 }, (_, i) => {
        const y = (2025 - i).toString();

        return {
          value: y,
          label: y,
        };
      }),
    []
  );

  const toggleOpen = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  const onYearSelect = useCallback(
    (currentValue: string) => {
      setOpen(false);
      dispatch(
        setYear(
          currentValue === year?.toString() ? undefined : parseInt(currentValue)
        )
      );
    },
    [dispatch, year]
  );

  const clearYear = useCallback(() => {
    setOpen(false);
    dispatch(setYear(undefined));
  }, [dispatch]);

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(styles.button, "w-[200px] justify-between")}
        >
          {year
            ? years.find((y) => y.value === year.toString())?.label
            : "Select year..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(styles.dropdown, "w-[200px] p-0")}>
        <Command className={cn(styles.command, "pl-2")}>
          <CommandInput placeholder="Search year..." />
          <CommandList>
            <CommandEmpty>No year found.</CommandEmpty>
            <CommandGroup>
              {year && (
                <CommandItem
                  value="clear"
                  onSelect={clearYear}
                  className={styles.yearItemLabel}
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  All years
                </CommandItem>
              )}
              {years.map((y) => (
                <CommandItem
                  key={y.value}
                  value={y.value}
                  onSelect={onYearSelect}
                  className={styles.yearItemLabel}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      year?.toString() === y.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {y.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
