import { Skeleton } from "@/components/ui/skeleton";

export default function Skeletons() {
  return (
    <>
      {Array.from({ length: 16 }).map((_, index) => (
        <div className="mb-2">
          <Skeleton key={index} className="rounded-md aspect-square" />
          <Skeleton className="h-4 mt-2" />
          <Skeleton className="h-4 mt-2 w-3/4" />
        </div>
      ))}
    </>
  );
}
