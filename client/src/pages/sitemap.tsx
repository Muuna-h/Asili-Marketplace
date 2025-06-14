import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '@/lib/constants';

export default function Sitemap() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: COLORS.primary }}>Site Map</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.secondary }}>General</h2>
          <ul>
            <li className="mb-2"><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="mb-2"><Link to="/about" className="text-blue-600 hover:underline">About Us</Link></li>
            <li className="mb-2"><Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
            <li className="mb-2"><Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
            <li className="mb-2"><Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.secondary }}>Shop</h2>
          <ul>
            <li className="mb-2"><Link to="/category/all" className="text-blue-600 hover:underline">All Products</Link></li>
            {/* Add more category links dynamically if needed */}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: COLORS.secondary }}>Account</h2>
          <ul>
            <li className="mb-2"><Link to="/login" className="text-blue-600 hover:underline">Login</Link></li>
            <li className="mb-2"><Link to="/register" className="text-blue-600 hover:underline">Register</Link></li>
            <li className="mb-2"><Link to="/cart" className="text-blue-600 hover:underline">Shopping Cart</Link></li>
            {/* Add more account-related links */}
          </ul>
        </section>
      </div>
    </div>
  );
}