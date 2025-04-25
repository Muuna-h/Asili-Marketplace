import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "@/components/products/product-card";
import { COLORS, STOCK_IMAGES } from "@/lib/constants";

// Sample data to use if the API isn't available yet
const sampleProducts = [
  {
    id: 5,
    name: "Reclaimed Wood Coffee Table",
    slug: "reclaimed-wood-coffee-table",
    price: 12500,
    images: [STOCK_IMAGES.coffeeTable],
    categoryId: 5,
    description: "Handcrafted coffee table made from reclaimed wood",
    category: { id: 5, name: "Furniture", slug: "furniture" }
  },
  {
    id: 6,
    name: "Organic Shea Butter Set",
    slug: "organic-shea-butter-set",
    price: 1850,
    images: [STOCK_IMAGES.sheaButter],
    categoryId: 6,
    description: "100% organic shea butter skincare set",
    category: { id: 6, name: "Health & Beauty", slug: "health-beauty" }
  },
  {
    id: 7,
    name: "Ankara Print Tote Bag",
    slug: "ankara-print-tote-bag",
    price: 1200,
    images: [STOCK_IMAGES.ankaraBag],
    categoryId: 2,
    description: "Colorful tote bag with traditional Ankara print",
    category: { id: 2, name: "Fashion", slug: "fashion" }
  },
  {
    id: 8,
    name: "Hand-Carved Wooden Animals",
    slug: "hand-carved-wooden-animals",
    price: 890,
    images: [STOCK_IMAGES.woodCarving],
    categoryId: 1,
    description: "Set of hand-carved wooden animal figures",
    category: { id: 1, name: "Crafts", slug: "crafts" }
  }
];

export default function NewArrivals() {
  // Fetch new arrivals from the API
  const { data: apiProducts, isLoading, error } = useQuery({
    queryKey: ["/api/products/new"],
    staleTime: 60000 // 1 minute
  });
  // Use API products if available, otherwise fall back to sample products
  const products = Array.isArray(apiProducts) && apiProducts.length > 0 ? apiProducts : sampleProducts;
  
  if (isLoading) {
    return (
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display text-3xl" style={{ color: COLORS.secondary }}>
              New Arrivals
            </h2>
            <p className="text-gray-600 mt-1">Fresh additions to our collection</p>
          </div>
          <Link href="/category/all" className="px-4 py-2 rounded text-sm font-medium" style={{ color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 md:h-56 rounded-md mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-3xl" style={{ color: COLORS.secondary }}>
            New Arrivals
          </h2>
          <p className="text-gray-600 mt-1">Fresh additions to our collection</p>
        </div>
        <Link href="/category/all" className="px-4 py-2 rounded text-sm font-medium" style={{ color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.isArray(products) && products.map((product: any, index: number) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            animationDelay={index * 100} 
          />
        ))}
      </div>
    </section>
  );
}
