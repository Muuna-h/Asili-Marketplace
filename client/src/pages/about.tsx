import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { COLORS } from '@/lib/constants';

export default function AboutPage() {
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
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-sm">
          <h1 
            className="font-display text-3xl md:text-4xl mb-6 text-center"
            style={{ color: COLORS.secondary }}
          >
            About KuQuza
          </h1>

          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Our Business Concept
            </h2>
            <p className="text-gray-700 leading-relaxed">
              KuQuza is a dedicated e-commerce platform that exclusively connects buyers with sellers, manufacturers, and producers of Kenyan-made products. The platform showcases a wide range of locally produced goods, including fashion, food, crafts, technology, health and beauty, textiles, Plants, juakali products, construction products and furniture. KuQuza focuses on promoting Kenyan craftsmanship, sustainability, and ethical sourcing, both locally and internationally.
            </p>
          </section>

          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Mission and Vision
            </h2>
            <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.secondary }}>Mission</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To provide a platform that highlights and promotes the uniqueness, authenticity, and quality of Kenyan-made products, connecting local artisans, producers, and manufacturers with a wider customer base.
            </p>
            <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.secondary }}>Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To position Kenyan-made products as globally recognized, empowering local producers and artisans through a platform for growth and exposure.
            </p>
          </section>
          
           {/* Our Commitment Section */}
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Our Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At KuQuza, we are deeply committed to empowering Kenyan artisans, creators, and entrepreneurs. We believe in the power of local talent and the value of authentic, high-quality products. Our platform is built on principles of fairness, transparency, and sustainability.
            </p>
             <p className="text-gray-700 leading-relaxed">
              We work closely with our sellers to ensure ethical sourcing and production practices. By choosing KuQuza, you're not just buying a product; you're supporting local communities, preserving traditional crafts, and contributing to the growth of the Kenyan economy. We strive to bridge the gap between talented producers and conscious consumers.
            </p>
          </section> 

           {/* Sell With Us CTA */}
          <section className="border-t border-gray-200 mt-10 pt-8 flex flex-col items-center">
            <div className="max-w-2xl text-center mb-6">
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.secondary }}>Want to sell with us?</h3>
              <p className="text-gray-700 mb-4">
                Join our marketplace of Kenyan artisans and entrepreneurs. Connect with customers who value authentic Kenyan products.
              </p>
              <Link href="/contact?seller=true">
                <button 
                  className="px-6 py-3 rounded-md font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Sell With Us
                </button>
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}