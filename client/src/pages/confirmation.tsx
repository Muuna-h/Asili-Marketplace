import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OrderConfirmation from "@/components/checkout/order-confirmation";
import { COLORS } from "@/lib/constants";

interface ConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderId } = params;
  
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  // Scroll to top when confirmation page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <OrderConfirmation orderId={orderId} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
