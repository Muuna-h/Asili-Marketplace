import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategorySidebar from "@/components/layout/category-sidebar";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { COLORS, CATEGORIES } from "@/lib/constants";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const [_, navigate] = useLocation();
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const searchQuery = searchParams.get("q") || "";
  
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  // Check if this is a search, all products, or specific category view
  const isSearch = slug === "search" && searchQuery;
  const isAllProducts = slug === "all";
  
  // Get category information
  const category = CATEGORIES.find(cat => cat.slug === slug);
  
  // Fetch category details from API if not a search and not "all" category
  const { data: categoryDetails } = useQuery({
    queryKey: [`/api/categories/${slug}`],
    enabled: !isSearch && !isAllProducts && !!slug
  });
  
  // Fetch products based on category, search, or all products
  const { data: products, isLoading } = useQuery({
    queryKey: isSearch 
      ? [`/api/products/search?q=${searchQuery}`]
      : isAllProducts
        ? ['/api/products']
        : [`/api/products/category/${categoryDetails?.id || 0}`],
    enabled: isSearch || isAllProducts || !!categoryDetails?.id
  });
  
  // Create a title based on category, all products, or search
  const title = isSearch 
    ? `Search Results: ${searchQuery}` 
    : isAllProducts
      ? "All Products"
      : (categoryDetails?.name || category?.name || "Products");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar />
            
            <main className="lg:w-4/5">
              <div className="mb-6">
                <h1 
                  className="font-display text-2xl md:text-3xl"
                  style={{ color: COLORS.secondary }}
                >
                  {title}
                </h1>
                {isSearch && (
                  <p className="text-gray-500 mt-2">
                    Showing results for "{searchQuery}"
                  </p>
                )}
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, index) => (
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
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-search text-gray-400 text-3xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    {isSearch 
                      ? `We couldn't find any products matching "${searchQuery}"`
                      : "There are currently no products in this category"
                    }
                  </p>
                  <Button 
                    onClick={() => navigate("/")}
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
