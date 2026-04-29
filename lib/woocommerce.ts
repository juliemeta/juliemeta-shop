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

// 🛡️ Safe fetch (no HTML crash)
async function safeFetch(url: string, options: any = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  // Debug (remove this later)
  //console.log("API RAW:", url, text);

  if (!res.ok) {
    throw new Error("WooCommerce API fejl");
  }

  if (text.startsWith("<")) {
    console.error("FULL HTML RESPONSE:\n", text);
    return []; // 🔥 temp for app not to crash
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

//--- Tags ---
export async function getTags() {
  const url = `${BASE_URL}/products/tags?per_page=100`;

  const data = await safeFetch(url, {
    next: { revalidate: 60 * 60 },
  });

  return Array.isArray(data) ? data : [];
}

async function getTagIdFromSlug(slug: string) {
  const tags = await getTags();
  const match = tags.find((t: any) => t.slug === slug);
  return match?.id;
}

// --- Products ---
export async function getProducts(
  category?: string,
  search?: string,
  tag?: string,
  sort?: string,
  page: number = 1,
  featured?: boolean,
  perPage: number = 50,
) {
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

  // --- product tags
  if (tag) {
    const tagId = isNaN(Number(tag)) ? await getTagIdFromSlug(tag) : tag;

    if (tagId) {
      params.append("tag", String(tagId));
    }
  }

  // --- sort by
  if (sort === "price-asc") {
    params.append("orderby", "price");
    params.append("order", "asc");
  }

  if (sort === "price-desc") {
    params.append("orderby", "price");
    params.append("order", "desc");
  }

  if (sort === "newest") {
    params.append("orderby", "date");
    params.append("order", "desc");
  }

  if (sort === "popular") {
    params.append("orderby", "popularity");
  }

  // --- featured products
  if (featured) {
    params.append("featured", "true");
  }

  params.append("per_page", String(perPage));
  params.append("page", String(page));

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

// --- Variations ---
export async function getProductVariations(productId: number) {
  const url = `${BASE_URL}/products/${productId}/variations`;

  const data = await safeFetch(url, {
    cache: "no-store",
  });

  if (!Array.isArray(data)) {
    console.error("Variations error:", data);
    return [];
  }

  return data;
}
