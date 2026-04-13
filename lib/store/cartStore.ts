"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  slug: string;
  size?: string;
};

type DeletedItem = {
  item: CartItem;
  undoId: number;
};

type CartStore = {
  items: CartItem[];
  deletedItems: DeletedItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size?: string) => void;
  undoRemove: (undoId: number) => void;

  updateQty: (id: number, qty: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

let undoIdCounter = 0; // global counter

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deletedItems: [],

      // ➕ Add to cart (merge + safety)
      addToCart: (item) =>
        set((state) => {
          const quantity = Math.max(1, item.quantity);

          const existing = state.items.find(
            (i) => i.id === item.id && (i.size ?? null) === (item.size ?? null),
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        }),

      // ❌ Remove item (incl. undo queue)
      removeFromCart: (id: number, size?: string) =>
        set((state) => {
          const itemToRemove = state.items.find(
            (i) => i.id === id && i.size === size,
          );

          if (!itemToRemove) return state;

          const undoId = undoIdCounter++;

          // auto-remove from queue after 10s
          setTimeout(() => {
            set((state) => ({
              deletedItems: state.deletedItems.filter(
                (d) => d.undoId !== undoId,
              ),
            }));
          }, 10000);

          return {
            items: state.items.filter((i) => !(i.id === id && i.size === size)),
            deletedItems: [
              ...state.deletedItems,
              { item: itemToRemove, undoId },
            ],
          };
        }),

      // ↩️ Undo (per item)
      undoRemove: (undoId: number) =>
        set((state) => {
          const found = state.deletedItems.find((d) => d.undoId === undoId);
          if (!found) return state;

          return {
            items: [...state.items, found.item],
            deletedItems: state.deletedItems.filter((d) => d.undoId !== undoId),
          };
        }),

      // 🔢 Update quantity (auto remove if 0 → using removeFromCart)
      updateQty: (id, qty, size?: string) =>
        set((state) => {
          if (qty <= 0) {
            get().removeFromCart(id, size);
            return state;
          }

          return {
            items: state.items.map((i) =>
              i.id === id && i.size === size ? { ...i, quantity: qty } : i,
            ),
          };
        }),

      // 🧹 Clear cart
      clearCart: () => set({ items: [], deletedItems: [] }),

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
