import useProducts from "@/hooks/api/useProducts";
import ProductItem from "../ProductList/ProductItem";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/types";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

// This page only for showcase purpose, some best practices are not followed
function Showcase() {
  const { data: baseData, isLoading: baseLoading } = useProducts();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [columnCount, setColumnCount] = useState(4);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      if (!baseData) return;
      setData((prev) => [...prev, ...baseData]);
      setLoading(false);
    }, 1000);
  }, [loading, baseData]);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const index = rowIndex * 4 + columnIndex;
    const product = data?.[index];
    return <div style={{ ...style, padding: "6px" }}>{product && <ProductItem product={product} />}</div>;
  };

  useEffect(() => {
    if (!baseData) return;
    setData(baseData);
  }, [baseData]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setColumnCount(2);
      } else if (window.innerWidth < 768) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl">Showcase</h1>
      <div className="text-muted-foreground mb-4">
        This page only for showcase purpose, some best practices are not followed
      </div>
      <div className="h-svh">
        {baseLoading ? (
          <div>Loading...</div>
        ) : (
          <InfiniteLoader isItemLoaded={(index) => index === 1000} itemCount={1000} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeGrid
                    columnCount={columnCount}
                    columnWidth={(width - 20) / columnCount}
                    height={height}
                    rowCount={Math.ceil(data.length / columnCount)}
                    rowHeight={(width - 20) / columnCount + 110}
                    width={width}
                    onItemsRendered={({
                      overscanRowStartIndex,
                      overscanRowStopIndex,
                      visibleRowStartIndex,
                      visibleRowStopIndex,
                    }) =>
                      onItemsRendered({
                        overscanStartIndex: overscanRowStartIndex * columnCount,
                        overscanStopIndex: overscanRowStopIndex * columnCount,
                        visibleStartIndex: visibleRowStartIndex * columnCount,
                        visibleStopIndex: visibleRowStopIndex * columnCount,
                      })
                    }
                    ref={ref}
                  >
                    {Cell}
                  </FixedSizeGrid>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </div>
    </div>
  );
}

export default Showcase;
