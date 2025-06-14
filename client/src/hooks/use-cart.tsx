import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kuquzaCart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kuquzaCart", JSON.stringify(items));
  }, [items]);
  
  // Calculate the total number of items in the cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate the subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Add an item to the cart
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Update the existing item's quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
        toast({
          title: "Item updated",
          description: `${item.name} quantity updated in your cart.`,
        });
        return newItems;
      } else {
        // Add the new item
        toast({
          title: "Item added",
          description: `${item.name} added to your cart.`,
        });
        return [...prevItems, item];
      }
    });
    
    // Open the cart when adding an item
    setIsCartOpen(true);
  };
  
  // Update the quantity of an item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove an item from the cart
  const removeItem = (id: number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your cart.`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  // Clear the cart
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  // Toggle the cart sidebar
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}