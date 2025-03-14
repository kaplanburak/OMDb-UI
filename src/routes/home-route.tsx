import { MoviesTable } from "@/components/movies-table/movies-table";
import { Filters } from "@/components/filters/filters";
import { MoviesCards } from "@/components/movies-cards/movies-cards";
import { useIsMobile } from "@/lib/use-is-mobile";

export const HomeRoute = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <Filters />
      {isMobile ? <MoviesCards /> : <MoviesTable />}
    </div>
  );
};
