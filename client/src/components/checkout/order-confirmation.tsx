import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";
import type { Order } from "@shared/schema";

interface OrderConfirmationProps {
  orderId: string;
}

export default function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`]
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 text-center py-12 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-6"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-8"></div>
        <div className="max-w-md mx-auto mb-8 p-4 bg-gray-200 rounded-lg">
          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-48 mx-auto"></div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h2 className="text-xl font-medium mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-4">We couldn't find the order you're looking for.</p>
        <Link href="/">
          <Button 
            style={{ backgroundColor: COLORS.primary }}
          >
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }
  
  // Generate a reference number based on order ID
  const orderReference = `ASL-${(order.id + 25000).toString().padStart(5, '0')}`;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 text-center py-12">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}
      >
        <i className="fas fa-check text-3xl"></i>
      </div>
      
      <h1 
        className="font-display text-2xl md:text-3xl mb-3"
        style={{ color: COLORS.secondary }}
      >
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        We've received your order and will contact you shortly to arrange delivery.
      </p>
      
      <div className="inline-block text-left max-w-md mx-auto mb-8 p-4 rounded-lg"
        style={{ backgroundColor: COLORS.neutral.light }}
      >
        <div className="font-medium mb-2">Order Reference:</div>
        <div 
          className="text-2xl font-medium mb-4"
          style={{ color: COLORS.secondary }}
        >
          #ASL-{orderId}
        </div>
        <div>A confirmation will be sent to your phone or email.</div>
      </div>
      
      <div>
        <Link href="/">
          <Button 
            className="inline-block font-medium"
            style={{ backgroundColor: COLORS.primary }}
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
