import useCart from "@/hooks/stores/useCart";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import CartItemComponent from "./CartItemComponent";
import currency from "currency.js";

export default function Cart() {
  const { items } = useCart();

  const subTotal = useMemo(
    () => items.reduce((total, item) => total.add(item.product.price).multiply(item.quantity), currency(0)).toString(),
    [items]
  );

  return (
    <div className="w-full">
      <Link to="/products" className="flex gap-2 items-center text-muted-foreground hover:text-black">
        <ArrowLeft size={16} /> Back to Product list
      </Link>
      <div className="mx-auto">
        <div className="text-xl font-bold text-center mb-4 mt-2">Your Cart Summary</div>
        {items.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-2xl font-bold text-black/30">
            Your cart is empty.
          </div>
        ) : (
          <div className="max-w-[600px] w-full border rounded-md mx-auto p-4">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <CartItemComponent item={item} key={item.id} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pr-2">
              <div className="font-semibold">Subtotal:</div>
              <div className="font-semibold">${subTotal}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
