import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategorySidebar from "@/components/layout/category-sidebar";
import ProductDetail from "@/components/products/product-detail";
import { COLORS } from "@/lib/constants";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  // Scroll to top when product page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar />
            
            <main className="lg:w-4/5">
              <ProductDetail slug={slug} />
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
