import { ROOT_URL } from "@/lib/constants";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch(`${ROOT_URL}/products`).then((res) => res.json()),
  });
}
