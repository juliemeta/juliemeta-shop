//--- Products ---//
export async function getProducts(category?: string, search?: string) {
  let url = `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3/products`;

  const params = new URLSearchParams();

  // 🔑 credentials (always)
  params.append("consumer_key", process.env.WC_CONSUMER_KEY!);
  params.append("consumer_secret", process.env.WC_CONSUMER_SECRET!);

  // 🏷️ category (ID)
  if (category) {
    params.append("category", category);
  }

  // 🔍 search
  if (search) {
    params.append("search", search);
  }

  url += `?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  return res.json();
}

//--- Categories ---//
export async function getCategories() {
  let url = `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3/products/categories`;

  const params = new URLSearchParams();

  params.append("consumer_key", process.env.WC_CONSUMER_KEY!);
  params.append("consumer_secret", process.env.WC_CONSUMER_SECRET!);

  url += `?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  return res.json();
}
