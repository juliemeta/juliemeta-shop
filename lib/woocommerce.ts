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
    next: { revalidate: 60 * 60 }, // cache for 1 hour
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
    cache: "no-store",
  });

  return res.json();
}

// --- Get ALL products (for search) ---
export async function getAllProducts() {
  const params = getAuthParams();
  params.append("per_page", "50");

  let page = 1;
  let allProducts: any[] = [];

  while (true) {
    params.set("page", String(page));

    const res = await fetch(`${BASE_URL}/products?${params}`, {
      next: { revalidate: 60 * 5 }, // cache for 5 mins
    });

    const data = await res.json();

    if (!data.length) break;

    allProducts = [...allProducts, ...data];
    page++;
  }

  return allProducts;
}

let cachedProducts: any[] | null = null;

export async function getAllProductsCached() {
  if (cachedProducts) return cachedProducts;

  cachedProducts = await getAllProducts();
  return cachedProducts;
}
