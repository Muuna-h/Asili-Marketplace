import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO, COLORS, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactPage() {
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const fromSellerCTA = typeof window !== "undefined" && window.location.search.includes("seller=true");

  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("submitted") === "true") {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

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
              Thank you for your interest in joining KuQuza as a seller! We're excited to connect with artisans and entrepreneurs who share our passion for authentic Kenyan products.
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
                <h3 className="text-lg font-medium mb-2">As a seller on KuQuza, you'll get:</h3>
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
          {/* FORM COLUMN */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.secondary }}>
                Send Us a Message
              </h2>

              <form
                action="https://formsubmit.co/kuquza@gmail.com"
                method="POST"
                className="space-y-4"
              >
                {/* Hidden fields for FormSubmit behavior */}
                <input type="hidden" name="_next" value="https://kuquza.co.ke/contact?submitted=true" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Contact Message via KuQuza" />
                {fromSellerCTA && <input type="hidden" name="isSeller" value="true" />}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input type="text" name="name" id="name" placeholder="Enter your name" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input type="email" name="email" id="email" placeholder="Enter your email" required />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    defaultValue={fromSellerCTA ? "I want to sell on KuQuza" : ""}
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isSeller"
                    name="isSeller"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isSeller" className="text-sm">
                    I'm interested in becoming a seller
                  </label>
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: COLORS.primary }}>
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* CONTACT INFO COLUMN */}
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.secondary }}>
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-user mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-3" style={{ color: COLORS.primary }}></i>
                  <div>
                    <p className="font-medium">Call/Whatsapp</p>
                    <p className="text-gray-600">+254705003641</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Connect With Us</h3>
                <div className="flex space-x-3">
                  <a href={SOCIAL_LINKS.facebook} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a href={SOCIAL_LINKS.instagram} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a href={SOCIAL_LINKS.twitter} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter" style={{ color: COLORS.primary }}></i>
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
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
