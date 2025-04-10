import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "@/components/products/product-card";
import { COLORS, STOCK_IMAGES } from "@/lib/constants";

// Sample data to use if the API isn't available yet
const sampleProducts = [
  {
    id: 1,
    name: "Handmade Soapstone Bowl",
    slug: "handmade-soapstone-bowl",
    price: 1950,
    images: [STOCK_IMAGES.handcrafted],
    categoryId: 1,
    description: "Beautifully hand-carved soapstone bowl from Western Kenya",
    category: { id: 1, name: "Crafts", slug: "crafts" }
  },
  {
    id: 2,
    name: "Beaded Maasai Necklace",
    slug: "beaded-maasai-necklace",
    price: 2200,
    images: [STOCK_IMAGES.beadwork],
    categoryId: 2,
    description: "Traditional Maasai beaded necklace with authentic designs",
    category: { id: 2, name: "Fashion", slug: "fashion" }
  },
  {
    id: 3,
    name: "Organic Kenyan Coffee Beans",
    slug: "organic-kenyan-coffee-beans",
    price: 850,
    images: [STOCK_IMAGES.coffee],
    categoryId: 3,
    description: "Premium AA grade coffee beans from the highlands of Kenya",
    category: { id: 3, name: "Foods & Drinks", slug: "foods-drinks" }
  },
  {
    id: 4,
    name: "Handwoven Kiondo Basket",
    slug: "handwoven-kiondo-basket",
    price: 1750,
    images: [STOCK_IMAGES.basket],
    categoryId: 4,
    description: "Traditional handwoven basket with leather trim and handles",
    category: { id: 4, name: "Textiles", slug: "textiles" }
  }
];

export default function FeaturedProducts() {
  // Fetch featured products from the API
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ["/api/products/featured"],
    staleTime: 60000 // 1 minute
  });
  
  // Use sample data if the API isn't available yet or there's an error
  const products = featuredProducts || sampleProducts;
  
  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
            Featured Products
          </h2>
          <Link href="/products" className="text-sm font-medium" style={{ color: COLORS.primary }}>
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
    console.error("Failed to fetch featured products:", error);
  }
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
          Featured Products
        </h2>
        <Link href="/products" className="text-sm font-medium" style={{ color: COLORS.primary }}>
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
