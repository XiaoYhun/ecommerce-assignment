import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { MouseEventHandler, useContext, useState } from "react";
import { ProductListContext } from ".";
import { ESortBy } from "@/types";

function SortSelect() {
  const { sort, onSortChanged } = useContext(ProductListContext);
  const [key, setKey] = useState(0);

  const handleClearSelection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onSortChanged(undefined); // Clear the selection
    setKey((prev) => prev + 1); // Reset the select component
  };

  return (
    <Select key={key} value={sort} onValueChange={(v) => v !== "default" && onSortChanged(v as ESortBy)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select sort" />
      </SelectTrigger>
      <SelectContent>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearSelection}
          className="font-normal px-2 w-full justify-start rounded-sm text-sm"
        >
          Default
        </Button>
        {Object.values(ESortBy).map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default React.memo(SortSelect);
