import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterPanel from "./FilterPanel";
import React, { useContext, useEffect, useState } from "react";
import { ProductListContext } from ".";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

function MobileFilterPanel() {
  const { filter } = useContext(ProductListContext);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    setIsOpenDrawer(false);
  }, [filter]);

  return (
    <div>
      <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
        <DrawerTrigger asChild>
          <Button variant="secondary">
            <Filter /> Filters{" "}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-white border rounded-md p-2 mx-4 shadow-lg">
          <FilterPanel />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default React.memo(MobileFilterPanel);
