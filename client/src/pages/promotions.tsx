import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategorySidebar from "@/components/layout/category-sidebar";
import ProductCard from "@/components/products/product-card";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { Button } from "@/components/ui/button";
import { COLORS, STOCK_IMAGES } from "@/lib/constants";
import { supabase } from '@/lib/supabase'; // Import supabase client

interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  endDate?: string;
  discountPercentage?: number;
  active: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  categoryId: number;
  description: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

// Sample promotions data until connected to API
const samplePromotions: Promotion[] = [
  {
    id: 1,
    title: "20% Off All Gift Items",
    description: "Exclusive discount on our entire collection of handcrafted Kenyan products",
    image: "https://images.unsplash.com/photo-1607707972895-7f994d8c2f3b?auto=format&fit=crop&w=1000&q=80",
    endDate: "2023-12-31",
    discountPercentage: 20,
    active: true
  },
  {
    id: 2, 
    title: "Buy 2 Get 1 Free on Textiles",
    description: "Purchase any two textile products and get a third one free",
    image: `url('/images/welcome-banner.png')`,
    endDate: "2025-06-30",
    active: true
  }
];

// Sample products on promotion
const samplePromotionProducts: Product[] = [
  {
    id: 1,
    name: "Handmade Soapstone Bowl",
    slug: "handmade-soapstone-bowl",
    price: 1950,
    discountedPrice: 1560,
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
    discountedPrice: 1760,
    images: [STOCK_IMAGES.beadwork],
    categoryId: 2,
    description: "Traditional Maasai beaded necklace with authentic designs",
    category: { id: 2, name: "Fashion", slug: "fashion" }
  },
  {
    id: 4,
    name: "Handwoven Kiondo Basket",
    slug: "handwoven-kiondo-basket",
    price: 1750,
    discountedPrice: 1400,
    images: [STOCK_IMAGES.basket],
    categoryId: 4,
    description: "Traditional handwoven basket with leather trim and handles",
    category: { id: 4, name: "Textiles", slug: "textiles" }
  },
  {
    id: 8,
    name: "Hand-Carved Wooden Animals",
    slug: "hand-carved-wooden-animals",
    price: 890,
    discountedPrice: 712,
    images: [STOCK_IMAGES.woodCarving],
    categoryId: 1,
    description: "Set of hand-carved wooden animal figures",
    category: { id: 1, name: "Crafts", slug: "crafts" }
  }
];

export default function PromotionsPage() {
  const [activePromotionId, setActivePromotionId] = useState<number | null>(null);
  
  // Fetch promotions from the API (using sample data for now)
  const { data: promotions = samplePromotions } = useQuery<Promotion[]>({
    queryKey: ["promotions"],
    queryFn: async () => {
      const { data, error } = await supabase.from('promotions').select('*');
      if (error) throw error;
      return data;
    },
    staleTime: 60000 // 1 minute
  });
  
  // Fetch promotion products
  const { data: promotionProducts = samplePromotionProducts } = useQuery<Product[]>({ // Use sample data as fallback
    queryKey: ["products", "promotions", activePromotionId],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*, category:categories(*)').eq('promotion_id', activePromotionId);
      if (error) throw error;
      return data;
    },
    staleTime: 60000, // 1 minute
    enabled: activePromotionId !== null
  });
  
  // Set the first active promotion as default when promotions load
  useEffect(() => {
    if (promotions.length > 0 && activePromotionId === null) {
      setActivePromotionId(promotions[0].id);
    }
  }, [promotions, activePromotionId]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar />
            
            <main className="lg:w-4/5">
              <ScrollAnimation type="fade-up">
                <h1 className="font-display text-4xl mb-8" style={{ color: COLORS.secondary }}>
                  Current Promotions
                </h1>
                
                {/* Promotions banners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {promotions.map((promo: Promotion) => (
                    <div 
                      key={promo.id}
                      className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                        activePromotionId === promo.id ? 'ring-4 ring-primary shadow-lg scale-105' : 'shadow-sm hover:shadow-md'
                      }`}
                      onClick={() => setActivePromotionId(promo.id)}
                    >
                      <div 
                        className="bg-cover bg-center h-48"
                        style={{ backgroundImage: `url('${promo.image}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <div className="text-white">
                          <h2 className="font-display text-2xl mb-2">{promo.title}</h2>
                          <p className="text-white/90 mb-2">{promo.description}</p>
                          {promo.endDate && (
                            <div className="text-sm font-medium bg-primary/80 text-white inline-block px-3 py-1 rounded-full">
                              Ends: {formatDate(promo.endDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Promotion products */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="font-display text-3xl" style={{ color: COLORS.secondary }}>
                        Products on Sale
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {activePromotionId ? promotions.find((p: Promotion) => p.id === activePromotionId)?.title : "Specially discounted items"}
                      </p>
                    </div>
                    <Link href="/category/all" className="px-4 py-2 rounded text-sm font-medium" style={{ color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>
                      View All Products
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {promotionProducts.map((product: Product, index: number) => (
                      <ScrollAnimation key={product.id} type="fade-up" delay={index * 100}>
                        <ProductCard 
                          product={product} 
                          animationDelay={0} 
                        />
                      </ScrollAnimation>
                    ))}
                  </div>
                </section>
              </ScrollAnimation>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}