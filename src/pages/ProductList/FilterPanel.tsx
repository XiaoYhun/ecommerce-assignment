import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import useCategories from "@/hooks/api/useCategories";
import { cn } from "@/lib/utils";
import { Search, Star, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ProductListContext } from ".";

function FilterPanel() {
  const { filter, onFilterChanged } = useContext(ProductListContext);

  const { data: categoriesData } = useCategories();

  const [innerFilters, setInnerFilers] = useState(filter);
  const { search, category, priceRange, star } = innerFilters;

  const [hoveringStar, setHoveringStar] = useState(0);
  const isHovering = hoveringStar > 0;

  const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onFilterChanged(innerFilters);
    }
  };

  useEffect(() => {
    setInnerFilers(filter);
  }, [filter]);

  return (
    <div>
      <div className="relative mb-3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          className="pl-8"
          placeholder="Search product..."
          onChange={(e) => setInnerFilers({ ...innerFilters, search: e.target.value })}
          onKeyDown={handleSearchKeydown}
        />
        {search && (
          <X
            className="absolute right-2 top-2.5 text-muted-foreground hover:text-black cursor-pointer"
            size={16}
            onClick={() => setInnerFilers({ ...innerFilters, search: "" })}
          />
        )}
      </div>
      <div className="border p-2 rounded-md">
        <h2 className="text-lg font-semibold border-b">Filters</h2>
        <div className="mt-2 flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select value={category} onValueChange={(v: string) => setInnerFilers({ ...innerFilters, category: v })}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesData?.map((category) => (
                <SelectItem key={category} value={category}>
                  <span className="capitalize">{category}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label className="block text-sm font-medium text-gray-700 mt-2">Price</label>
          <div>
            <span>${priceRange[0]}</span>
            <span className="float-right">${priceRange[1]}</span>
          </div>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            min={0}
            step={1}
            value={priceRange}
            onValueChange={(v) => setInnerFilers({ ...innerFilters, priceRange: v })}
          />

          <label className="block text-sm font-medium text-gray-700 mt-2">Star</label>
          <div className="flex gap-2" onMouseLeave={() => setHoveringStar(0)}>
            {Array.from({ length: 5 }).map((_, index) => (
              <span title={`${index + 1} star`}>
                <Star
                  size={20}
                  fill="currentColor"
                  className={cn(
                    "hover:text-yellow-400 cursor-pointer",
                    index <= (isHovering ? hoveringStar : star) ? "text-yellow-400" : "text-gray-300"
                  )}
                  onMouseOver={() => setHoveringStar(index)}
                  onClick={() => setInnerFilers({ ...innerFilters, star: index })}
                />
              </span>
            ))}
          </div>
          <Button className="mt-5" size="sm" onClick={() => onFilterChanged(innerFilters)}>
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilterPanel);
