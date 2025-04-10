import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { COLORS, SHIPPING_COST } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(10, { message: "Please enter a detailed delivery address" }),
  notes: z.string().optional()
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      notes: ""
    }
  });
  
  const total = subtotal + SHIPPING_COST;
  
  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        ...data,
        items: items,
        total: total,
        status: "pending"
      };
      
      const response = await apiRequest("POST", "/api/orders", orderData);
      const newOrder = await response.json();
      
      // Clear the cart after successful order
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/confirmation/${newOrder.id}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h1 
        className="font-display text-2xl mb-6"
        style={{ color: COLORS.secondary }}
      >
        Checkout
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Form */}
        <div className="lg:w-3/5">
          <h2 className="font-medium text-lg mb-4">Contact Information</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your delivery address" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes/Instructions (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special instructions for delivery?" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full py-3 font-medium"
                  disabled={isSubmitting}
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> 
                      Processing...
                    </>
                  ) : "Submit Order"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-2/5">
          <div 
            className="rounded-lg p-4"
            style={{ backgroundColor: COLORS.neutral.light }}
          >
            <h2 className="font-medium text-lg mb-4">Order Summary</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button 
                  onClick={() => navigate("/")}
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b border-gray-200">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">KSh {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 py-3 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">KSh {SHIPPING_COST.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="font-semibold">Total</span>
                  <span 
                    className="font-semibold text-xl"
                    style={{ color: COLORS.primary }}
                  >
                    KSh {total.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
