import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { COLORS } from '@/lib/constants';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 lead mb-8">
              At Asili MarketPlace, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make purchases.
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                <strong>Personal Information:</strong> We may collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing/Delivery address</li>
                <li>Payment information</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Automatically Collected Information:</strong> When you visit our website, our servers may automatically log standard data provided by your web browser. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your device's IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on each page</li>
                <li>Other details about your visit</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various business purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send related information</li>
                <li>To respond to inquiries and offer support</li>
                <li>To send administrative information, updates, and security alerts</li>
                <li>To provide marketing communications that may be of interest to you</li>
                <li>To improve our website and services</li>
                <li>To enforce our terms, conditions, and policies</li>
                <li>To protect against fraudulent, unauthorized, or illegal activity</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>3. Disclosure of Your Information</h2>
              <p className="text-gray-700 mb-4">
                At Asili MarketPlace, we take your privacy seriously and are committed to maintaining the confidentiality of your personal information. <strong>We do not sell, rent, trade, or otherwise transfer your personal information to outside parties.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                Your information remains strictly within our organization and is only accessible to authorized personnel who need it to provide you with our services.
              </p>
              <p className="text-gray-700 mb-4">
                The only limited circumstances where we may disclose your information include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so, such as in response to a court order, subpoena, or similar legal process.</li>
                <li><strong>Protection of Rights:</strong> When necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or situations involving potential threats to the safety of any person.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your explicit consent for specific purposes that you approve.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We maintain strict internal policies and procedures to ensure that your data is not shared inappropriately and is adequately protected at all times.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to access or store information. These technologies help us understand user behavior, improve our services, and provide personalized content and advertisements.
              </p>
              <p className="text-gray-700 mb-4">
                You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no internet transmission or electronic storage is ever completely secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>6. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>The right to access your personal information</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us using the details provided below.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>7. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn we have collected or received personal information from a child without verification of parental consent, we will delete that information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>8. Changes to this Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions or concerns about this Privacy Policy or our practices, please contact us at:
              </p>
              <p className="text-gray-700 mb-4">
                Email: info@asilimarketplace.co.ke<br />
                Phone: +254 705003641
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