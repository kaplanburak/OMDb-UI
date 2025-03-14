import { useAppSelector } from "@/store/hooks";
import { useSearchQuery } from "@/store/slices/api";

export const useSearch = () => {
  const { title, type, year, page } = useAppSelector((state) => state.ui);

  return useSearchQuery({
    s: title,
    type,
    page: page.toString(),
    y: year?.toString(),
  });
};
