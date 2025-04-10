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
  const { data: newArrivals, isLoading, error } = useQuery({
    queryKey: ["/api/products/new-arrivals"],
    staleTime: 60000 // 1 minute
  });
  
  // Use sample data if the API isn't available yet or there's an error
  const products = newArrivals || sampleProducts;
  
  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
            New Arrivals
          </h2>
          <Link href="/products/new" className="text-sm font-medium" style={{ color: COLORS.primary }}>
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 md:h-56 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  if (error) {
    console.error("Failed to fetch new arrivals:", error);
  }
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
          New Arrivals
        </h2>
        <Link href="/products/new" className="text-sm font-medium" style={{ color: COLORS.primary }}>
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
