import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CheckoutForm from "@/components/checkout/checkout-form";
import { COLORS } from "@/lib/constants";

export default function CheckoutPage() {
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  // Scroll to top when checkout page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <CheckoutForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
