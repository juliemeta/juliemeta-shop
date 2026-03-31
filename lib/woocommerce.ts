const BASE_URL = `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3`;

// 🔐 Central auth header
function getAuthHeaders() {
  return {
    Authorization:
      "Basic " +
      Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
      ).toString("base64"),
  };
}

// 🛡️ Safe fetch (undgår HTML crash)
async function safeFetch(url: string, options: any = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  // Debug (kan fjernes senere)
  console.log("API RAW:", url, text);

  if (!res.ok) {
    throw new Error("WooCommerce API fejl");
  }

  if (text.startsWith("<")) {
    console.error("FULL HTML RESPONSE:\n", text);
    return []; // 🔥 midlertidigt så app ikke crasher
  }

  return JSON.parse(text);
}

// --- Categories (cached) ---
export async function getCategories() {
  const url = `${BASE_URL}/products/categories?per_page=100`;

  const data = await safeFetch(url, {
    next: { revalidate: 60 * 60 },
  });

  if (!Array.isArray(data)) {
    console.error("Categories error:", data);
    return [];
  }

  return data;
}

async function getCategoryIdFromSlug(slug: string) {
  const categories = await getCategories();
  const match = categories.find((cat: any) => cat.slug === slug);
  return match?.id;
}

// --- Products ---
export async function getProducts(category?: string, search?: string) {
  const params = new URLSearchParams();

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

  const url = `${BASE_URL}/products?${params}`;

  return safeFetch(url, {
    cache: "no-store",
  });
}

// --- Get ALL products (for search) ---
export async function getAllProducts() {
  let page = 1;
  let allProducts: any[] = [];

  while (true) {
    const url = `${BASE_URL}/products?per_page=50&page=${page}`;

    const data = await safeFetch(url, {
      next: { revalidate: 60 * 5 },
    });

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

// --- Single Product ---
export async function getProduct(slug: string) {
  const url = `${BASE_URL}/products?slug=${slug}`;

  const data = await safeFetch(url, {
    cache: "no-store",
  });

  return data?.[0] || null;
}
