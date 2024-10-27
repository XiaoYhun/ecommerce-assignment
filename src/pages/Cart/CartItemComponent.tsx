import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useCart from "@/hooks/stores/useCart";
import useConfirmation from "@/hooks/use-confirmation";
import { CartItem } from "@/types";
import React from "react";

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { confirmation } = useConfirmation();

  const { removeItem, updateQuantity } = useCart();

  const handleRemove = () => {
    confirmation({
      title: "Delete Item",
      message: "Are you sure you want to delete this item from cart?",
      confirmText: "Delete",
      onConfirm: () => {
        console.log("onConfirm");
        removeItem(item.id);
      },
      onCancel: () => {},
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setQuantity(0);
      return;
    }
    if (!isNaN(parseInt(newValue))) {
      if (parseInt(newValue) > 99) return;
      setQuantity(parseInt(newValue));
      return;
    }
  };

  const handleUpdateQuantity = () => {
    updateQuantity(item.id, quantity);
    setIsUpdating(false);
  };

  return (
    <div key={item.product.id} className="flex gap-2 p-2 border-b">
      <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="font-semibold line-clamp-2 h-[44px] text-sm sm:text-md">{item.product.title}</div>
        <div className="flex gap-2 items-start">
          <Popover open={isUpdating} onOpenChange={setIsUpdating}>
            <PopoverTrigger onClick={() => setIsUpdating(true)}>
              <div
                className="text-sm text-gray-500 hover:text-gray-900 hover:font-semibold"
                onClick={() => setIsUpdating(true)}
              >
                Quantity: {item.quantity}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[120px] flex items-center gap-2 p-3">
              <Input
                value={quantity}
                onChange={handleQuantityChange}
                className="w-[40px] h-[24px] text-sm rounded-sm text-center"
              />
              <Button size="sm" className="p-1 h-6" onClick={handleUpdateQuantity}>
                Update
              </Button>
            </PopoverContent>
          </Popover>

          <div className="leading-none text-muted-foreground">|</div>
          <div className="text-sm text-red-500 mt-auto hover:font-semibold cursor-pointer" onClick={handleRemove}>
            Delete
          </div>
        </div>
      </div>
      <div className="font-semibold text-sm sm:text-md">
        ${item.product.price} <span className="text-sm font-normal text-muted-foreground">x{item.quantity}</span>
      </div>
    </div>
  );
};

export default React.memo(
  CartItemComponent,
  (prev, next) => prev.item.quantity !== next.item.quantity || prev.item.id !== next.item.id
);
