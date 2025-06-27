import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "@/components/products/product-card";
import { COLORS, STOCK_IMAGES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

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
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);

      if (error) {
        throw error;
      }
      return data;
    },
    staleTime: 60000 // 1 minute
  });
  
  if (isLoading) {
    return (
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display text-3xl" style={{ color: COLORS.secondary }}>
              Featured Products
            </h2>
            <p className="text-gray-600 mt-1">Handpicked quality items from Kenyan artisans</p>
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
            Featured Products
          </h2>
          <p className="text-gray-600 mt-1">Handpicked quality items from Kenyan artisans</p>
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
