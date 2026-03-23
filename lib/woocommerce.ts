const BASE_URL = `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3`;

function getAuthParams() {
  const params = new URLSearchParams();
  params.append("consumer_key", process.env.WC_CONSUMER_KEY!);
  params.append("consumer_secret", process.env.WC_CONSUMER_SECRET!);
  return params;
}

// --- Categories (cached) ---
export async function getCategories() {
  const params = getAuthParams();

  const res = await fetch(`${BASE_URL}/products/categories?${params}`, {
    next: { revalidate: 60 * 60 }, // 🔥 cache 1 time
  });

  return res.json();
}

async function getCategoryIdFromSlug(slug: string) {
  const categories = await getCategories();

  const match = categories.find((cat: any) => cat.slug === slug);

  return match?.id;
}

// --- Products ---
export async function getProducts(category?: string, search?: string) {
  const params = getAuthParams();

  if (category) {
    const categoryId = isNaN(Number(category))
      ? await getCategoryIdFromSlug(category)
      : category;

    if (categoryId) {
      params.append("category", String(categoryId));
    }
  }

  if (search) {
    params.append("search", search);
  }

  const res = await fetch(`${BASE_URL}/products?${params}`, {
    cache: "no-store", // altid friske produkter
  });

  return res.json();
}
