import { useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { COLORS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

// Define payment methods
const paymentMethods = z.enum(['mpesa', 'cod']);

// Schema for admin order creation
const adminOrderSchemaBase = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Please enter a delivery address" }), 
  paymentMethod: paymentMethods,
  mpesaCode: z.string().optional(), 
  notes: z.string().optional()
});

// Refine schema for conditional M-Pesa code validation
const refinedAdminOrderSchema = adminOrderSchemaBase.superRefine((data, ctx) => {
  if (data.paymentMethod === 'mpesa' && (!data.mpesaCode || data.mpesaCode.length < 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['mpesaCode'],
      message: "Valid M-Pesa code is required for this payment method.",
    });
  }
});

type AdminOrderFormValues = z.infer<typeof refinedAdminOrderSchema>;

export default function AdminOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  const form = useForm<AdminOrderFormValues>({
    resolver: zodResolver(refinedAdminOrderSchema), 
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      paymentMethod: 'mpesa', // Default to M-Pesa
      mpesaCode: "",
      notes: ""
    }
  });

  const paymentMethod = form.watch('paymentMethod');
  
  const onSubmit = async (data: AdminOrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      const mpesaCodeToSend = data.paymentMethod === 'mpesa' ? data.mpesaCode : undefined;

      // Construct order data for API
      const orderData = {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        mpesaCode: mpesaCodeToSend,
        items: [], // Send empty items array for now
        total: 0,   // Send 0 total for now
        status: "pending" 
      };
      
      await apiRequest("POST", "/api/orders", orderData);
            
      // Invalidate the orders query cache
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
            
      toast({
        title: "Order Created",
        description: "The manual order has been created successfully.",
      });
      // Redirect to the main orders list
      navigate("/admin/orders"); 

    } catch (error) {
      console.error("Error submitting manual order:", error);
      toast({
        title: "Error Creating Order",
        description: "There was a problem creating the order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
       <h2 className="text-xl font-semibold mb-6" style={{ color: COLORS.secondary }}>
        Create Manual Order
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer's full name" {...field} />
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
                      <Input placeholder="Enter customer's phone number" {...field} />
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
                        placeholder="Enter customer's delivery address" 
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
                            Paid via M-Pesa
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
                        Enter the code received from the customer.
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
                    <FormLabel>Order Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any internal notes about this order?" 
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
                      Creating Order...
                    </>
                  ) : "Create Order"}
                </Button>
              </div>
        </form>
      </Form>
    </div>
  );
} 