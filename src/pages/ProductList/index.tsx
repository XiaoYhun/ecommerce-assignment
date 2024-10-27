import useProducts from "@/hooks/api/useProducts";
import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";
import { createContext, useMemo, useState } from "react";
import Skeletons from "./Skeletons";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import SortSelect from "./SortSelect";
import { ESortBy } from "@/types";
import MobileFilterPanel from "./MobileFilterPanel";

type TFilter = {
  search: string;
  category: string;
  priceRange: number[];
  star: number;
};

const initialFilters: TFilter = {
  search: "",
  category: "",
  priceRange: [0, 1000],
  star: 0,
};

type TProductListContext = {
  filter: TFilter;
  sort: ESortBy | undefined;
  onFilterChanged: (newFilter: TFilter) => void;
  onSortChanged: (newSort: ESortBy | undefined) => void;
};

export const ProductListContext = createContext<TProductListContext>({
  filter: initialFilters,
  onFilterChanged: () => {},
  sort: undefined,
  onSortChanged: () => {},
});

export default function ProductList() {
  const { data, isLoading } = useProducts();

  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState<ESortBy | undefined>();

  const hasFilters = useMemo(() => JSON.stringify(filters) !== JSON.stringify(initialFilters), [filters]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    let newData = hasFilters
      ? data.filter((product) => {
          const matchesSearch = !!filters.search
            ? product.title.toLowerCase().includes(filters.search.toLowerCase())
            : true;
          const matchesCategory = !!filters.category ? product.category === filters.category : true;
          const matchesPriceRange =
            filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000
              ? product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
              : true;
          const matchesStar = !!filters.star ? product.rating.rate >= filters.star : true;

          return matchesSearch && matchesCategory && matchesPriceRange && matchesStar;
        })
      : [...data];

    if (sort) {
      switch (sort) {
        case ESortBy.PriceLowToHigh:
          return newData.sort((a, b) => a.price - b.price);
        case ESortBy.PriceHighToLow:
          return newData.sort((a, b) => b.price - a.price);
        case ESortBy.Rating:
          return newData.sort((a, b) => b.rating.rate - a.rating.rate);
        case ESortBy.NameAsc:
          return newData.sort((a, b) => a.title.localeCompare(b.title));
        case ESortBy.NameDesc:
          return newData.sort((a, b) => b.title.localeCompare(a.title));
        default:
          return newData;
      }
    }

    return newData;
  }, [data, filters, sort, hasFilters]);

  return (
    <div className="w-full flex gap-4">
      <ProductListContext.Provider
        value={{ filter: filters, sort, onFilterChanged: setFilters, onSortChanged: setSort }}
      >
        <div className="hidden sm:block sm:w-1/4">
          <FilterPanel />
        </div>
        <div className="sm:w-3/4">
          <div className="flex mb-3 items-center justify-between w-full">
            <div className="block sm:hidden">
              <MobileFilterPanel />
            </div>
            {hasFilters && (
              <Button variant="outline" size="sm" onClick={() => setFilters(initialFilters)}>
                Clear All Filters <X size={14} />
              </Button>
            )}
            <div className="ml-auto">
              <SortSelect />
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
              <Skeletons />
            </div>
          ) : !filteredData.length ? (
            <div className="h-32 flex items-center justify-center">No product found.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
              {filteredData.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </ProductListContext.Provider>
    </div>
  );
}
