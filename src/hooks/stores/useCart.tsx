import { Product } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
  items: { id: number; product: Product; quantity: number }[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.product.id === product.id);
          if (existingItemIndex !== -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { ...state, items: newItems };
          }
          return { ...state, items: [...state.items, { id: product.id, product, quantity }] };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          const itemIndex = state.items.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            const newItems = [...state.items];
            newItems[itemIndex].quantity = quantity;
            return { ...state, items: newItems };
          }
          return state;
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { ...state, items: newItems };
        });
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
