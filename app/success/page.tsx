import { useCartStore } from "@/lib/store/cartStore";

export default function SuccessPage() {
  useCartStore.getState().clearCart();
  return (
    <div>
      <h1>Tak for din ordre 🎉</h1>
      <p>Din betaling er gennemført.</p>
    </div>
  );
}
