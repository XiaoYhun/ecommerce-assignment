import { ROOT_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: () => fetch(`${ROOT_URL}/products/categories`).then((res) => res.json()),
  });
}
