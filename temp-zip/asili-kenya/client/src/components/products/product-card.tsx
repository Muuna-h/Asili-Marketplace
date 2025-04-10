import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: string[];
    category?: {
      id: number;
      name: string;
      slug: string;
    };
    categoryId: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category?.name || "Product"
    });
  };
  
  return (
    <div 
      className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div 
          className="h-48 md:h-56 bg-cover bg-center"
          style={{ backgroundImage: `url('${product.images[0]}')` }}
        ></div>
        <div className="p-3 md:p-4">
          <div className="text-sm text-gray-500">{product.category?.name || "Product"}</div>
          <h3 className="font-medium text-neutral-dark group-hover:text-primary transition line-clamp-1">
            {product.name}
          </h3>
          <div className="font-semibold mt-1">KSh {product.price.toLocaleString()}</div>
        </div>
      </Link>
      <div 
        className={`product-actions absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90 transition-all duration-300 ${
          isHovered ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <Button 
          className="w-full py-2 rounded-md text-sm font-medium transition"
          onClick={handleAddToCart}
          style={{ backgroundColor: COLORS.primary }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
