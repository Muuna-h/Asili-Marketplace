import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { COLORS } from '@/lib/constants';

export default function TermsPage() {
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.neutral.light;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-sm">
          <h1 
            className="font-display text-3xl md:text-4xl mb-8 text-center"
            style={{ color: COLORS.secondary }}
          >
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 lead mb-8">
              These Terms and Conditions govern your use of Asili MarketPlace. Please read these terms carefully before accessing or using our platform.
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Asili MarketPlace, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>2. Products and Services</h2>
              <p className="text-gray-700 mb-4">
                Asili MarketPlace is an online platform that connects buyers with Kenyan artisans, producers, and sellers. We do not directly sell products but facilitate connections between buyers and sellers.
              </p>
              <p className="text-gray-700 mb-4">
                Product descriptions, images, and prices are provided by the sellers. While we strive to ensure accuracy, we do not guarantee that product information is error-free.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You may need to create an account to access certain features of our platform. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <p className="text-gray-700 mb-4">
                You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>4. Orders and Payments</h2>
              <p className="text-gray-700 mb-4">
                By placing an order, you make an offer to purchase products. All orders are subject to acceptance and availability.
              </p>
              <p className="text-gray-700 mb-4">
                Prices are in Kenyan Shillings (KSh) and include VAT where applicable. We accept payments via M-Pesa and other payment methods as indicated on our platform.
              </p>
              <p className="text-gray-700 mb-4">
                We reserve the right to refuse or cancel any orders for reasons including but not limited to product availability, errors in product or pricing information, or identification of fraudulent activity.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>5. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-4">
                Delivery times are estimates and begin from the date of shipping, not the date of order. We are not responsible for delays outside our control.
              </p>
              <p className="text-gray-700 mb-4">
                Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>6. Returns and Refunds</h2>
              <p className="text-gray-700 mb-4">
                Please refer to our Return Policy for information on returns, refunds, and exchanges.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on Asili MarketPlace, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Asili MarketPlace or its content suppliers and is protected by Kenyan and international copyright laws.
              </p>
              <p className="text-gray-700 mb-4">
                You may not reproduce, modify, display, sell, or distribute content from our platform without prior written consent from Asili MarketPlace.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Asili MarketPlace will not be liable for any damages of any kind arising from the use of this platform, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>9. Applicable Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms and Conditions are governed by and construed in accordance with the laws of Kenya. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the platform. Your continued use of the platform following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our Terms and Conditions, please contact us at info@asilimarketplace.co.ke.
              </p>
              <p className="text-gray-700 font-medium">
                Last updated: April 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 