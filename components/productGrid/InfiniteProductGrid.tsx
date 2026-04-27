"use client";

import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

export default function InfiniteProductGrid({
  products: initialProducts,
  tagId,
  sort,
}: any) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      `/api/load-more?tag=${tagId}&sort=${sort}&page=${page}`,
    );

    const data = await res.json();

    if (data.length === 0) {
      setHasMore(false); // 🚫 stop
    } else {
      setProducts((prev: any) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  // AUTO LOAD ON SCROLL
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, loading, hasMore]);

  return (
    <>
      <ProductGrid products={products} />

      {loading && <p>Loader...</p>}

      {!hasMore && <p>Du har set alle produkter 🎉</p>}
    </>
  );
}
