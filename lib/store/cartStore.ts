"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  variation_id?: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  slug: string;
  size?: string;
};

const isSameItem = (a: CartItem, b: { id: number; variation_id?: number }) =>
  a.id === b.id && (a.variation_id ?? null) === (b.variation_id ?? null);

type DeletedItem = {
  item: CartItem;
  undoId: number;
};

type CartStore = {
  items: CartItem[];
  deletedItems: DeletedItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, variation_id?: number) => void;
  undoRemove: (undoId: number) => void;

  updateQty: (id: number, qty: number, variation_id?: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

let undoIdCounter = 0;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deletedItems: [],

      // ➕ Add to cart
      addToCart: (item) =>
        set((state) => {
          const quantity = Math.max(1, item.quantity);

          const existing = state.items.find((i) => isSameItem(i, item));

          if (existing) {
            return {
              items: state.items.map((i) =>
                isSameItem(i, item)
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
      removeFromCart: (id, variation_id) =>
        set((state) => {
          const itemToRemove = state.items.find((i) =>
            isSameItem(i, { id, variation_id }),
          );

          if (!itemToRemove) return state;

          const undoId = undoIdCounter++;

          setTimeout(() => {
            set((state) => ({
              deletedItems: state.deletedItems.filter(
                (d) => d.undoId !== undoId,
              ),
            }));
          }, 10000);

          return {
            items: state.items.filter(
              (i) => !isSameItem(i, { id, variation_id }),
            ),
            deletedItems: [
              ...state.deletedItems,
              { item: itemToRemove, undoId },
            ],
          };
        }),

      // ↩️ Undo
      undoRemove: (undoId) =>
        set((state) => {
          const found = state.deletedItems.find((d) => d.undoId === undoId);
          if (!found) return state;

          return {
            items: [...state.items, found.item],
            deletedItems: state.deletedItems.filter((d) => d.undoId !== undoId),
          };
        }),

      // 🔢 Update quantity
      updateQty: (id, qty, variation_id) =>
        set((state) => {
          if (qty <= 0) {
            get().removeFromCart(id, variation_id);
            return state;
          }

          return {
            items: state.items.map((i) =>
              isSameItem(i, { id, variation_id }) ? { ...i, quantity: qty } : i,
            ),
          };
        }),

      // 🧹 Clear cart
      clearCart: () => set({ items: [], deletedItems: [] }),

      // 💰 Total
      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
