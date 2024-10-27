import useCart from "@/hooks/stores/useCart";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white ">
      <div className="max-w-[1200px] mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Fake Store</h1>
        <div className="flex gap-5 text-sm md:text-normal">
          <Link to="/products" className="hover:text-blue-300">
            Product List
          </Link>
          <Link to="/showcase" className="hover:text-blue-300">
            Infinite Scroll + Windowing
          </Link>
        </div>
        <div>
          <Button className="rounded-lg w-8 h-8 !p-1 bg-white/80" variant="secondary" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {totalItems ? (
                <div className="bg-red-600 absolute -top-2 -right-2 w-4 h-4 text-center rounded-full text-white text-[11px] leading-4">
                  {totalItems > 99 ? "99+" : totalItems}
                </div>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
export default Header;
