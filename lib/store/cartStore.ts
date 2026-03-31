"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price: string;
  image?: string;
  quantity: number;
  slug: string;
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ➕ Add to cart (merge + safety)
      addToCart: (item) =>
        set((state) => {
          const quantity = Math.max(1, item.quantity);

          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        }),

      // ❌ Remove item
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // 🔢 Update quantity (auto remove if 0)
      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: qty } : i,
            ),
          };
        }),

      // 🧹 Clear cart
      clearCart: () => set({ items: [] }),

      // 💰 Total price helper
      getTotal: () =>
        get().items.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
