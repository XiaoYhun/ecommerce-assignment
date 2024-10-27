import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import useCart from "@/hooks/stores/useCart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added item to cart",
      variant: "success",
      action: (
        <ToastAction asChild altText="View cart" className="bg-white/10">
          <Link to="/cart">View Cart</Link>
        </ToastAction>
      ),
    });
  };

  return (
    <div key={product.id} className="p-2 md:p-4 border rounded-md">
      <div className="aspect-square place-content-center flex mb-2 hover:scale-105 transition-all ">
        <img src={product.image} alt={product.title} className="object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="line-clamp-2 min-h-[44px] text-sm font-bold" title={product.title}>
          {product.title}
        </div>
        <div className="flex gap-1/2 items-end">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              fill="currentColor"
              className={cn(index < product.rating.rate ? "!text-yellow-400" : "!text-gray-300")}
            />
          ))}
          <div className="text-[10.5px] ml-1 text-nowrap leading-tight">
            {product.rating.rate}/5 ({product.rating.count})
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-bold text-right leading-none text-sm sm:text-md">${product.price}</div>
          <Button variant="outline" size="sm" className="shadow-none !p-2 h-7" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductItem);
