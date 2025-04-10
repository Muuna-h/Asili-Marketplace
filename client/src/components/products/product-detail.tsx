import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { COLORS } from "@/lib/constants";

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [_, navigate] = useLocation();
  
  // Fetch product details from the API
  const { data: product, isLoading, error } = useQuery({
    queryKey: [`/api/products/${slug}`]
  });
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    // If we have stock info, we could limit this
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        category: product.category?.name || "Product"
      });
    }
  };
  
  const handleCheckout = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        category: product.category?.name || "Product"
      });
      navigate("/checkout");
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/5">
            <div className="bg-gray-300 rounded-lg aspect-square"></div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mb-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-4 w-4 mr-2 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h2 className="text-xl font-medium mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-4">The product you're looking for could not be found or has been removed.</p>
        <Button 
          onClick={() => navigate("/")}
          style={{ backgroundColor: COLORS.primary }}
        >
          Return to Home
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Gallery */}
        <div className="md:w-3/5">
          <div className="bg-neutral-light rounded-lg overflow-hidden">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`rounded-md overflow-hidden border-2 ${
                  index === activeImage ? 'border-primary' : 'border-transparent hover:border-primary'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-auto aspect-square object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-2/5">
          <nav className="flex text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link 
              href={`/category/${product.category?.slug || ""}`} 
              className="hover:text-primary"
            >
              {product.category?.name || "Category"}
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>
          
          <h1 
            className="font-display text-2xl md:text-3xl mb-2"
            style={{ color: COLORS.secondary }}
          >
            {product.name}
          </h1>
          <div 
            className="text-2xl font-semibold mb-4"
            style={{ color: COLORS.primary }}
          >
            KSh {product.price.toLocaleString()}
          </div>
          
          <div className="mb-6">
            <p className="text-neutral-dark mb-4">
              {product.description}
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <i 
                  className="fas fa-check mt-1 mr-2"
                  style={{ color: COLORS.success }}
                ></i>
                <span>Handcrafted in Kenya</span>
              </li>
              <li className="flex items-start">
                <i 
                  className="fas fa-check mt-1 mr-2"
                  style={{ color: COLORS.success }}
                ></i>
                <span>Authentic materials</span>
              </li>
              <li className="flex items-start">
                <i 
                  className="fas fa-check mt-1 mr-2"
                  style={{ color: COLORS.success }}
                ></i>
                <span>Each piece is unique</span>
              </li>
              <li className="flex items-start">
                <i 
                  className="fas fa-check mt-1 mr-2"
                  style={{ color: COLORS.success }}
                ></i>
                <span>Fair trade certified</span>
              </li>
            </ul>
          </div>
          
          <Separator className="my-6" />
          
          {/* Order Section */}
          <div className="pt-6">
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 rounded-l-md flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                  style={{ backgroundColor: COLORS.neutral.light }}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  min="1" 
                  max="10" 
                  className="w-16 h-10 border-y border-gray-200 text-center focus:outline-none"
                  readOnly
                />
                <button 
                  className="w-10 h-10 rounded-r-md flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  style={{ backgroundColor: COLORS.neutral.light }}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full py-3 font-medium flex items-center justify-center"
                onClick={handleAddToCart}
                style={{ backgroundColor: COLORS.primary }}
              >
                <i className="fas fa-shopping-bag mr-2"></i> Add to Cart
              </Button>
              <Button 
                className="w-full py-3 font-medium flex items-center justify-center"
                onClick={handleCheckout}
                style={{ backgroundColor: COLORS.secondary }}
              >
                <i className="fas fa-credit-card mr-2"></i> Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
