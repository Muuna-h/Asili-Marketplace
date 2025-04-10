import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategorySidebar from "@/components/layout/category-sidebar";
import HeroSlider from "@/components/home/hero-slider";
import FeaturedCategories from "@/components/home/featured-categories";
import FeaturedProducts from "@/components/home/featured-products";
import Banner from "@/components/home/banner";
import NewArrivals from "@/components/home/new-arrivals";
import { COLORS } from "@/lib/constants";

export default function HomePage() {
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
              <div id="home-page" className="space-y-10">
                <HeroSlider />
                <FeaturedCategories />
                <FeaturedProducts />
                <Banner />
                <NewArrivals />
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
