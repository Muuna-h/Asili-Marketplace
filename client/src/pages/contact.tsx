import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO, COLORS, SOCIAL_LINKS } from "@/lib/constants";

// Form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  isSeller: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  
  // Get the URL parameters to see if we're coming from the "Sell With Us" button
  const fromSellerCTA = window.location.search.includes("seller=true");
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: fromSellerCTA ? "I want to sell on Asili Kenya" : "",
      message: "",
      isSeller: fromSellerCTA,
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    console.log("Contact form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
      form.reset();
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
          Contact Us
        </h1>
        {fromSellerCTA && (
          <div className="mb-8 p-6 rounded-lg shadow-md" style={{ backgroundColor: `${COLORS.primary}10` }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: COLORS.secondary }}>
              Sell With Us
            </h2>
            <p className="mb-3">
              Thank you for your interest in joining Asili Kenya as a seller! We're excited to connect with artisans and entrepreneurs who share our passion for authentic Kenyan products.
            </p>
            <p className="mb-3">
              Please fill out the form below, and our seller support team will reach out to you with more information about the onboarding process.
            </p>
            <p>
              <button
                type="button"
                className="text-sm font-medium underline"
                style={{ color: COLORS.primary }}
                onClick={() => setShowSellerInfo(!showSellerInfo)}
              >
                {showSellerInfo ? "Hide seller information" : "Show seller information"}
              </button>
            </p>
            
            {showSellerInfo && (
              <div className="mt-4 p-4 rounded-md bg-white/30">
                <h3 className="text-lg font-medium mb-2">As a seller on Asili Kenya, you'll get:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access to our growing customer base</li>
                  <li>Dedicated seller dashboard to manage your products</li>
                  <li>Promotion through our marketing channels</li>
                  <li>Secure payment processing</li>
                  <li>Detailed analytics to track your sales</li>
                  <li>Seller support to help you succeed</li>
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.secondary }}>
                Send Us a Message
              </h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    {...form.register("subject")}
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isSeller"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    {...form.register("isSeller")}
                  />
                  <label htmlFor="isSeller" className="text-sm">
                    I'm interested in becoming a seller
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: COLORS.primary }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.secondary }}>
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-clock mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9AM - 5PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 2PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Connect With Us</h3>
                <div className="flex space-x-3">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    aria-label="WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp" style={{ color: COLORS.primary }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}