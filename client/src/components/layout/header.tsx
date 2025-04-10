import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";
import CartSidebar from "./cart-sidebar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { itemCount, toggleCart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden text-neutral-dark"
              aria-label="Toggle mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            {/* Logo */}
            <div className="flex-1 text-center lg:text-left">
              <Link href="/" className="inline-block">
                <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: COLORS.primary }}>
                  ASILI KENYA
                </h1>
                <p className="text-xs" style={{ color: COLORS.secondary }}>
                  Authentic Kenyan Craftsmanship
                </p>
              </Link>
            </div>
            
            {/* Search and Navigation (Desktop) */}
            <div className="hidden lg:flex items-center space-x-6">
              <form className="relative w-64" onSubmit={handleSearch}>
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-2 px-4 pr-10 rounded-full bg-neutral-light border border-gray-200 focus:outline-none focus:ring-1"
                  style={{ backgroundColor: COLORS.neutral.light }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2.5 text-gray-400"
                  aria-label="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
              
              <nav className="flex items-center space-x-6">
                <Link href="/" className="text-neutral-dark hover:text-primary font-medium">
                  Shop
                </Link>
                <Link href="/about" className="text-neutral-dark hover:text-primary font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-neutral-dark hover:text-primary font-medium">
                  Contact
                </Link>
              </nav>
            </div>
            
            {/* Cart */}
            <div className="ml-4 relative">
              <button 
                className="p-2 text-xl text-neutral-dark hover:text-primary relative"
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <i className="fas fa-shopping-bag"></i>
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search (appears when mobile menu is open) */}
          {isMobileMenuOpen && (
            <div className="mt-4 lg:hidden">
              <form className="relative" onSubmit={handleSearch}>
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-2 px-4 pr-10 rounded-full bg-neutral-light border border-gray-200 focus:outline-none focus:ring-1"
                  style={{ backgroundColor: COLORS.neutral.light }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2.5 text-gray-400"
                  aria-label="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link href="/" className="text-neutral-dark hover:text-primary font-medium py-2">
                  Shop
                </Link>
                <Link href="/about" className="text-neutral-dark hover:text-primary font-medium py-2">
                  About
                </Link>
                <Link href="/contact" className="text-neutral-dark hover:text-primary font-medium py-2">
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}
