import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLORS, SHIPPING_COST } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

// Define payment methods
const paymentMethods = z.enum(['mpesa', 'cod']);

const checkoutSchemaBase = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Please enter a delivery address" }),
  paymentMethod: paymentMethods,
  mpesaCode: z.string().optional(),
  notes: z.string().optional()
});

// Refine schema: mpesaCode is required only if paymentMethod is 'mpesa'
const refinedCheckoutSchema = checkoutSchemaBase.superRefine((data, ctx) => {
  if (data.paymentMethod === 'mpesa' && (!data.mpesaCode || data.mpesaCode.length < 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['mpesaCode'], // Specify the field with the error
      message: "Valid M-Pesa code is required for this payment method.",
    });
  }
});

type CheckoutFormValues = z.infer<typeof refinedCheckoutSchema>;

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(refinedCheckoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      paymentMethod: 'mpesa',
      mpesaCode: "",
      notes: ""
    }
  });
  
  const paymentMethod = form.watch('paymentMethod');
  
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
      const mpesaCodeToSend = data.paymentMethod === 'mpesa' ? data.mpesaCode : undefined;

      const orderData = {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        mpesaCode: mpesaCodeToSend,
        items: items,
        total: total,
        status: "pending"
      };
      
      const response = await apiRequest("POST", "/api/orders", orderData);
      const newOrder = await response.json();
      
      clearCart();
      
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
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mpesa" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pay via M-Pesa
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cod" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pay on Delivery
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {paymentMethod === 'mpesa' && (
                <FormField
                  control={form.control}
                  name="mpesaCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M-Pesa Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter M-Pesa confirmation code" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please type the M-Pesa code provided after payment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
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
                    <span>Delivery Fee</span>
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

          {paymentMethod === 'mpesa' && (
            <div 
              className="mt-6 rounded-lg shadow-sm p-4 md:p-6 border border-gray-200 py-6"
              style={{ backgroundColor: COLORS.neutral.light }}
            >
              <h3 
                className="font-medium text-lg mb-4 text-center"
                style={{ color: COLORS.secondary }}
              >Payment Instructions</h3>
              <div className="flex justify-center mb-4">
                <img 
                  src="https://vectorseek.com/wp-content/uploads/2024/02/Lipa-Na-Mpesa-Logo-Vector.svg-.png"
                  alt="Lipa Na M-Pesa Logo" 
                  className="h-12"
                />
              </div>
              <p className="text-center text-gray-700 mb-4">Complete your payment via Lipa Na M-Pesa:</p>
              <div className="space-y-3 text-base text-center">
                <p className="text-gray-800"><strong>Paybill:</strong> <span className="font-semibold" style={{ color: COLORS.primary }}>714888</span></p>
                <p className="text-gray-800"><strong>A/c:</strong> <span className="font-semibold" style={{ color: COLORS.primary }}>302019</span></p>
                <p className="text-gray-800"><strong>Name:</strong> <span className="font-semibold">Francis Munyaka</span></p>
                <p className="mt-4 text-gray-800">For support, Call/Whatsapp:</p>
                <p className="font-semibold text-xl text-gray-900">+254705003641</p>
              </div>
              <p className="text-sm text-gray-600 mt-6 text-center">After payment, enter the code above and click "Submit Order".</p>
            </div>
          )}

          <div className="mt-6 pt-4 text-center border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Need Help? Inquire / Order Directly:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="tel:+254705003641"
                className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-white hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                <i className="fas fa-phone-alt mr-2"></i> Call Us
              </a>
              <a 
                href="https://wa.me/254705003641?text=Hi%2C%20I%20need%20help%20with%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-white hover:opacity-90"
                style={{ backgroundColor: COLORS.secondary }}
              >
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
